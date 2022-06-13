import { Injectable, HttpService, Logger, Scope } from '@nestjs/common';
import { ProjectService } from './Project.service';
import { Project } from '../model/Project.entity.generated';
import { AbstractHubspotService } from './AbstractHubspot.service';
import { EmailService } from '../util/Email';
import { UserIdentification } from '../security/UserIdentification';
import * as hubspot from '@hubspot/api-client';
import { CurrencyCode_friendlyText, DebtSeniorityType_friendlyText, DurationType_friendlyText, ProjectAssetType_friendlyText, ProjectCapitalType_friendlyText, ProjectDevelopmentType_friendlyText, ProjectStage_friendlyText, ProjectUseStatus_friendlyText } from 'fundscraper-model-enums';
var md5 = require("nodejs-md5");

/**
 * 
 * NOTE: makes use of the hubspot api client at https://www.npmjs.com/package/@hubspot/api-client
 */
@Injectable({ scope: Scope.TRANSIENT })
export class HubspotProjectService extends AbstractHubspotService {
    private readonly logger = new Logger(HubspotProjectService.name);

    /**
     * the hubspot project custom object id
     */
    projectCustomObjectId = '2-1417909';
    hubspotPortalId = '3419736';
    projetCustomerObjectFullyQualifiedName = `p${this.hubspotPortalId}_Project`;

    /**
     * create the new checker
     */
    constructor(readonly inEmailServce: EmailService, private readonly projService: ProjectService, private readonly httpService: HttpService) {
        super(inEmailServce);
    }

    /**
     * set the user that is going to be making use of this service
     */
    setUserForRequest(user: UserIdentification) {
        super.setUserForRequest(user);
        this.projService.setUserForRequest(user);
    }

    /**
     * save the details of the custom property
     * @param properties The properties of the property to save
     */
    async saveProjectProperty(properties: any) {
        try {
            let propertiesText = JSON.stringify(properties);
            this.logger.log(`saveProjectProperty(${propertiesText})`);

            let httpCall = this.httpService.patch(`https://api.hubapi.com/crm/v3/properties/deals/project`, properties,
                {
                    headers: { 'content-type': 'application/json' }
                    , params: { hapikey: this.hapikey }
                });

            const createResponse = await httpCall.toPromise();
            this.logger.log(`saveProjectProperty finished http call`);
            if (createResponse.status == 200) {
                this.logger.log(`saveProjectProperty result 200`);
                //await this.projService.updatePartial({hubspot_id: newPipelineResult.body.id}, project.id);
                this.error(`saveProjectProperty saved with result data (${JSON.stringify(createResponse.data)})`);
            }
            else {
                this.logger.log(`saveProjectProperty result ${createResponse.status}-${createResponse.statusText}`);
                this.error(`saveProjectProperty failed to save with result ${createResponse.status}-${createResponse.statusText}`);
            }
        }
        catch (problem2) {
            this.logger.log(`saveProjectProperty failed with ${problem2}`);
            this.error(`saveProjectProperty due to ${problem2}`);
        }
    }

    /**
     * create the json object for the project property
     * @param projects the projects to turn into a property
     * @return a json object with the necessary properties
     */
    createProperty(projects: Project[]): any {
        let projectsJson = [];
        projects.forEach((project) => {
            let projectPiece = {
                "label": project.name
                , "description": project.name
                , "value": project.id
                , "displayOrder": project.sort_order
                , "hidden": false
            };
            projectsJson.push(projectPiece);
        });
        let properties = { "options": projectsJson };

        return properties;
    }

    /**
     * deals have a property which references projects. ensure its updated
     * @param allProjects - the set of projects for the property
     */
    async updateDealProjectProperty(allProjects: Project[]) {
        let properties = this.createProperty(allProjects);
        this.logger.log(`saveProjectProperty(${JSON.stringify(properties)})`);
        await this.saveProjectProperty(properties);
    }

    /**
     * hubspot has a custom object of type project. ensure that the project custom object match the given project
     * POST https://api.hubapi.com/crm/v3/objects/p99688696_car?portalId=99688696
     * read: https://developers.hubspot.com/docs/api/crm/crm-custom-objects
     * GET https://api.hubapi.com/crm/v3/objects/2-1417909
     * project custom object id = 2-1417909
     * projectCustomObjectId
     * @param project - the project to sync
     */
    async createProjectObject(project: Project, properties: { [key: string]: string | number | boolean }) {
        this.logger.debug(`createProjectObject(${project.id}-${project.name}) entered`);

        try {
            let updateUrl = `https://api.hubapi.com/crm/v3/objects/${this.projetCustomerObjectFullyQualifiedName}?portalID=${this.hubspotPortalId}`;
            this.logger.debug(`createProjectObject(${project.id}-${project.name}) creating new at ${updateUrl} with ${JSON.stringify(properties)}`);
            let wrappedProperties = { properties: properties };
            let httpCall = this.httpService.post(updateUrl, wrappedProperties,
                {
                    headers: { 'content-type': 'application/json' }
                    , params: { hapikey: this.hapikey }
                });

            const updateResponse = await httpCall.toPromise();
            this.logger.debug(`createProjectObject(${project.id}-${project.name}) update response = ${updateResponse.status}:${updateResponse.statusText} :${JSON.stringify(updateResponse.data)}`);
            this.projService.updatePartial({ 'hubspot_id': updateResponse.data.id }, project.id);
        }
        catch (problem2) {
            this.exception(`createProjectObject(${project.id}-${project.name}) failed due to ${JSON.stringify(problem2)}`);
            this.logger.error(`createProjectObject(${project.id}-${project.name}) failed due to ${JSON.stringify(problem2)}`);
        }

        this.logger.debug(`createProjectObject(${project.id}-${project.name}) exited`);
    }

