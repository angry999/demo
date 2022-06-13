import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { AgeRange, FinancialRange, IncomeRange, InvestmentOrderStatus, InvestorAccreditation, MetricDataType, ProjectStage, UserState, UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { MetricsRequest } from '../../model/MetricsRequest';
import { InvestmentOrderMetricsDal } from '../InvestmentOrderMetricsDal.provider';

describe('InvestmentOrderMetricsDal', () => {
    let dal: InvestmentOrderMetricsDal;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<InvestmentOrderMetricsDal>(InvestmentOrderMetricsDal);
        dal.setUserForRequest(new UserIdentification(936, UserType.issuer_admin));
    });


    describe('capital_raised without date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
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

    describe('capital_raised with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.capital_raised;
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

    describe('orders_placed without date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
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

    describe('orders_placed with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_placed;
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

    describe('orders_amount without date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
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

    describe('orders_amount with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_amount;
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

    describe('orders_status without date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
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

    describe('orders_status with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_status;
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

    describe('orders_investor_age_range without date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
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

    describe('orders_investor_age_range with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_age_range;
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

    describe('orders_investor_signup_status without date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
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

    describe('orders_investor_signup_status with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_signup_status;
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

    describe('orders_investor_cobranded without date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
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

    describe('orders_investor_cobranded with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_cobranded;
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

    describe('orders_investor_accreditation_level without date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
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

    describe('orders_investor_accreditation_level with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_accreditation_level;
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

    describe('orders_investor_asset_range without date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
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
    describe('orders_investor_asset_range with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_asset_range;
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

    describe('orders_investor_income_range without date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
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

    describe('orders_investor_income_range with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });


        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_income_range;
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

    describe('orders_investor_province without date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
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

    describe('orders_investor_province with date', () => {
        it('raw', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('accreditationFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.accreditationFilter = [InvestorAccreditation.accreditedSection, InvestorAccreditation.ineligibleSection];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.over_65];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('ageRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.ageRangeFilter = [AgeRange.between_35_44, AgeRange.between_45_54];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('assetRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('assetRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.assetRangeFilter = [FinancialRange.between_1000000_1500000, FinancialRange.between_1500000_2000000];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.under50];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('incomeRangeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.incomeRangeFilter = [IncomeRange.between_75_99, IncomeRange.between_125_149];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('signupStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.signupStatusFilter = [UserState.address_set, UserState.active];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.provinceCodeFilter = ['ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('provinceCodeFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.provinceCodeFilter = ['BC', 'ON'];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter true', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.cobrandedFilter = true;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('cobrandedFilter false', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.cobrandedFilter = false;
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.startingSignupDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('endingSignupDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.endingSignupDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('orderStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.orderStatusFilter = [InvestmentOrderStatus.order_placed, InvestmentOrderStatus.purchased];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('startingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.startingOrderPurchaseDate = new Date('2017-01-01');
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('endingOrderPurchaseDate', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.endingOrderPurchaseDate = new Date();
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 1', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(0);
        });

        it('projectStatusFilter 2', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
            request.groupByDay = true;
            request.projectStatusFilter = [ProjectStage.completed, ProjectStage.raising];
            let workingResults = await dal.findOneById(request);
            expect(workingResults.length).toBeGreaterThanOrEqual(1);
        });

        it('all filters', async () => {
            let request = new MetricsRequest();
            request.dataType = MetricDataType.orders_investor_province;
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
