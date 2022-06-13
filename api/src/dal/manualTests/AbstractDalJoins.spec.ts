import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from './../DatabaseConnectionPool.provider';
import { AdminModuleDal } from './../AdminModule.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('AbstractDalJoins', () => {
    let dal: AdminModuleDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, AdminModuleDal],
            }).compile();

        dal = await app.resolve<AdminModuleDal>(AdminModuleDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('one 2 part collected identifier', async () => {
        try {
            let allResults = await dal.findAllByFilter(`child_modules.name = 'About'`);
            let oneResult = allResults[0];
            expect(oneResult.name).toBe("Web Pages");
        }
        catch (problem) {
            expect(1).toBe(0);
        }
    });

    it('one 2 part single identifier', async () => {
        try {
            let allResults = await dal.findAllByFilter('last_changed_by.first_name = "admin2" and sort_order = 34');
            let oneResult = allResults[0];
            expect(oneResult.name).toBe("Issuer Admin");
        }
        catch (problem) {
            expect(1).toBe(0);
        }
    });

    it('two 2 part single identifier', async () => {
        try {
            let allResults = await dal.findAllByFilter('last_changed_by.first_name = "admin2" and last_changed_by.last_name = "test2"');
            let oneResult = allResults[0];
            expect(oneResult.name).toBe("Issuer Admin");
        }
        catch (problem) {
            expect(1).toBe(0);
        }
    });

    it('one 3 part single identifier', async () => {
        try {
            let allResults = await dal.findAllByFilter(`child_modules.last_changed_by.first_name = 'admin2'`);
            let names = ['User Profiles', 'Orders', 'Reports', 'Web Pages'];
            let foundCount = 0;
            allResults.forEach(module => {
                if (names.includes(module.name))
                    foundCount++;
            });
            expect(foundCount).toBeGreaterThanOrEqual(2);
        }
        catch (problem) {
            expect(1).toBe(0);
        }
    });

    it('one 3 part single identifier and joined sort', async () => {
        try {
            let allResults = await dal.findAllByFilter(`last_changed_by.first_name = 'admin2' and sort_order = 34`, undefined, undefined, ['last_changed_by.first_name', 'last_changed_by.last_name']);
            let oneResult = allResults[0];
            expect(oneResult.name).toBe("Issuer Admin");
        }
        catch (problem) {
            expect(1).toBe(0);
        }
    });

    it('one 3 part single identifier and joined sort desc', async () => {
        try {
            let allResults = await dal.findAllByFilter(`last_changed_by.first_name = 'admin2' and sort_order = 34`, undefined, undefined, ['last_changed_by.last_name desc']);
            let oneResult = allResults[0];
            expect(oneResult.name).toBe("Issuer Admin");
        }
        catch (problem) {
            expect(1).toBe(0);
        }
    });
});
