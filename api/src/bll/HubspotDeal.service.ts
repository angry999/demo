import { Injectable, HttpService, Logger, Scope } from '@nestjs/common';
import * as hubspot from '@hubspot/api-client';
import { InvestmentOrder } from '../model/InvestmentOrder.entity.generated';
import { AbstractHubspotService } from './AbstractHubspot.service';
import { InvestmentOrderService } from './InvestmentOrder.service';
import { Project } from '../model/Project.entity.generated';
import { ProjectService } from './Project.service';
import { InvestorService } from './Investor.service';
import { Investor } from '../model/Investor.entity.generated';
import { ModuleRef } from '@nestjs/core';
var md5 = require("nodejs-md5");
import { decode } from 'html-entities';
import { EmailService } from '../util/Email';
import { UserIdentification } from '../security/UserIdentification';
import { InvestmentOrderStatus, InvestmentOrderStatus_friendlyText } from 'fundscraper-model-enums';
import { HubspotContactService } from './HubspotContact.service';

/**
 * NOTE: makes use of the hubspot api client at https://www.npmjs.com/package/@hubspot/api-client
 */
@Injectable({ scope: Scope.TRANSIENT })
export class HubspotDealService extends AbstractHubspotService {
    private readonly logger = new Logger(HubspotDealService.name);

    /**
     * all known pipelines in hubspot
     */
    private pipelines: hubspot.pipelinesModels.Pipeline[];

    /**
     * all projects that orders could be in
     */
    private projects: Project[];

    private investorService: InvestorService;
    private projectService: ProjectService;

    /**
     * create the new checker
     */
    constructor(readonly inEmailServce: EmailService
        , private moduleRef: ModuleRef
        , private readonly orderService: InvestmentOrderService
        , private readonly contactService: HubspotContactService
        , private readonly httpService: HttpService) {
        super(inEmailServce);
        this.moduleRef.resolve("InvestorService").then(serv => { this.investorService = serv; }).catch(problem => {
            this.logger.error(`construct failed`, problem.stack);
        });
        this.moduleRef.resolve("ProjectService").then(serv => { this.projectService = serv }).catch(problem => {
            this.logger.error(`construct failed`, problem.stack);
        });
    }

    /**
     * set the user that is going to be making use of this service
     */
    setUserForRequest(user: UserIdentification) {
        super.setUserForRequest(user);
        this.investorService.setUserForRequest(user);
        this.projectService.setUserForRequest(user);
        this.orderService.setUserForRequest(user);
    }

    /**
     * ensure that we have all pipelines loaded
     */
    async ensureAllPipelines() {
        if (this.pipelines == null || this.pipelines == undefined) {
            let pipelineResult = await this.getApiClient().crm.pipelines.pipelinesApi.getAll(this.DEAL_OBJECT_TYPE);
            this.pipelines = pipelineResult.body.results;
            this.projects = await this.projectService.findAll(['issuer']);
        }
    }

    /**
     * try to update the specified property values in a deal
     * @param dealId The hubspot id of the deal
     * @param modifiedProperties the set of properties and their new value to assign into the orders deal
     */
    async updateDeal(dealId: string, modifiedProperties: any) {
        try {
            let objectUpdate = { 'properties': modifiedProperties };
            let propertiesText = JSON.stringify(objectUpdate);

            let updateUrl = `https://api.hubapi.com/deals/v1/deal/${dealId}`;
            this.logger.debug(`Deal ${dealId} updating at ${updateUrl} with ${propertiesText}`);
            let httpCall = this.httpService.put(updateUrl, objectUpdate,
                {
                    headers: { 'content-type': 'application/json' }
                    , params: { hapikey: this.hapikey }
                });

            const updateResponse = await httpCall.toPromise();
            this.logger.debug(`Deal ${dealId} update response = ${updateResponse.status}:${updateResponse.statusText}` /* :${JSON.stringify(updateResponse.data)} */);
        }
        catch (problem2) {
            this.exception(`Could not update Deal ${dealId} due to ${problem2}`);
            this.logger.error(`Could not update Deal ${dealId} due to ${problem2}`);
        }
    }

    /**
     * try to update the specified property values in the deal for the order. if the order does not have a related
     * deal yet, create a new one
     * @param order The order that the deal is for
     * @param modifiedProperties the set of properties and their new value to assign into the orders deal
     */
    async updateOrdersDeal(order: InvestmentOrder, modifiedProperties: any) {
        this.updateDeal(order.hubspot_dealid, modifiedProperties);
    }

    /**
     * try to create the specified property values in the deal for the order. if the order does not have a related
     * deal yet, create a new one
     * @param order The order that the deal is for
     * @param modifiedProperties the set of properties and their new value to assign into the orders deal
     * @returns the hubspot id for the newly created deal
     */
    async createOrdersDeal(order: InvestmentOrder, modifiedProperties: any): Promise<string> {
        let result = '';
        try {
            let investor = (order.user as unknown) as Investor;
            let contactId = investor.hubspot_vid;
            let objectUpdate = {
                "associations": {
                    "associatedVids": [contactId]
                }
                , 'properties': modifiedProperties
            };
            let propertiesText = JSON.stringify(objectUpdate);

            let updateUrl = `https://api.hubapi.com/deals/v1/deal`;
            this.logger.debug(`Order (${order.id}-${order.order_no}) creating at ${updateUrl} with ${propertiesText}`);

            let httpCall = this.httpService.post(updateUrl, objectUpdate,
                {
                    headers: { 'content-type': 'application/json' }
                    , params: { hapikey: this.hapikey }
                });

            const createResponse = await httpCall.toPromise();
            this.logger.debug(`Order (${order.id}-${order.order_no}) created response = ${createResponse.status}:${createResponse.statusText}` /* : ${JSON.stringify(createResponse.data)} */);
            if (order.hubspot_dealid == null) {
                this.logger.debug(`Order (${order.id}-${order.order_no}) updating order with response ${JSON.stringify(createResponse.data)}`);
                this.orderService.updatePartial({ 'hubspot_dealid': createResponse.data.dealId }, order.id);
                result = createResponse.data.dealId;
            }
            else
                result = order.hubspot_dealid;
        }
        catch (problem2) {
            this.exception(`Could not create Deal ${order.order_no} due to ${problem2}`);
            this.logger.error(`Could not create Deal ${order.order_no} due to ${problem2}`);
        }
        this.logger.debug(`Order (${order.id}-${order.order_no}) exit ${result}`);
        return result;
    }

