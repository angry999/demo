import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from './../DatabaseConnectionPool.provider';
import { AdminUserDal } from './../AdminUser.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';
import { UserBasicDal } from './../UserBasic.provider';
import { ModuleAccess } from '../../model/ModuleAccess.entity.generated';
import { ModuleAccessDal } from './../ModuleAccess.provider';
import { AdminModule } from '../../model/AdminModule.entity.generated';
import { AdminModuleDal } from './../AdminModule.provider';
import { AllUserDal } from '../AllUser.provider';

describe('AbstractDal', () => {
    let dal: AdminUserDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, AdminUserDal, UserBasicDal, AdminModuleDal, ModuleAccessDal, AllUserDal],
            }).compile();

        dal = await app.resolve<AdminUserDal>(AdminUserDal);
    });

    it('email param', async () => {
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let allResults = await dal.findAllByFilter(`email = @inEmail`, { "inEmail": "admin7@email.ghostinspector.com" });
        let oneResult = allResults[0];
        expect(oneResult.email).toBe("admin7@email.ghostinspector.com");
    });

    it('token param', async () => {
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user))
        let allResults = await dal.findAllByFilter(`token = @prmToken and is_deleted = 0`, { "prmToken": "4dc98fd81f075a68b146a6847d7161b478643e7d" });
        let oneResult = allResults[0];
        expect(oneResult.email).toBe("admin7@email.ghostinspector.com");
    });

    it('expand - 2 step', async () => {
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user))
        let oneResult = await dal.findOneById(8, ["accessible_modules.last_changed_by"]);
        let mod = oneResult.accessible_modules[0] as ModuleAccess;
        expect(oneResult.email).toBe("admin8@email.ghostinspector.com");
    });

    it('expand - 3 step', async () => {
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user))
        let oneResult = await dal.findOneById(8, ["accessible_modules.module.child_modules"]);

        let access = oneResult.accessible_modules[0] as ModuleAccess;
        let mod = (access.module as any) as AdminModule;
        expect(mod.id).toBe(1);

        for (let index = 0; index < oneResult.accessible_modules.length; index++) {
            access = oneResult.accessible_modules[index] as ModuleAccess;
            mod = (access.module as any) as AdminModule;
            expect(mod).toBeDefined();
            expect(mod.id).toBeGreaterThanOrEqual(1);
            if (mod.id === 1 || mod.id === 9) {
                expect(mod.child_modules).toBeDefined();
                expect(mod.child_modules.length).toBeGreaterThanOrEqual(1);
            }
        }

    });
});
