import { MetricDataType, ProjectStage, ProjectStage_friendlyText } from 'fundscraper-model-enums';
import { Injectable, Logger, Scope } from '@nestjs/common';
import { ProjectDal } from './Project.provider';
import { MetricsRequest } from '../model/MetricsRequest';
import { InvestmentOrderMetricsDal } from './InvestmentOrderMetricsDal.provider';
import { InvestorMetricsDal } from './InvestorMetricsDal.provider';
import { UserIdentification } from '../security/UserIdentification';

/**
 * data access for metrics about projects
 */
@Injectable({ scope: Scope.TRANSIENT })
export class ProjectMetricsDal {
    private readonly logger = new Logger(ProjectMetricsDal.name);
    private userIdentification: UserIdentification;
    constructor(private readonly projectDal: ProjectDal) {

    }

    public setUserForRequest(user: UserIdentification) {
        this.userIdentification = user;
        this.projectDal.setUserForRequest(user);
    }

    async findOneById(request: MetricsRequest): Promise<any> {
        switch (request.dataType) {
            case MetricDataType.project_count:
                return this.project_count(request);
            case MetricDataType.projects_status:
                return this.projects_status(request);
            case MetricDataType.projects_dollars_raised:
                return this.projects_dollars_raised(request);
        }

        return null;
    }

    /**
     * from a given metrics request, get the specified filter in projects. this is preceeded with an "and"
     * @param request the metrics request to ge the filter for
     * @returns the sql where fragment applied to "proj"
     */
    public static getProjectFilter(request: MetricsRequest): string {
        let filter = '';

        // projectStatusFilter: ProjectStage[];
        if (request.projectStatusFilter != null) {
            let local = '';
            request.projectStatusFilter.forEach(item => {
                if (local != '')
                    local += ' or ';
                local += `proj.project_status = ${item}`;
            });
            if (filter != '')
                filter += ' ';
            filter += `and (${local})`;
        }

        return filter;
    }

    async project_count(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateBase = request.groupByDay ? 'DATEADD(dd, DATEDIFF(dd, 0, isnull(proj.funding_start, getdate())), 0)' : '';
        let dateGroup = request.groupByDay ? `group by ${dateBase}` : '';
        let dateResult = request.groupByDay ? `, ${dateBase} as date` : '';
        let provExists = (provFilter == '') ? '' : `and exists (select 1 from fs4.provinces as prov where prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter})`;
        let empExists = (empFilter == '') ? '' : `and exists (select 1 from fs4.users_employment as emp where emp.is_deleted = 0 and emp.user_id = inv.id ${empFilter})`;
        let invExists = (invFilter == '' && empFilter == '' && provFilter == '') ? '' : `and exists (select 1 from fs4.investors as inv where inv.is_deleted = 0 and ord.user_id = inv.id ${invFilter} ${provExists} ${empExists})`;
        let ordExists = (ordFilter == '' && invFilter == '' && empFilter == '' && provFilter == '') ? '' : `and exists (select 1 from fs4.investment_orders as ord where ord.is_deleted = 0 and ord.project_id = proj.id ${ordFilter} ${invExists})`;

        let sql = `select 'project count' as label${dateResult}, count(*) as value 
            from 
                fs4.projects as proj
            where proj.is_deleted = 0 ${projFilter} ${ordExists}
            ${dateGroup}`;
        this.logger.debug(sql);
        return this.projectDal.queryRaw(sql);
    }

    async projects_status(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateGroup = request.groupByDay ? ', DATEADD(dd, DATEDIFF(dd, 0, isnull(proj.funding_start, getdate())), 0)' : '';
        let dateResult = request.groupByDay ? `${dateGroup} as date` : '';
        let provExists = (provFilter == '') ? '' : `and exists (select 1 from fs4.provinces as prov where prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter})`;
        let empExists = (empFilter == '') ? '' : `and exists (select 1 from fs4.users_employment as emp where emp.is_deleted = 0 and emp.user_id = inv.id ${empFilter})`;
        let invExists = (invFilter == '' && empFilter == '' && provFilter == '') ? '' : `and exists (select 1 from fs4.investors as inv where inv.is_deleted = 0 and ord.user_id = inv.id ${invFilter} ${provExists} ${empExists})`;
        let ordExists = (ordFilter == '' && invFilter == '' && empFilter == '' && provFilter == '') ? '' : `and exists (select 1 from fs4.investment_orders as ord where ord.is_deleted = 0 and ord.project_id = proj.id ${ordFilter} ${invExists})`;

        let sql = `select case
                when proj.project_status = ${ProjectStage.prospective} then '${ProjectStage_friendlyText[ProjectStage.prospective]}'
                when proj.project_status = ${ProjectStage.pre_funding_private} then '${ProjectStage_friendlyText[ProjectStage.pre_funding_private]}'
                when proj.project_status = ${ProjectStage.raising} then '${ProjectStage_friendlyText[ProjectStage.raising]}'
                when proj.project_status = ${ProjectStage.underway} then '${ProjectStage_friendlyText[ProjectStage.underway]}'
                when proj.project_status = ${ProjectStage.completed} then '${ProjectStage_friendlyText[ProjectStage.completed]}'
                else 'Unknown'
                end as label${dateResult}, count(*) as value 
            from 
                fs4.projects as proj
            where proj.is_deleted = 0 ${projFilter} ${ordExists}
            group by proj.project_status${dateGroup}
            order by max(proj.project_status)`;
        this.logger.debug(sql);
        return this.projectDal.queryRaw(sql);
    }

    async projects_dollars_raised(request: MetricsRequest): Promise<any> {
        let projFilter = ProjectMetricsDal.getProjectFilter(request);
        let ordFilter = InvestmentOrderMetricsDal.getOrderFilter(request, this.userIdentification);
        let empFilter = InvestorMetricsDal.getEmploymentFilter(request);
        let invFilter = InvestorMetricsDal.getInvestorFilter(request, this.userIdentification);
        let provFilter = InvestorMetricsDal.getProvinceFilter(request);

        let dateGroup = request.groupByDay ? ', DATEADD(dd, DATEDIFF(dd, 0, isnull(proj.funding_start, getdate())), 0)' : '';
        let dateResult = request.groupByDay ? `${dateGroup} as date` : '';
        let provJoin = (provFilter == '') ? '' : `inner join fs4.provinces as prov on prov.is_deleted = 0 and inv.province_id = prov.id ${provFilter}`;
        let invJoin = (invFilter == '' && empFilter == '' && provFilter == '') ? '' : `inner join fs4.investors as inv on inv.is_deleted = 0 and ord.user_id = inv.id ${invFilter}`;
        let empJoin = (empFilter == '') ? '' : `inner join fs4.users_employment as emp on emp.is_deleted = 0 and emp.user_id = inv.id ${empFilter}`;

        let sql = `select proj.name as label, sum(ord.amount) as value${dateResult}
            from 
                fs4.investment_orders as ord 
                inner join fs4.projects as proj on proj.is_deleted = 0 and ord.project_id = proj.id ${invJoin} ${empJoin} ${provJoin}
            where ord.is_deleted = 0 ${projFilter} ${ordFilter}
            group by proj.name${dateGroup}
            order by 2 desc`;
        this.logger.debug(sql);
        return this.projectDal.queryRaw(sql);
    }
}