    /**
     * try to save the specified property values in the deal for the order. if the order does not have a related
     * deal yet, create a new one
     * @param order The order that the deal is for
     * @param modifiedProperties the set of properties and their new value to assign into the orders deal
     * @returns the hubspot id of the deal
     */
    async saveOrdersDeal(order: InvestmentOrder, modifiedProperties: any): Promise<string> {
        this.logger.debug(`saveOrdersDeal enter(${order.id})`);
        let result = order.hubspot_dealid;
        if (order.hubspot_dealid == null || order.hubspot_dealid == undefined)
            result = await this.createOrdersDeal(order, modifiedProperties);
        else
            await this.updateOrdersDeal(order, modifiedProperties);
        this.logger.debug(`saveOrdersDeal exit(${order.id}) with ${result}`);
        return result;
    }

    /**
     * get the pipeline that a given order should be in
     * @param order - the order to get the pipeline for
     * @returns the pipeline the order should be in
     */
    async getPipeline(order: InvestmentOrder): Promise<hubspot.pipelinesModels.Pipeline> {
        await this.ensureAllPipelines();
        this.projects.forEach((project) => {
            if (order.project_id == project.id) {
                this.pipelines.forEach((pipeline) => {
                    if (pipeline.id == project.hubspot_id)
                        return pipeline;
                });
            }
        });
        return null;
    }

    /**
     * get a project by its id
     * @param projectId - the id of the project
     * @returns the project
     */
    async getProject(projectId: number): Promise<Project> {
        await this.ensureAllPipelines();
        for (let index = 0; index < this.projects.length; index++) {
            let project = this.projects[index];
            if (projectId == project.id) {
                return project;
            }
        }
        return null;
    }

    /**
     * get the name of the issuer for a given project
     * @param projectId - the id of the project
     * @returns the name of the issuer for that project
     */
    async getIssuer(projectId: number): Promise<string> {
        await this.ensureAllPipelines();
        for (let index = 0; index < this.projects.length; index++) {
            let project = this.projects[index];
            if (projectId == project.id) {
                //this.logger.debug(`getIssuer matched(${projectId} = ${JSON.stringify(project.issuer)})`);
                return project.issuer.name;
            }
        }
        return null;
    }

    /**
     * get the first stage in a pipeline
     * @param pipline - the pipeline to get the stage for
     * @returns the stage that is first in the order
     */
    getFirstPipelineStage(pipline: hubspot.pipelinesModels.Pipeline): hubspot.pipelinesModels.PipelineStage {
        pipline.stages.forEach((stage) => {
            if (stage.displayOrder == 0)
                return stage;
        });

        return null;
    }

    /**
     * compare the values for a given order to the related deal. if there are any differences update the deal
     * to match the order
     * @param orderId the id of the order that is supposed to be synched with the deal
     * @returns a list of problems encountered
     */
    async syncOrderById(orderId: number): Promise<Array<string>> {
        this.logger.debug(`syncOrderById enter(${orderId})`);
        this.emailCount = 0;
        this.errorsEncountered = new Array<string>();
        let order = await this.orderService.findOneById(orderId, ['user', 'project']);
        await this.checkOrder(order);
        this.logger.debug(`syncOrderById exit(${orderId})`);
        return this.errorsEncountered;
    }

    /**
     * add an assocition between a single deal and its project
     * @param order - the order that is supposed to be synched with the deal
     * @param dealId - the id of the deal in hubspot that is supposed to match the order
     */
    async addProjectDealAssociation(order: InvestmentOrder, dealId: string) {
        this.logger.debug(`addProjectDealAssociation(${order.id}) enter`);
        let project = (order.project as any) as Project;
        try {
            if (project.hubspot_id == null)
                throw RangeError(`Project ${project.id}-${Project.name} does not have a hubspot id`);
            let objectUpdate = { "inputs": [{ "from": { "id": dealId }, "to": { "id": project.hubspot_id }, "type": "project_to_deal" }] };
            let updateUrl = `https://api.hubspot.com/crm/v3/associations/deal/${this.projectCustomObjectId}/batch/create`;
            this.logger.debug(`addProjectDealAssociation(${order.id}-${order.order_no}) posting ${updateUrl} with ${JSON.stringify(objectUpdate)}`);
            let httpCall = this.httpService.post(updateUrl, objectUpdate,
                {
                    headers: { 'content-type': 'application/json' }
                    , params: { hapikey: this.hapikey }
                });

            const createResponse = await httpCall.toPromise();
            this.logger.debug(`addProjectDealAssociation(${order.id}-${order.order_no}) response = ${createResponse.status}:${createResponse.statusText} : ${JSON.stringify(createResponse.data)}`);
            if (createResponse.data.numErrors > 0 || createResponse.status != 201) {
                throw new Error(`Http add failed response = ${createResponse.status}:${JSON.stringify(createResponse.data)}`);
            }
        }
        catch (problem) {
            this.exception(`addProjectDealAssociation(${order.id}-${order.order_no}) with dealid:${dealId} and project id:${project.hubspot_id} failed due to ${problem}`);
            this.logger.error(`addProjectDealAssociation(${order.id}-${order.order_no}) with dealid:${dealId} and project id:${project.hubspot_id} failed due to ${problem}`);
        }

        this.logger.debug(`addProjectDealAssociation(${order.id}) exit`);
    }

