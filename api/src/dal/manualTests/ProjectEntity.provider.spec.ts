import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { ProjectEntityDal } from '../../dal/ProjectEntity.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('ProjectEntityDal', () => {
    let dal: ProjectEntityDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, ProjectEntityDal],
            }).compile();

        dal = await app.resolve<ProjectEntityDal>(ProjectEntityDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult.image).toBe("");
        expect(oneResult.title).toBe("test documents");
        expect(oneResult.sort_order).toBe(2);
        expect(oneResult.tab_id).toBe(0);
        expect(oneResult.entity_type).toBe(6);
        expect(oneResult.contents).toBe("");
        expect(oneResult.project_id).toBe(1);
        expect(oneResult.updatetime.toISOString()).toBe("2019-05-10T20:41:32.000Z");
        expect(oneResult.last_changed_by_id).toBe(1);
        expect(oneResult.id).toBe(1);
        expect(oneResult.createtime.toISOString()).toBe("2019-05-10T14:09:15.000Z");
        expect(oneResult.visible).toBe(false);
        expect(oneResult.is_deleted).toBe(false);
    });
});

