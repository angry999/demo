import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { ExemptDistributionOptionDal } from '../../dal/ExemptDistributionOption.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('ExemptDistributionOptionDal', () => {
    let dal: ExemptDistributionOptionDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, ExemptDistributionOptionDal],
            }).compile();

        dal = await app.resolve<ExemptDistributionOptionDal>(ExemptDistributionOptionDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult.code).toBe("BND");
        expect(oneResult.detail).toBe("(Bonds)");
        expect(oneResult.category).toBe(1);
        expect(oneResult.sort_order).toBe(1);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.id).toBe(1);
        expect(oneResult.updatetime.toISOString()).toBe("2019-02-06T02:12:05.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2019-02-06T02:12:05.000Z");
        expect(oneResult.inactive).toBe(false);
        expect(oneResult.is_deleted).toBe(false);
    });
});