    /**
     * hubspot has a custom object of type project. ensure that the project custom object match the given project
     * @param project - the project to sync
     */
    async updateProjectObject(project: Project, properties: { [key: string]: string | number | boolean }) {
        this.logger.debug(`updateProjectObject ${project.id}-${project.name} entered`);

        try {
            let updateUrl = `https://api.hubapi.com/crm/v3/objects/${this.projetCustomerObjectFullyQualifiedName}/${project.hubspot_id}?portalID=${this.hubspotPortalId}`;
            this.logger.debug(`updateProjectObject(${project.id}-${project.name}) updating at ${updateUrl} with ${JSON.stringify(properties)}`);
            let wrappedProperties = { properties: properties };
            let httpCall = this.httpService.patch(updateUrl, wrappedProperties,
                {
                    headers: { 'content-type': 'application/json' }
                    , params: { hapikey: this.hapikey }
                });

            const updateResponse = await httpCall.toPromise();
            this.logger.debug(`updateProjectObject(${project.id}-${project.name}) update response = ${updateResponse.status}:${updateResponse.statusText}` /* :${JSON.stringify(updateResponse.data)} */);
        }
        catch (problem2) {
            this.exception(`updateProjectObject(${project.id}-${project.name}) failed due to ${problem2}`);
            this.logger.error(`updateProjectObject(${project.id}-${project.name}) failed due to ${problem2}`);
        }

        this.logger.debug(`updateProjectObject ${project.id}-${project.name} exited`);
    }