    /**
     * get the association between a given deal and its project
     * @param order - the order that is supposed to be synched with the deal
     * @param dealId - the id of the deal in hubspot that is supposed to match the order
     */
    async getDealProjectAssociation(order: InvestmentOrder, dealId: string): Promise<string | null> {
        this.logger.debug(`getDealProjectAssociation(${order.id}) enter`);
        let result = null;
        try {
            let objectUpdate = { "inputs": [{ "id": dealId }] };
            let updateUrl = `https://api.hubspot.com/crm/v3/associations/deal/${this.projectCustomObjectId}/batch/read`;
            this.logger.debug(`getDealProjectAssociation(${order.id}-${order.order_no}) fetching ${updateUrl} with ${JSON.stringify(objectUpdate)}`);
            let httpCall = this.httpService.post(updateUrl, objectUpdate,
                {
                    headers: { 'content-type': 'application/json' }
                    , params: { hapikey: this.hapikey }
                });

            const findResponse = await httpCall.toPromise();
            this.logger.debug(`getDealProjectAssociation(${order.id}-${order.order_no}) response = ${findResponse.status}:${findResponse.statusText}` /* : ${JSON.stringify(createResponse.data)} */);

            if (findResponse.data.results != null && findResponse.data.results.length != 0)
                result = JSON.stringify(findResponse.data.results);
        }
        catch (problem) {
            this.exception(`getDealProjectAssociation(${order.id}-${order.order_no}) failed due to ${problem}`);
            this.logger.error(`getDealProjectAssociation(${order.id}-${order.order_no}) failed due to ${problem}`);
        }

        this.logger.debug(`getDealProjectAssociation(${order.id}) exit (${result})`);
        return result;
    }

    /**
     * make sure the order has the right associated objects (project)
     * @param order - the order that is supposed to be synched with the deal
     * @param dealId - the id of the deal in hubspot that is supposed to match the order
     */
    async syncOrderAssociations(order: InvestmentOrder, dealId: string) {
        this.logger.debug(`syncOrderAssociations(${order.id}-${dealId}) enter`);
        try {
            if (dealId != null) {
                // does the association exist?
                let associationId = await this.getDealProjectAssociation(order, dealId);
                if (associationId == null) {
                    this.logger.debug(`syncOrderAssociations(${order.id}) no existing assoc, adding`);
                    await this.addProjectDealAssociation(order, dealId);
                }
            }
        }
        catch (problem) {
            this.exception(`syncOrderAssociations(${order.id}-${order.order_no}) failed due to ${problem}`);
            this.logger.error(`syncOrderAssociations(${order.id}-${order.order_no}) failed due to ${problem}`);
        }

        this.logger.debug(`syncOrderAssociations(${order.id}) exit`);
    }

