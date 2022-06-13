import { NotFoundException } from '@nestjs/common';
import { InvestorAccreditation } from 'fundscraper-model-enums';
import { InvestorDal } from '../dal/Investor.provider';
import { InvestmentOrder } from '../model/InvestmentOrder.entity.generated';
import { InvestorService_generated } from './bll.generated';

/**
 * Business logic (service) classes for model in typescript (nest.js) for Investor
 * NOTE: EDIT AT WILL, this is intially generated and then left alone. Your changes will not be affected by subsequent code generation runs
 * A user that invests
 */

/**
 * Investor
 * A user that invests
 */
export class InvestorService extends InvestorService_generated {
    /**
     * place your custom code here
     */
    constructor(superInjectedDal: InvestorDal) {
        super(superInjectedDal);
    }

    /**
     * get all non-deleted orders for a given investor
     * @param user_id - the id of the investor to get the orders for
     * @returns all non-deleted orders for the given investor
     */
    async getAllNonDeletedOrders(user_id: number): Promise<InvestmentOrder[]> {
        let investor = await this.repository.findOneById(user_id, ['orders']);
        if (investor == null)
            throw new NotFoundException();
        let result = new Array<InvestmentOrder>();
        let allOrders = investor.orders as any;

        await Promise.all(allOrders.map(async (order: InvestmentOrder) => {
            if (!order.is_deleted) {
                result.push(order);
            }
        }));

        return result;
    }

    /**
     * get the oldest non-deleted order in the last year for a given investor
     * @param user_id - the id of the investor to get the oldest non-deleted order in the last year for
     * @returns the oldest non-deleted order in the last year for the given investor
     */
    async getOldestNonDeletedOrderInLastYear(user_id: number): Promise<InvestmentOrder> {
        let validOrders = await this.getAllNonDeletedOrders(user_id);
        let result: InvestmentOrder;
        let oldDate = new Date();
        oldDate.setFullYear(oldDate.getFullYear() - 1);

        await Promise.all(validOrders.map(async (order: InvestmentOrder) => {
            if (order.order_date >= oldDate && (result == undefined || result.order_date > order.order_date)) {
                result = order;
            }
        }));

        return result;
    }

    /**
     * get the total amount of all orders in the last year for a given investor
     * @param user_id - the id of the investor to get the total amount of all orders in the last year for
     * @returns the total amount of all orders in the last year for the given investor
     */
    async getTotalAmountInvestedInLastYear(user_id: number): Promise<number> {
        let validOrders = await this.getAllNonDeletedOrders(user_id);
        let result: number;
        result = 0;
        let oldDate = new Date();
        oldDate.setFullYear(oldDate.getFullYear() - 1);

        await Promise.all(validOrders.map(async (order: InvestmentOrder) => {
            if (order.order_date >= oldDate) {
                result += order.total_amount;
            }
        }));

        return result;
    }

    /**
     * gets the annual investment limits for the given investor
     * @param user_id - the id of the investor to get the annual investment limits for
     * @returns the annual investment limits for the given investor, or -1 if they have none
     */
    async getAnnualInvestmentLimits(user_id: number): Promise<number> {
        let investor = await this.repository.findOneById(user_id);
        if (investor == null)
            throw new NotFoundException();
        let result: number;
        result = -1;

        if (investor.actual_investment_level == InvestorAccreditation.ineligibleSection)
            result = 10000;
        else if (investor.actual_investment_level == InvestorAccreditation.eligibleSection)
            result = 30000;

        if (result > 0 && investor.eligible_exemption)
            result = 100000;

        return result;
    }
}


