import { AgeRange, AgeRange_friendlyText, AgeRange_higher, AgeRange_lower, FinancialRange, FinancialRange_friendlyText, FinancialRange_higher, FinancialRange_lower, IncomeRange, IncomeRange_friendlyText, IncomeRange_higher, IncomeRange_lower, InvestmentOrderAmountRange, InvestmentOrderAmountRange_friendlyText, InvestmentOrderAmountRange_higher, InvestmentOrderAmountRange_lower, InvestmentOrderStatus, InvestmentOrderStatus_friendlyText, InvestorAccreditation, InvestorAccreditation_friendlyText, MetricDataType, UserState, UserState_friendlyText, UserType } from 'fundscraper-model-enums';
import { Injectable, Logger, Scope } from '@nestjs/common';
import { InvestmentOrderDal } from './InvestmentOrder.provider';
import { MetricsRequest } from '../model/MetricsRequest';
import { ProjectMetricsDal } from './ProjectMetricsDal.provider';
import { InvestorMetricsDal } from './InvestorMetricsDal.provider';
import { UserIdentification } from '../security/UserIdentification';
import { ProvinceCode, Province_friendlyText } from 'fundscraper-model-enums';
import { InvestmentOrderQueryMutator } from './mutators/IssuerAdmin/InvestmentOrderQueryMutator';

/**
 * data access for metrics about investment orders
 */
@Injectable({ scope: Scope.TRANSIENT })
export class InvestmentOrderMetricsDal {
    private readonly logger = new Logger(InvestmentOrderMetricsDal.name);
    private userIdentification: UserIdentification;
    private static orderMutator = new InvestmentOrderQueryMutator();

    constructor(private readonly orderDal: InvestmentOrderDal) {

    }

    public setUserForRequest(user: UserIdentification) {
        this.userIdentification = user;
        this.orderDal.setUserForRequest(user);
    }

    async findOneById(request: MetricsRequest): Promise<any> {
        switch (request.dataType) {
            case MetricDataType.capital_raised:
                return this.capital_raised(request);
            case MetricDataType.orders_placed:
                return this.orders_placed(request);
            case MetricDataType.orders_amount:
                return this.orders_amount(request);
            case MetricDataType.orders_status:
                return this.orders_status(request);
            case MetricDataType.orders_investor_accreditation_level:
                return this.orders_investor_accreditation_level(request);
            case MetricDataType.orders_investor_age_range:
                return this.orders_investor_age_range(request);
            case MetricDataType.orders_investor_asset_range:
                return this.orders_investor_asset_range(request);
            case MetricDataType.orders_investor_cobranded:
                return this.orders_investor_cobranded(request);
            case MetricDataType.orders_investor_income_range:
                return this.orders_investor_income_range(request);
            case MetricDataType.orders_investor_province:
                return this.orders_investor_province(request);
            case MetricDataType.orders_investor_signup_status:
                return this.orders_investor_signup_status(request);
        }

        return null;
    }

    /**
     * from a given metrics request, get the specified filter in investment_orders. this is preceeded with an "and"
     * @param request the metrics request to ge the filter for
     * @param user the user to get the filter for
     * @returns the sql where fragment applied to "ord"
     */
    public static getOrderFilter(request: MetricsRequest, user: UserIdentification): string {
        let filter = '';

        // access control
        if (user.user_type == UserType.issuer_admin) {
            let ast = this.orderMutator.adjustFor(null, 'fs4', 'investment_orders', 'ord', user);
            let additionalWhere = this.orderMutator.stringfyExpressionAst(ast);
            filter = ' and ' + additionalWhere;
        }
        this.orderMutator.astifyWhereFragment

        // orderStatusFilter: InvestmentOrderStatus[];   
        if (request.orderStatusFilter != null) {
            let local = '';
            request.orderStatusFilter.forEach(item => {
                if (local != '')
                    local += ' or ';
                local += `ord.status = '${item}'`;
            });
            if (filter != '')
                filter += ' ';
            filter += `and (${local})`;
        }

        // startingOrderPurchaseDate: Date;
        if (request.startingOrderOrderDate != null) {
            if (filter != '')
                filter += ' ';
            let startingDate = (typeof request.startingOrderOrderDate === 'string') ? (new Date(request.startingOrderOrderDate)).toISOString() : request.startingOrderOrderDate.toISOString();
            filter += `and ord.order_date >= '${startingDate}'`;
        }

        // endingOrderPurchaseDate: Date;
        if (request.endingOrderOrderDate != null) {
            if (filter != '')
                filter += ' ';
            let endingDate = (typeof request.endingOrderOrderDate === 'string') ? (new Date(request.endingOrderOrderDate)).toISOString() : request.endingOrderOrderDate.toISOString();
            filter += `and ord.order_date <= '${endingDate}'`;
        }

        // startingOrderPurchaseDate: Date;
        if (request.startingOrderPurchaseDate != null) {
            if (filter != '')
                filter += ' ';
            let startingDate = (typeof request.startingOrderPurchaseDate === 'string') ? (new Date(request.startingOrderPurchaseDate)).toISOString() : request.startingOrderPurchaseDate.toISOString();
            filter += `and ord.trade_date >= '${startingDate}'`;
        }

        // endingOrderPurchaseDate: Date;
        if (request.endingOrderPurchaseDate != null) {
            if (filter != '')
                filter += ' ';
            let endingDate = (typeof request.endingOrderPurchaseDate === 'string') ? (new Date(request.endingOrderPurchaseDate)).toISOString() : request.endingOrderPurchaseDate.toISOString();
            filter += `and ord.trade_date <= '${endingDate}'`;
        }

        return filter;
    }