    /**
     * compare the values for a given order to the related deal. if there are any differences update the deal
     * to match the order
     * @param order the order that is supposed to be synched with the deal
     * @param deal the deal in hubspot that is supposed to match the order
     */
    async syncOrderProperties(order: InvestmentOrder, deal: hubspot.dealsModels.SimplePublicObject = null): Promise<any[]> {
        let modifiedProperties = Array();

        try {
            // NOTE: make sure the properties you want to compare are listed in the getbyid statement (where we get the contact
            // from hubspot). otherwise the value wont be retrieved, they have to be specifically listed
            let dealOrderId = (deal == null) ? null : deal.properties['order_id'];
            if (('' + order.id) != dealOrderId) {
                this.error(`Order (${order.id}-${order.order_no}) order_id mismatch ${order.id}-${dealOrderId}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) order_id mismatch ${order.id}-${dealOrderId}`);
                modifiedProperties.push({ 'name': 'order_id', 'value': '' + order.id });
            }

            let dealDealName = (deal == null) ? null : deal.properties['dealname'];
            if (dealDealName == null) {
                let investor = (order.user as unknown) as Investor;
                let dealName = decode(`${investor.first_name} ${investor.last_name}`);
                this.error(`Order (${order.id}-${order.order_no}) dealname mismatch ${dealName}-${dealDealName}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) dealname mismatch ${dealName}-${dealDealName}`);
                modifiedProperties.push({ 'name': 'dealname', 'value': dealName });
            }

            let project = await this.getProject(order.project_id);
            if (!project.sync_to_hubspot) {
                let orderPipelineId = '10644146';
                let dealPipelineId = (deal == null) ? null : deal.properties['pipeline'];
                if (orderPipelineId != dealPipelineId) {
                    this.error(`Order (${order.id}-${order.order_no}) pipeline mismatch ${orderPipelineId}-${dealPipelineId}`);
                    modifiedProperties.push({ 'name': 'pipeline', 'value': orderPipelineId });
                }
            }

            let md5Id = '';
            md5.string.quiet('' + order.id, function (err, md5) { md5Id = md5; });
            let cms_link = `https://cms.fundscraper.com/orders?ViewOrder&id=${md5Id}`;
            let contactLink = (deal == null) ? null : deal.properties['cms_link'];
            if (!this.stringsEqual(cms_link, contactLink)) {
                this.error(`Order (${order.id}-${order.order_no}) cms_link mismatch ${cms_link}-${contactLink}`);
                modifiedProperties.push({ 'name': 'cms_link', 'value': cms_link });
            }

            let dealOrderNo = (deal == null) ? null : deal.properties['order_no'];
            if (!this.stringsEqual(order.order_no, dealOrderNo)) {
                this.error(`Order (${order.id}-${order.order_no}) order_no mismatch ${order.order_no}-${dealOrderNo}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) order_no mismatch ${order.order_no}-${dealOrderNo}`);
                modifiedProperties.push({ 'name': 'order_no', 'value': order.order_no });
            }

            let dealProject = (deal == null) ? null : deal.properties['project'];
            if (('' + order.project_id) != dealProject) {
                this.error(`Order (${order.id}-${order.order_no}) project mismatch ${order.project_id}-${dealProject}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) project mismatch ${order.project_id}-${dealProject}`);
                modifiedProperties.push({ 'name': 'project', 'value': order.project_id });
            }

            //this.logger.log(`Order (${order.id}-${order.order_no}) issuer check ${issuerName}-${dealIssuer}`);
            let issuerName = await this.getIssuer(order.project_id);
            let dealIssuer = (deal == null) ? null : deal.properties['issuer'];
            if (!this.stringsEqual(issuerName, dealIssuer)) {
                this.error(`Order (${order.id}-${order.order_no}) issuer mismatch ${issuerName}-${dealIssuer}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) issuer mismatch ${issuerName}-${dealIssuer}`);
                modifiedProperties.push({ 'name': 'issuer', 'value': issuerName });
            }

            let dealAmount = (deal == null) ? null : deal.properties['amount'];
            if (('' + order.total_amount) != dealAmount) {
                this.error(`Order (${order.id}-${order.order_no}) amount mismatch ${order.total_amount}-${dealAmount}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) amount mismatch ${order.total_amount}-${dealAmount}`);
                modifiedProperties.push({ 'name': 'amount', 'value': order.total_amount });
            }

            let ownerValue = "34498426";
            let dealOwner = (deal == null) ? null : deal.properties['hubspot_owner_id'];
            if (dealOwner == null || dealOwner == '') {
                this.error(`Order (${order.id}-${order.order_no}) hubspot_owner_id mismatch ${ownerValue}-${dealOwner}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) hubspot_owner_id mismatch ${ownerValue}-${dealOwner}`);
                modifiedProperties.push({ 'name': 'hubspot_owner_id', 'value': ownerValue });
            }

            let dealTypeValue = "newbusiness";
            let dealDealType = (deal == null) ? null : deal.properties['dealtype'];
            if (dealTypeValue != dealDealType) {
                this.error(`Order (${order.id}-${order.order_no}) dealtype mismatch ${dealTypeValue}-${dealDealType}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) dealtype mismatch ${dealTypeValue}-${dealDealType}`);
                modifiedProperties.push({ 'name': 'dealtype', 'value': dealTypeValue });
            }

            let dealPayment = (deal == null) ? null : deal.properties['payment'];
            if ('' + order.payment != dealPayment) {
                this.error(`Order (${order.id}-${order.order_no}) payment mismatch ${order.payment}-${dealPayment}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) payment mismatch ${order.payment}-${dealPayment}`);
                modifiedProperties.push({ 'name': 'payment', 'value': order.payment });
            }

            let dealEscrowDate = (deal == null) ? null : deal.properties['escrow_date'];
            if (!this.datesEqualToDay(order.escrow_date, dealEscrowDate)) {
                this.error(`Order (${order.id}-${order.order_no}) escrow_date mismatch ${order.escrow_date}-${dealEscrowDate}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) escrow_date mismatch ${order.escrow_date}-${dealEscrowDate}`);
                modifiedProperties.push({ 'name': 'escrow_date', 'value': this.dateToHubspotTimestamp(order.escrow_date) });
            }

            let dealEscrowSettledDate = (deal == null) ? null : deal.properties['escrow_settled_date'];
            if (!this.datesEqualToDay(order.escrow_settled_date, dealEscrowSettledDate)) {
                this.error(`Order (${order.id}-${order.order_no}) escrow_settled_date mismatch ${order.escrow_settled_date}-${dealEscrowSettledDate}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) escrow_settled_date mismatch ${order.escrow_settled_date}-${dealEscrowSettledDate}`);
                modifiedProperties.push({ 'name': 'escrow_settled_date', 'value': this.dateToHubspotTimestamp(order.escrow_settled_date) });
            }

            let dealEntityType = (deal == null) ? null : deal.properties['entity_type'];
            if (!this.stringsEqual(order.entity_type.toString(), dealEntityType)) {
                this.error(`Order (${order.id}-${order.order_no}) entity_type mismatch ${order.entity_type}-${dealEntityType}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) entity_type mismatch ${order.entity_type}-${dealEntityType}`);
                modifiedProperties.push({ 'name': 'entity_type', 'value': order.entity_type });
            }

            let dealEntityId = (deal == null) ? null : deal.properties['entity_id'];
            if (!this.stringsEqual(order.entity_id, dealEntityId)) {
                this.error(`Order (${order.id}-${order.order_no}) entity_id mismatch ${order.entity_id}-${dealEntityId}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) entity_id mismatch ${order.entity_id}-${dealEntityId}`);
                modifiedProperties.push({ 'name': 'entity_id', 'value': order.entity_id });
            }

            let dealOrderPlacedDate = (deal == null) ? null : deal.properties['order_placed_date'];
            if (!this.datesEqualToDay(order.order_date, dealOrderPlacedDate)) {
                this.error(`Order (${order.id}-${order.order_no}) order_placed_date mismatch ${order.order_date}-${dealOrderPlacedDate}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) order_placed_date mismatch ${order.order_date}-${dealOrderPlacedDate}`);
                modifiedProperties.push({ 'name': 'order_placed_date', 'value': this.dateToHubspotTimestamp(order.order_date) });
            }

            let dealOrderStartDate = (deal == null) ? null : deal.properties['order_start_date'];
            if (!this.datesEqualToDay(order.createtime, dealOrderStartDate)) {
                this.error(`Order (${order.id}-${order.order_no}) order_start_date mismatch ${order.createtime}-${dealOrderStartDate}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) order_start_date mismatch ${order.createtime}-${dealOrderStartDate}`);
                modifiedProperties.push({ 'name': 'order_start_date', 'value': this.dateToHubspotTimestamp(order.createtime) });
            }

            let dealTradeDate = (deal == null) ? null : deal.properties['trade_date'];
            if (!this.datesEqualToDay(order.trade_date, dealTradeDate)) {
                this.error(`Order (${order.id}-${order.order_no}) trade_date mismatch ${order.trade_date}-${dealTradeDate}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) trade_date mismatch ${order.trade_date}-${dealTradeDate}`);
                modifiedProperties.push({ 'name': 'trade_date', 'value': this.dateToHubspotTimestamp(order.trade_date) });
            }

            let orderStatusText = (order.status == null) ? '' : InvestmentOrderStatus_friendlyText[order.status];
            let dealOrderStatus = (deal == null) ? null : deal.properties['order_status'];
            if (orderStatusText != dealOrderStatus) {
                this.error(`Order (${order.id}-${order.order_no}) dealtype mismatch ${orderStatusText}-${dealOrderStatus}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) dealtype mismatch ${orderStatusText}-${dealOrderStatus}`);
                modifiedProperties.push({ 'name': 'order_status', 'value': orderStatusText });
            }

            let dealIsDeleted = (deal == null) ? 0 : deal.properties['is_deleted'] == '1';
            if (!this.boolEqual(order.is_deleted, dealIsDeleted)) {
                this.error(`Order (${order.id}-${order.order_no}) is_deleted mismatch ${order.is_deleted}-${dealIsDeleted}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) is_deleted mismatch ${order.is_deleted}-${dealIsDeleted}`);
                modifiedProperties.push({ 'name': 'is_deleted', 'value': (order.is_deleted) ? 1 : 0 });
            }

            let project_projected_annual_return = (deal == null) ? '' : deal.properties['project_projected_annual_return'];
            if (!this.stringsEqual('' + project.annual_irr, project_projected_annual_return)) {
                this.error(`Order (${order.id}-${order.order_no}) project_projected_annual_return mismatch ${project.annual_irr}-${project_projected_annual_return}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) project_projected_annual_return mismatch ${project.annual_irr}-${project_projected_annual_return}`);
                modifiedProperties.push({ 'name': 'project_projected_annual_return', 'value': '' + project.annual_irr });
            }

            let project_loan_to_value_ratio = (deal == null) ? '' : deal.properties['project_loan_to_value_ratio'];
            if (!this.stringsEqual('' + project.loan_to_value_ratio, project_loan_to_value_ratio)) {
                this.error(`Order (${order.id}-${order.order_no}) project_loan_to_value_ratio mismatch ${project.loan_to_value_ratio}-${project_loan_to_value_ratio}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) project_loan_to_value_ratio mismatch ${project.loan_to_value_ratio}-${project_loan_to_value_ratio}`);
                modifiedProperties.push({ 'name': 'project_loan_to_value_ratio', 'value': '' + project.loan_to_value_ratio });
            }

            let project_investment_term = (deal == null) ? '' : deal.properties['project_investment_term'];
            if (!this.stringsEqual('' + project.investment_term, project_investment_term)) {
                this.error(`Order (${order.id}-${order.order_no}) project_investment_term mismatch ${project.investment_term}-${project_investment_term}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) project_investment_term mismatch ${project.investment_term}-${project_investment_term}`);
                modifiedProperties.push({ 'name': 'project_investment_term', 'value': '' + project.investment_term });
            }

            let project_maturity_date = (deal == null) ? '' : deal.properties['project_maturity_date'];
            if (!this.stringsEqual('' + project.maturity_date, project_maturity_date)) {
                this.error(`Order (${order.id}-${order.order_no}) project_maturity_date mismatch ${project.maturity_date}-${project_maturity_date}`);
                this.logger.log(`Order (${order.id}-${order.order_no}) project_maturity_date mismatch ${project.maturity_date}-${project_maturity_date}`);
                modifiedProperties.push({ 'name': 'project_maturity_date', 'value': '' + project.maturity_date });
            }

        }
        catch (problem) {
            this.exception(`Problems operating on ${order.id}-${order.order_no}) due to ${problem}`);
            this.logger.error(`Problems operating on ${order.id}-${order.order_no}) due to ${problem}`);
        }

        return modifiedProperties;
    }

