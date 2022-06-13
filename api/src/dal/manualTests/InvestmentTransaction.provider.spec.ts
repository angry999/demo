import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { InvestmentTransactionDal } from '../../dal/InvestmentTransaction.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('InvestmentTransactionDal', () => {
    let dal: InvestmentTransactionDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, InvestmentTransactionDal],
            }).compile();

        dal = await app.resolve<InvestmentTransactionDal>(InvestmentTransactionDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult.user_id).toBe(1);
        expect(oneResult.project_id).toBe(1);
        expect(oneResult.entity_type).toBe(0);
        expect(oneResult.entity_id).toBe("");
        expect(oneResult.order_no).toBe("MU-101-101-00051");
        expect(oneResult.number_of_shares).toBe(5);
        expect(oneResult.amount_per_share).toBe(1000.00);
        expect(oneResult.credit).toBe(0.00);
        expect(oneResult.debit).toBe(0.00);
        expect(oneResult.activity).toBe("Order Placed");
        expect(oneResult.activity_desc).toBe("");
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.id).toBe(1);
        expect(oneResult.updatetime.toISOString()).toBe("2019-05-10T20:41:34.000Z");
        expect(oneResult.transaction_date.toISOString()).toBe("2017-03-06T23:58:29.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2019-05-10T14:28:53.000Z");
        expect(oneResult.is_deleted).toBe(false);
        expect(oneResult.is_cancelled).toBe(false);
    });
});

