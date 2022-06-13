import { Logger } from '@nestjs/common';
import { InvestmentOrderStatus_friendlyText, InvestmentOrderStatus } from 'fundscraper-model-enums';
import { InvestmentOrderDal } from '../dal/InvestmentOrder.provider';
import { InvestmentTransactionDal } from '../dal/InvestmentTransaction.provider';
import { InvestmentOrder } from '../model/InvestmentOrder.entity.generated';
import { InvestmentTransaction } from '../model/InvestmentTransaction.entity.generated';
import { InvestmentTransactionService_generated } from './bll.generated';

/**
 * Business logic (service) classes for model in typescript (nest.js) for InvestmentTransaction
 * NOTE: EDIT AT WILL, this is intially generated and then left alone. Your changes will not be affected by subsequent code generation runs
 * 
 */

/**
 * InvestmentTransaction
 * 
 */
export class InvestmentTransactionService extends InvestmentTransactionService_generated {
    /**
     * place your custom code here
     */

    private logger = new Logger(InvestmentTransactionService.name);
    constructor(superInjectedDal: InvestmentTransactionDal, private orderDal: InvestmentOrderDal) {
        super(superInjectedDal);
    }

    /**
     * creates the transaction for escrow and escrow_settled confirmation
     * @param orders - the orders in the schedule1 to create transaction for
     * @param escrow_settled - true creates and escrow_settled transaction, false creates an escrow transaction
     * @param transaction_date - the date the filed roed was distributed
     */
    async escrowConfirmationTransaction(order: InvestmentOrder, escrow_settled: boolean, transaction_date: Date) {
        let newTransaction = [] as object;

        newTransaction = {
            order_id: order.id
            , order_no: order.order_no.toString()
            , user_id: order.user_id
            , entity_id: order.entity_id.toString()
            , entity_type: order.entity_type.toString()
            , user_entity_id: order.user_entity_id == null ? order.user_entity_id : order.user_entity_id.toString()
            , project_id: order.project_id
            , activity: escrow_settled == false ? 'Funds Received' : InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.purchased]
            , number_of_shares: order.number_of_shares.toString()
            , amount_per_share: order.share_price.toString()
            , debit: order.total_amount.toString()
            , credit: 0
            , status: 0
            , transaction_date: transaction_date
        }

        this.logger.debug(`transaction for ${order.id} is being attempted`);
        await this.repository.create(newTransaction as InvestmentTransaction);
        this.logger.debug(`transaction for ${order.id} was made`);
    }
}


