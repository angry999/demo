import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { AdminModuleDal } from '../../dal/AdminModule.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('AdminModuleDal', () => {
    let dal: AdminModuleDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, AdminModuleDal],
            }).compile();

        dal = await app.resolve<AdminModuleDal>(AdminModuleDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(2);
        expect(oneResult.name).toBe("Home Page");
        expect(oneResult.module_seo).toBe("home-page");
        expect(oneResult.module_icon).toBe("fa-file-text-o");
        expect(oneResult.sub_id).toBe(1);
        expect(oneResult.status).toBe(1);
        expect(oneResult.is_deleted).toBe(false);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.id).toBe(2);
        expect(oneResult.createtime.toISOString()).toBe("2019-02-06T02:12:05.000Z");
        expect(oneResult.updatetime.toISOString()).toBe("2019-02-06T02:12:05.000Z");
    });
});

