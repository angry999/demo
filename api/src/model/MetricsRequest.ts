import { AgeRange, FinancialRange, IncomeRange, InvestmentOrderStatus, InvestorAccreditation, MetricDataType, RelativeDateRange, ProjectStage, UserState } from 'fundscraper-model-enums';

/**
 * a request for metrics
 */
export class MetricsRequest {
    dataType: MetricDataType;
    groupByDay: boolean;
    signupDateRange: RelativeDateRange;
    startingSignupDate: Date;
    endingSignupDate: Date;
    accreditationFilter: InvestorAccreditation[];
    ageRangeFilter: AgeRange[];
    assetRangeFilter: FinancialRange[];
    cobrandedFilter: boolean | undefined;
    incomeRangeFilter: IncomeRange[];
    provinceCodeFilter: string[];
    signupStatusFilter: UserState[];
    orderStatusFilter: InvestmentOrderStatus[];
    orderPlacedDateRange: RelativeDateRange;
    startingOrderOrderDate: Date;
    endingOrderOrderDate: Date;
    orderPurchaseDateRange: RelativeDateRange;
    startingOrderPurchaseDate: Date;
    endingOrderPurchaseDate: Date;
    projectStatusFilter: ProjectStage[];
}
