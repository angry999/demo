import { MetricDataType, RelativeDateRange } from 'fundscraper-model-enums';
import { Injectable, Scope } from '@nestjs/common';
import { InvestorMetricsDal } from './InvestorMetricsDal.provider';
import { InvestmentOrderMetricsDal } from './InvestmentOrderMetricsDal.provider';
import { ProjectMetricsDal } from './ProjectMetricsDal.provider';
import { MetricsRequest } from '../model/MetricsRequest';
import { UserIdentification } from '../security/UserIdentification';

/**
 * data access for metrics
 */
@Injectable({ scope: Scope.TRANSIENT })
export class MetricsDal {
    constructor(private readonly investorMetricsDal: InvestorMetricsDal
        , private readonly orderMetricsDal: InvestmentOrderMetricsDal
        , private readonly projectMetricsDal: ProjectMetricsDal) {
    }

    public setUserForRequest(user: UserIdentification) {
        this.investorMetricsDal.setUserForRequest(user);
        this.orderMetricsDal.setUserForRequest(user);
        this.projectMetricsDal.setUserForRequest(user);
    }

    /**
     * get one metric
     * @param request the details of the metric to get. this includes data type and filters
     * @returns the structured results of the metric. one row per value with a ket and possibly a date
     */
    async findOneById(request: MetricsRequest): Promise<any> {
        if (request.signupDateRange != null) {
            let actual = RelativeDateRange.computeCurrentDates(request.signupDateRange);
            request.startingSignupDate = actual.start;
            request.endingSignupDate = actual.end;
        }

        if (request.orderPlacedDateRange != null) {
            let actual = RelativeDateRange.computeCurrentDates(request.orderPlacedDateRange);
            request.startingOrderOrderDate = actual.start;
            request.endingOrderOrderDate = actual.end;
        }

        if (request.orderPurchaseDateRange != null) {
            let actual = RelativeDateRange.computeCurrentDates(request.orderPurchaseDateRange);
            request.startingOrderPurchaseDate = actual.start;
            request.endingOrderPurchaseDate = actual.end;
        }

        switch (request.dataType) {
            case MetricDataType.investor_signups:
            case MetricDataType.investors_accreditation_level:
            case MetricDataType.investors_age_range:
            case MetricDataType.investors_asset_range:
            case MetricDataType.investors_cobranded:
            case MetricDataType.investors_income_range:
            case MetricDataType.investors_province:
            case MetricDataType.investors_experience:
            case MetricDataType.investors_capital_looking:
            case MetricDataType.investors_expected_time_horizon:
            case MetricDataType.investors_primary_objective:
            case MetricDataType.investors_signup_status:
            case MetricDataType.investors_type_of_investor:
            case MetricDataType.investors_real_estate_experience:
            case MetricDataType.investors_risk_tolerance:
            case MetricDataType.investors_value_current_investments:
            case MetricDataType.investors_past_investments:
            case MetricDataType.investors_average_investment_amount:
            case MetricDataType.investors_portfolio_investments:
            case MetricDataType.investors_risk_investment:
            case MetricDataType.investors_duration_investment:
            case MetricDataType.investors_annual_income:
            case MetricDataType.investors_keep_capital_safe:
            case MetricDataType.investors_risk_past_investment:
            case MetricDataType.investors_expected_rate:
                return this.investorMetricsDal.findOneById(request);

            case MetricDataType.capital_raised:
            case MetricDataType.orders_placed:
            case MetricDataType.orders_amount:
            case MetricDataType.orders_status:
            case MetricDataType.orders_investor_accreditation_level:
            case MetricDataType.orders_investor_age_range:
            case MetricDataType.orders_investor_asset_range:
            case MetricDataType.orders_investor_cobranded:
            case MetricDataType.orders_investor_income_range:
            case MetricDataType.orders_investor_province:
            case MetricDataType.orders_investor_signup_status:
                return this.orderMetricsDal.findOneById(request);

            case MetricDataType.project_count:
            case MetricDataType.projects_status:
            case MetricDataType.projects_dollars_raised:
                return this.projectMetricsDal.findOneById(request);
        }

        return null;
    }
}

