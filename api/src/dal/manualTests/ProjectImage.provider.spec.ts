import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { ProjectImageDal } from '../../dal/ProjectImage.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('ProjectImageDal', () => {
    let dal: ProjectImageDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, ProjectImageDal],
            }).compile();

        dal = await app.resolve<ProjectImageDal>(ProjectImageDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(8);
        expect(oneResult.project_entity_id).toBe(null);
        expect(oneResult.title).toBe("People walking down stairs");
        expect(oneResult.image).toBe("p4-130359994.png");
        expect(oneResult.sort_order).toBe(3);
        expect(oneResult.project_id).toBe(4);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.id).toBe(8);
        expect(oneResult.updatetime.toISOString()).toBe("2019-02-06T02:12:05.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2019-02-06T02:12:05.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});

