import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { AgeRange, FinancialRange, IncomeRange, InvestmentOrderStatus, InvestorAccreditation, MetricDataType, ProjectStage, UserState, UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { InvestorMetricsDal } from './../InvestorMetricsDal.provider';
import { MetricsRequest } from '../../model/MetricsRequest';

describe('InvestorMetricsDal', () => {
    let dal: InvestorMetricsDal;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<InvestorMetricsDal>(InvestorMetricsDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    describe('investor_signups no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investor_signups with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investor_signups;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_age_range no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_age_range with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_age_range;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_signup_status no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_signup_status with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_signup_status;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_cobranded no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_cobranded with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_cobranded;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_accreditation_level no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_accreditation_level with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_accreditation_level;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_asset_range no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_asset_range with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_asset_range;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_income_range no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_income_range with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_income_range;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });


    ////////////////////////////////////////////////////////////////

    describe('investors_real_estate_experience no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_real_estate_experience with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_real_estate_experience;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_experience no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_experience with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_experience;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_past_investments no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_past_investments with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_past_investments;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_average_investment_amount no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });  

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_average_investment_amount with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });  

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_average_investment_amount;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_portfolio_investments no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_portfolio_investments with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_portfolio_investments;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_primary_objective no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_primary_objective with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_primary_objective;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_expected_rate no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_expected_rate with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_rate;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_capital_looking no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_capital_looking with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_capital_looking;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_expected_time_horizon no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_expected_time_horizon with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_expected_time_horizon;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_risk_investment no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_risk_investment with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_investment;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_risk_tolerance no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_risk_tolerance with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_tolerance;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_duration_investment no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_duration_investment with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_duration_investment;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_annual_income no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });  

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_annual_income with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });  

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_annual_income;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_type_of_investor no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_type_of_investor with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_type_of_investor;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_keep_capital_safe no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_keep_capital_safe with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_keep_capital_safe;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_risk_past_investment no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });  

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_risk_past_investment with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });  

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_risk_past_investment;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_value_current_investments no date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('investors_value_current_investments with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.employment_complete];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.investors_value_current_investments;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            request.provinceCodeFilter = ['BC', 'ON'];
            request.cobrandedFilter = false;
            request.startingSignupDate = new Date('2017-01-01');
            request.endingSignupDate = new Date();
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            request.endingOrderPurchaseDate = new Date();
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });
    });


});
