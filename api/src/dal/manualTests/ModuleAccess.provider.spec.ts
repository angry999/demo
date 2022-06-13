import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { ModuleAccessDal } from '../../dal/ModuleAccess.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('ModuleAccessDal', () => {
    let dal: ModuleAccessDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, ModuleAccessDal],
            }).compile();

        dal = await app.resolve<ModuleAccessDal>(ModuleAccessDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(2);
        expect(oneResult.user_id).toBe(2);
        expect(oneResult.module_id).toBe(25);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.id).toBe(2);
        expect(oneResult.createtime.toISOString()).toBe("2019-02-06T02:12:05.000Z");
        expect(oneResult.updatetime.toISOString()).toBe("2019-02-06T02:12:05.000Z");
        expect(oneResult.can_view).toBe(true);
        expect(oneResult.can_add).toBe(true);
        expect(oneResult.can_edit).toBe(true);
        expect(oneResult.can_delete).toBe(true);
        expect(oneResult.is_deleted).toBe(false);
    });
});

