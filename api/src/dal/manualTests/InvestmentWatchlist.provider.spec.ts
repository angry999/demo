import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { InvestmentWatchlistDal } from '../../dal/InvestmentWatchlist.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('InvestmentWatchlistDal', () => {
    let dal: InvestmentWatchlistDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, InvestmentWatchlistDal],
            }).compile();

        dal = await app.resolve<InvestmentWatchlistDal>(InvestmentWatchlistDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(7);
        expect(oneResult.project_id).toBe(5);
        expect(oneResult.at20).toBe(false);
        expect(oneResult.at40).toBe(false);
        expect(oneResult.at60).toBe(false);
        expect(oneResult.at80).toBe(false);
        expect(oneResult.at100).toBe(false);
        expect(oneResult.user_id).toBe(1);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.id).toBe(7);
        expect(oneResult.createtime.toISOString()).toBe("2019-02-07T10:23:56.000Z");
        expect(oneResult.updatetime.toISOString()).toBe("2018-11-02T14:18:49.000Z");
        expect(oneResult.in_active).toBe(true);
        expect(oneResult.is_deleted).toBe(false);
    });
});

