import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { AgeRange, FinancialRange, IncomeRange, InvestmentOrderStatus, InvestorAccreditation, MetricDataType, ProjectStage, UserState, UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { MetricsRequest } from '../../model/MetricsRequest';
import { ProjectMetricsDal } from './../ProjectMetricsDal.provider';

describe('ProjectMetricsDal', () => {
    let dal: ProjectMetricsDal;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<ProjectMetricsDal>(ProjectMetricsDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    describe('project_count without date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
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

    describe('project_count with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.project_count;
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

    describe('projects_status without date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
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

    describe('projects_status with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_status;
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

    describe('projects_dollars_raised without date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
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

    describe('projects_dollars_raised with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.projects_dollars_raised;
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