    /**
     * set a projects properties into a properties object
     * @param project - the project to get the properties from
     * @param properties - the object to set the properties into
     */
    setProjectProperties(project: Project, properties: { [key: string]: string | number | boolean }) {

        let md5Id = '';
        md5.string.quiet('' + project.id, function (err, md5) { md5Id = md5; });

        properties['id'] = project.id;
        properties['md5id'] = md5Id;
        properties['name'] = project.name;
        properties['issuer_id'] = project.issuer_id;
        properties['sponsor_label'] = project.sponsor_label ? 'True' : 'False';
        properties['acknowledgements'] = project.acknowledgements;
        properties['additional_desc'] = project.additional_desc;
        properties['address'] = project.address;
        properties['agent_name'] = project.agent_name;
        properties['allow_ineligible'] = project.allow_ineligible ? 'True' : 'False';
        properties['annual_irr'] = project.annual_irr;
        properties['asset_type'] = (project.asset_type == null) ? '' : ProjectAssetType_friendlyText[project.asset_type];
        properties['capital_type'] = (project.capital_type == null) ? '' : ProjectCapitalType_friendlyText[project.capital_type];
        properties['city'] = project.city;
        properties['contents'] = project.contents;
        properties['continuous_offering'] = project.continuous_offering ? 'True' : 'False';
        properties['country'] = (project.country != null) ? project.country.name : '';
        properties['credit_guarantee'] = project.credit_guarantee;
        properties['currency_label'] = (project.currency_label == null) ? '' : CurrencyCode_friendlyText[project.currency_label];
        properties['daysleft_flag'] = project.daysleft_flag ? 'True' : 'False';
        properties['debt_seniority'] = (project.debt_seniority == null) ? '' : DebtSeniorityType_friendlyText[project.debt_seniority];
        properties['default_share'] = project.default_share.toString();
        properties['development_type'] = (project.development_type == null) ? '' : ProjectDevelopmentType_friendlyText[project.development_type];
        properties['disclaimer_note'] = project.disclaimer_note;
        properties['dividend_desc'] = project.dividend_desc;
        properties['drip_available'] = project.drip_available ? 'True' : 'False';
        properties['funded_flag'] = project.funded_flag ? 'True' : 'False';
        properties['funding_expiry'] = (project.funding_expiry != null) ? this.dateToHubspotTimestamp(project.funding_expiry) : '';
        properties['funding_start'] = (project.funding_start != null) ? this.dateToHubspotTimestamp(project.funding_start) : '';
        properties['interest_rate'] = project.interest_rate;
        properties['investment_eligibility'] = project.investment_eligibility;
        properties['investment_term'] = project.investment_term;
        properties['investments_locked'] = project.investments_locked ? 'True' : 'False';
        properties['is_private'] = project.is_private ? 'True' : 'False';
        properties['issuer_business'] = project.issuer_business;
        properties['last_changed'] = this.dateToHubspotTimestamp(project.updatetime);
        properties['legal_name'] = project.legal_name;
        properties['loan_to_value_ratio'] = project.loan_to_value_ratio;
        properties['long_desc'] = project.long_desc;
        properties['market_price'] = project.market_price;
        properties['maturity_date'] = (project.maturity_date != null) ? this.dateToHubspotTimestamp(project.maturity_date) : '';
        properties['max_share'] = project.max_share;
        properties['maximum_duration_type'] = (project.maximum_duration_type == null) ? '' : DurationType_friendlyText[project.maximum_duration_type];
        properties['maximum_duration_units'] = project.maximum_duration_units;
        properties['min_share'] = project.min_share;
        properties['minimum_duration_type'] = (project.minimum_duration_type == null) ? '' : DurationType_friendlyText[project.minimum_duration_type];
        properties['minimum_duration_units'] = project.minimum_duration_units;
        properties['offering_amount'] = project.offering_amount;
        properties['over_subscriptions'] = project.over_subscriptions ? 'True' : 'False';
        properties['project_no'] = project.project_no;
        properties['project_stage'] = (project.project_stage == null) ? '' : ProjectStage_friendlyText[project.project_stage];
        properties['province'] = (project.province != null) ? project.province.name : '';
        properties['redeem_ability'] = project.redeem_ability;
        properties['redemption_info'] = project.redemption_info;
        properties['registrant_contact'] = project.registrant_contact;
        properties['sale_price'] = project.sale_price;
        properties['share_price'] = project.share_price;
        properties['sort_order'] = project.sort_order;
        properties['system_status'] = (project.system_status == null) ? '' : ProjectUseStatus_friendlyText[project.system_status];
        properties['total_share'] = project.total_share;
        properties['trust_company_names'] = project.trust_company_names;
        properties['use_of_proceeds'] = project.use_of_proceeds;
        properties['use_system_om'] = project.use_system_om ? 'True' : 'False';
        properties['zip'] = project.zip;
    }

    /**
     * hubspot has a custom object of type project. ensure that the project custom object match the given project
     * @param project - the project to sync
     */
    async syncProjectObject(project: Project) {
        this.logger.debug(`updateProjectObject ${project.id}-${project.name} entered`);

        let properties = {} as { [key: string]: string | number | boolean };
        this.setProjectProperties(project, properties);

        // have we created one?
        if (project.hubspot_id == null || project.hubspot_id == '')
            // no, create it  
            await this.createProjectObject(project, properties);
        else
            // yes, update it
            await this.updateProjectObject(project, properties);
        this.logger.debug(`updateProjectObject ${project.id}-${project.name} exited`);
    }

    /**
     * sync a single project to the hubspot custom objects
     * @param id - the id of the project to sync
     * @returns an array of errors that were encountered
     */
    async syncProject(id: number): Promise<Array<string>> {
        this.logger.debug(`syncProject ${id} entered`);
        this.errorsEncountered = new Array<string>();

        let project = await this.projService.findOneById(id);
        await this.syncProjectObject(project);

        this.logger.debug(`syncProject ${id} exited`);
        return this.errorsEncountered;
    }

    /**
     * hubspot has a custom object of type project. ensure that the project custom objects match our set of projects
     * @param allProjects - the set of projects to ensure that hubspot has
     */
    async updateProjectObjects(allProjects: Project[]) {
        this.logger.debug(`updateProjectObjects entered`);
        await Promise.all(allProjects.map(async (project) => {
            await this.syncProjectObject(project);
        }));
        this.logger.debug(`updateProjectObjects exited`);
    }

    /**
     * go through the projects one by one and make sure the data in the cms matches hubspot
     * @returns an array of errors that were encountered
     */
    async checkAllProjects(): Promise<Array<string>> {
        this.logger.log(`checkAllProjects enter`);
        this.errorsEncountered = new Array<string>();
        try {
            let allProjects = await this.projService.findAllByFilter('is_deleted = 0', null, ['province', 'country'], null, 0, -1);
            await this.updateDealProjectProperty(allProjects);
            await this.updateProjectObjects(allProjects);
        }
        catch (error) {
            this.logger.log(`checkAllProjects failure ${error}`);
            console.error(error);
            error(`Could not update property deal.project with list of projects: ${error}`);
        }

        this.logger.log(`checkAllProjects exit`);
        return this.errorsEncountered;
    }

}


