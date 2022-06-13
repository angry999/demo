import { MetricDataType, UserState, UserState_friendlyText, IncomeRange, IncomeRange_lower, IncomeRange_higher, IncomeRange_friendlyText, FinancialRange, FinancialRange_friendlyText, FinancialRange_lower, FinancialRange_higher, AgeRange, AgeRange_friendlyText, AgeRange_higher, AgeRange_lower, InvestorAccreditation, InvestorAccreditation_friendlyText, UserType } from 'fundscraper-model-enums';
import { Injectable, Logger, Scope } from '@nestjs/common';
import { InvestorDal } from './Investor.provider';
import { MetricsRequest } from '../model/MetricsRequest';
import { InvestmentOrderMetricsDal } from './InvestmentOrderMetricsDal.provider';
import { ProjectMetricsDal } from './ProjectMetricsDal.provider';
import { UserIdentification } from '../security/UserIdentification';
import { ProvinceCode, Province_friendlyText, InvestorQuestionType } from 'fundscraper-model-enums';
import { InvestorQueryMutator } from './mutators/IssuerAdmin/InvestorQueryMutator';

/**
 * data access for metrics about investors
 * filters: date, accrediation, status, cobranded, age, assets, income, province
 */
@Injectable({ scope: Scope.TRANSIENT })
export class InvestorMetricsDal {
    private readonly logger = new Logger(InvestorMetricsDal.name);
    private userIdentification: UserIdentification;
    private static investorMutator = new InvestorQueryMutator();
    constructor(private readonly investorDal: InvestorDal) {

    }

    public setUserForRequest(user: UserIdentification) {
        this.userIdentification = user;
        this.investorDal.setUserForRequest(user);
    }

