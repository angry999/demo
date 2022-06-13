import { Test, TestingModule } from '@nestjs/testing';
import { UserType } from 'fundscraper-model-enums';
import { AllUserDal } from '../dal/AllUser.provider';
import { DatabaseConnectionPool } from '../dal/DatabaseConnectionPool.provider';
import { InvestorDal } from '../dal/Investor.provider';
import { UserIdentification } from '../security/UserIdentification';
import { AllUserService } from './AllUser.service';

describe('AllUserService', () => {
    let service: AllUserService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, AllUserService, AllUserDal, InvestorDal],
            }).compile();

        service = await app.resolve<AllUserService>(AllUserService);
        service.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Set - get string', async () => {
        let prefName = 'pref1';
        let testValue = 'value1';
        await service.updatePreference(5, { name: prefName, value: testValue });
        let oneResult = await service.getPreference(5, prefName);
        expect(oneResult.value).toBe(testValue);
    });

    it('Set - get empty string', async () => {
        let prefName = 'pref12';
        let testValue = '';
        await service.updatePreference(5, { name: prefName, value: testValue });
        let oneResult = await service.getPreference(5, prefName);
        expect(oneResult.value).toBe(testValue);
    });

    it('Set - get json as string', async () => {
        let prefName = 'pref13';
        let testValue = 'v';
        await service.updatePreference(5, { name: prefName, value: testValue });
        let oneResult = await service.getPreference(5, prefName);
        expect(oneResult.value).toBe(testValue);
    });

    it('Set - get int number', async () => {
        let prefName = 'pref2';
        let testValue = JSON.stringify({ value: 37 });
        await service.updatePreference(5, { name: prefName, value: testValue });
        let oneResult = await service.getPreference(5, prefName);
        expect(oneResult.value).toBe(testValue);
    });

    it('Set - get float number', async () => {
        let prefName = 'pref3';
        let testValue = 37.57;
        await service.updatePreference(5, { name: prefName, value: testValue });
        let oneResult = await service.getPreference(5, prefName);
        expect(oneResult.value).toBe(testValue);
    });

    it('Set - get negative number', async () => {
        let prefName = 'pref4';
        let testValue = -37;
        await service.updatePreference(5, { name: prefName, value: testValue });
        let oneResult = await service.getPreference(5, prefName);
        expect(oneResult.value).toBe(testValue);
    });

    it('Set - get boolean', async () => {
        let prefName = 'pref5';
        let testValue = true;
        await service.updatePreference(5, { name: prefName, value: testValue });
        let oneResult = await service.getPreference(5, prefName);
        expect(oneResult.value).toBe(testValue);
    });

    it('Set - get undefined', async () => {
        let prefName = 'pref6';
        let testValue = undefined;
        await service.updatePreference(5, { name: prefName, value: testValue });
        let oneResult = await service.getPreference(5, prefName);
        expect(oneResult.value).toBe(testValue);
    });
});