    /**
     * compare the values for a given order to the related deal. if there are any differences update the deal
     * to match the order
     * @param order the order that is supposed to be synched with the deal
     * @param deal the deal in hubspot that is supposed to match the order
     * @returns the hubspot id of the dea
     */
    async syncOrder(order: InvestmentOrder, deal: hubspot.dealsModels.SimplePublicObject = null): Promise<string> {
        this.logger.debug(`syncOrder enter(${order.id})`);

        // sync all the simple properties
        let modifiedProperties = await this.syncOrderProperties(order, deal);

        // any properties changed?
        let dealId = order.hubspot_dealid;
        if (Object.keys(modifiedProperties).length > 0) {
            dealId = await this.saveOrdersDeal(order, modifiedProperties);
        }

        // make sure the associations are correct
        await this.syncOrderAssociations(order, dealId);

        this.logger.debug(`syncOrder exit(${order.id}) with ${dealId}`);
        return dealId;
    }

    /**
     * for the given order, find a matching deal or create a new one
     * @param order - the order to ensure a deal is present for
     */
    async matchOrCreateOrder(order: InvestmentOrder) {
        // see if there is a deal with the same order_id but without an associated order
        let searchResults = await this.findDealByOrderId(order.id);

        if (searchResults == null || searchResults.body.total == 0) {
            // if no match, create a new one by passing in null for the existing deal
            this.error(`Order (${order.id}-${order.order_no}) could not find match for ${order.id}`);

            // check if we should be the one creating the order, we need to guard
            let localId = Math.round(Math.random() * 10000000);
            let sql = `update 
                        fs4.investment_orders 
                    set 
                        hubspot_creation = ${localId}
                    where 
                        id = ${order.id}
                        and (hubspot_creation = 0 or DATEDIFF(minute, updatetime, getdate()) > 10 )`;
            await this.investorService.query(sql);

            let reReadOrder = await this.orderService.findOneById(order.id, ['user', 'project']);
            // proceed if its ours
            if (reReadOrder.hubspot_creation == localId)
                await this.syncOrder(reReadOrder);
            else
                this.error(`Order (${order.id}-${order.order_no}) NOT creating deal for ${order.id}, creation guard ${reReadOrder.hubspot_creation}-${localId}`);
        }
        else {
            this.error(`Order (${order.id}-${order.order_no}) found match for ${order.id} in ${searchResults.body.results[0].id}`);
            this.orderService.updatePartial({ 'hubspot_dealid': searchResults.body.results[0].id }, order.id);
        }
    }

