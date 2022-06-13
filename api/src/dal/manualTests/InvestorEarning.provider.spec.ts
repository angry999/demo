import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { InvestorEarningDal } from '../../dal/InvestorEarning.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('InvestorEarningDal', () => {
    let dal: InvestorEarningDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, InvestorEarningDal],
            }).compile();

        dal = await app.resolve<InvestorEarningDal>(InvestorEarningDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(4);
        expect(oneResult.project_id).toBe(1);
        expect(oneResult.order_id).toBe(6);
        expect(oneResult.project_earnings_id).toBe(1);
        expect(oneResult.type).toBe(5);
        expect(oneResult.category).toBe("Other Earning");
        expect(oneResult.description).toBe("Luan Awesomeness Earnings");
        expect(oneResult.amount).toBe(6.7);
        expect(oneResult.user_id).toBe(5);
        expect(oneResult.last_changed_by_id).toBe(7);
        expect(oneResult.id).toBe(4);
        expect(oneResult.createtime.toISOString()).toBe("2016-01-01T01:01:00.000Z");
        expect(oneResult.updatetime.toISOString()).toBe("2017-03-11T22:40:01.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});

