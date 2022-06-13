import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { ProjectBalanceAdjustmentDal } from '../../dal/ProjectBalanceAdjustment.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('ProjectBalanceAdjustmentDal', () => {
    let dal: ProjectBalanceAdjustmentDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, ProjectBalanceAdjustmentDal],
            }).compile();

        dal = await app.resolve<ProjectBalanceAdjustmentDal>(ProjectBalanceAdjustmentDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult.adjustment_type).toBe(5);
        expect(oneResult.category).toBe("Other Earning");
        expect(oneResult.description).toBe("Luan Awesomeness Earnings");
        expect(oneResult.amount).toBe(6.7);
        expect(oneResult.project_id).toBe(1);
        expect(oneResult.last_changed_by_id).toBe(7);
        expect(oneResult.id).toBe(1);
        expect(oneResult.updatetime.toISOString()).toBe("2017-03-11T22:40:01.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2016-01-01T01:01:00.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});