    /**
     * find a deal that is for the same investor and in the same pipeline
     * @param order - the order to ensure a deal is present for
     */
    async findUnattachedDealInPipeline(order: InvestmentOrder) {
        this.logger.debug(`findUnattachedDealInPipeline enter(${order.id})`);

        // what pipeline id?
        let pipeline = await this.getPipeline(order);
        if (pipeline == null || pipeline === undefined)
            return;
        let pipelineId = pipeline.id;

        // contact id from investor
        let investor = order.user as unknown as Investor;
        if (investor == null || investor === undefined)
            return;
        let contactId = investor.hubspot_vid;

        // search
        let params = new hubspot.dealsModels.PublicObjectSearchRequest();
        let pipelineFilter = new hubspot.dealsModels.Filter();
        pipelineFilter.propertyName = 'pipeline';
        pipelineFilter.operator = hubspot.dealsModels.Filter.OperatorEnum.EQ;
        pipelineFilter.value = pipelineId;
        let contactFilter = new hubspot.dealsModels.Filter();
        contactFilter.propertyName = 'associations.contact';
        contactFilter.operator = hubspot.dealsModels.Filter.OperatorEnum.EQ;
        contactFilter.value = contactId;
        let orderFilter = new hubspot.dealsModels.Filter();
        orderFilter.propertyName = 'order_id';
        orderFilter.operator = hubspot.dealsModels.Filter.OperatorEnum.NOTHASPROPERTY;

        let filterGroup = new hubspot.dealsModels.FilterGroup();
        filterGroup.filters = [pipelineFilter, contactFilter, orderFilter];
        params.filterGroups = [filterGroup];
        params.limit = 10;

        try {
            let searchResult = await this.getApiClient().crm.deals.searchApi.doSearch(params);
            this.logger.debug(`findUnattachedDealInPipeline exit(${order.id}) results are ${JSON.stringify(searchResult)}`);
            return searchResult;
        }
        catch (problem) {
            this.exception(`Search deals for ${order.id} failed due to ${problem}`);
            this.logger.error(`Search deals for ${order.id} failed due to ${problem}`);
            return null;
        }
        finally {
            this.logger.debug(`findUnattachedDealInPipeline exit(${order.id})`);
        }
    }

    /**
     * find all deals that have the given order_id
     * @param orderId - the order_id to search for
     * @return
     */
    async findDealByOrderId(orderId: number): Promise<{ response: any; body: hubspot.dealsModels.CollectionResponseWithTotalSimplePublicObject; }> {
        this.logger.debug(`findDealByOrderId enter(${orderId})`);

        let params = new hubspot.dealsModels.PublicObjectSearchRequest();
        let filter = new hubspot.dealsModels.Filter();
        filter.propertyName = 'order_id';
        filter.operator = hubspot.dealsModels.Filter.OperatorEnum.EQ;
        filter.value = '' + orderId;
        params.limit = 10;
        let filterGroup = new hubspot.dealsModels.FilterGroup();
        filterGroup.filters = [filter];
        params.filterGroups = [filterGroup];

        try {
            let searchResult = await this.getApiClient().crm.deals.searchApi.doSearch(params);
            this.logger.debug(`findDealByOrderId exit(${orderId}) results are ${JSON.stringify(searchResult)}`);
            return searchResult;
        }
        catch (problem) {
            this.exception(`Search deals for ${orderId} failed due to ${problem}`);
            this.logger.error(`Search deals for ${orderId} failed due to ${problem}`);
            return null;
        }
        finally {
            this.logger.debug(`findDealByOrderId exit(${orderId})`);
        }
    }

    /**
     * get a single deal based on its id
     * @param dealId the id of the deal to get
     * @returns the detail with a specified set of properties loaded, it is NOT all properties
     */
    async getDealById(dealId: string): Promise<hubspot.dealsModels.SimplePublicObject> {

        let deal = await this.getApiClient().crm.deals.basicApi.getById(dealId, [
            'dealname', 'pipeline', 'dealstage'
            , 'order_id', 'order_no', 'amount', 'hubspot_owner_id'
            , 'dealtype', 'payment', 'escrow_date', 'escrow_settled_date', 'entity_type', 'entity_id'
            , 'order_placed_date', 'order_start_date', 'cms_link'
            , 'trade_date', 'is_deleted', 'order_status', 'project', 'issuer'
            , 'project_projected_annual_return'
            , 'project_loan_to_value_ratio'
            , 'project_investment_term'
            , 'project_maturity_date'
        ], ['contact']);

        return deal.body;
    }

