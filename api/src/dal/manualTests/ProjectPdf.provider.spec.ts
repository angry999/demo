import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { ProjectPdfDal } from '../../dal/ProjectPdf.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('ProjectPdfDal', () => {
    let dal: ProjectPdfDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, ProjectPdfDal],
            }).compile();

        dal = await app.resolve<ProjectPdfDal>(ProjectPdfDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(9);
        expect(oneResult.project_entity_id).toBe(0);
        expect(oneResult.title).toBe("testing 123456");
        expect(oneResult.filename).toBe("pdf-2-431349088.pdf");
        expect(oneResult.sort_order).toBe(1);
        expect(oneResult.project_id).toBe(2);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.id).toBe(9);
        expect(oneResult.updatetime.toISOString()).toBe("2019-02-06T02:12:05.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2019-02-06T02:12:05.000Z");
        expect(oneResult.visible).toBe(true);
        expect(oneResult.is_deleted).toBe(false);
    });
});
