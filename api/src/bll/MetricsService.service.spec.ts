import { Test, TestingModule } from '@nestjs/testing';
import { MetricDataType, UserType } from 'fundscraper-model-enums';
import { MetricsRequest } from '../model/MetricsRequest';
import { AllUserDal } from '../dal/AllUser.provider';
import { DatabaseConnectionPool } from '../dal/DatabaseConnectionPool.provider';
import { InvestorDal } from '../dal/Investor.provider';
import { UserIdentification } from '../security/UserIdentification';
import { AllUserService } from './AllUser.service';
import { MetricsService } from './Metrics.service';
import { InvestorMetricsDal } from '../dal/InvestorMetricsDal.provider';
import { MetricsDal } from '../dal/Metrics.provider';
import { InvestmentOrderMetricsDal } from '../dal/InvestmentOrderMetricsDal.provider';
import { ProjectMetricsDal } from '../dal/ProjectMetricsDal.provider';
import { InvestmentOrderDal } from '../dal/InvestmentOrder.provider';
import { ProjectDal } from '../dal/Project.provider';
import { AdminUserDal } from '../dal/AdminUser.provider';

describe('MetricsService', () => {
    let metricService: MetricsService;
    let allUserService: AllUserService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, AllUserService, AdminUserDal, AllUserDal, InvestorDal, InvestmentOrderDal, ProjectDal, MetricsService, MetricsDal, InvestorMetricsDal, InvestmentOrderMetricsDal, ProjectMetricsDal],
            }).compile();

        metricService = await app.resolve<MetricsService>(MetricsService);
        allUserService = await app.resolve<AllUserService>(AllUserService);
        metricService.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        allUserService.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Set preferance and get by preference', async () => {
        let prefName = 'pref-met-1';
        let testValue = new MetricsRequest();
        testValue.dataType = MetricDataType.investor_signups;
        await allUserService.updatePreference(2, { name: prefName, value: JSON.stringify(testValue) });
        let results = await metricService.findOneByPreference(prefName);
        expect(results.length).toBeGreaterThanOrEqual(1);
        let oneResult = results[0];
        expect(oneResult.label).toBe("investor count");
    });

    it('Set preferance and get by request', async () => {
        let prefName = 'pref-met-2';
        let testValue = new MetricsRequest();
        testValue.dataType = MetricDataType.investor_signups;
        let results = await metricService.findOneByPreferenceRequest(prefName, testValue);
        expect(results.values.length).toBeGreaterThanOrEqual(1);
        expect(results.request.dataType).toBe(testValue.dataType);
        let oneResult = results.values[0];
        expect(oneResult.label).toBe("investor count");

        let prefValue = await allUserService.getPreference(2, prefName);
        let prefAsObject = JSON.parse(prefValue.value);
        expect(testValue.dataType).toBe(prefAsObject.dataType);
    });

    it('Set preferance and get by request with null request', async () => {
        let prefName = 'pref-met-3';
        let testValue = new MetricsRequest();
        testValue.dataType = MetricDataType.investor_signups;
        await allUserService.updatePreference(2, { name: prefName, value: JSON.stringify(testValue) });

        let results = await metricService.findOneByPreferenceRequest(null, testValue);
        expect(results.values.length).toBeGreaterThanOrEqual(1);
        expect(results.request.dataType).toBe(testValue.dataType);
        let oneResult = results.values[0];
        expect(oneResult.label).toBe("investor count");

        let prefValue = await allUserService.getPreference(2, prefName);
        let prefAsObject = JSON.parse(prefValue.value);
        expect(testValue.dataType).toBe(prefAsObject.dataType);
    });
});