    /**
     * check the validity of 1 database order with corresponding deals in hubspot
     * @param order the order to check
     */
    async checkOrder(order: InvestmentOrder) {
        this.logger.debug(`checkOrder enter(${order.id} ${order.order_no})`);
        try {
            if (order.hubspot_dealid == null) {
                this.logger.error(`Order (${order.id}) does not have a hubspot id`);
                let contact = new hubspot.dealsModels.SimplePublicObject();
                await this.matchOrCreateOrder(order);
            }
            else {
                this.logger.debug(`checkOrder(${order.id} ${order.order_no}) searching for ${order.hubspot_dealid}`);
                try {
                    let deal = await this.getDealById(order.hubspot_dealid);
                    let dealId = (deal !== null) ? deal['id'] : 0;
                    this.logger.debug(`checkOrder Retrieved ${deal.properties['order_id']} hubspot id ${dealId}`);
                    await this.syncOrder(order, deal);
                }
                catch (problem) {
                    if (problem.response.statusCode == 404) {
                        this.logger.log(`checkOrder(${order.id} ${order.order_no}) deal ${order.hubspot_dealid} not found (404)`);
                        this.error(`Deal ${order.hubspot_dealid} not found (404) for order ${order.id}`);
                        let dealSearch = await this.findDealByOrderId(order.id);
                        if (dealSearch == null) {
                            // this means the serch failed, dont do anything until we get results saying there is nothing or something
                        }
                        else if (dealSearch.body.total == 0) {
                            this.logger.log(`checkOrder(${order.id} ${order.order_no}) with missing hubspot id ${order.hubspot_dealid} found no alternates, clearing id`);
                            this.error(`checkOrder(${order.id} ${order.order_no}) with missing hubspot id ${order.hubspot_dealid} found no alternates, clearing id`);
                            this.orderService.updatePartial({ 'hubspot_dealid': null }, order.id);
                        }
                        else if (dealSearch.body.total == 1) {
                            let deal = dealSearch.body.results[0];
                            this.logger.log(`checkOrder(${order.id} ${order.order_no}) with missing hubspot id ${order.hubspot_dealid} found alternate match with ${deal.id}`);
                            this.exception(`checkOrder(${order.id} ${order.order_no}) with missing hubspot id ${order.hubspot_dealid} found alternate match with ${deal.id}`);
                            this.orderService.updatePartial({ 'hubspot_dealid': deal.id }, order.id);
                        }
                        else {
                            this.logger.log(`checkOrder(${order.id} ${order.order_no}) with missing hubspot id ${order.hubspot_dealid} multiple ${dealSearch.body.total} alternates found `);
                            this.exception(`checkOrder(${order.id} ${order.order_no}) with missing hubspot id ${order.hubspot_dealid} multiple ${dealSearch.body.total} alternates found `);
                        }
                    }
                    else {
                        this.logger.error(`checkOrder(${order.id} ${order.order_no}) could not retrieve ${order.hubspot_dealid} due to ${JSON.stringify(problem)}`);
                        this.error(`Could not retrieve Deal for order ${order.id} from hubspot id ${order.hubspot_dealid} due to ${problem}`);
                    }
                }
            }
        }
        catch (problem) {
            this.exception(`checkOrder (${order.id} ${order.order_no}) failed due to ${problem} - ${JSON.stringify(problem)}`);
            this.logger.error(`checkOrder (${order.id} ${order.order_no}) failed due to ${problem} - ${JSON.stringify(problem)}`);
            return null;
        }
        finally {
            this.logger.debug(`checkOrder exit(${order.id} ${order.order_no})`);
        }
    }

    /**
     * find the next page of deals after the given paging token
     * @param pageToken - the hubspot token for the page to get
     * @return
     */
    async getBatchOfDeals(pageToken = undefined): Promise<hubspot.dealsModels.SimplePublicObject[]> {
        this.logger.debug(`getBatchOfDeals enter(${pageToken})`);
        let limit = 10;

        try {
            //"paging":{"next":{"after":"519492339"
            //,"link":"https://api.hubapi.com/crm/v3/objects/deals?after=519492339"},"prev":null}}
            let httpCall = await this.httpService.get('https://api.hubapi.com/crm/v3/objects/deals',
                {
                    /*headers: {'content-type' : 'application/json'}
                    , */
                    params: {
                        hapikey: this.hapikey
                        , properties: 'dealname,pipeline,dealstage,order_id,order_no,amount,hubspot_owner_id,dealtype,payment,escrow_date,escrow_settled_date,entity_type,entity_id,order_placed_date,order_start_date,trade_date,order_status,is_deleted,project,project_projected_annual_return,project_loan_to_value_ratio,project_investment_term,project_maturity_date'
                        , associations: 'contact'
                        , limit: limit
                        , after: pageToken
                    }
                });
            const response = await httpCall.toPromise();

            //this.logger.log(`getBatchOfDeals exit(${pageToken}) results are total: ${response.status} data ${JSON.stringify(response.data)}`);
            this.logger.debug(`getBatchOfDeals(${pageToken}) results are total: ${response.data.results.length} status: ${response.status}`);
            return response.data;
        }
        catch (problem) {
            this.exception(`Search deals for ${pageToken} failed due to ${problem} - ${JSON.stringify(problem)}`);
            this.logger.error(`Search deals for ${pageToken} failed due to ${problem} - ${JSON.stringify(problem)}`);
            return null;
        }
        finally {
            this.logger.debug(`getBatchOfDeals exit(${pageToken})`);
        }
    }

    /**
     * check the validity of a deal
     * @param deal the deal to check
     */
    async checkDeal(deal: any) {
        this.logger.log(`checkDeal(${deal['id']}) enter`);
        try {
            //this.logger.log(`checkDeal(${deal['id']}) enter ${JSON.stringify(deal.properties)}`);
            let order_id = deal.properties['order_id'];
            if (order_id > 0) {
                this.logger.debug(`checkDeal(${deal['id']}) trying to get order ${order_id}`);

                // there is an order_id so it should match an order, get it and check
                let matchingOrders = await this.orderService.findAllByFilter(`id = ${order_id}`);
                if (matchingOrders.length == 1) {
                    // there is a matching order, is its deal id set?
                    let matchingOrder = matchingOrders[0];
                    if (matchingOrder.hubspot_dealid == null || matchingOrder.hubspot_dealid == undefined) {
                        // nope, set the deal id
                        this.logger.log(`checkDeal(${deal['id']}) order ${matchingOrder.id} did not have dealid set, updating`);
                        await this.orderService.updatePartial({ 'hubspot_dealid': deal['id'] }, matchingOrder.id);
                    }
                    else if (matchingOrder.hubspot_dealid != deal['id']) {
                        this.exception(`checkDeal(${deal['id']}) order ${matchingOrder.id} points to different deal ${matchingOrder.hubspot_dealid}`);
                        this.logger.log(`checkDeal(${deal['id']}) order ${matchingOrder.id} points to different deal ${matchingOrder.hubspot_dealid}`);

                        // disconnect the deal
                        let modifiedProperties = Array();
                        modifiedProperties.push({ 'name': 'order_id', 'value': '' });
                        this.updateDeal(deal['id'], modifiedProperties);
                    }
                }
            }
            else
                this.logger.debug(`checkDeal(${deal['id']}) order_id not set`);
        }
        catch (problem) {
            this.exception(`checkDeal(${deal['id']}) failed due to ${problem} - ${JSON.stringify(problem)}`);
            this.logger.error(`checkDeal(${deal['id']}) failed due to ${problem} - ${JSON.stringify(problem)}`);
            return null;
        }
        finally {
            this.logger.debug(`checkDeal(${deal['id']}) exit`);
        }
    }

