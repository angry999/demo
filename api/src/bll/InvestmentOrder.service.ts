import { Logger } from '@nestjs/common';
import { InvestmentOrderDal } from '../dal/InvestmentOrder.provider';
import { InvestmentOrder } from '../model/InvestmentOrder.entity.generated';
import { InvestmentOrderService_generated } from './bll.generated';

/**
 * Business logic (service) classes for model in typescript (nest.js) for InvestmentOrder
 * NOTE: EDIT AT WILL, this is intially generated and then left alone. Your changes will not be affected by subsequent code generation runs
 * one request for the purchase of securities. this is NOT the transaction, just the request for a transaction.
 */

/**
 * InvestmentOrder
 * one request for the purchase of securities. this is NOT the transaction, just the request for a transaction.
 */
export class InvestmentOrderService extends InvestmentOrderService_generated {
    /**
     * place your custom code here
     */

    private logger = new Logger(InvestmentOrderService.name);

    constructor(superInjectedDal: InvestmentOrderDal) {
        super(superInjectedDal);
    }

    /**
     * update a list of orders with the given parameters
     * @param order_list - a list of orders including the id and the table columns to update for each order
     */
    async updateList(order_list: InvestmentOrder[]) {
        await Promise.all(order_list.map(async (order) => {
            this.logger.debug(`in function updating order ` + order.id);
            await this.repository.update(order as InvestmentOrder);
        }))
    }
}


