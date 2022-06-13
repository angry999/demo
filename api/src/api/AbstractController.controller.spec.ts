import { Test, TestingModule } from '@nestjs/testing';
import { AdminModuleApi } from './AdminModule.controller';
import { AdminModuleService } from '../bll/AdminModule.service';
import { DatabaseConnectionPool } from '../dal/DatabaseConnectionPool.provider';
import { AdminModuleDal } from '../dal/AdminModule.provider';

describe('AbstractController', () => {
    let controller: AdminModuleApi;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                controllers: [AdminModuleApi],
                providers: [...DatabaseConnectionPool, AdminModuleService, AdminModuleDal],
            }).compile();

        controller = app.get<AdminModuleApi>(AdminModuleApi);
    });

    it('Predicate substitution single simple', async () => {
        let results = await controller.translateFilter('five eq 6');
        expect(results).toBe('five=6');
    });

    it('Predicate substitution double simple', async () => {
        let results = await controller.translateFilter('five eq 6 and 7 eq 4');
        expect(results).toBe('five=6 and 7=4');
    });

    it('Predicate substitution single embedded', async () => {
        let results = await controller.translateFilter('woweq eq 6 and 7 eq 4');
        expect(results).toBe('woweq=6 and 7=4');
    });

    it('Predicate substitution leading', async () => {
        let results = await controller.translateFilter('eq eq 6 and 7 eq 4');
        expect(results).toBe('eq=6 and 7=4');
    });

    it('Predicate substitution trailing', async () => {
        let results = await controller.translateFilter('wow eq 6 and 7 eq eq');
        expect(results).toBe('wow=6 and 7=eq');
    });
});