    async capital_raised(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let baseGroup = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, ord.order_date), 0)' : '';
        let dateGroup = request.groupByDay ? `group by ${baseGroup}` : '';
        let dateResult = request.groupByDay ? `, ${baseGroup} as date` : '';
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projJoin = (projFilter == '') ? '' : `inner join fs4.projects as proj on proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter}`;
        let invJoin = (invFilter == '' && empFilter == '' && provFilter == '') ? '' : `inner join fs4.investors as inv on inv.is_deleted = 0 and ord.user_id = inv.id ${invFilter}`;
        let empJoin = (empFilter == '') ? '' : `inner join fs4.users_employment as emp on emp.is_deleted = 0 and emp.user_id = inv.id ${empFilter}`;

        let sql = `select 
                'capital raised' as label${dateResult}, sum(amount) as value 
            from fs4.investment_orders as ord ${invJoin} ${empJoin} ${projJoin} ${provJoin}
            where ord.is_deleted = 0 and ord.status = ${InvestmentOrderStatus.purchased} ${ordFilter}
            ${dateGroup}`;
        this.logger.debug(sql);
        return this.orderDal.queryRaw(sql);
    }

    async orders_placed(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateBase = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, ord.order_date), 0)' : '';
        let dateResult = request.groupByDay ? `, ${dateBase} as date` : '';
        let dateGroup = request.groupByDay ? `group by ${dateBase}` : '';
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projJoin = (projFilter == '') ? '' : `inner join fs4.projects as proj on proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter}`;
        let invJoin = (invFilter == '' && empFilter == '' && provFilter == '') ? '' : `inner join fs4.investors as inv on inv.is_deleted = 0 and ord.user_id = inv.id ${invFilter}`;
        let empJoin = (empFilter == '') ? '' : `inner join fs4.users_employment as emp on emp.is_deleted = 0 and emp.user_id = inv.id ${empFilter}`;

        let sql = `select 
                'order count' as label${dateResult}, count(*) as value 
            from fs4.investment_orders as ord ${invJoin} ${empJoin} ${projJoin} ${provJoin}
            where ord.is_deleted = 0 ${ordFilter}
            ${dateGroup}`;
        this.logger.debug(sql);
        return this.orderDal.queryRaw(sql);
    }

    async orders_amount(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, ord.order_date), 0)' : '';
        let groupBy = request.groupByDay ? dateValue : `case
                when ord.amount < ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.under10]} then '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.under10]}'
                when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.between_10_19]} and ord.amount <= ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.between_10_19]} then '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.between_10_19]}'
                when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.between_20_29]} and ord.amount <= ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.between_20_29]} then '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.between_20_29]}'
                when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.between_30_39]} and ord.amount <= ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.between_30_39]} then '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.between_30_39]}'
                when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.between_40_49]} and ord.amount <= ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.between_40_49]} then '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.between_40_49]}'
                when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.between_50_74]} and ord.amount <= ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.between_50_74]} then '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.between_50_74]}'
                when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.between_75_99]} and ord.amount <= ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.between_75_99]} then '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.between_75_99]}'
                when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.between_100_199]} and ord.amount <= ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.between_100_199]} then '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.between_100_199]}'
                when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.over200]} then '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.over200]}'
                else 'Unknown'
            end`;
        let dateResult = request.groupByDay ? `, ${dateValue} as date` : '';
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projJoin = (projFilter == '') ? '' : `inner join fs4.projects as proj on proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter}`;
        let invJoin = (invFilter == '' && empFilter == '' && provFilter == '') ? '' : `inner join fs4.investors as inv on inv.is_deleted = 0 and ord.user_id = inv.id ${invFilter}`;
        let empJoin = (empFilter == '') ? '' : `inner join fs4.users_employment as emp on emp.is_deleted = 0 and emp.user_id = inv.id ${empFilter}`;

        let valueColumns = request.groupByDay ? ` 
            sum(case when ord.amount < ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.under10]} then 1 else 0 end) as '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.under10]}'
            , sum(case when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.between_10_19]} and ord.amount <= ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.between_10_19]} then 1 else 0 end) as '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.between_10_19]}'
            , sum(case when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.between_20_29]} and ord.amount <= ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.between_20_29]} then 1 else 0 end) as '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.between_20_29]}'
            , sum(case when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.between_30_39]} and ord.amount <= ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.between_30_39]} then 1 else 0 end) as '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.between_30_39]}'
            , sum(case when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.between_40_49]} and ord.amount <= ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.between_40_49]} then 1 else 0 end) as '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.between_40_49]}'
            , sum(case when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.between_50_74]} and ord.amount <= ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.between_50_74]} then 1 else 0 end) as '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.between_50_74]}'
            , sum(case when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.between_75_99]} and ord.amount <= ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.between_75_99]} then 1 else 0 end) as '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.between_75_99]}'
            , sum(case when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.between_100_199]} and ord.amount <= ${InvestmentOrderAmountRange_higher[InvestmentOrderAmountRange.between_100_199]} then 1 else 0 end) as '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.between_100_199]}'
            , sum(case when ord.amount >= ${InvestmentOrderAmountRange_lower[InvestmentOrderAmountRange.over200]} then 1 else 0 end) as '${InvestmentOrderAmountRange_friendlyText[InvestmentOrderAmountRange.over200]}'
            , sum(case when ord.amount is null then 1 else 0 end) as 'Unknown'`
            : `${groupBy} as label`;

        let sql = `select ${valueColumns}, count(*) as value${dateResult}
            from fs4.investment_orders as ord ${invJoin} ${empJoin} ${projJoin} ${provJoin}
            where ord.is_deleted = 0 ${ordFilter}
            group by ${groupBy}
                order by
                max(ord.amount)`;
        this.logger.debug(sql);
        return this.orderDal.queryRaw(sql);
    }

    async orders_status(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, ord.order_date), 0)' : '';
        let groupBy = request.groupByDay ? dateValue : 'ord.status';
        let dateResult = request.groupByDay ? `, ${dateValue} as date` : '';
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projJoin = (projFilter == '') ? '' : `inner join fs4.projects as proj on proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter}`;
        let invJoin = (invFilter == '' && empFilter == '' && provFilter == '') ? '' : `inner join fs4.investors as inv on inv.is_deleted = 0 and ord.user_id = inv.id ${invFilter}`;
        let empJoin = (empFilter == '') ? '' : `inner join fs4.users_employment as emp on emp.is_deleted = 0 and emp.user_id = inv.id ${empFilter}`;

        let valueColumns = request.groupByDay ? `
            sum(case when ord.status = ${InvestmentOrderStatus.order_placed} then 1 else 0 end) as '${InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.order_placed]}'
            , sum(case when ord.status = ${InvestmentOrderStatus.purchased} then 1 else 0 end) as '${InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.purchased]}'
            , sum(case when ord.status = ${InvestmentOrderStatus.refunded} then 1 else 0 end) as '${InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.refunded]}'
            , sum(case when ord.status = ${InvestmentOrderStatus.transferred} then 1 else 0 end) as '${InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.transferred]}'
            , sum(case when ord.status = ${InvestmentOrderStatus.sold} then 1 else 0 end) as '${InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.sold]}'
            , sum(case when ord.status is null then 1 else 0 end) as 'Unknown'`
            : `case
                when ord.status = ${InvestmentOrderStatus.order_placed} then '${InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.order_placed]}'
                when ord.status = ${InvestmentOrderStatus.purchased} then '${InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.purchased]}'
                when ord.status = ${InvestmentOrderStatus.refunded} then '${InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.refunded]}'
                when ord.status = ${InvestmentOrderStatus.transferred} then '${InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.transferred]}'
                when ord.status = ${InvestmentOrderStatus.sold} then '${InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.sold]}'
                else 'Unknown'
            end as label`;
        let sql = `select ${valueColumns}, count(*) as value${dateResult}
            from fs4.investment_orders as ord ${invJoin} ${empJoin} ${projJoin} ${provJoin}
            where ord.is_deleted = 0 ${ordFilter}
            group by ${groupBy}
            order by max(ord.status)`;
        this.logger.debug(sql);
        return this.orderDal.queryRaw(sql);
    }

    async orders_investor_accreditation_level(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projJoin = (projFilter == '') ? '' : `inner join fs4.projects as proj on proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter}`;
        let empJoin = (empFilter == '') ? '' : `inner join fs4.users_employment as emp on emp.is_deleted = 0 and emp.user_id = inv.id ${empFilter}`;

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, inv.signup_date), 0)' : '';
        let groupBy = request.groupByDay ? dateValue : 'inv.investor_type_system';
        let dateResult = request.groupByDay ? `, ${dateValue} as date` : '';
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
            from fs4.investment_orders as ord 
                inner join fs4.investors as inv on inv.is_deleted = 0 and ord.user_id = inv.id ${invFilter} ${empJoin} ${projJoin} ${provJoin}
            where ord.is_deleted = 0 ${ordFilter}
            group by ${groupBy}
            order by max(inv.investor_type_system)`;
        this.logger.debug(sql);
        return this.orderDal.queryRaw(sql);
    }

    async orders_investor_age_range(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, ord.order_date), 0)' : '';
        let dateResult = request.groupByDay ? `, ${dateValue} as date` : '';
        let groupBy = request.groupByDay ? dateValue : `case
                when ${InvestorMetricsDal.ageRangeFilter(AgeRange.under35)} then '${AgeRange_friendlyText[AgeRange.under35]}'
                when ${InvestorMetricsDal.ageRangeFilter(AgeRange.between_35_44)} then '${AgeRange_friendlyText[AgeRange.between_35_44]}'
                when ${InvestorMetricsDal.ageRangeFilter(AgeRange.between_45_54)} then '${AgeRange_friendlyText[AgeRange.between_45_54]}'
                when ${InvestorMetricsDal.ageRangeFilter(AgeRange.between_55_64)} then '${AgeRange_friendlyText[AgeRange.between_55_64]}'
                when ${InvestorMetricsDal.ageRangeFilter(AgeRange.over_65)} then '${AgeRange_friendlyText[AgeRange.over_65]}'
                else 'Unknown'
            end `;
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projJoin = (projFilter == '') ? '' : `inner join fs4.projects as proj on proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter}`;
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
            from fs4.investment_orders as ord 
                inner join fs4.investors as inv on inv.is_deleted = 0 and ord.user_id = inv.id  ${invFilter}
                inner join fs4.users_employment as emp on emp.is_deleted = 0 and inv.id = emp.user_id ${empFilter} ${projJoin} ${provJoin}
            where ord.is_deleted = 0 ${ordFilter}
            group by ${groupBy}
            order by
                max(inv.dob) desc`;
        this.logger.debug(sql);
        return this.orderDal.queryRaw(sql);
    }

    async orders_investor_asset_range(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, ord.order_date), 0)' : '';
        let dateResult = request.groupByDay ? `, ${dateValue} as date` : '';
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projJoin = (projFilter == '') ? '' : `inner join fs4.projects as proj on proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter}`;
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

        let sql = `select ${valuesColumns}, count(*) as value ${dateResult}
            from fs4.investment_orders as ord 
                inner join fs4.investors as inv on inv.is_deleted = 0 and ord.user_id = inv.id ${invFilter}
                inner join fs4.users_employment as emp on emp.is_deleted = 0 and inv.id = emp.user_id ${empFilter} ${projJoin} ${provJoin}
            where ord.is_deleted = 0 ${ordFilter}
            group by ${groupBy}
            order by
                max(emp.assets_net_new)`;
        this.logger.debug(sql);
        return this.orderDal.queryRaw(sql);
    }

    async orders_investor_cobranded(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, ord.order_date), 0)' : '';
        let groupBy = request.groupByDay ? dateValue : `case when inv.cobranded_client_of_id is null then 'false' else 'true' end`;
        let dateResult = request.groupByDay ? `, ${groupBy} as date` : '';
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projJoin = (projFilter == '') ? '' : `inner join fs4.projects as proj on proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter}`;
        let empJoin = (empFilter == '') ? '' : `inner join fs4.users_employment as emp on emp.is_deleted = 0 and emp.user_id = inv.id ${empFilter}`;
        let columnValues = request.groupByDay ? `
            sum(case when cobranded_client_of_id is null then 1 else 0 end) as 'false'
            , sum(case when cobranded_client_of_id is not null then 1 else 0 end) as 'true'`
            : `case when cobranded_client_of_id is null then 'false' else 'true' end as label`;

        let sql = `select ${columnValues}, count(*) as value${dateResult}
            from fs4.investment_orders as ord 
                inner join fs4.investors as inv on inv.is_deleted = 0 and ord.user_id = inv.id ${invFilter} ${empJoin} ${projJoin} ${provJoin}
            where ord.is_deleted = 0 ${ordFilter}
            group by ${groupBy}`;
        this.logger.debug(sql);
        return this.orderDal.queryRaw(sql);
    }

    async orders_investor_income_range(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projJoin = (projFilter == '') ? '' : `inner join fs4.projects as proj on proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter}`;

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, ord.order_date), 0)' : '';
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
            , sum(case when emp.income_curr_new is null then 1 else 0 end) as 'Unknown'`
            : `${groupBy} as label`;

        let sql = `select ${columnValues}, count(*) as value ${dateResult}
            from fs4.investment_orders as ord 
                inner join fs4.investors as inv on inv.is_deleted = 0 and ord.user_id = inv.id ${invFilter}
                inner join fs4.users_employment as emp on emp.is_deleted = 0 and inv.id = emp.user_id ${empFilter} ${projJoin} ${provJoin}
            where ord.is_deleted = 0 ${ordFilter}
            group by ${groupBy}
            order by 
                max(emp.income_curr_new)`;
        this.logger.debug(sql);
        return this.orderDal.queryRaw(sql);
    }

    async orders_investor_province(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, inv.signup_date), 0)' : '';
        let groupBy = request.groupByDay ? dateValue : 'prov.name';
        let dateResult = request.groupByDay ? `, ${dateValue} as date` : '';
        let projJoin = (projFilter == '') ? '' : `inner join fs4.projects as proj on proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter}`;
        let empJoin = (empFilter == '') ? '' : `inner join fs4.users_employment as emp on emp.is_deleted = 0 and emp.user_id = inv.id ${empFilter}`;
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
            from fs4.investment_orders as ord
                inner join fs4.investors as inv on inv.is_deleted = 0 and ord.user_id = inv.id ${invFilter} ${empJoin} ${projJoin}
                inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}
            where ord.is_deleted = 0 ${ordFilter} 
            group by ${groupBy}`;
        this.logger.debug(sql);
        return this.orderDal.queryRaw(sql);
    }

    async orders_investor_signup_status(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateValue = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, inv.signup_date), 0)' : '';
        let groupBy = request.groupByDay ? dateValue : 'inv.status';
        let dateResult = request.groupByDay ? `, ${dateValue} as date` : '';
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let projJoin = (projFilter == '') ? '' : `inner join fs4.projects as proj on proj.is_deleted = 0 and ord.project_id = proj.id ${projFilter}`;
        let empJoin = (empFilter == '') ? '' : `inner join fs4.users_employment as emp on emp.is_deleted = 0 and emp.user_id = inv.id ${empFilter}`;

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
            from fs4.investment_orders as ord 
                inner join fs4.investors as inv on inv.is_deleted = 0 and ord.user_id = inv.id ${invFilter} ${empJoin} ${projJoin} ${provJoin}
            where ord.is_deleted = 0 ${ordFilter}
            group by ${groupBy}
            order by ${orderby}`;

        this.logger.debug(sql);
        return this.orderDal.queryRaw(sql);
    }
}

