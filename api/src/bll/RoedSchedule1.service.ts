import { Inject, Logger } from '@nestjs/common';
import { PaymentStatus, InvestmentOrderStatus, RoedSchedule1State } from 'fundscraper-model-enums';
import { InvestmentOrderDal } from '../dal/InvestmentOrder.provider';
import { RoedSchedule1Dal } from '../dal/RoedSchedule1.provider';
import { InvestmentOrder } from '../model/InvestmentOrder.entity.generated';
import { Investor } from '../model/Investor.entity.generated';
import { RoedSchedule1 } from '../model/RoedSchedule1.entity.generated';
import { UserIdentification } from '../security/UserIdentification';
import { RoedSchedule1Service_generated } from './bll.generated';
import { InvestmentOrderService } from './InvestmentOrder.service';
import { InvestmentTransactionService } from './InvestmentTransaction.service';
var XLSX = require('xlsx');

/**
 * Business logic (service) classes for model in typescript (nest.js) for RoedSchedule1
 * NOTE: EDIT AT WILL, this is intially generated and then left alone. Your changes will not be affected by subsequent code generation runs
 * 
 */

/**
 * RoedSchedule1
 * 
 */
export class RoedSchedule1Service extends RoedSchedule1Service_generated {
    /**
     * place your custom code here
     */

    private logger = new Logger(RoedSchedule1Service.name);

    @Inject()
    protected orderDal: InvestmentOrderDal;

    @Inject()
    protected readonly transactionService: InvestmentTransactionService;

    @Inject()
    protected readonly orderService: InvestmentOrderService;

    /**
     * set the user that is going to be making use of this service
     */
    public async setUserForRequest(user: UserIdentification) {
        super.setUserForRequest(user);
        this.orderDal.setUserForRequest(user);
        this.transactionService.setUserForRequest(user);
        this.orderService.setUserForRequest(user);
    }

    /**
     * create a new instance in the database of a given object (insert)
     * @param newValue - the object to add to the database
     * @returns the id of the created object
     */
    async create(newValue: RoedSchedule1): Promise<RoedSchedule1> {
        // the property orders could be filled in for us
        let project_id = newValue.project_id;
        let resultId;
        if (project_id) {
            let asAny = newValue as any;
            let orderIds = asAny.orderIds;
            this.logger.debug(`create(${JSON.stringify(newValue)})`);
            resultId = await this.repository.create(newValue);
            await Promise.all(orderIds.map(async (orderId) => {
                await this.orderDal.updatePartial({ roed_schedule1_id: resultId }, orderId);
            }));
            return await this.findOneById(resultId);
        }
    }

    /**
     * update the specified object, push the values in 'newValue' to the database
     * @param newValue - the new version of the given object to save
     */
    async update(newValue: RoedSchedule1): Promise<void> {
        let updated = false;
        updated = await this.repository.update(newValue);

        if (updated) {
            await this.autoReconcile(newValue.id);
        }
    }

    /**
     * reconcile the schedule's orders against its uploaded spreadsheet
     * @param id - the id of the schedule to reconcile
     */
    async autoReconcile(id: number) {
        let schedule1 = await this.repository.findOneById(id);
        let orders = await this.orderDal.findAllByFilter(`roed_schedule1_id = @id`, { 'id': id }, ['user']);
        await this.autoReconcileOrders(orders, process.env.GEN_ROOT + '\\external\\excel\\' + schedule1.document);
    }

    /**
     * out of the given orders, attempt to match one order to the details given
     */
    async matchRowToOrder(orders: InvestmentOrder[], rowIndex: number, firstName: string, lastName: string, postalCode: string, numberOfUnits: string, amountPaid: string) {
        this.logger.debug(`matchRowToOrder ${orders.length} orders,  testing row ${rowIndex}`);
        for (let orderIndex = 0; orderIndex < orders.length; orderIndex++) {
            let order = orders[orderIndex];
            let investor = order.user as unknown as Investor;
            this.logger.debug(`matchRowToOrder checking order match row ${order.filed_roed_row_match} and investor ${investor}`);
            if (order.filed_roed_row_match === null && investor != null) {
                this.logger.debug(`matchRowToOrder checking values`);
                try {
                    let orderFirstName = investor.first_name.trim().toLocaleLowerCase();
                    let orderLastName = investor.last_name.trim().toLocaleLowerCase();
                    let orderPostal = investor.zip.replace(/ /, '').toLocaleLowerCase();
                    let units = order.number_of_shares;
                    let orderPrice = order.total_amount;

                    let testFirstName = firstName.toLocaleLowerCase();
                    let testLastName = lastName.toLocaleLowerCase();
                    let testPostal = postalCode.replace(/ /, '').toLocaleLowerCase();
                    let testUnits = parseFloat(numberOfUnits);
                    let testPrice = parseFloat(amountPaid);

                    if (order.order_no == 'SF-101-103-00104') {
                        let testy = null;
                    }


                    if (orderFirstName === testFirstName && orderLastName === testLastName && orderPostal === testPostal && units === testUnits && orderPrice === testPrice) {
                        order.filed_roed_row_match = rowIndex;
                        this.orderDal.updatePartial({ filed_roed_row_match: rowIndex }, order.id);
                        this.logger.debug(`order ${order.id} matched row ${rowIndex}`);
                    }
                    else
                        this.logger.debug(`order ${order.id} did not match matched row ${rowIndex} ${orderFirstName}-${testFirstName}, ${orderLastName}-${testLastName}, ${orderPostal}-${testPostal}, ${units}-${testUnits}, ${orderPrice}-${testPrice}`);
                }
                catch (problem) {
                    this.logger.error(`matchRowToOrder failed`, problem.stack);
                }
            }
        }
    }