    async findOneById(request: MetricsRequest): Promise<any> {
        switch (request.dataType) {
            case MetricDataType.investor_signups:
                return this.investor_signups(request);
            case MetricDataType.investors_accreditation_level:
                return this.investors_accreditation_level(request);
            case MetricDataType.investors_age_range:
                return this.investors_age_range(request);
            case MetricDataType.investors_asset_range:
                return this.investors_asset_range(request);
            case MetricDataType.investors_cobranded:
                return this.investors_cobranded(request);
            case MetricDataType.investors_income_range:
                return this.investors_income_range(request);
            case MetricDataType.investors_province:
                return this.investors_province(request);
            case MetricDataType.investors_experience:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_experience);
            case MetricDataType.investors_capital_looking:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_capital_looking);
            case MetricDataType.investors_expected_time_horizon:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_expected_time_horizon);
            case MetricDataType.investors_primary_objective:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_primary_objective);
            case MetricDataType.investors_type_of_investor:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_type_of_investor);
            case MetricDataType.investors_real_estate_experience:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_real_estate_experience);
            case MetricDataType.investors_risk_tolerance:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_risk_tolerance);
            case MetricDataType.investors_value_current_investments:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_value_current_investments);

            case MetricDataType.investors_past_investments:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_past_investments);
            case MetricDataType.investors_average_investment_amount:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_average_investment_amount);
            case MetricDataType.investors_portfolio_investments:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_portfolio_investments);
            case MetricDataType.investors_risk_investment:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_risk_investment);
            case MetricDataType.investors_duration_investment:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_duration_investment);
            case MetricDataType.investors_annual_income:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_annual_income);
            case MetricDataType.investors_keep_capital_safe:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_keep_capital_safe);
            case MetricDataType.investors_risk_past_investment:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_risk_past_investment);

            case MetricDataType.investors_expected_rate:
                return this.investors_generate_chart(request, InvestorQuestionType.investors_expected_rate);
            case MetricDataType.investors_signup_status:
                return this.investors_signup_status(request);
        }

        return null;
    }

    public static assetFilter(range: FinancialRange): string {
        if (range == FinancialRange.under100000)
            return `emp.assets_net_new < ${FinancialRange_higher[range]}`;
        if (range == FinancialRange.over5000000)
            return `emp.assets_net_new >= ${FinancialRange_lower[range]}`;
        return `(emp.assets_net_new >= ${FinancialRange_lower[range]} and emp.assets_net_new <= ${FinancialRange_higher[range]})`;
    }

    public static incomeFilter(range: IncomeRange): string {
        if (range == IncomeRange.under50)
            return `emp.income_curr_new < ${IncomeRange_higher[range]}`;
        if (range == IncomeRange.over400)
            return `emp.income_curr_new >= ${IncomeRange_lower[range]}`;
        return `(emp.income_curr_new >= ${IncomeRange_lower[range]} and emp.income_curr_new <= ${IncomeRange_higher[range]})`;
    }

    /**
     * from a given metrics request, get the specified filter in users_employment. this is preceeded with an "and"
     * @param request the metrics request to ge the filter for
     * @returns the sql where fragment applied to "emp"
     */
    public static getEmploymentFilter(request: MetricsRequest): string {
        let filter = '';
        // assetRangeFilter: FinancialRange[];
        if (request.assetRangeFilter != null) {
            let local = '';
            request.assetRangeFilter.forEach(item => {
                if (local != '')
                    local += ' or ';
                local += `${this.assetFilter(item)}`;
            });
            if (filter != '')
                filter += ' ';
            filter += `and (${local})`;
        }

        // incomeRangeFilter: IncomeRange[];
        if (request.incomeRangeFilter != null) {
            let local = '';
            request.incomeRangeFilter.forEach(item => {
                if (local != '')
                    local += ' or ';
                local += `${this.incomeFilter(item)}`;
            });
            if (filter != '')
                filter += ' ';
            filter += `and (${local})`;
        }

        return filter;
    }

    public static accreditationFilter(item: InvestorAccreditation): string {
        return `inv.investor_type_system = ${item}`;
    }

    public static ageRangeFilter(range: AgeRange): string {
        if (range == AgeRange.under35)
            return `datediff(year,inv.dob,getdate()) < ${AgeRange_higher[range]}`;
        if (range == AgeRange.over_65)
            return `datediff(year,inv.dob,getdate()) >= ${AgeRange_lower[range]}`;
        return `(datediff(year,inv.dob,getdate()) >= ${AgeRange_lower[range]} and datediff(year,inv.dob,getdate()) <= ${AgeRange_higher[range]})`;
    }

    public static signupStatsFilter(item: UserState): string {
        return `inv.status = ${item}`;
    }

    /**
     * from a given metrics request, get the specified filter in investors. this is preceeded with an "and"
     * @param request the metrics request to ge the filter for
     * @param user the user the request is for
     * @returns the sql where fragment applied to "inv"
     */
    public static getInvestorFilter(request: MetricsRequest, user: UserIdentification): string {
        let filter = '';

        // access control
        if (user.user_type == UserType.issuer_admin) {
            let ast = this.investorMutator.adjustFor(null, 'fs4', 'investors', 'inv', user);
            let additionalWhere = this.investorMutator.stringfyExpressionAst(ast);
            filter = ' and ' + additionalWhere;
        }

        // accreditationFilter: InvestorAccreditation[];
        if (request.accreditationFilter != null) {
            let local = '';
            request.accreditationFilter.forEach(item => {
                if (local != '')
                    local += ' or ';
                local += `${this.accreditationFilter(item)}`;
            });
            if (filter != '')
                filter += ' ';
            filter += `and (${local})`;
        }

        // ageRangeFilter: AgeRange[];
        if (request.ageRangeFilter != null) {
            let local = '';
            request.ageRangeFilter.forEach(item => {
                if (local != '')
                    local += ' or ';
                local += `${this.ageRangeFilter(item)}`;
            });
            if (filter != '')
                filter += ' ';
            filter += `and (${local})`;
        }

        // signupStatsFilter: UserState[];
        if (request.signupStatusFilter != null) {
            let local = '';
            request.signupStatusFilter.forEach(item => {
                if (local != '')
                    local += ' or ';
                local += `${this.signupStatsFilter(item)}`;
            });
            if (filter != '')
                filter += ' ';
            filter += `and (${local})`;
        }

        // cobrandedFilter: boolean | undefined;
        if (request.cobrandedFilter != null) {
            if (filter != '')
                filter += ' ';
            filter += (request.cobrandedFilter == true) ? `and inv.cobranded_client_of_id is not null` : `and inv.cobranded_client_of_id is null`;
        }

        // startingSignupDate: Date;
        if (request.startingSignupDate != null) {
            if (filter != '')
                filter += ' ';
            let startingDate = (typeof request.startingSignupDate === 'string') ? (new Date(request.startingSignupDate)).toISOString() : request.startingSignupDate.toISOString();
            filter += `and inv.signup_date >= '${startingDate}'`;
        }

        // endingSignupDate: Date;
        if (request.endingSignupDate != null) {
            if (filter != '')
                filter += ' ';
            let endingDate = (typeof request.endingSignupDate === 'string') ? (new Date(request.endingSignupDate)).toISOString() : request.endingSignupDate.toISOString();
            filter += `and inv.signup_date <= '${endingDate}'`;
        }

        return filter;
    }

    /**
     * from a given metrics request, get the specified filter in province. this is preceeded with an "and"
     * @param request the metrics request to ge the filter for
     * @returns the sql where fragment applied to "prov"
     */
    public static getProvinceFilter(request: MetricsRequest): string {
        let filter = '';

        // provinceCodeFilter: string[];
        if (request.provinceCodeFilter != null) {
            let local = '';
            request.provinceCodeFilter.forEach(item => {
                if (local != '')
                    local += ' or ';
                local += `prov.code = '${item}'`;
            });
            if (filter != '')
                filter += ' ';
            filter += `and (${local})`;
        }

        return filter;
    }

    async investor_signups(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateBase = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, inv.signup_date), 0)' : '';
        let dateGroup = request.groupByDay ? 'group by DATEADD(dd, DATEDIFF(dd, 0, inv.signup_date), 0)' : '';
        let dateResult = request.groupByDay ? `, ${dateBase} as date` : '';
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projExists = (projFilter == '') ? '' : `and exists (select 1 from fs4.projects as proj where proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter})`;
        let orderExists = (ordFilter == '' && projFilter == '') ? '' : `and exists (select 1 from fs4.investment_orders as ord where ord.is_deleted = 0 and ord.user_id = inv.id ${ordFilter} ${projExists})`;

        let empJoin = (empFilter == '') ? '' : `inner join fs4.users_employment as emp on emp.user_id = inv.id ${empFilter}`;

        let sql = `select 'investor count' as label${dateResult}, count(*) as value 
            from fs4.investors as inv ${empJoin} ${provJoin}
            where inv.is_deleted = 0 ${invFilter} ${orderExists}
            ${dateGroup}`;
        this.logger.debug(sql);
        return this.investorDal.queryRaw(sql);
    }

    async investors_accreditation_level(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, inv.signup_date), 0)' : '';
        let groupBy = request.groupByDay ? dateValue : 'investor_type_system';
        let dateResult = request.groupByDay ? `, ${dateValue} as date` : '';
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projExists = (projFilter == '') ? '' : `and exists (select 1 from fs4.projects as proj where proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter})`;
        let orderExists = (ordFilter == '' && projFilter == '') ? '' : `and exists (select 1 from fs4.investment_orders as ord where ord.is_deleted = 0 and ord.user_id = inv.id ${ordFilter} ${projExists})`;

        let empJoin = (empFilter == '') ? '' : `inner join fs4.users_employment as emp on emp.user_id = inv.id ${empFilter}`;
        let valuesColumns = request.groupByDay ? `
            sum(case when ${InvestorMetricsDal.accreditationFilter(InvestorAccreditation.permittedSection)} then 1 else 0 end) as '${InvestorAccreditation_friendlyText[InvestorAccreditation.permittedSection]}'
            , sum(case when ${InvestorMetricsDal.accreditationFilter(InvestorAccreditation.accreditedSection)} then 1 else 0 end) as '${InvestorAccreditation_friendlyText[InvestorAccreditation.accreditedSection]}'
            , sum(case when ${InvestorMetricsDal.accreditationFilter(InvestorAccreditation.eligibleSection)} then 1 else 0 end) as '${InvestorAccreditation_friendlyText[InvestorAccreditation.eligibleSection]}'
            , sum(case when ${InvestorMetricsDal.accreditationFilter(InvestorAccreditation.ineligibleSection)} then 1 else 0 end) as '${InvestorAccreditation_friendlyText[InvestorAccreditation.ineligibleSection]}'
            , sum(case when ${InvestorMetricsDal.accreditationFilter(InvestorAccreditation.ffbaSection)} then 1 else 0 end) as '${InvestorAccreditation_friendlyText[InvestorAccreditation.ffbaSection]}'
            , sum(case when inv.investor_type_system not in(${InvestorAccreditation.permittedSection},${InvestorAccreditation.accreditedSection},${InvestorAccreditation.eligibleSection},${InvestorAccreditation.ineligibleSection},${InvestorAccreditation.ffbaSection}) then 1 else 0 end) as 'Unknown'
        `
            : `case
                when ${InvestorMetricsDal.accreditationFilter(InvestorAccreditation.permittedSection)} then '${InvestorAccreditation_friendlyText[InvestorAccreditation.permittedSection]}'
                when ${InvestorMetricsDal.accreditationFilter(InvestorAccreditation.accreditedSection)} then '${InvestorAccreditation_friendlyText[InvestorAccreditation.accreditedSection]}'
                when ${InvestorMetricsDal.accreditationFilter(InvestorAccreditation.eligibleSection)} then '${InvestorAccreditation_friendlyText[InvestorAccreditation.eligibleSection]}'
                when ${InvestorMetricsDal.accreditationFilter(InvestorAccreditation.ineligibleSection)} then '${InvestorAccreditation_friendlyText[InvestorAccreditation.ineligibleSection]}'
                when ${InvestorMetricsDal.accreditationFilter(InvestorAccreditation.ffbaSection)} then '${InvestorAccreditation_friendlyText[InvestorAccreditation.ffbaSection]}'
            else 'Unknown'
            end as label`
            ;
        let sql = `select ${valuesColumns}, count(*) as value${dateResult}
            from fs4.investors as inv ${empJoin} ${provJoin}
            where inv.is_deleted = 0 ${invFilter} ${orderExists}
            group by ${groupBy}`;
        this.logger.debug(sql);
        return this.investorDal.queryRaw(sql);
    }

    async investors_age_range(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, inv.signup_date), 0)' : '';
        let groupBy = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, inv.signup_date), 0)' : `case
                when ${InvestorMetricsDal.ageRangeFilter(AgeRange.under35)} then '${AgeRange_friendlyText[AgeRange.under35]}'
                when ${InvestorMetricsDal.ageRangeFilter(AgeRange.between_35_44)} then '${AgeRange_friendlyText[AgeRange.between_35_44]}'
                when ${InvestorMetricsDal.ageRangeFilter(AgeRange.between_45_54)} then '${AgeRange_friendlyText[AgeRange.between_45_54]}'
                when ${InvestorMetricsDal.ageRangeFilter(AgeRange.between_55_64)} then '${AgeRange_friendlyText[AgeRange.between_55_64]}'
                when ${InvestorMetricsDal.ageRangeFilter(AgeRange.over_65)} then '${AgeRange_friendlyText[AgeRange.over_65]}'
                else 'Unknown'
            end `;
        let dateResult = request.groupByDay ? `, ${dateValue} as date` : '';
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projExists = (projFilter == '') ? '' : `and exists (select 1 from fs4.projects as proj where proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter})`;
        let orderExists = (ordFilter == '' && projFilter == '') ? '' : `and exists (select 1 from fs4.investment_orders as ord where ord.is_deleted = 0 and ord.user_id = inv.id ${ordFilter} ${projExists})`;

        let valuesColumns = request.groupByDay ? `
            sum(case when ${InvestorMetricsDal.ageRangeFilter(AgeRange.under35)} then 1 else 0 end) as '${AgeRange_friendlyText[AgeRange.under35]}'
            , sum(case when ${InvestorMetricsDal.ageRangeFilter(AgeRange.between_35_44)} then 1 else 0 end) as '${AgeRange_friendlyText[AgeRange.between_35_44]}'
            , sum(case when ${InvestorMetricsDal.ageRangeFilter(AgeRange.between_45_54)} then 1 else 0 end) as '${AgeRange_friendlyText[AgeRange.between_45_54]}'
            , sum(case when ${InvestorMetricsDal.ageRangeFilter(AgeRange.between_55_64)} then 1 else 0 end) as '${AgeRange_friendlyText[AgeRange.between_55_64]}'
            , sum(case when ${InvestorMetricsDal.ageRangeFilter(AgeRange.over_65)} then 1 else 0 end) as '${AgeRange_friendlyText[AgeRange.over_65]}'
            , sum(case when inv.signup_date is null then 1 else 0 end) as 'Unknown'`
            : ` ${groupBy} as label`
            ;

        let sql = `select ${valuesColumns}, count(*) as value${dateResult}
            from fs4.investors as inv 
                inner join fs4.users_employment as emp on emp.is_deleted = 0 and inv.id = emp.user_id ${empFilter} ${provJoin}
            where inv.is_deleted = 0 ${invFilter} ${orderExists}
            group by ${groupBy}
            order by 
                max(inv.dob) desc`;
        this.logger.debug(sql);
        return this.investorDal.queryRaw(sql);
    }

    async investors_asset_range(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, inv.signup_date), 0)' : '';
        let dateResult = request.groupByDay ? `, ${dateValue} as date` : '';
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projExists = (projFilter == '') ? '' : `and exists (select 1 from fs4.projects as proj where proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter})`;
        let orderExists = (ordFilter == '' && projFilter == '') ? '' : `and exists (select 1 from fs4.investment_orders as ord where ord.is_deleted = 0 and ord.user_id = inv.id ${ordFilter} ${projExists})`;
        let groupBy = request.groupByDay ? dateValue : `
                case
                when ${InvestorMetricsDal.assetFilter(FinancialRange.under100000)} then '${FinancialRange_friendlyText[FinancialRange.under100000]}'
                when ${InvestorMetricsDal.assetFilter(FinancialRange.between_100000_200000)} then '${FinancialRange_friendlyText[FinancialRange.between_100000_200000]}'
                when ${InvestorMetricsDal.assetFilter(FinancialRange.between_200000_300000)} then '${FinancialRange_friendlyText[FinancialRange.between_200000_300000]}'
                when ${InvestorMetricsDal.assetFilter(FinancialRange.between_300000_400000)} then '${FinancialRange_friendlyText[FinancialRange.between_300000_400000]}'
                when ${InvestorMetricsDal.assetFilter(FinancialRange.between_400000_500000)} then '${FinancialRange_friendlyText[FinancialRange.between_400000_500000]}'
                when ${InvestorMetricsDal.assetFilter(FinancialRange.between_500000_750000)} then '${FinancialRange_friendlyText[FinancialRange.between_500000_750000]}'
                when ${InvestorMetricsDal.assetFilter(FinancialRange.between_750000_1000000)} then '${FinancialRange_friendlyText[FinancialRange.between_750000_1000000]}'
                when ${InvestorMetricsDal.assetFilter(FinancialRange.between_1000000_1500000)} then '${FinancialRange_friendlyText[FinancialRange.between_1000000_1500000]}'
                when ${InvestorMetricsDal.assetFilter(FinancialRange.between_1500000_2000000)} then '${FinancialRange_friendlyText[FinancialRange.between_1500000_2000000]}'
                when ${InvestorMetricsDal.assetFilter(FinancialRange.between_2000000_3000000)} then '${FinancialRange_friendlyText[FinancialRange.between_2000000_3000000]}'
                when ${InvestorMetricsDal.assetFilter(FinancialRange.between_3000000_4000000)} then '${FinancialRange_friendlyText[FinancialRange.between_3000000_4000000]}'
                when ${InvestorMetricsDal.assetFilter(FinancialRange.between_4000000_5000000)} then '${FinancialRange_friendlyText[FinancialRange.between_4000000_5000000]}'
                when ${InvestorMetricsDal.assetFilter(FinancialRange.over5000000)} then '${FinancialRange_friendlyText[FinancialRange.over5000000]}'
                else 'Unknown'
                end`;

        let valuesColumns = request.groupByDay ? `
            sum(case when ${InvestorMetricsDal.assetFilter(FinancialRange.under100000)} then 1 else 0 end) as '${FinancialRange_friendlyText[FinancialRange.under100000]}'
            , sum(case when ${InvestorMetricsDal.assetFilter(FinancialRange.between_100000_200000)} then 1 else 0 end) as '${FinancialRange_friendlyText[FinancialRange.between_100000_200000]}'
            , sum(case when ${InvestorMetricsDal.assetFilter(FinancialRange.between_200000_300000)} then 1 else 0 end) as '${FinancialRange_friendlyText[FinancialRange.between_200000_300000]}'
            , sum(case when ${InvestorMetricsDal.assetFilter(FinancialRange.between_300000_400000)} then 1 else 0 end) as '${FinancialRange_friendlyText[FinancialRange.between_300000_400000]}'
            , sum(case when ${InvestorMetricsDal.assetFilter(FinancialRange.between_400000_500000)} then 1 else 0 end) as '${FinancialRange_friendlyText[FinancialRange.between_400000_500000]}'
            , sum(case when ${InvestorMetricsDal.assetFilter(FinancialRange.between_500000_750000)} then 1 else 0 end) as '${FinancialRange_friendlyText[FinancialRange.between_500000_750000]}'
            , sum(case when ${InvestorMetricsDal.assetFilter(FinancialRange.between_750000_1000000)} then 1 else 0 end) as '${FinancialRange_friendlyText[FinancialRange.between_750000_1000000]}'
            , sum(case when ${InvestorMetricsDal.assetFilter(FinancialRange.between_1000000_1500000)} then 1 else 0 end) as '${FinancialRange_friendlyText[FinancialRange.between_1000000_1500000]}'
            , sum(case when ${InvestorMetricsDal.assetFilter(FinancialRange.between_1500000_2000000)} then 1 else 0 end) as '${FinancialRange_friendlyText[FinancialRange.between_1500000_2000000]}'
            , sum(case when ${InvestorMetricsDal.assetFilter(FinancialRange.between_2000000_3000000)} then 1 else 0 end) as '${FinancialRange_friendlyText[FinancialRange.between_2000000_3000000]}'
            , sum(case when ${InvestorMetricsDal.assetFilter(FinancialRange.between_3000000_4000000)} then 1 else 0 end) as '${FinancialRange_friendlyText[FinancialRange.between_3000000_4000000]}'
            , sum(case when ${InvestorMetricsDal.assetFilter(FinancialRange.between_4000000_5000000)} then 1 else 0 end) as '${FinancialRange_friendlyText[FinancialRange.between_4000000_5000000]}'
            , sum(case when ${InvestorMetricsDal.assetFilter(FinancialRange.over5000000)} then 1 else 0 end) as '${FinancialRange_friendlyText[FinancialRange.over5000000]}'
            , sum(case when emp.assets_net_new is null then 1 else 0 end) as 'Unknown'`
            : `${groupBy} as label`
            ;
        // by date we need 1 column per enum value named as the enum value
        let sql = `select ${valuesColumns}, count(*) as value${dateResult}
            from fs4.investors as inv 
                inner join fs4.users_employment as emp on emp.is_deleted = 0 and inv.id = emp.user_id ${empFilter} ${provJoin}
            where inv.is_deleted = 0 ${invFilter} ${orderExists}
            group by ${groupBy}
            order by 
                max(emp.assets_net_new)`;
        this.logger.debug(sql);
        return this.investorDal.queryRaw(sql);
    }

    async investors_cobranded(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateValue = request.groupByDay ? ' DATEADD(dd, DATEDIFF(dd, 0, inv.signup_date), 0)' : '';
        let groupByDay = request.groupByDay ? dateValue : `case when cobranded_client_of_id is null then 'false' else 'true' end`;
        let dateResult = request.groupByDay ? `, ${dateValue} as date` : '';
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let empJoin = (empFilter == '') ? '' : `inner join fs4.users_employment as emp on emp.is_deleted = 0 and emp.user_id = inv.id ${empFilter}`;
        let projExists = (projFilter == '') ? '' : `and exists (select 1 from fs4.projects as proj where proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter})`;
        let orderExists = (ordFilter == '' && projFilter == '') ? '' : `and exists (select 1 from fs4.investment_orders as ord where ord.is_deleted = 0 and ord.user_id = inv.id ${ordFilter} ${projExists})`;
        let columnValues = request.groupByDay ? `
            sum(case when cobranded_client_of_id is null then 1 else 0 end) as 'false'
            , sum(case when cobranded_client_of_id is not null then 1 else 0 end) as 'true'
            `
            : `case when cobranded_client_of_id is null then 'false' else 'true' end as label`;
        let sql = `select ${columnValues}, count(*) as value${dateResult}
            from fs4.investors as inv ${empJoin} ${provJoin}
            where inv.is_deleted = 0 ${invFilter} ${orderExists}
            group by ${groupByDay}`;
        this.logger.debug(sql);
        return this.investorDal.queryRaw(sql);
    }

    async investors_income_range(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projExists = (projFilter == '') ? '' : `and exists (select 1 from fs4.projects as proj where proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter})`;
        let orderExists = (ordFilter == '' && projFilter == '') ? '' : `and exists (select 1 from fs4.investment_orders as ord where ord.is_deleted = 0 and ord.user_id = inv.id ${ordFilter} ${projExists})`;

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, inv.signup_date), 0)' : '';
        let groupBy = request.groupByDay ? dateValue : `
            case
                when ${InvestorMetricsDal.incomeFilter(IncomeRange.under50)} then '${IncomeRange_friendlyText[IncomeRange.under50]}'
                when ${InvestorMetricsDal.incomeFilter(IncomeRange.between_50_74)} then '${IncomeRange_friendlyText[IncomeRange.between_50_74]}'
                when ${InvestorMetricsDal.incomeFilter(IncomeRange.between_75_99)} then '${IncomeRange_friendlyText[IncomeRange.between_75_99]}'
                when ${InvestorMetricsDal.incomeFilter(IncomeRange.between_100_124)} then '${IncomeRange_friendlyText[IncomeRange.between_100_124]}'
                when ${InvestorMetricsDal.incomeFilter(IncomeRange.between_125_149)} then '${IncomeRange_friendlyText[IncomeRange.between_125_149]}'
                when ${InvestorMetricsDal.incomeFilter(IncomeRange.between_150_199)} then '${IncomeRange_friendlyText[IncomeRange.between_150_199]}'
                when ${InvestorMetricsDal.incomeFilter(IncomeRange.between_200_299)} then '${IncomeRange_friendlyText[IncomeRange.between_200_299]}'
                when ${InvestorMetricsDal.incomeFilter(IncomeRange.between_300_399)} then '${IncomeRange_friendlyText[IncomeRange.between_300_399]}'
                when ${InvestorMetricsDal.incomeFilter(IncomeRange.over400)} then '${IncomeRange_friendlyText[IncomeRange.over400]}'
                else 'Unknown'
            end`;
        let dateResult = request.groupByDay ? `, ${dateValue} as date` : '';
        let columnValues = request.groupByDay ? `                
            sum(case when ${InvestorMetricsDal.incomeFilter(IncomeRange.under50)} then 1 else 0 end) as '${IncomeRange_friendlyText[IncomeRange.under50]}'
            , sum(case when ${InvestorMetricsDal.incomeFilter(IncomeRange.between_50_74)} then 1 else 0 end) as '${IncomeRange_friendlyText[IncomeRange.between_50_74]}'
            , sum(case when ${InvestorMetricsDal.incomeFilter(IncomeRange.between_75_99)} then 1 else 0 end) as '${IncomeRange_friendlyText[IncomeRange.between_75_99]}'
            , sum(case when ${InvestorMetricsDal.incomeFilter(IncomeRange.between_100_124)} then 1 else 0 end) as '${IncomeRange_friendlyText[IncomeRange.between_100_124]}'
            , sum(case when ${InvestorMetricsDal.incomeFilter(IncomeRange.between_125_149)} then 1 else 0 end) as '${IncomeRange_friendlyText[IncomeRange.between_125_149]}'
            , sum(case when ${InvestorMetricsDal.incomeFilter(IncomeRange.between_150_199)} then 1 else 0 end) as '${IncomeRange_friendlyText[IncomeRange.between_150_199]}'
            , sum(case when ${InvestorMetricsDal.incomeFilter(IncomeRange.between_200_299)} then 1 else 0 end) as '${IncomeRange_friendlyText[IncomeRange.between_200_299]}'
            , sum(case when ${InvestorMetricsDal.incomeFilter(IncomeRange.between_300_399)} then 1 else 0 end) as '${IncomeRange_friendlyText[IncomeRange.between_300_399]}'
            , sum(case when ${InvestorMetricsDal.incomeFilter(IncomeRange.over400)} then 1 else 0 end) as '${IncomeRange_friendlyText[IncomeRange.over400]}'
            , sum(case when emp.income_curr_new is null then 1 else 0 end) as 'Unknown'
            ` : `${groupBy} as label`;

        let sql = `select ${columnValues}, count(*) as value${dateResult}
            from fs4.investors as inv 
                inner join fs4.users_employment as emp on emp.is_deleted = 0 and inv.id = emp.user_id ${empFilter} ${provJoin}
            where inv.is_deleted = 0 ${invFilter} ${orderExists}
            group by ${groupBy}
            order by 
                max(emp.income_curr_new)`;
        this.logger.debug(sql);

        let query_results = await this.investorDal.queryRaw(sql);
        return query_results;
    }

    async investors_province(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, inv.signup_date), 0)' : '';
        let groupBy = request.groupByDay ? dateValue : 'prov.name';
        let dateResult = request.groupByDay ? `, ${dateValue} as date` : '';
        let empJoin = (empFilter == '') ? '' : `inner join fs4.users_employment as emp on emp.is_deleted = 0 and emp.user_id = inv.id ${empFilter}`;
        let projExists = (projFilter == '') ? '' : `and exists (select 1 from fs4.projects as proj where proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter})`;
        let orderExists = (ordFilter == '' && projFilter == '') ? '' : `and exists (select 1 from fs4.investment_orders as ord where ord.is_deleted = 0 and ord.user_id = inv.id ${ordFilter} ${projExists})`;
        let valueColumns = request.groupByDay ? `
            sum(case when prov.code = '${ProvinceCode[ProvinceCode.QC]}' then 1 else 0 end) as '${Province_friendlyText[ProvinceCode.QC]}'
            , sum(case when prov.code = '${ProvinceCode[ProvinceCode.NL]}' then 1 else 0 end) as '${Province_friendlyText[ProvinceCode.NL]}'
            , sum(case when prov.code = '${ProvinceCode[ProvinceCode.AB]}' then 1 else 0 end) as '${Province_friendlyText[ProvinceCode.AB]}'
            , sum(case when prov.code = '${ProvinceCode[ProvinceCode.ON]}' then 1 else 0 end) as '${Province_friendlyText[ProvinceCode.ON]}'
            , sum(case when prov.code = '${ProvinceCode[ProvinceCode.NS]}' then 1 else 0 end) as '${Province_friendlyText[ProvinceCode.NS]}'
            , sum(case when prov.code = '${ProvinceCode[ProvinceCode.BC]}' then 1 else 0 end) as '${Province_friendlyText[ProvinceCode.BC]}'
            , sum(case when prov.code = '${ProvinceCode[ProvinceCode.MB]}' then 1 else 0 end) as '${Province_friendlyText[ProvinceCode.MB]}'
            , sum(case when prov.code = '${ProvinceCode[ProvinceCode.NB]}' then 1 else 0 end) as '${Province_friendlyText[ProvinceCode.NB]}'
            , sum(case when prov.code = '${ProvinceCode[ProvinceCode.NU]}' then 1 else 0 end) as '${Province_friendlyText[ProvinceCode.NU]}'
            , sum(case when prov.code = '${ProvinceCode[ProvinceCode.SK]}' then 1 else 0 end) as '${Province_friendlyText[ProvinceCode.SK]}'
            , sum(case when prov.code = '${ProvinceCode[ProvinceCode.PE]}' then 1 else 0 end) as '${Province_friendlyText[ProvinceCode.PE]}'
            , sum(case when prov.code = '${ProvinceCode[ProvinceCode.NT]}' then 1 else 0 end) as '${Province_friendlyText[ProvinceCode.NT]}'
            , sum(case when prov.code = '${ProvinceCode[ProvinceCode.YT]}' then 1 else 0 end) as '${Province_friendlyText[ProvinceCode.YT]}'
            , sum(case when prov.code is null or prov.code not in (
                '${ProvinceCode[ProvinceCode.QC]}', '${ProvinceCode[ProvinceCode.NL]}', '${ProvinceCode[ProvinceCode.AB]}', '${ProvinceCode[ProvinceCode.ON]}'
                ,'${ProvinceCode[ProvinceCode.NS]}', '${ProvinceCode[ProvinceCode.BC]}', '${ProvinceCode[ProvinceCode.MB]}', '${ProvinceCode[ProvinceCode.NB]}'
                ,'${ProvinceCode[ProvinceCode.NU]}', '${ProvinceCode[ProvinceCode.SK]}', '${ProvinceCode[ProvinceCode.PE]}', '${ProvinceCode[ProvinceCode.NT]}'
                ,'${ProvinceCode[ProvinceCode.YT]}'
                ) then 1 else 0 end) as 'Unknown'`
            : 'prov.name as label';

        let sql = `select ${valueColumns}, count(*) as value${dateResult}
            from fs4.investors as inv 
                inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter} ${empJoin}
            where inv.is_deleted = 0 ${invFilter} ${orderExists}
            group by ${groupBy}`;
        this.logger.debug(sql);
        return this.investorDal.queryRaw(sql);
    }

    /**
     * get possible answer for every question text from registration_questionary
     * @param question_id - primary key in registration_questionary table
     * @returns one record of registration_questionary
     */
    async get_available_answers(question_id: number): Promise<any> {

        let answer_sql = `SELECT * from fs4.registration_questionary as rqu WHERE rqu.id = ${question_id} AND  rqu.is_deleted = 0`;
        return await this.investorDal.queryRaw(answer_sql);
    }

    /**
     * generate chart data for every questions of the registration_questionary
     * @param request - the metrics request to ge the filter for
     * @param question_id - primary key in registration_questionary table
     * @returns one record of registration_questionary
     */
    async investors_generate_chart(request: MetricsRequest, question_id: number): Promise<any> {

        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let empJoin = (empFilter == '') ? '' : `inner join fs4.users_employment as emp on emp.is_deleted = 0 and emp.user_id = inv.id ${empFilter}`;
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projExists = (projFilter == '') ? '' : `and exists (select 1 from fs4.projects as proj where proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter})`;
        let orderExists = (ordFilter == '' && projFilter == '') ? '' : `and exists (select 1 from fs4.investment_orders as ord where ord.is_deleted = 0 and ord.user_id = inv.id ${ordFilter} ${projExists})`;

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, inv.signup_date), 0)' : '';
        let groupBy = request.groupByDay ? dateValue : `que.answer_text`;
        let dateResult = request.groupByDay ? `, ${dateValue} as date` : '';

        let columnValues = `case
            when que.answer_text = '' then 'Unknown' 
            else REPLACE(REPLACE(que.answer_text, '>','#bb#'), '<', '#ll#')
        end as label`;

        if (request.groupByDay) {
            let answer_texts = await this.get_available_answers(question_id);
            columnValues = ``;
            for (let index = 1; index < 11; index++) {
                if (answer_texts['answer_choice_' + index])
                    columnValues += `sum(case when que.answer_text like '%${answer_texts['answer_choice_' + index]}%' then 1 else 0 end) as '${answer_texts['answer_choice_' + index]}',
                `;
            }
            columnValues += `sum(case when que.answer_text is null then 1 else 0 end) as 'Unknown'`;
        }

        let sql = `select ${columnValues}, count(*) as value${dateResult}
            from fs4.investors as inv 
                inner join fs4.users_questionary as que on que.is_deleted = 0 and que.question_id = ${question_id} and inv.id = que.user_id ${provJoin} ${empJoin}
            where inv.is_deleted = 0 ${invFilter} ${orderExists}
            group by ${groupBy}`;

        if (!request.groupByDay) {
            sql = ` SELECT sum(XTable.value) as value, replace(replace(STable.spilit_answer_text, '#ll#','<'), '#bb#', '>') as label
                    FROM (SELECT *,
                    cast('<X>'+replace(OTable.label,'^','</X><X>')+'</X>' as XML) as xmlfilter from (${sql}) OTable
                    ) XTable
                    CROSS APPLY
                    (SELECT fdata.D.value('.', 'varchar(500)') as spilit_answer_text 
                    FROM XTable.xmlfilter.nodes('X') as fdata(D)) STable
                    group by STable.spilit_answer_text`;
        }

        this.logger.debug(sql);

        return await this.investorDal.queryRaw(sql);
    }

    async investors_signup_status(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, inv.signup_date), 0)' : '';
        let groupBy = request.groupByDay ? dateValue : 'inv.status';
        let dateResult = request.groupByDay ? `, ${dateValue} as date` : '';
        let empJoin = (empFilter == '') ? '' : `inner join fs4.users_employment as emp on emp.is_deleted = 0 and emp.user_id = inv.id ${empFilter}`;
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projExists = (projFilter == '') ? '' : `and exists (select 1 from fs4.projects as proj where proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter})`;
        let orderExists = (ordFilter == '' && projFilter == '') ? '' : `and exists (select 1 from fs4.investment_orders as ord where ord.is_deleted = 0 and ord.user_id = inv.id ${ordFilter} ${projExists})`;

        let columnValues = request.groupByDay ? `
                sum(case when inv.status = ${UserState.initial_signup} then 1 else 0 end) as '${UserState_friendlyText[UserState.initial_signup]}'
                , sum(case when inv.status = ${UserState.address_set} then 1 else 0 end) as '${UserState_friendlyText[UserState.address_set]}'
                , sum(case when inv.status = ${UserState.basic_info_complete} then 1 else 0 end) as '${UserState_friendlyText[UserState.basic_info_complete]}'
                , sum(case when inv.status = ${UserState.saved_risk_tolerance} then 1 else 0 end) as '${UserState_friendlyText[UserState.saved_risk_tolerance]}'
                , sum(case when inv.status = ${UserState.risk_questions_complete} then 1 else 0 end) as '${UserState_friendlyText[UserState.risk_questions_complete]}'
                , sum(case when inv.status = ${UserState.employment_complete} then 1 else 0 end) as '${UserState_friendlyText[UserState.employment_complete]}'
                , sum(case when inv.status = ${UserState.active} then 1 else 0 end) as '${UserState_friendlyText[UserState.active]}'
                , sum(case when inv.status = ${UserState.blocked} then 1 else 0 end) as '${UserState_friendlyText[UserState.blocked]}'
                , sum(case when inv.status = ${UserState.archived} then 1 else 0 end) as '${UserState_friendlyText[UserState.archived]}'
                , sum(case when inv.status is null then 1 else 0 end) as 'Unknown'`
            : `case
                when inv.status = ${UserState.initial_signup} then '${UserState_friendlyText[UserState.initial_signup]}'
                when inv.status = ${UserState.address_set} then '${UserState_friendlyText[UserState.address_set]}'
                when inv.status = ${UserState.basic_info_complete} then '${UserState_friendlyText[UserState.basic_info_complete]}'
                when inv.status = ${UserState.saved_risk_tolerance} then '${UserState_friendlyText[UserState.saved_risk_tolerance]}'
                when inv.status = ${UserState.risk_questions_complete} then '${UserState_friendlyText[UserState.risk_questions_complete]}'
                when inv.status = ${UserState.employment_complete} then '${UserState_friendlyText[UserState.employment_complete]}'
                when inv.status = ${UserState.active} then '${UserState_friendlyText[UserState.active]}'
                when inv.status = ${UserState.blocked} then '${UserState_friendlyText[UserState.blocked]}'
                when inv.status = ${UserState.archived} then '${UserState_friendlyText[UserState.archived]}'
                else 'Unknown'
            end as label`;

        let orderby = request.groupByDay ? `${dateValue}`
            : `(case
                when inv.status = ${UserState.initial_signup} then 1
                when inv.status = ${UserState.address_set} then 2
                when inv.status = ${UserState.basic_info_complete} then 3
                when inv.status = ${UserState.saved_risk_tolerance} then 4
                when inv.status = ${UserState.risk_questions_complete} then 5
                when inv.status = ${UserState.employment_complete} then 6
                when inv.status = ${UserState.active} then 7
                when inv.status = ${UserState.blocked} then 8
                when inv.status = ${UserState.archived} then 9
                else 'Unknown'
                end) asc`;

        let sql = `select ${columnValues}, count(*) as value${dateResult}
            from fs4.investors as inv ${empJoin} ${provJoin}
            where inv.is_deleted = 0 ${invFilter} ${orderExists}
            group by ${groupBy}
            order by ${orderby}`;
        this.logger.debug(sql);
        return this.investorDal.queryRaw(sql);
    }
}

