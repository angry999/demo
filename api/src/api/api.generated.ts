import { AbstractController } from './AbstractController';
import { Controller, Get, Post, Put, Delete, Body, Param, Query, Injectable, Scope, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiParam, ApiBody, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { ProjectTaxSummary } from '../model/ProjectTaxSummary.entity.generated';
import { ProjectTaxSummaryService } from '../bll/ProjectTaxSummary.service';
import { Project } from '../model/Project.entity.generated';
import { ProjectService } from '../bll/Project.service';
import { ProjectInterest } from '../model/ProjectInterest.entity.generated';
import { ProjectInterestService } from '../bll/ProjectInterest.service';
import { Province } from '../model/Province.entity.generated';
import { ProvinceService } from '../bll/Province.service';
import { RegistrationQuestion } from '../model/RegistrationQuestion.entity.generated';
import { RegistrationQuestionService } from '../bll/RegistrationQuestion.service';
import { RoedSchedule1 } from '../model/RoedSchedule1.entity.generated';
import { RoedSchedule1Service } from '../bll/RoedSchedule1.service';
import { Setting } from '../model/Setting.entity.generated';
import { SettingService } from '../bll/Setting.service';
import { SupportEngineer } from '../model/SupportEngineer.entity.generated';
import { SupportEngineerService } from '../bll/SupportEngineer.service';
import { UserIssuerAssociation } from '../model/UserIssuerAssociation.entity.generated';
import { UserIssuerAssociationService } from '../bll/UserIssuerAssociation.service';
import { UserRelationship } from '../model/UserRelationship.entity.generated';
import { UserRelationshipService } from '../bll/UserRelationship.service';
import { UserBankingDetails } from '../model/UserBankingDetails.entity.generated';
import { UserBankingDetailsService } from '../bll/UserBankingDetails.service';
import { UserFinancialKyc } from '../model/UserFinancialKyc.entity.generated';
import { UserFinancialKycService } from '../bll/UserFinancialKyc.service';
import { UserEntity } from '../model/UserEntity.entity.generated';
import { UserEntityService } from '../bll/UserEntity.service';
import { AllUser } from '../model/AllUser.entity.generated';
import { AllUserService } from '../bll/AllUser.service';
import { UserInvitation } from '../model/UserInvitation.entity.generated';
import { UserInvitationService } from '../bll/UserInvitation.service';
import { BackgroundProcess } from '../model/BackgroundProcess.entity.generated';
import { BackgroundProcessService } from '../bll/BackgroundProcess.service';
import { UserPdf } from '../model/UserPdf.entity.generated';
import { UserPdfService } from '../bll/UserPdf.service';
import { Country } from '../model/Country.entity.generated';
import { CountryService } from '../bll/Country.service';
import { UserAnswer } from '../model/UserAnswer.entity.generated';
import { UserAnswerService } from '../bll/UserAnswer.service';
import { Event } from '../model/Event.entity.generated';
import { EventService } from '../bll/Event.service';
import { UserRequest } from '../model/UserRequest.entity.generated';
import { UserRequestService } from '../bll/UserRequest.service';
import { FfbaAssociation } from '../model/FfbaAssociation.entity.generated';
import { FfbaAssociationService } from '../bll/FfbaAssociation.service';
import { SocialProfileFollowing } from '../model/SocialProfileFollowing.entity.generated';
import { SocialProfileFollowingService } from '../bll/SocialProfileFollowing.service';
import { ImportedContact } from '../model/ImportedContact.entity.generated';
import { ImportedContactService } from '../bll/ImportedContact.service';
import { UserSocialPost } from '../model/UserSocialPost.entity.generated';
import { UserSocialPostService } from '../bll/UserSocialPost.service';
import { UserSocialProfile } from '../model/UserSocialProfile.entity.generated';
import { UserSocialProfileService } from '../bll/UserSocialProfile.service';
import { InvestmentOrder } from '../model/InvestmentOrder.entity.generated';
import { InvestmentOrderService } from '../bll/InvestmentOrder.service';
import { UserSubscription } from '../model/UserSubscription.entity.generated';
import { UserSubscriptionService } from '../bll/UserSubscription.service';
import { InvestmentTransaction } from '../model/InvestmentTransaction.entity.generated';
import { InvestmentTransactionService } from '../bll/InvestmentTransaction.service';
import { WebHook } from '../model/WebHook.entity.generated';
import { WebHookService } from '../bll/WebHook.service';
import { InvestmentWatchlist } from '../model/InvestmentWatchlist.entity.generated';
import { InvestmentWatchlistService } from '../bll/InvestmentWatchlist.service';
import { InvestmentWithdrawal } from '../model/InvestmentWithdrawal.entity.generated';
import { InvestmentWithdrawalService } from '../bll/InvestmentWithdrawal.service';
import { OrderAcknowledgement } from '../model/OrderAcknowledgement.entity.generated';
import { OrderAcknowledgementService } from '../bll/OrderAcknowledgement.service';
import { OrderAcknowledgementQuestion } from '../model/OrderAcknowledgementQuestion.entity.generated';
import { OrderAcknowledgementQuestionService } from '../bll/OrderAcknowledgementQuestion.service';
import { InvestorEarning } from '../model/InvestorEarning.entity.generated';
import { InvestorEarningService } from '../bll/InvestorEarning.service';
import { InvestorIntendedTrades } from '../model/InvestorIntendedTrades.entity.generated';
import { InvestorIntendedTradesService } from '../bll/InvestorIntendedTrades.service';
import { Mail } from '../model/Mail.entity.generated';
import { MailService } from '../bll/Mail.service';
import { Menu } from '../model/Menu.entity.generated';
import { MenuService } from '../bll/Menu.service';
import { ModuleAccess } from '../model/ModuleAccess.entity.generated';
import { ModuleAccessService } from '../bll/ModuleAccess.service';
import { AdminModule } from '../model/AdminModule.entity.generated';
import { AdminModuleService } from '../bll/AdminModule.service';
import { ProjectAccount } from '../model/ProjectAccount.entity.generated';
import { ProjectAccountService } from '../bll/ProjectAccount.service';
import { ProfileBackground } from '../model/ProfileBackground.entity.generated';
import { ProfileBackgroundService } from '../bll/ProfileBackground.service';
import { ProjectDocusignMapping } from '../model/ProjectDocusignMapping.entity.generated';
import { ProjectDocusignMappingService } from '../bll/ProjectDocusignMapping.service';
import { ProjectBalanceAdjustment } from '../model/ProjectBalanceAdjustment.entity.generated';
import { ProjectBalanceAdjustmentService } from '../bll/ProjectBalanceAdjustment.service';
import { ProjectEntity } from '../model/ProjectEntity.entity.generated';
import { ProjectEntityService } from '../bll/ProjectEntity.service';
import { ProjectEntityDetail } from '../model/ProjectEntityDetail.entity.generated';
import { ProjectEntityDetailService } from '../bll/ProjectEntityDetail.service';
import { ProjectImage } from '../model/ProjectImage.entity.generated';
import { ProjectImageService } from '../bll/ProjectImage.service';
import { ProjectKeybacker } from '../model/ProjectKeybacker.entity.generated';
import { ProjectKeybackerService } from '../bll/ProjectKeybacker.service';
import { ProjectPdf } from '../model/ProjectPdf.entity.generated';
import { ProjectPdfService } from '../bll/ProjectPdf.service';
import { ExemptDistributionOption } from '../model/ExemptDistributionOption.entity.generated';
import { ExemptDistributionOptionService } from '../bll/ExemptDistributionOption.service';
import { ProjectStatusReport } from '../model/ProjectStatusReport.entity.generated';
import { ProjectStatusReportService } from '../bll/ProjectStatusReport.service';
import { ProjectTaxReport } from '../model/ProjectTaxReport.entity.generated';
import { ProjectTaxReportService } from '../bll/ProjectTaxReport.service';
import { AdminUser } from '../model/AdminUser.entity.generated';
import { AdminUserService } from '../bll/AdminUser.service';
import { AllUserAnswer } from '../model/AllUserAnswer.entity.generated';
import { AllUserAnswerService } from '../bll/AllUserAnswer.service';
import { ComputedAccountBalance } from '../model/ComputedAccountBalance.entity.generated';
import { ComputedAccountBalanceService } from '../bll/ComputedAccountBalance.service';
import { ComputedAccountIncome } from '../model/ComputedAccountIncome.entity.generated';
import { ComputedAccountIncomeService } from '../bll/ComputedAccountIncome.service';
import { ComputedAccountPosition } from '../model/ComputedAccountPosition.entity.generated';
import { ComputedAccountPositionService } from '../bll/ComputedAccountPosition.service';
import { ComputedAccountTotalIncome } from '../model/ComputedAccountTotalIncome.entity.generated';
import { ComputedAccountTotalIncomeService } from '../bll/ComputedAccountTotalIncome.service';
import { ComputedProjectBalance } from '../model/ComputedProjectBalance.entity.generated';
import { ComputedProjectBalanceService } from '../bll/ComputedProjectBalance.service';
import { ComputedProjectIncome } from '../model/ComputedProjectIncome.entity.generated';
import { ComputedProjectIncomeService } from '../bll/ComputedProjectIncome.service';
import { ComputedProjectPosition } from '../model/ComputedProjectPosition.entity.generated';
import { ComputedProjectPositionService } from '../bll/ComputedProjectPosition.service';
import { ComputedProjectTotalIncome } from '../model/ComputedProjectTotalIncome.entity.generated';
import { ComputedProjectTotalIncomeService } from '../bll/ComputedProjectTotalIncome.service';
import { InvestorCobranding } from '../model/InvestorCobranding.entity.generated';
import { InvestorCobrandingService } from '../bll/InvestorCobranding.service';
import { InvestorSocialProfile } from '../model/InvestorSocialProfile.entity.generated';
import { InvestorSocialProfileService } from '../bll/InvestorSocialProfile.service';
import { Investor } from '../model/Investor.entity.generated';
import { InvestorService } from '../bll/Investor.service';
import { IssuerAdmin } from '../model/IssuerAdmin.entity.generated';
import { IssuerAdminService } from '../bll/IssuerAdmin.service';
import { NotableInvestorProfile } from '../model/NotableInvestorProfile.entity.generated';
import { NotableInvestorProfileService } from '../bll/NotableInvestorProfile.service';
import { PropertySocialProfile } from '../model/PropertySocialProfile.entity.generated';
import { PropertySocialProfileService } from '../bll/PropertySocialProfile.service';
import { SponsorSocialProfile } from '../model/SponsorSocialProfile.entity.generated';
import { SponsorSocialProfileService } from '../bll/SponsorSocialProfile.service';
import { UserBasic } from '../model/UserBasic.entity.generated';
import { UserBasicService } from '../bll/UserBasic.service';
import { UserSignupEvent } from '../model/UserSignupEvent.entity.generated';
import { UserSignupEventService } from '../bll/UserSignupEvent.service';
import { UserBeneficiary } from '../model/UserBeneficiary.entity.generated';
import { UserBeneficiaryService } from '../bll/UserBeneficiary.service';
import { UserCorporation } from '../model/UserCorporation.entity.generated';
import { UserCorporationService } from '../bll/UserCorporation.service';
import { UserTrust } from '../model/UserTrust.entity.generated';
import { UserTrustService } from '../bll/UserTrust.service';
import { ComputedAccount } from '../model/ComputedAccount.entity.generated';
import { ComputedAccountService } from '../bll/ComputedAccount.service';

/**
 * Informational model in typescript (nest.js) for Fundscraper
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * A complete system for Fundscraper
 */


/**
 * Generated base class for an api controller meant to expose the functionality of ProjectTaxSummaryService
 */
@ApiBearerAuth()
@Controller('ProjectTaxSummary')
@Injectable({ scope: Scope.REQUEST })
export class ProjectTaxSummaryApi_generated extends AbstractController<ProjectTaxSummary>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ProjectTaxSummaryService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ProjectTaxSummary that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ProjectTaxSummary that match the filter',
		isArray: true,
		type: ProjectTaxSummary
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ProjectTaxSummary[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ProjectTaxSummary with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ProjectTaxSummary with the specified id',
		type: ProjectTaxSummary
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ProjectTaxSummary> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ProjectTaxSummary based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ProjectTaxSummary, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ProjectTaxSummary that have been created',
		type: ProjectTaxSummary, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ProjectTaxSummary[]): Promise<ProjectTaxSummary[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ProjectTaxSummary that are provided' })
	@ApiBody({ type: ProjectTaxSummary, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ProjectTaxSummary that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ProjectTaxSummary[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ProjectTaxSummary with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ProjectTaxSummary has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ProjectService
 */
@ApiBearerAuth()
@Controller('Project')
@Injectable({ scope: Scope.REQUEST })
export class ProjectApi_generated extends AbstractController<Project>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ProjectService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of Project that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of Project that match the filter',
		isArray: true,
		type: Project
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<Project[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of Project with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of Project with the specified id',
		type: Project
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<Project> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of Project based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: Project, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of Project that have been created',
		type: Project, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: Project[]): Promise<Project[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of Project that are provided' })
	@ApiBody({ type: Project, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of Project that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: Project[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of Project with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of Project has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ProjectInterestService
 */
@ApiBearerAuth()
@Controller('ProjectInterest')
@Injectable({ scope: Scope.REQUEST })
export class ProjectInterestApi_generated extends AbstractController<ProjectInterest>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ProjectInterestService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ProjectInterest that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ProjectInterest that match the filter',
		isArray: true,
		type: ProjectInterest
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ProjectInterest[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ProjectInterest with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ProjectInterest with the specified id',
		type: ProjectInterest
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ProjectInterest> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ProjectInterest based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ProjectInterest, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ProjectInterest that have been created',
		type: ProjectInterest, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ProjectInterest[]): Promise<ProjectInterest[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ProjectInterest that are provided' })
	@ApiBody({ type: ProjectInterest, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ProjectInterest that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ProjectInterest[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ProjectInterest with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ProjectInterest has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ProvinceService
 */
@ApiBearerAuth()
@Controller('Province')
@Injectable({ scope: Scope.REQUEST })
export class ProvinceApi_generated extends AbstractController<Province>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ProvinceService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of Province that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of Province that match the filter',
		isArray: true,
		type: Province
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<Province[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of Province with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of Province with the specified id',
		type: Province
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<Province> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of Province based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: Province, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of Province that have been created',
		type: Province, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: Province[]): Promise<Province[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of Province that are provided' })
	@ApiBody({ type: Province, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of Province that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: Province[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of Province with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of Province has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of RegistrationQuestionService
 */
@ApiBearerAuth()
@Controller('RegistrationQuestion')
@Injectable({ scope: Scope.REQUEST })
export class RegistrationQuestionApi_generated extends AbstractController<RegistrationQuestion>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: RegistrationQuestionService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of RegistrationQuestion that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of RegistrationQuestion that match the filter',
		isArray: true,
		type: RegistrationQuestion
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<RegistrationQuestion[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of RegistrationQuestion with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of RegistrationQuestion with the specified id',
		type: RegistrationQuestion
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<RegistrationQuestion> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of RegistrationQuestion based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: RegistrationQuestion, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of RegistrationQuestion that have been created',
		type: RegistrationQuestion, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: RegistrationQuestion[]): Promise<RegistrationQuestion[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of RegistrationQuestion that are provided' })
	@ApiBody({ type: RegistrationQuestion, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of RegistrationQuestion that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: RegistrationQuestion[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of RegistrationQuestion with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of RegistrationQuestion has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of RoedSchedule1Service
 */
@ApiBearerAuth()
@Controller('RoedSchedule1')
@Injectable({ scope: Scope.REQUEST })
export class RoedSchedule1Api_generated extends AbstractController<RoedSchedule1>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: RoedSchedule1Service) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of RoedSchedule1 that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of RoedSchedule1 that match the filter',
		isArray: true,
		type: RoedSchedule1
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<RoedSchedule1[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of RoedSchedule1 with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of RoedSchedule1 with the specified id',
		type: RoedSchedule1
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<RoedSchedule1> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of RoedSchedule1 based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: RoedSchedule1, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of RoedSchedule1 that have been created',
		type: RoedSchedule1, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: RoedSchedule1[]): Promise<RoedSchedule1[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of RoedSchedule1 that are provided' })
	@ApiBody({ type: RoedSchedule1, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of RoedSchedule1 that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: RoedSchedule1[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of RoedSchedule1 with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of RoedSchedule1 has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of SettingService
 */
@ApiBearerAuth()
@Controller('Setting')
@Injectable({ scope: Scope.REQUEST })
export class SettingApi_generated extends AbstractController<Setting>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: SettingService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of Setting that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of Setting that match the filter',
		isArray: true,
		type: Setting
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<Setting[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of Setting with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of Setting with the specified id',
		type: Setting
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<Setting> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of Setting based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: Setting, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of Setting that have been created',
		type: Setting, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: Setting[]): Promise<Setting[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of Setting that are provided' })
	@ApiBody({ type: Setting, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of Setting that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: Setting[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of Setting with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of Setting has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of SupportEngineerService
 */
@ApiBearerAuth()
@Controller('SupportEngineer')
@Injectable({ scope: Scope.REQUEST })
export class SupportEngineerApi_generated extends AbstractController<SupportEngineer>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: SupportEngineerService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of SupportEngineer that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of SupportEngineer that match the filter',
		isArray: true,
		type: SupportEngineer
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<SupportEngineer[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of SupportEngineer with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of SupportEngineer with the specified id',
		type: SupportEngineer
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<SupportEngineer> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of SupportEngineer based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: SupportEngineer, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of SupportEngineer that have been created',
		type: SupportEngineer, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: SupportEngineer[]): Promise<SupportEngineer[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of SupportEngineer that are provided' })
	@ApiBody({ type: SupportEngineer, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of SupportEngineer that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: SupportEngineer[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of SupportEngineer with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of SupportEngineer has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserIssuerAssociationService
 */
@ApiBearerAuth()
@Controller('UserIssuerAssociation')
@Injectable({ scope: Scope.REQUEST })
export class UserIssuerAssociationApi_generated extends AbstractController<UserIssuerAssociation>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserIssuerAssociationService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserIssuerAssociation that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserIssuerAssociation that match the filter',
		isArray: true,
		type: UserIssuerAssociation
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserIssuerAssociation[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserIssuerAssociation with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserIssuerAssociation with the specified id',
		type: UserIssuerAssociation
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserIssuerAssociation> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserIssuerAssociation based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserIssuerAssociation, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserIssuerAssociation that have been created',
		type: UserIssuerAssociation, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserIssuerAssociation[]): Promise<UserIssuerAssociation[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserIssuerAssociation that are provided' })
	@ApiBody({ type: UserIssuerAssociation, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserIssuerAssociation that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserIssuerAssociation[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserIssuerAssociation with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserIssuerAssociation has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserRelationshipService
 */
@ApiBearerAuth()
@Controller('UserRelationship')
@Injectable({ scope: Scope.REQUEST })
export class UserRelationshipApi_generated extends AbstractController<UserRelationship>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserRelationshipService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserRelationship that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserRelationship that match the filter',
		isArray: true,
		type: UserRelationship
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserRelationship[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserRelationship with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserRelationship with the specified id',
		type: UserRelationship
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserRelationship> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserRelationship based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserRelationship, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserRelationship that have been created',
		type: UserRelationship, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserRelationship[]): Promise<UserRelationship[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserRelationship that are provided' })
	@ApiBody({ type: UserRelationship, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserRelationship that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserRelationship[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserRelationship with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserRelationship has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserBankingDetailsService
 */
@ApiBearerAuth()
@Controller('UserBankingDetails')
@Injectable({ scope: Scope.REQUEST })
export class UserBankingDetailsApi_generated extends AbstractController<UserBankingDetails>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserBankingDetailsService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserBankingDetails that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserBankingDetails that match the filter',
		isArray: true,
		type: UserBankingDetails
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserBankingDetails[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserBankingDetails with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserBankingDetails with the specified id',
		type: UserBankingDetails
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserBankingDetails> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserBankingDetails based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserBankingDetails, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserBankingDetails that have been created',
		type: UserBankingDetails, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserBankingDetails[]): Promise<UserBankingDetails[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserBankingDetails that are provided' })
	@ApiBody({ type: UserBankingDetails, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserBankingDetails that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserBankingDetails[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserBankingDetails with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserBankingDetails has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserFinancialKycService
 */
@ApiBearerAuth()
@Controller('UserFinancialKyc')
@Injectable({ scope: Scope.REQUEST })
export class UserFinancialKycApi_generated extends AbstractController<UserFinancialKyc>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserFinancialKycService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserFinancialKyc that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserFinancialKyc that match the filter',
		isArray: true,
		type: UserFinancialKyc
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserFinancialKyc[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserFinancialKyc with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserFinancialKyc with the specified id',
		type: UserFinancialKyc
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserFinancialKyc> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserFinancialKyc based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserFinancialKyc, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserFinancialKyc that have been created',
		type: UserFinancialKyc, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserFinancialKyc[]): Promise<UserFinancialKyc[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserFinancialKyc that are provided' })
	@ApiBody({ type: UserFinancialKyc, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserFinancialKyc that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserFinancialKyc[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserFinancialKyc with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserFinancialKyc has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserEntityService
 */
@ApiBearerAuth()
@Controller('UserEntity')
@Injectable({ scope: Scope.REQUEST })
export class UserEntityApi_generated extends AbstractController<UserEntity>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserEntityService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserEntity that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserEntity that match the filter',
		isArray: true,
		type: UserEntity
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserEntity[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserEntity with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserEntity with the specified id',
		type: UserEntity
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserEntity> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserEntity based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserEntity, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserEntity that have been created',
		type: UserEntity, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserEntity[]): Promise<UserEntity[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserEntity that are provided' })
	@ApiBody({ type: UserEntity, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserEntity that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserEntity[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserEntity with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserEntity has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of AllUserService
 */
@ApiBearerAuth()
@Controller('AllUser')
@Injectable({ scope: Scope.REQUEST })
export class AllUserApi_generated extends AbstractController<AllUser>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: AllUserService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of AllUser that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of AllUser that match the filter',
		isArray: true,
		type: AllUser
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<AllUser[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of AllUser with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of AllUser with the specified id',
		type: AllUser
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<AllUser> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of AllUser based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: AllUser, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of AllUser that have been created',
		type: AllUser, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: AllUser[]): Promise<AllUser[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of AllUser that are provided' })
	@ApiBody({ type: AllUser, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of AllUser that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: AllUser[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of AllUser with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of AllUser has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserInvitationService
 */
@ApiBearerAuth()
@Controller('UserInvitation')
@Injectable({ scope: Scope.REQUEST })
export class UserInvitationApi_generated extends AbstractController<UserInvitation>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserInvitationService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserInvitation that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserInvitation that match the filter',
		isArray: true,
		type: UserInvitation
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserInvitation[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserInvitation with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserInvitation with the specified id',
		type: UserInvitation
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserInvitation> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserInvitation based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserInvitation, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserInvitation that have been created',
		type: UserInvitation, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserInvitation[]): Promise<UserInvitation[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserInvitation that are provided' })
	@ApiBody({ type: UserInvitation, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserInvitation that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserInvitation[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserInvitation with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserInvitation has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of BackgroundProcessService
 */
@ApiBearerAuth()
@Controller('BackgroundProcess')
@Injectable({ scope: Scope.REQUEST })
export class BackgroundProcessApi_generated extends AbstractController<BackgroundProcess>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: BackgroundProcessService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of BackgroundProcess that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of BackgroundProcess that match the filter',
		isArray: true,
		type: BackgroundProcess
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<BackgroundProcess[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of BackgroundProcess with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of BackgroundProcess with the specified id',
		type: BackgroundProcess
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<BackgroundProcess> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of BackgroundProcess based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: BackgroundProcess, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of BackgroundProcess that have been created',
		type: BackgroundProcess, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: BackgroundProcess[]): Promise<BackgroundProcess[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of BackgroundProcess that are provided' })
	@ApiBody({ type: BackgroundProcess, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of BackgroundProcess that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: BackgroundProcess[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of BackgroundProcess with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of BackgroundProcess has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserPdfService
 */
@ApiBearerAuth()
@Controller('UserPdf')
@Injectable({ scope: Scope.REQUEST })
export class UserPdfApi_generated extends AbstractController<UserPdf>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserPdfService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserPdf that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserPdf that match the filter',
		isArray: true,
		type: UserPdf
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserPdf[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserPdf with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserPdf with the specified id',
		type: UserPdf
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserPdf> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserPdf based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserPdf, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserPdf that have been created',
		type: UserPdf, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserPdf[]): Promise<UserPdf[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserPdf that are provided' })
	@ApiBody({ type: UserPdf, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserPdf that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserPdf[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserPdf with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserPdf has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of CountryService
 */
@ApiBearerAuth()
@Controller('Country')
@Injectable({ scope: Scope.REQUEST })
export class CountryApi_generated extends AbstractController<Country>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: CountryService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of Country that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of Country that match the filter',
		isArray: true,
		type: Country
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<Country[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of Country with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of Country with the specified id',
		type: Country
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<Country> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of Country based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: Country, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of Country that have been created',
		type: Country, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: Country[]): Promise<Country[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of Country that are provided' })
	@ApiBody({ type: Country, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of Country that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: Country[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of Country with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of Country has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserAnswerService
 */
@ApiBearerAuth()
@Controller('UserAnswer')
@Injectable({ scope: Scope.REQUEST })
export class UserAnswerApi_generated extends AbstractController<UserAnswer>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserAnswerService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserAnswer that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserAnswer that match the filter',
		isArray: true,
		type: UserAnswer
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserAnswer[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserAnswer with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserAnswer with the specified id',
		type: UserAnswer
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserAnswer> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserAnswer based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserAnswer, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserAnswer that have been created',
		type: UserAnswer, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserAnswer[]): Promise<UserAnswer[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserAnswer that are provided' })
	@ApiBody({ type: UserAnswer, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserAnswer that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserAnswer[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserAnswer with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserAnswer has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of EventService
 */
@ApiBearerAuth()
@Controller('Event')
@Injectable({ scope: Scope.REQUEST })
export class EventApi_generated extends AbstractController<Event>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: EventService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of Event that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of Event that match the filter',
		isArray: true,
		type: Event
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<Event[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of Event with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of Event with the specified id',
		type: Event
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<Event> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of Event based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: Event, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of Event that have been created',
		type: Event, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: Event[]): Promise<Event[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of Event that are provided' })
	@ApiBody({ type: Event, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of Event that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: Event[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of Event with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of Event has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserRequestService
 */
@ApiBearerAuth()
@Controller('UserRequest')
@Injectable({ scope: Scope.REQUEST })
export class UserRequestApi_generated extends AbstractController<UserRequest>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserRequestService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserRequest that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserRequest that match the filter',
		isArray: true,
		type: UserRequest
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserRequest[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserRequest with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserRequest with the specified id',
		type: UserRequest
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserRequest> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserRequest based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserRequest, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserRequest that have been created',
		type: UserRequest, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserRequest[]): Promise<UserRequest[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserRequest that are provided' })
	@ApiBody({ type: UserRequest, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserRequest that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserRequest[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserRequest with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserRequest has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of FfbaAssociationService
 */
@ApiBearerAuth()
@Controller('FfbaAssociation')
@Injectable({ scope: Scope.REQUEST })
export class FfbaAssociationApi_generated extends AbstractController<FfbaAssociation>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: FfbaAssociationService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of FfbaAssociation that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of FfbaAssociation that match the filter',
		isArray: true,
		type: FfbaAssociation
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<FfbaAssociation[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of FfbaAssociation with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of FfbaAssociation with the specified id',
		type: FfbaAssociation
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<FfbaAssociation> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of FfbaAssociation based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: FfbaAssociation, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of FfbaAssociation that have been created',
		type: FfbaAssociation, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: FfbaAssociation[]): Promise<FfbaAssociation[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of FfbaAssociation that are provided' })
	@ApiBody({ type: FfbaAssociation, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of FfbaAssociation that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: FfbaAssociation[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of FfbaAssociation with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of FfbaAssociation has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of SocialProfileFollowingService
 */
@ApiBearerAuth()
@Controller('SocialProfileFollowing')
@Injectable({ scope: Scope.REQUEST })
export class SocialProfileFollowingApi_generated extends AbstractController<SocialProfileFollowing>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: SocialProfileFollowingService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of SocialProfileFollowing that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of SocialProfileFollowing that match the filter',
		isArray: true,
		type: SocialProfileFollowing
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<SocialProfileFollowing[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of SocialProfileFollowing with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of SocialProfileFollowing with the specified id',
		type: SocialProfileFollowing
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<SocialProfileFollowing> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of SocialProfileFollowing based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: SocialProfileFollowing, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of SocialProfileFollowing that have been created',
		type: SocialProfileFollowing, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: SocialProfileFollowing[]): Promise<SocialProfileFollowing[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of SocialProfileFollowing that are provided' })
	@ApiBody({ type: SocialProfileFollowing, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of SocialProfileFollowing that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: SocialProfileFollowing[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of SocialProfileFollowing with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of SocialProfileFollowing has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ImportedContactService
 */
@ApiBearerAuth()
@Controller('ImportedContact')
@Injectable({ scope: Scope.REQUEST })
export class ImportedContactApi_generated extends AbstractController<ImportedContact>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ImportedContactService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ImportedContact that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ImportedContact that match the filter',
		isArray: true,
		type: ImportedContact
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ImportedContact[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ImportedContact with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ImportedContact with the specified id',
		type: ImportedContact
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ImportedContact> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ImportedContact based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ImportedContact, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ImportedContact that have been created',
		type: ImportedContact, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ImportedContact[]): Promise<ImportedContact[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ImportedContact that are provided' })
	@ApiBody({ type: ImportedContact, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ImportedContact that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ImportedContact[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ImportedContact with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ImportedContact has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserSocialPostService
 */
@ApiBearerAuth()
@Controller('UserSocialPost')
@Injectable({ scope: Scope.REQUEST })
export class UserSocialPostApi_generated extends AbstractController<UserSocialPost>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserSocialPostService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserSocialPost that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserSocialPost that match the filter',
		isArray: true,
		type: UserSocialPost
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserSocialPost[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserSocialPost with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserSocialPost with the specified id',
		type: UserSocialPost
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserSocialPost> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserSocialPost based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserSocialPost, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserSocialPost that have been created',
		type: UserSocialPost, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserSocialPost[]): Promise<UserSocialPost[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserSocialPost that are provided' })
	@ApiBody({ type: UserSocialPost, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserSocialPost that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserSocialPost[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserSocialPost with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserSocialPost has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserSocialProfileService
 */
@ApiBearerAuth()
@Controller('UserSocialProfile')
@Injectable({ scope: Scope.REQUEST })
export class UserSocialProfileApi_generated extends AbstractController<UserSocialProfile>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserSocialProfileService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserSocialProfile that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserSocialProfile that match the filter',
		isArray: true,
		type: UserSocialProfile
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserSocialProfile[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserSocialProfile with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserSocialProfile with the specified id',
		type: UserSocialProfile
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserSocialProfile> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserSocialProfile based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserSocialProfile, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserSocialProfile that have been created',
		type: UserSocialProfile, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserSocialProfile[]): Promise<UserSocialProfile[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserSocialProfile that are provided' })
	@ApiBody({ type: UserSocialProfile, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserSocialProfile that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserSocialProfile[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserSocialProfile with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserSocialProfile has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of InvestmentOrderService
 */
@ApiBearerAuth()
@Controller('InvestmentOrder')
@Injectable({ scope: Scope.REQUEST })
export class InvestmentOrderApi_generated extends AbstractController<InvestmentOrder>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: InvestmentOrderService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of InvestmentOrder that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of InvestmentOrder that match the filter',
		isArray: true,
		type: InvestmentOrder
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<InvestmentOrder[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of InvestmentOrder with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of InvestmentOrder with the specified id',
		type: InvestmentOrder
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<InvestmentOrder> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of InvestmentOrder based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: InvestmentOrder, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of InvestmentOrder that have been created',
		type: InvestmentOrder, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: InvestmentOrder[]): Promise<InvestmentOrder[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of InvestmentOrder that are provided' })
	@ApiBody({ type: InvestmentOrder, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of InvestmentOrder that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: InvestmentOrder[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of InvestmentOrder with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of InvestmentOrder has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserSubscriptionService
 */
@ApiBearerAuth()
@Controller('UserSubscription')
@Injectable({ scope: Scope.REQUEST })
export class UserSubscriptionApi_generated extends AbstractController<UserSubscription>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserSubscriptionService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserSubscription that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserSubscription that match the filter',
		isArray: true,
		type: UserSubscription
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserSubscription[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserSubscription with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserSubscription with the specified id',
		type: UserSubscription
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserSubscription> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserSubscription based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserSubscription, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserSubscription that have been created',
		type: UserSubscription, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserSubscription[]): Promise<UserSubscription[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserSubscription that are provided' })
	@ApiBody({ type: UserSubscription, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserSubscription that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserSubscription[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserSubscription with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserSubscription has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of InvestmentTransactionService
 */
@ApiBearerAuth()
@Controller('InvestmentTransaction')
@Injectable({ scope: Scope.REQUEST })
export class InvestmentTransactionApi_generated extends AbstractController<InvestmentTransaction>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: InvestmentTransactionService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of InvestmentTransaction that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of InvestmentTransaction that match the filter',
		isArray: true,
		type: InvestmentTransaction
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<InvestmentTransaction[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of InvestmentTransaction with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of InvestmentTransaction with the specified id',
		type: InvestmentTransaction
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<InvestmentTransaction> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of InvestmentTransaction based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: InvestmentTransaction, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of InvestmentTransaction that have been created',
		type: InvestmentTransaction, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: InvestmentTransaction[]): Promise<InvestmentTransaction[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of InvestmentTransaction that are provided' })
	@ApiBody({ type: InvestmentTransaction, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of InvestmentTransaction that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: InvestmentTransaction[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of InvestmentTransaction with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of InvestmentTransaction has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of WebHookService
 */
@ApiBearerAuth()
@Controller('WebHook')
@Injectable({ scope: Scope.REQUEST })
export class WebHookApi_generated extends AbstractController<WebHook>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: WebHookService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of WebHook that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of WebHook that match the filter',
		isArray: true,
		type: WebHook
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<WebHook[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of WebHook with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of WebHook with the specified id',
		type: WebHook
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<WebHook> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of WebHook based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: WebHook, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of WebHook that have been created',
		type: WebHook, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: WebHook[]): Promise<WebHook[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of WebHook that are provided' })
	@ApiBody({ type: WebHook, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of WebHook that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: WebHook[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of WebHook with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of WebHook has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of InvestmentWatchlistService
 */
@ApiBearerAuth()
@Controller('InvestmentWatchlist')
@Injectable({ scope: Scope.REQUEST })
export class InvestmentWatchlistApi_generated extends AbstractController<InvestmentWatchlist>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: InvestmentWatchlistService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of InvestmentWatchlist that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of InvestmentWatchlist that match the filter',
		isArray: true,
		type: InvestmentWatchlist
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<InvestmentWatchlist[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of InvestmentWatchlist with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of InvestmentWatchlist with the specified id',
		type: InvestmentWatchlist
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<InvestmentWatchlist> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of InvestmentWatchlist based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: InvestmentWatchlist, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of InvestmentWatchlist that have been created',
		type: InvestmentWatchlist, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: InvestmentWatchlist[]): Promise<InvestmentWatchlist[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of InvestmentWatchlist that are provided' })
	@ApiBody({ type: InvestmentWatchlist, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of InvestmentWatchlist that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: InvestmentWatchlist[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of InvestmentWatchlist with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of InvestmentWatchlist has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of InvestmentWithdrawalService
 */
@ApiBearerAuth()
@Controller('InvestmentWithdrawal')
@Injectable({ scope: Scope.REQUEST })
export class InvestmentWithdrawalApi_generated extends AbstractController<InvestmentWithdrawal>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: InvestmentWithdrawalService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of InvestmentWithdrawal that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of InvestmentWithdrawal that match the filter',
		isArray: true,
		type: InvestmentWithdrawal
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<InvestmentWithdrawal[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of InvestmentWithdrawal with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of InvestmentWithdrawal with the specified id',
		type: InvestmentWithdrawal
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<InvestmentWithdrawal> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of InvestmentWithdrawal based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: InvestmentWithdrawal, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of InvestmentWithdrawal that have been created',
		type: InvestmentWithdrawal, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: InvestmentWithdrawal[]): Promise<InvestmentWithdrawal[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of InvestmentWithdrawal that are provided' })
	@ApiBody({ type: InvestmentWithdrawal, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of InvestmentWithdrawal that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: InvestmentWithdrawal[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of InvestmentWithdrawal with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of InvestmentWithdrawal has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of OrderAcknowledgementService
 */
@ApiBearerAuth()
@Controller('OrderAcknowledgement')
@Injectable({ scope: Scope.REQUEST })
export class OrderAcknowledgementApi_generated extends AbstractController<OrderAcknowledgement>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: OrderAcknowledgementService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of OrderAcknowledgement that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of OrderAcknowledgement that match the filter',
		isArray: true,
		type: OrderAcknowledgement
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<OrderAcknowledgement[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of OrderAcknowledgement with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of OrderAcknowledgement with the specified id',
		type: OrderAcknowledgement
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<OrderAcknowledgement> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of OrderAcknowledgement based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: OrderAcknowledgement, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of OrderAcknowledgement that have been created',
		type: OrderAcknowledgement, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: OrderAcknowledgement[]): Promise<OrderAcknowledgement[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of OrderAcknowledgement that are provided' })
	@ApiBody({ type: OrderAcknowledgement, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of OrderAcknowledgement that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: OrderAcknowledgement[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of OrderAcknowledgement with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of OrderAcknowledgement has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of OrderAcknowledgementQuestionService
 */
@ApiBearerAuth()
@Controller('OrderAcknowledgementQuestion')
@Injectable({ scope: Scope.REQUEST })
export class OrderAcknowledgementQuestionApi_generated extends AbstractController<OrderAcknowledgementQuestion>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: OrderAcknowledgementQuestionService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of OrderAcknowledgementQuestion that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of OrderAcknowledgementQuestion that match the filter',
		isArray: true,
		type: OrderAcknowledgementQuestion
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<OrderAcknowledgementQuestion[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of OrderAcknowledgementQuestion with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of OrderAcknowledgementQuestion with the specified id',
		type: OrderAcknowledgementQuestion
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<OrderAcknowledgementQuestion> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of OrderAcknowledgementQuestion based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: OrderAcknowledgementQuestion, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of OrderAcknowledgementQuestion that have been created',
		type: OrderAcknowledgementQuestion, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: OrderAcknowledgementQuestion[]): Promise<OrderAcknowledgementQuestion[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of OrderAcknowledgementQuestion that are provided' })
	@ApiBody({ type: OrderAcknowledgementQuestion, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of OrderAcknowledgementQuestion that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: OrderAcknowledgementQuestion[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of OrderAcknowledgementQuestion with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of OrderAcknowledgementQuestion has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of InvestorEarningService
 */
@ApiBearerAuth()
@Controller('InvestorEarning')
@Injectable({ scope: Scope.REQUEST })
export class InvestorEarningApi_generated extends AbstractController<InvestorEarning>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: InvestorEarningService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of InvestorEarning that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of InvestorEarning that match the filter',
		isArray: true,
		type: InvestorEarning
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<InvestorEarning[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of InvestorEarning with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of InvestorEarning with the specified id',
		type: InvestorEarning
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<InvestorEarning> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of InvestorEarning based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: InvestorEarning, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of InvestorEarning that have been created',
		type: InvestorEarning, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: InvestorEarning[]): Promise<InvestorEarning[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of InvestorEarning that are provided' })
	@ApiBody({ type: InvestorEarning, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of InvestorEarning that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: InvestorEarning[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of InvestorEarning with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of InvestorEarning has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of InvestorIntendedTradesService
 */
@ApiBearerAuth()
@Controller('InvestorIntendedTrades')
@Injectable({ scope: Scope.REQUEST })
export class InvestorIntendedTradesApi_generated extends AbstractController<InvestorIntendedTrades>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: InvestorIntendedTradesService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of InvestorIntendedTrades that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of InvestorIntendedTrades that match the filter',
		isArray: true,
		type: InvestorIntendedTrades
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<InvestorIntendedTrades[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of InvestorIntendedTrades with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of InvestorIntendedTrades with the specified id',
		type: InvestorIntendedTrades
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<InvestorIntendedTrades> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of InvestorIntendedTrades based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: InvestorIntendedTrades, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of InvestorIntendedTrades that have been created',
		type: InvestorIntendedTrades, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: InvestorIntendedTrades[]): Promise<InvestorIntendedTrades[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of InvestorIntendedTrades that are provided' })
	@ApiBody({ type: InvestorIntendedTrades, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of InvestorIntendedTrades that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: InvestorIntendedTrades[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of InvestorIntendedTrades with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of InvestorIntendedTrades has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of MailService
 */
@ApiBearerAuth()
@Controller('Mail')
@Injectable({ scope: Scope.REQUEST })
export class MailApi_generated extends AbstractController<Mail>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: MailService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of Mail that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of Mail that match the filter',
		isArray: true,
		type: Mail
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<Mail[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of Mail with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of Mail with the specified id',
		type: Mail
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<Mail> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of Mail based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: Mail, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of Mail that have been created',
		type: Mail, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: Mail[]): Promise<Mail[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of Mail that are provided' })
	@ApiBody({ type: Mail, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of Mail that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: Mail[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of Mail with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of Mail has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of MenuService
 */
@ApiBearerAuth()
@Controller('Menu')
@Injectable({ scope: Scope.REQUEST })
export class MenuApi_generated extends AbstractController<Menu>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: MenuService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of Menu that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of Menu that match the filter',
		isArray: true,
		type: Menu
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<Menu[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of Menu with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of Menu with the specified id',
		type: Menu
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<Menu> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of Menu based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: Menu, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of Menu that have been created',
		type: Menu, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: Menu[]): Promise<Menu[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of Menu that are provided' })
	@ApiBody({ type: Menu, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of Menu that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: Menu[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of Menu with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of Menu has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ModuleAccessService
 */
@ApiBearerAuth()
@Controller('ModuleAccess')
@Injectable({ scope: Scope.REQUEST })
export class ModuleAccessApi_generated extends AbstractController<ModuleAccess>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ModuleAccessService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ModuleAccess that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ModuleAccess that match the filter',
		isArray: true,
		type: ModuleAccess
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ModuleAccess[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ModuleAccess with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ModuleAccess with the specified id',
		type: ModuleAccess
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ModuleAccess> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ModuleAccess based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ModuleAccess, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ModuleAccess that have been created',
		type: ModuleAccess, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ModuleAccess[]): Promise<ModuleAccess[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ModuleAccess that are provided' })
	@ApiBody({ type: ModuleAccess, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ModuleAccess that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ModuleAccess[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ModuleAccess with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ModuleAccess has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of AdminModuleService
 */
@ApiBearerAuth()
@Controller('AdminModule')
@Injectable({ scope: Scope.REQUEST })
export class AdminModuleApi_generated extends AbstractController<AdminModule>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: AdminModuleService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of AdminModule that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of AdminModule that match the filter',
		isArray: true,
		type: AdminModule
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<AdminModule[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of AdminModule with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of AdminModule with the specified id',
		type: AdminModule
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<AdminModule> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of AdminModule based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: AdminModule, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of AdminModule that have been created',
		type: AdminModule, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: AdminModule[]): Promise<AdminModule[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of AdminModule that are provided' })
	@ApiBody({ type: AdminModule, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of AdminModule that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: AdminModule[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of AdminModule with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of AdminModule has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ProjectAccountService
 */
@ApiBearerAuth()
@Controller('ProjectAccount')
@Injectable({ scope: Scope.REQUEST })
export class ProjectAccountApi_generated extends AbstractController<ProjectAccount>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ProjectAccountService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ProjectAccount that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ProjectAccount that match the filter',
		isArray: true,
		type: ProjectAccount
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ProjectAccount[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ProjectAccount with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ProjectAccount with the specified id',
		type: ProjectAccount
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ProjectAccount> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ProjectAccount based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ProjectAccount, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ProjectAccount that have been created',
		type: ProjectAccount, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ProjectAccount[]): Promise<ProjectAccount[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ProjectAccount that are provided' })
	@ApiBody({ type: ProjectAccount, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ProjectAccount that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ProjectAccount[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ProjectAccount with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ProjectAccount has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ProfileBackgroundService
 */
@ApiBearerAuth()
@Controller('ProfileBackground')
@Injectable({ scope: Scope.REQUEST })
export class ProfileBackgroundApi_generated extends AbstractController<ProfileBackground>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ProfileBackgroundService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ProfileBackground that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ProfileBackground that match the filter',
		isArray: true,
		type: ProfileBackground
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ProfileBackground[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ProfileBackground with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ProfileBackground with the specified id',
		type: ProfileBackground
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ProfileBackground> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ProfileBackground based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ProfileBackground, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ProfileBackground that have been created',
		type: ProfileBackground, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ProfileBackground[]): Promise<ProfileBackground[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ProfileBackground that are provided' })
	@ApiBody({ type: ProfileBackground, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ProfileBackground that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ProfileBackground[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ProfileBackground with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ProfileBackground has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ProjectDocusignMappingService
 */
@ApiBearerAuth()
@Controller('ProjectDocusignMapping')
@Injectable({ scope: Scope.REQUEST })
export class ProjectDocusignMappingApi_generated extends AbstractController<ProjectDocusignMapping>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ProjectDocusignMappingService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ProjectDocusignMapping that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ProjectDocusignMapping that match the filter',
		isArray: true,
		type: ProjectDocusignMapping
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ProjectDocusignMapping[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ProjectDocusignMapping with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ProjectDocusignMapping with the specified id',
		type: ProjectDocusignMapping
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ProjectDocusignMapping> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ProjectDocusignMapping based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ProjectDocusignMapping, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ProjectDocusignMapping that have been created',
		type: ProjectDocusignMapping, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ProjectDocusignMapping[]): Promise<ProjectDocusignMapping[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ProjectDocusignMapping that are provided' })
	@ApiBody({ type: ProjectDocusignMapping, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ProjectDocusignMapping that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ProjectDocusignMapping[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ProjectDocusignMapping with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ProjectDocusignMapping has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ProjectBalanceAdjustmentService
 */
@ApiBearerAuth()
@Controller('ProjectBalanceAdjustment')
@Injectable({ scope: Scope.REQUEST })
export class ProjectBalanceAdjustmentApi_generated extends AbstractController<ProjectBalanceAdjustment>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ProjectBalanceAdjustmentService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ProjectBalanceAdjustment that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ProjectBalanceAdjustment that match the filter',
		isArray: true,
		type: ProjectBalanceAdjustment
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ProjectBalanceAdjustment[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ProjectBalanceAdjustment with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ProjectBalanceAdjustment with the specified id',
		type: ProjectBalanceAdjustment
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ProjectBalanceAdjustment> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ProjectBalanceAdjustment based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ProjectBalanceAdjustment, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ProjectBalanceAdjustment that have been created',
		type: ProjectBalanceAdjustment, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ProjectBalanceAdjustment[]): Promise<ProjectBalanceAdjustment[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ProjectBalanceAdjustment that are provided' })
	@ApiBody({ type: ProjectBalanceAdjustment, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ProjectBalanceAdjustment that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ProjectBalanceAdjustment[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ProjectBalanceAdjustment with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ProjectBalanceAdjustment has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ProjectEntityService
 */
@ApiBearerAuth()
@Controller('ProjectEntity')
@Injectable({ scope: Scope.REQUEST })
export class ProjectEntityApi_generated extends AbstractController<ProjectEntity>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ProjectEntityService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ProjectEntity that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ProjectEntity that match the filter',
		isArray: true,
		type: ProjectEntity
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ProjectEntity[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ProjectEntity with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ProjectEntity with the specified id',
		type: ProjectEntity
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ProjectEntity> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ProjectEntity based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ProjectEntity, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ProjectEntity that have been created',
		type: ProjectEntity, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ProjectEntity[]): Promise<ProjectEntity[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ProjectEntity that are provided' })
	@ApiBody({ type: ProjectEntity, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ProjectEntity that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ProjectEntity[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ProjectEntity with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ProjectEntity has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ProjectEntityDetailService
 */
@ApiBearerAuth()
@Controller('ProjectEntityDetail')
@Injectable({ scope: Scope.REQUEST })
export class ProjectEntityDetailApi_generated extends AbstractController<ProjectEntityDetail>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ProjectEntityDetailService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ProjectEntityDetail that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ProjectEntityDetail that match the filter',
		isArray: true,
		type: ProjectEntityDetail
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ProjectEntityDetail[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ProjectEntityDetail with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ProjectEntityDetail with the specified id',
		type: ProjectEntityDetail
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ProjectEntityDetail> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ProjectEntityDetail based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ProjectEntityDetail, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ProjectEntityDetail that have been created',
		type: ProjectEntityDetail, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ProjectEntityDetail[]): Promise<ProjectEntityDetail[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ProjectEntityDetail that are provided' })
	@ApiBody({ type: ProjectEntityDetail, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ProjectEntityDetail that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ProjectEntityDetail[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ProjectEntityDetail with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ProjectEntityDetail has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ProjectImageService
 */
@ApiBearerAuth()
@Controller('ProjectImage')
@Injectable({ scope: Scope.REQUEST })
export class ProjectImageApi_generated extends AbstractController<ProjectImage>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ProjectImageService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ProjectImage that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ProjectImage that match the filter',
		isArray: true,
		type: ProjectImage
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ProjectImage[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ProjectImage with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ProjectImage with the specified id',
		type: ProjectImage
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ProjectImage> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ProjectImage based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ProjectImage, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ProjectImage that have been created',
		type: ProjectImage, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ProjectImage[]): Promise<ProjectImage[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ProjectImage that are provided' })
	@ApiBody({ type: ProjectImage, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ProjectImage that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ProjectImage[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ProjectImage with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ProjectImage has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ProjectKeybackerService
 */
@ApiBearerAuth()
@Controller('ProjectKeybacker')
@Injectable({ scope: Scope.REQUEST })
export class ProjectKeybackerApi_generated extends AbstractController<ProjectKeybacker>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ProjectKeybackerService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ProjectKeybacker that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ProjectKeybacker that match the filter',
		isArray: true,
		type: ProjectKeybacker
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ProjectKeybacker[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ProjectKeybacker with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ProjectKeybacker with the specified id',
		type: ProjectKeybacker
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ProjectKeybacker> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ProjectKeybacker based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ProjectKeybacker, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ProjectKeybacker that have been created',
		type: ProjectKeybacker, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ProjectKeybacker[]): Promise<ProjectKeybacker[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ProjectKeybacker that are provided' })
	@ApiBody({ type: ProjectKeybacker, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ProjectKeybacker that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ProjectKeybacker[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ProjectKeybacker with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ProjectKeybacker has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ProjectPdfService
 */
@ApiBearerAuth()
@Controller('ProjectPdf')
@Injectable({ scope: Scope.REQUEST })
export class ProjectPdfApi_generated extends AbstractController<ProjectPdf>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ProjectPdfService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ProjectPdf that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ProjectPdf that match the filter',
		isArray: true,
		type: ProjectPdf
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ProjectPdf[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ProjectPdf with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ProjectPdf with the specified id',
		type: ProjectPdf
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ProjectPdf> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ProjectPdf based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ProjectPdf, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ProjectPdf that have been created',
		type: ProjectPdf, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ProjectPdf[]): Promise<ProjectPdf[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ProjectPdf that are provided' })
	@ApiBody({ type: ProjectPdf, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ProjectPdf that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ProjectPdf[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ProjectPdf with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ProjectPdf has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ExemptDistributionOptionService
 */
@ApiBearerAuth()
@Controller('ExemptDistributionOption')
@Injectable({ scope: Scope.REQUEST })
export class ExemptDistributionOptionApi_generated extends AbstractController<ExemptDistributionOption>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ExemptDistributionOptionService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ExemptDistributionOption that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ExemptDistributionOption that match the filter',
		isArray: true,
		type: ExemptDistributionOption
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ExemptDistributionOption[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ExemptDistributionOption with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ExemptDistributionOption with the specified id',
		type: ExemptDistributionOption
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ExemptDistributionOption> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ExemptDistributionOption based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ExemptDistributionOption, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ExemptDistributionOption that have been created',
		type: ExemptDistributionOption, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ExemptDistributionOption[]): Promise<ExemptDistributionOption[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ExemptDistributionOption that are provided' })
	@ApiBody({ type: ExemptDistributionOption, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ExemptDistributionOption that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ExemptDistributionOption[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ExemptDistributionOption with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ExemptDistributionOption has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ProjectStatusReportService
 */
@ApiBearerAuth()
@Controller('ProjectStatusReport')
@Injectable({ scope: Scope.REQUEST })
export class ProjectStatusReportApi_generated extends AbstractController<ProjectStatusReport>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ProjectStatusReportService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ProjectStatusReport that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ProjectStatusReport that match the filter',
		isArray: true,
		type: ProjectStatusReport
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ProjectStatusReport[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ProjectStatusReport with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ProjectStatusReport with the specified id',
		type: ProjectStatusReport
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ProjectStatusReport> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ProjectStatusReport based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ProjectStatusReport, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ProjectStatusReport that have been created',
		type: ProjectStatusReport, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ProjectStatusReport[]): Promise<ProjectStatusReport[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ProjectStatusReport that are provided' })
	@ApiBody({ type: ProjectStatusReport, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ProjectStatusReport that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ProjectStatusReport[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ProjectStatusReport with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ProjectStatusReport has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ProjectTaxReportService
 */
@ApiBearerAuth()
@Controller('ProjectTaxReport')
@Injectable({ scope: Scope.REQUEST })
export class ProjectTaxReportApi_generated extends AbstractController<ProjectTaxReport>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ProjectTaxReportService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ProjectTaxReport that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ProjectTaxReport that match the filter',
		isArray: true,
		type: ProjectTaxReport
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ProjectTaxReport[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ProjectTaxReport with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ProjectTaxReport with the specified id',
		type: ProjectTaxReport
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ProjectTaxReport> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ProjectTaxReport based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ProjectTaxReport, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ProjectTaxReport that have been created',
		type: ProjectTaxReport, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ProjectTaxReport[]): Promise<ProjectTaxReport[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ProjectTaxReport that are provided' })
	@ApiBody({ type: ProjectTaxReport, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ProjectTaxReport that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ProjectTaxReport[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ProjectTaxReport with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ProjectTaxReport has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of AdminUserService
 */
@ApiBearerAuth()
@Controller('AdminUser')
@Injectable({ scope: Scope.REQUEST })
export class AdminUserApi_generated extends AbstractController<AdminUser>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: AdminUserService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of AdminUser that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of AdminUser that match the filter',
		isArray: true,
		type: AdminUser
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<AdminUser[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of AdminUser with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of AdminUser with the specified id',
		type: AdminUser
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<AdminUser> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of AdminUser based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: AdminUser, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of AdminUser that have been created',
		type: AdminUser, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: AdminUser[]): Promise<AdminUser[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of AdminUser that are provided' })
	@ApiBody({ type: AdminUser, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of AdminUser that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: AdminUser[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of AdminUser with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of AdminUser has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of AllUserAnswerService
 */
@ApiBearerAuth()
@Controller('AllUserAnswer')
@Injectable({ scope: Scope.REQUEST })
export class AllUserAnswerApi_generated extends AbstractController<AllUserAnswer>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: AllUserAnswerService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of AllUserAnswer that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of AllUserAnswer that match the filter',
		isArray: true,
		type: AllUserAnswer
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<AllUserAnswer[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of AllUserAnswer with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of AllUserAnswer with the specified id',
		type: AllUserAnswer
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<AllUserAnswer> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of AllUserAnswer based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: AllUserAnswer, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of AllUserAnswer that have been created',
		type: AllUserAnswer, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: AllUserAnswer[]): Promise<AllUserAnswer[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of AllUserAnswer that are provided' })
	@ApiBody({ type: AllUserAnswer, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of AllUserAnswer that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: AllUserAnswer[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of AllUserAnswer with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of AllUserAnswer has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ComputedAccountBalanceService
 */
@ApiBearerAuth()
@Controller('ComputedAccountBalance')
@Injectable({ scope: Scope.REQUEST })
export class ComputedAccountBalanceApi_generated extends AbstractController<ComputedAccountBalance>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ComputedAccountBalanceService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ComputedAccountBalance that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ComputedAccountBalance that match the filter',
		isArray: true,
		type: ComputedAccountBalance
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ComputedAccountBalance[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ComputedAccountIncomeService
 */
@ApiBearerAuth()
@Controller('ComputedAccountIncome')
@Injectable({ scope: Scope.REQUEST })
export class ComputedAccountIncomeApi_generated extends AbstractController<ComputedAccountIncome>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ComputedAccountIncomeService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ComputedAccountIncome that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ComputedAccountIncome that match the filter',
		isArray: true,
		type: ComputedAccountIncome
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ComputedAccountIncome[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ComputedAccountIncome with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ComputedAccountIncome with the specified id',
		type: ComputedAccountIncome
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ComputedAccountIncome> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ComputedAccountIncome based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ComputedAccountIncome, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ComputedAccountIncome that have been created',
		type: ComputedAccountIncome, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ComputedAccountIncome[]): Promise<ComputedAccountIncome[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ComputedAccountIncome that are provided' })
	@ApiBody({ type: ComputedAccountIncome, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ComputedAccountIncome that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ComputedAccountIncome[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ComputedAccountIncome with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ComputedAccountIncome has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ComputedAccountPositionService
 */
@ApiBearerAuth()
@Controller('ComputedAccountPosition')
@Injectable({ scope: Scope.REQUEST })
export class ComputedAccountPositionApi_generated extends AbstractController<ComputedAccountPosition>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ComputedAccountPositionService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ComputedAccountPosition that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ComputedAccountPosition that match the filter',
		isArray: true,
		type: ComputedAccountPosition
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ComputedAccountPosition[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ComputedAccountTotalIncomeService
 */
@ApiBearerAuth()
@Controller('ComputedAccountTotalIncome')
@Injectable({ scope: Scope.REQUEST })
export class ComputedAccountTotalIncomeApi_generated extends AbstractController<ComputedAccountTotalIncome>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ComputedAccountTotalIncomeService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ComputedAccountTotalIncome that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ComputedAccountTotalIncome that match the filter',
		isArray: true,
		type: ComputedAccountTotalIncome
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ComputedAccountTotalIncome[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ComputedProjectBalanceService
 */
@ApiBearerAuth()
@Controller('ComputedProjectBalance')
@Injectable({ scope: Scope.REQUEST })
export class ComputedProjectBalanceApi_generated extends AbstractController<ComputedProjectBalance>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ComputedProjectBalanceService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ComputedProjectBalance that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ComputedProjectBalance that match the filter',
		isArray: true,
		type: ComputedProjectBalance
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ComputedProjectBalance[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ComputedProjectIncomeService
 */
@ApiBearerAuth()
@Controller('ComputedProjectIncome')
@Injectable({ scope: Scope.REQUEST })
export class ComputedProjectIncomeApi_generated extends AbstractController<ComputedProjectIncome>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ComputedProjectIncomeService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ComputedProjectIncome that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ComputedProjectIncome that match the filter',
		isArray: true,
		type: ComputedProjectIncome
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ComputedProjectIncome[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of ComputedProjectIncome with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ComputedProjectIncome with the specified id',
		type: ComputedProjectIncome
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ComputedProjectIncome> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of ComputedProjectIncome based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: ComputedProjectIncome, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of ComputedProjectIncome that have been created',
		type: ComputedProjectIncome, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: ComputedProjectIncome[]): Promise<ComputedProjectIncome[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of ComputedProjectIncome that are provided' })
	@ApiBody({ type: ComputedProjectIncome, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of ComputedProjectIncome that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: ComputedProjectIncome[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ComputedProjectIncome with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ComputedProjectIncome has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ComputedProjectPositionService
 */
@ApiBearerAuth()
@Controller('ComputedProjectPosition')
@Injectable({ scope: Scope.REQUEST })
export class ComputedProjectPositionApi_generated extends AbstractController<ComputedProjectPosition>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ComputedProjectPositionService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ComputedProjectPosition that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ComputedProjectPosition that match the filter',
		isArray: true,
		type: ComputedProjectPosition
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ComputedProjectPosition[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ComputedProjectTotalIncomeService
 */
@ApiBearerAuth()
@Controller('ComputedProjectTotalIncome')
@Injectable({ scope: Scope.REQUEST })
export class ComputedProjectTotalIncomeApi_generated extends AbstractController<ComputedProjectTotalIncome>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ComputedProjectTotalIncomeService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ComputedProjectTotalIncome that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ComputedProjectTotalIncome that match the filter',
		isArray: true,
		type: ComputedProjectTotalIncome
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ComputedProjectTotalIncome[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
}	


/**
 * Generated base class for an api controller meant to expose the functionality of InvestorCobrandingService
 */
@ApiBearerAuth()
@Controller('InvestorCobranding')
@Injectable({ scope: Scope.REQUEST })
export class InvestorCobrandingApi_generated extends AbstractController<InvestorCobranding>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: InvestorCobrandingService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of InvestorCobranding that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of InvestorCobranding that match the filter',
		isArray: true,
		type: InvestorCobranding
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<InvestorCobranding[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
}	


/**
 * Generated base class for an api controller meant to expose the functionality of InvestorSocialProfileService
 */
@ApiBearerAuth()
@Controller('InvestorSocialProfile')
@Injectable({ scope: Scope.REQUEST })
export class InvestorSocialProfileApi_generated extends AbstractController<InvestorSocialProfile>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: InvestorSocialProfileService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of InvestorSocialProfile that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of InvestorSocialProfile that match the filter',
		isArray: true,
		type: InvestorSocialProfile
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<InvestorSocialProfile[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of InvestorSocialProfile with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of InvestorSocialProfile with the specified id',
		type: InvestorSocialProfile
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<InvestorSocialProfile> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of InvestorSocialProfile based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: InvestorSocialProfile, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of InvestorSocialProfile that have been created',
		type: InvestorSocialProfile, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: InvestorSocialProfile[]): Promise<InvestorSocialProfile[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of InvestorSocialProfile that are provided' })
	@ApiBody({ type: InvestorSocialProfile, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of InvestorSocialProfile that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: InvestorSocialProfile[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of InvestorSocialProfile with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of InvestorSocialProfile has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of InvestorService
 */
@ApiBearerAuth()
@Controller('Investor')
@Injectable({ scope: Scope.REQUEST })
export class InvestorApi_generated extends AbstractController<Investor>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: InvestorService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of Investor that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of Investor that match the filter',
		isArray: true,
		type: Investor
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<Investor[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of Investor with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of Investor with the specified id',
		type: Investor
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<Investor> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of Investor based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: Investor, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of Investor that have been created',
		type: Investor, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: Investor[]): Promise<Investor[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of Investor that are provided' })
	@ApiBody({ type: Investor, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of Investor that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: Investor[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of Investor with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of Investor has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of IssuerAdminService
 */
@ApiBearerAuth()
@Controller('IssuerAdmin')
@Injectable({ scope: Scope.REQUEST })
export class IssuerAdminApi_generated extends AbstractController<IssuerAdmin>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: IssuerAdminService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of IssuerAdmin that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of IssuerAdmin that match the filter',
		isArray: true,
		type: IssuerAdmin
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<IssuerAdmin[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of IssuerAdmin with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of IssuerAdmin with the specified id',
		type: IssuerAdmin
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<IssuerAdmin> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of IssuerAdmin based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: IssuerAdmin, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of IssuerAdmin that have been created',
		type: IssuerAdmin, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: IssuerAdmin[]): Promise<IssuerAdmin[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of IssuerAdmin that are provided' })
	@ApiBody({ type: IssuerAdmin, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of IssuerAdmin that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: IssuerAdmin[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of IssuerAdmin with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of IssuerAdmin has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of NotableInvestorProfileService
 */
@ApiBearerAuth()
@Controller('NotableInvestorProfile')
@Injectable({ scope: Scope.REQUEST })
export class NotableInvestorProfileApi_generated extends AbstractController<NotableInvestorProfile>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: NotableInvestorProfileService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of NotableInvestorProfile that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of NotableInvestorProfile that match the filter',
		isArray: true,
		type: NotableInvestorProfile
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<NotableInvestorProfile[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of NotableInvestorProfile with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of NotableInvestorProfile with the specified id',
		type: NotableInvestorProfile
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<NotableInvestorProfile> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of NotableInvestorProfile based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: NotableInvestorProfile, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of NotableInvestorProfile that have been created',
		type: NotableInvestorProfile, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: NotableInvestorProfile[]): Promise<NotableInvestorProfile[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of NotableInvestorProfile that are provided' })
	@ApiBody({ type: NotableInvestorProfile, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of NotableInvestorProfile that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: NotableInvestorProfile[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of NotableInvestorProfile with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of NotableInvestorProfile has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of PropertySocialProfileService
 */
@ApiBearerAuth()
@Controller('PropertySocialProfile')
@Injectable({ scope: Scope.REQUEST })
export class PropertySocialProfileApi_generated extends AbstractController<PropertySocialProfile>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: PropertySocialProfileService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of PropertySocialProfile that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of PropertySocialProfile that match the filter',
		isArray: true,
		type: PropertySocialProfile
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<PropertySocialProfile[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of PropertySocialProfile with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of PropertySocialProfile with the specified id',
		type: PropertySocialProfile
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<PropertySocialProfile> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of PropertySocialProfile based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: PropertySocialProfile, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of PropertySocialProfile that have been created',
		type: PropertySocialProfile, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: PropertySocialProfile[]): Promise<PropertySocialProfile[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of PropertySocialProfile that are provided' })
	@ApiBody({ type: PropertySocialProfile, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of PropertySocialProfile that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: PropertySocialProfile[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of PropertySocialProfile with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of PropertySocialProfile has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of SponsorSocialProfileService
 */
@ApiBearerAuth()
@Controller('SponsorSocialProfile')
@Injectable({ scope: Scope.REQUEST })
export class SponsorSocialProfileApi_generated extends AbstractController<SponsorSocialProfile>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: SponsorSocialProfileService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of SponsorSocialProfile that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of SponsorSocialProfile that match the filter',
		isArray: true,
		type: SponsorSocialProfile
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<SponsorSocialProfile[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of SponsorSocialProfile with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of SponsorSocialProfile with the specified id',
		type: SponsorSocialProfile
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<SponsorSocialProfile> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of SponsorSocialProfile based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: SponsorSocialProfile, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of SponsorSocialProfile that have been created',
		type: SponsorSocialProfile, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: SponsorSocialProfile[]): Promise<SponsorSocialProfile[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of SponsorSocialProfile that are provided' })
	@ApiBody({ type: SponsorSocialProfile, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of SponsorSocialProfile that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: SponsorSocialProfile[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of SponsorSocialProfile with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of SponsorSocialProfile has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserBasicService
 */
@ApiBearerAuth()
@Controller('UserBasic')
@Injectable({ scope: Scope.REQUEST })
export class UserBasicApi_generated extends AbstractController<UserBasic>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserBasicService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserBasic that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserBasic that match the filter',
		isArray: true,
		type: UserBasic
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserBasic[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserBasic with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserBasic with the specified id',
		type: UserBasic
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserBasic> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserBasic based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserBasic, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserBasic that have been created',
		type: UserBasic, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserBasic[]): Promise<UserBasic[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserBasic that are provided' })
	@ApiBody({ type: UserBasic, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserBasic that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserBasic[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserBasic with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserBasic has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserSignupEventService
 */
@ApiBearerAuth()
@Controller('UserSignupEvent')
@Injectable({ scope: Scope.REQUEST })
export class UserSignupEventApi_generated extends AbstractController<UserSignupEvent>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserSignupEventService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserSignupEvent that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserSignupEvent that match the filter',
		isArray: true,
		type: UserSignupEvent
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserSignupEvent[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserBeneficiaryService
 */
@ApiBearerAuth()
@Controller('UserBeneficiary')
@Injectable({ scope: Scope.REQUEST })
export class UserBeneficiaryApi_generated extends AbstractController<UserBeneficiary>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserBeneficiaryService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserBeneficiary that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserBeneficiary that match the filter',
		isArray: true,
		type: UserBeneficiary
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserBeneficiary[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserBeneficiary with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserBeneficiary with the specified id',
		type: UserBeneficiary
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserBeneficiary> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserBeneficiary based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserBeneficiary, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserBeneficiary that have been created',
		type: UserBeneficiary, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserBeneficiary[]): Promise<UserBeneficiary[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserBeneficiary that are provided' })
	@ApiBody({ type: UserBeneficiary, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserBeneficiary that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserBeneficiary[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserBeneficiary with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserBeneficiary has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserCorporationService
 */
@ApiBearerAuth()
@Controller('UserCorporation')
@Injectable({ scope: Scope.REQUEST })
export class UserCorporationApi_generated extends AbstractController<UserCorporation>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserCorporationService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserCorporation that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserCorporation that match the filter',
		isArray: true,
		type: UserCorporation
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserCorporation[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserCorporation with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserCorporation with the specified id',
		type: UserCorporation
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserCorporation> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserCorporation based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserCorporation, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserCorporation that have been created',
		type: UserCorporation, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserCorporation[]): Promise<UserCorporation[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserCorporation that are provided' })
	@ApiBody({ type: UserCorporation, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserCorporation that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserCorporation[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserCorporation with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserCorporation has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of UserTrustService
 */
@ApiBearerAuth()
@Controller('UserTrust')
@Injectable({ scope: Scope.REQUEST })
export class UserTrustApi_generated extends AbstractController<UserTrust>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: UserTrustService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of UserTrust that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of UserTrust that match the filter',
		isArray: true,
		type: UserTrust
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<UserTrust[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
	@Get(':id')
	@ApiOperation({ summary: 'Find a single instance of UserTrust with the given id. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of UserTrust with the specified id',
		type: UserTrust
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserTrust> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
        if (typeof expandBy == 'string')
            expandBy = this.csvParamToArray(expandBy);
		return await this.service.findOneById(id, expandBy);
	}
	
    @Post()
	@ApiOperation({ summary: 'Creates new instances of UserTrust based on the values passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the the newly created objects' })
	@ApiBody({ type: UserTrust, isArray: true })
	@ApiCreatedResponse({
		description: 'The instances of UserTrust that have been created',
		type: UserTrust, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValues: UserTrust[]): Promise<UserTrust[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);

		let results = [];
		await Promise.all(newValues.map(async (newValue) => {
			let oneResult = await this.service.create(newValue);
			results.push(oneResult);
		}));
		return results;
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instances of UserTrust that are provided' })
	@ApiBody({ type: UserTrust, isArray: true })
	@ApiOkResponse({
		description: 'The ids of the instances of UserTrust that have been updated',
		type: Number, isArray: true
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValues: UserTrust[]): Promise<number[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);	
		let results = [];	
		await Promise.all(newValues.map(async (newValue) => {
			await this.service.update(newValue);
			results.push(newValue.id);
		}));
		return results;
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of UserTrust with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of UserTrust has been removed'
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	


/**
 * Generated base class for an api controller meant to expose the functionality of ComputedAccountService
 */
@ApiBearerAuth()
@Controller('ComputedAccount')
@Injectable({ scope: Scope.REQUEST })
export class ComputedAccountApi_generated extends AbstractController<ComputedAccount>
{
	constructor(@Inject(REQUEST) protected readonly request: Request, protected readonly service: ComputedAccountService) {
		super();
	}	
    
    @Get()	
	@ApiOperation({ summary: 'Find all instances of ComputedAccount that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ComputedAccount that match the filter',
		isArray: true,
		type: ComputedAccount
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ComputedAccount[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}
  
}	