    /**
     * create a new order from a provided deal
     * @param dealId the id of the deal to create the order from
     */
    async createOrderFromDeal(dealId: string): Promise<InvestmentOrder> {

        this.logger.log(`createOrderFromDeal(${dealId}) enter`);
        try {
            // does the deal exist in the db already
            let existingOrder = await this.orderService.findAllByFilter('hubspot_dealid = @dlid', { 'dlid': dealId });
            if (existingOrder != null && existingOrder.length > 0) {
                this.logger.debug(`createOrderFromDeal(${dealId}) exit - deal exists`);
                return existingOrder[0];
            }

            let deal = await this.getDealById(dealId);
            if (deal.associations != null && deal.associations.contacts != null && deal.associations.contacts.results != null) {
                let contactId = deal.associations.contacts.results[0].id;
                let project = await this.projectService.findOneById(deal.properties['project']);
                if (project == null) {
                    this.exception(`createOrderFromDeal(${dealId}) failed due to no related project - ${JSON.stringify(deal)}`);
                    this.logger.error(`createOrderFromDeal(${dealId}) failed due to related project - ${JSON.stringify(deal)}`);
                }
                let contact = await this.contactService.getContactById(contactId);
                let order = new InvestmentOrder();

                //order.status = InvestmentOrderStatus.started; this doesnt work????
                order.status = 0;
                order.user_id = parseInt(contact.properties['user_id']);
                order.project_id = parseInt(deal.properties['project']);
                order.total_amount = parseInt(deal.properties['amount']);
                order.hubspot_creation = 2;
                order.hubspot_dealid = dealId;
                order.share_price = project.share_price;
                order.number_of_shares = order.total_amount / order.share_price;
                order.issuer_id = project.issuer_id;

                //this.logger.debug(`createOrderFromDeal(${dealId}) trying to create(${JSON.stringify(order)})`);
                let result = await this.orderService.create(order);

                this.logger.debug(`createOrderFromDeal(${dealId}) created(${JSON.stringify(result)})`);
                return result;
            }
            else
                this.logger.debug(`createOrderFromDeal(${dealId}) no associations found, no contact(${JSON.stringify(deal)})`);
        }
        catch (problem) {
            this.exception(`createOrderFromDeal(${dealId}) failed due to ${problem} - ${JSON.stringify(problem)}`);
            this.logger.error(`createOrderFromDeal(${dealId}) failed due to ${problem} - ${JSON.stringify(problem)}`);
            return null;
        }
        finally {
            this.logger.debug(`createOrderFromDeal(${dealId}) exit`);
        }
    }

    /**
     * go through the orders one by one and make sure the data in the cms matches hubspot
     * @returns an array of errors that were encountered
     */
    async checkAllDeals(): Promise<Array<string>> {
        this.logger.log('checkAllDeals() enter');
        this.emailCount = 0;
        this.errorsEncountered = new Array<string>();
        let request = await this.getBatchOfDeals();

        //"paging":{"next":{"after":"519492339"
        //,"link":"https://api.hubapi.com/crm/v3/objects/deals?after=519492339"},"prev":null}}
        let paging = (request == null) ? undefined : request['paging'];
        let next = (paging == undefined) ? undefined : paging['next'];
        let after = (next == undefined) ? undefined : next['after'];
        this.logger.debug(`checkAllDeals query returned (${after})`);
        let deals = request['results'];

        while (request != undefined && request['results'].length > 0) {
            Promise.all(deals.map(async (deal) => {
                try {
                    this.checkDeal(deal);
                }
                catch (problem) {
                    this.exception(`checkAllDeals(${deal['id']}) failed due to ${problem} - ${JSON.stringify(problem)}`);
                    this.logger.error(`checkAllDeals(${deal['id']}) failed due to ${problem} - ${JSON.stringify(problem)}`);
                    return null;
                }
            }));

            request = await this.getBatchOfDeals(after);
            paging = (request == null) ? undefined : request['paging'];
            next = (paging == undefined) ? undefined : paging['next'];
            after = (next == undefined) ? undefined : next['after'];
            deals = (request == undefined) ? undefined : request['results'];
        }

        this.logger.log('checkAllDeals() exit');
        this.logger.log(JSON.stringify(this.errorsEncountered));
        return this.errorsEncountered;
    }

    /**
     * go through the orders one by one and make sure the data in the cms matches hubspot
     * @returns an array of errors that were encountered
     */
    async checkAllOrders(): Promise<Array<string>> {
        this.logger.log(`checkAllOrders enter`);

        this.emailCount = 0;
        this.errorsEncountered = new Array<string>();
        await this.ensureAllPipelines();

        let page = 1;
        let allOrders = await this.orderService.findAllByFilter(null, null, ['user', 'project'], ['investment_orders.id desc'], page, 100);
        while (allOrders.length > 0) {

            //this.logger.debug(`checkAllOrders read_batch_list = ${JSON.stringify(allOrders)}`);
            let batchSize = 1;
            while (allOrders.length > 0) {
                let batch = allOrders.splice(0, batchSize);
                //this.logger.debug(`checkAllOrders splice_batch_list = ${JSON.stringify(batch)}`);
                await Promise.all(batch.map(async (order) => {
                    //this.logger.debug(`checkAllOrders promise_list = ${order.id}`);
                    //this.logger.debug(`checkAllOrders individual_list = ${order.id}`);
                    try {
                        await this.checkOrder(order);
                        this.logger.debug(`checkAllOrders now has ${this.errorsEncountered.length}`);
                    }
                    catch (problem) {
                        this.exception(`checkAllOrders(${order['id']}) failed due to ${problem} - ${JSON.stringify(problem)}`);
                        this.logger.error(`checkAllOrders(${order['id']}) failed due to ${problem} - ${JSON.stringify(problem)}`);
                    }
                }));
            }
            page++;
            allOrders = await this.orderService.findAllByFilter(null, null, ['user', 'project'], ['investment_orders.id desc'], page, 100);
        }

        this.logger.log(`checkAllOrders exit`);
        this.logger.log(JSON.stringify(this.errorsEncountered));
        return this.errorsEncountered;
    }
}