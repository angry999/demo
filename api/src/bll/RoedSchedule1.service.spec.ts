import { Test, TestingModule } from '@nestjs/testing';
import { UserType } from 'fundscraper-model-enums';
import { DatabaseConnectionPool } from '../dal/DatabaseConnectionPool.provider';
import { InvestorDal } from '../dal/Investor.provider';
import { UserIdentification } from '../security/UserIdentification';
import { InvestmentOrderDal } from '../dal/InvestmentOrder.provider';
import { InvestmentTransactionDal } from '../dal/InvestmentTransaction.provider';
import { RoedSchedule1Dal } from '../dal/RoedSchedule1.provider';
import { RoedSchedule1Service } from './RoedSchedule1.service';
import { InvestmentOrderService } from './InvestmentOrder.service';
import { InvestmentTransactionService } from './InvestmentTransaction.service';
import { AllUserDal } from '../dal/AllUser.provider';
import { RoedSchedule1 } from '../model/RoedSchedule1.entity.generated';

describe('RoedSchedule1Service', () => {
    let roedService: RoedSchedule1Service;
    let orderService: InvestmentOrderService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, RoedSchedule1Service, RoedSchedule1Dal, InvestorDal, InvestmentOrderService, InvestmentTransactionService, InvestmentOrderDal, InvestmentTransactionDal, AllUserDal],
            }).compile();

        roedService = await app.resolve<RoedSchedule1Service>(RoedSchedule1Service);
        roedService.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        orderService = await app.resolve<InvestmentOrderService>(InvestmentOrderService);
        orderService.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('create roed', async () => {
        // get the orders and clear out the data
        let orders = await orderService.findAllByFilter(`project_id=1`, undefined, undefined, undefined, 1, 10);
        let orderIds = [];
        orders.forEach(order => {
            orderIds.push(order.id);
        });

        let newRoed = new RoedSchedule1();
        newRoed.name = 'name';
        newRoed.status = 1;
        newRoed.project_id = 1;
        (newRoed as any).orderIds = orderIds;
        let createdRoed = await roedService.create(newRoed);
        let roedOrders = await orderService.findAllByFilter(`roed_schedule1_id=${createdRoed.id}`, undefined, undefined, undefined, 1, 20);
        orders.forEach(order => {
            let found = false;
            roedOrders.forEach(roedOrder => {
                if (order.id = roedOrder.id)
                    found = true;
            });
            expect(found).toBeTruthy();
        });

        // cleanup
        await Promise.all(orders.map(async (order) => {
            await orderService.updatePartial({ roed_schedule1_id: null }, order.id);
        }));

    });

    it('Trial roed automatch - project 123 - no matches', async () => {
        // get the orders and clear out the data
        let orders = await orderService.findAllByFilter(`project_id = @id and is_deleted=0`, { id: 1 }, ['user']);
        orders.forEach(order => {
            order['filed_roed_row_match'] = null;
        });

        // now try and reconcile
        roedService.autoReconcileOrders(orders, 'src/bll/roed-schedule1-test.xlsx');
    });

    it('Trial roed automatch - project 123 - 1 match, 1 failure', async () => {
        // get the orders and clear out the data
        let orders = await orderService.findAllByFilter(`project_id = @id and is_deleted=0`, { id: 1 }, ['user']);
        orders.forEach(order => {
            order['filed_roed_row_match'] = null;
        });

        // now try and reconcile
        await roedService.autoReconcileOrders(orders, 'src/bll/roed-schedule1-test - 1 match.xlsx');

        let matches = ['MU-101-101-00051R', 'MU-101-101-00053', 'MU-101-101-00052R'];
        orders.forEach(order => {
            if (order.order_no != null) {
                if (matches.includes(order.order_no))
                    expect(order.filed_roed_row_match).toBe(9);
                else if (order.order_no != '')
                    expect(order.filed_roed_row_match).toBe(null);
            }
        });
    });

    it('Trial roed automatch - project 789 - no matches', async () => {
        // get the orders and clear out the data
        let orders = await orderService.findAllByFilter(`project_id = @id and is_deleted=0`, { id: 3 }, ['user']);
        orders.forEach(order => {
            order['filed_roed_row_match'] = null;
        });

        // now try and reconcile
        roedService.autoReconcileOrders(orders, 'src/bll/roed-schedule1-test-project-789.xlsx');
    });

    it('Trial roed automatch - project 789 - 1 match, 1 failure', async () => {
        // get the orders and clear out the data
        let orders = await orderService.findAllByFilter(`project_id = @id and is_deleted=0`, { id: 3 }, ['user']);
        orders.forEach(order => {
            order['filed_roed_row_match'] = null;
        });

        // now try and reconcile
        await roedService.autoReconcileOrders(orders, 'src/bll/roed-schedule1-test-project-789 - 1 match.xlsx');

        orders.forEach(order => {
            if (order.order_no == 'SF-101-103-00104')
                expect(order.filed_roed_row_match).toBe(10);
            else
                expect(order.filed_roed_row_match).toBe(null);
        });
    });
});