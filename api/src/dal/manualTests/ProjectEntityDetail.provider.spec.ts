import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { ProjectEntityDetailDal } from '../../dal/ProjectEntityDetail.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('ProjectEntityDetailDal', () => {
    let dal: ProjectEntityDetailDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, ProjectEntityDetailDal],
            }).compile();

        dal = await app.resolve<ProjectEntityDetailDal>(ProjectEntityDetailDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(47);
        expect(oneResult.project_entity_id).toBe(18);
        expect(oneResult.f1).toBe("Targeted returns");
        expect(oneResult.f2).toBe(null);
        expect(oneResult.f3).toBe(null);
        expect(oneResult.f4).toBe(null);
        expect(oneResult.f5).toBe(null);
        expect(oneResult.f6).toBe(null);
        expect(oneResult.f7).toBe("17%");
        expect(oneResult.f8).toBe(null);
        expect(oneResult.f9).toBe(null);
        expect(oneResult.f10).toBe(null);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.id).toBe(47);
        expect(oneResult.updatetime.toISOString()).toBe("2019-02-06T02:12:05.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2019-02-06T02:12:05.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});