    /**
     * reconcile the schedule's orders against its uploaded spreadsheet
     * @param orders - the orders in the schedule 1 to reconcile
     * @param excelFileName - the path/name of the excel file that is considered the filed version
     */
    async autoReconcileOrders(orders: InvestmentOrder[], excelFileName: string) {
        //roed-schedule1-test.xlsx
        try {
            let workbook = XLSX.readFile(excelFileName);

            let lastSheetIndex = workbook.SheetNames.length;
            let tempLastSheetName = '';
            let lastSheetName = '';
            while (lastSheetIndex > 0 && lastSheetName == '') {
                lastSheetIndex--;
                tempLastSheetName = workbook.SheetNames[lastSheetIndex];
                if (!tempLastSheetName.includes('(Hidden or Read only)')) {
                    lastSheetName = tempLastSheetName;
                }
            }

            let detailsSheet = workbook.Sheets[lastSheetName];
            let rowIndex = 9;
            let firstName_cell = detailsSheet[`B${rowIndex}`];
            while (firstName_cell != null) {
                this.logger.debug(`row ${rowIndex} B-${firstName_cell}`);
                // a = first name
                let firstName = firstName_cell.v;
                // b = last name
                let lastName_cell = detailsSheet[`A${rowIndex}`];
                let lastName = lastName_cell.v;
                // i = postal
                let postalCode_cell = detailsSheet[`I${rowIndex}`];
                let postalCode = postalCode_cell.v;
                // n = number of units
                let numberOfUnits_cell = detailsSheet[`N${rowIndex}`];
                let numberOfUnits = numberOfUnits_cell.v;
                // p = amount paid
                let amountPaid_cell = detailsSheet[`P${rowIndex}`];
                let amountPaid = amountPaid_cell.v;
                await this.matchRowToOrder(orders, rowIndex, firstName, lastName, postalCode, numberOfUnits, amountPaid);

                rowIndex++;
                firstName_cell = detailsSheet[`B${rowIndex}`];
            }
        }
        catch (problem) {
            this.logger.error(`autoReconcileOrders failed`, problem.stack);
        }
    }

    /**
     * confirm escrow and trade dates are filled for orders upon reconciliation, filling them if not 
     * @param orders - the orders in the schedule1 to confirm 
     * @param filedDateofDistribution - the date the filed roed was distributed
     */
    async confirmReconciliatedOrders(schedule1: RoedSchedule1, dateofDistribution: string) {
        let date = new Date(dateofDistribution);
        let updateOrderList = [] as any;
        let orders = schedule1.orders as any;

        await Promise.all(orders.map(async (order: InvestmentOrder) => {
            let updateOrder = {} as any;
            updateOrder.id = order.id.toString();
            if (order.escrow_date == null) {
                updateOrder.escrow_date = date;
                updateOrder.payment = PaymentStatus.funds_sent;

                await this.transactionService.escrowConfirmationTransaction(order, false, date);
            }
            if (order.escrow_settled_date == null) {
                updateOrder.escrow_settled_date = date;
                updateOrder.payment = PaymentStatus.funds_cleared;
                updateOrder.status = InvestmentOrderStatus.purchased;

                await this.transactionService.escrowConfirmationTransaction(order, true, date);
            }
            if (order.trade_date == null) {
                updateOrder.trade_date = date;
            }
            if (Object.keys(updateOrder).length > 1)
                updateOrderList.push(Object.assign({}, updateOrder));
        }));
        this.logger.debug(`updating ` + JSON.stringify(updateOrderList));
        if (updateOrderList.length > 0) await this.orderService.updateList(updateOrderList);

        if (schedule1.status != RoedSchedule1State.reconciled) {
            schedule1.status = RoedSchedule1State.reconciled
            await this.repository.update(schedule1);
        }
    }
}


