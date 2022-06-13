import { AbstractService } from './AbstractService.service';
import { Injectable, Inject } from '@nestjs/common';
import { ProjectTaxSummary } from '../model/ProjectTaxSummary.entity.generated';
import { ProjectTaxSummaryDal } from '../dal/ProjectTaxSummary.provider';
import { Project } from '../model/Project.entity.generated';
import { ProjectDal } from '../dal/Project.provider';
import { ProjectInterest } from '../model/ProjectInterest.entity.generated';
import { ProjectInterestDal } from '../dal/ProjectInterest.provider';
import { Province } from '../model/Province.entity.generated';
import { ProvinceDal } from '../dal/Province.provider';
import { RegistrationQuestion } from '../model/RegistrationQuestion.entity.generated';
import { RegistrationQuestionDal } from '../dal/RegistrationQuestion.provider';
import { RoedSchedule1 } from '../model/RoedSchedule1.entity.generated';
import { RoedSchedule1Dal } from '../dal/RoedSchedule1.provider';
import { Setting } from '../model/Setting.entity.generated';
import { SettingDal } from '../dal/Setting.provider';
import { SupportEngineer } from '../model/SupportEngineer.entity.generated';
import { SupportEngineerDal } from '../dal/SupportEngineer.provider';
import { UserIssuerAssociation } from '../model/UserIssuerAssociation.entity.generated';
import { UserIssuerAssociationDal } from '../dal/UserIssuerAssociation.provider';
import { UserRelationship } from '../model/UserRelationship.entity.generated';
import { UserRelationshipDal } from '../dal/UserRelationship.provider';
import { UserBankingDetails } from '../model/UserBankingDetails.entity.generated';
import { UserBankingDetailsDal } from '../dal/UserBankingDetails.provider';
import { UserFinancialKyc } from '../model/UserFinancialKyc.entity.generated';
import { UserFinancialKycDal } from '../dal/UserFinancialKyc.provider';
import { UserEntity } from '../model/UserEntity.entity.generated';
import { UserEntityDal } from '../dal/UserEntity.provider';
import { AllUser } from '../model/AllUser.entity.generated';
import { AllUserDal } from '../dal/AllUser.provider';
import { UserInvitation } from '../model/UserInvitation.entity.generated';
import { UserInvitationDal } from '../dal/UserInvitation.provider';
import { BackgroundProcess } from '../model/BackgroundProcess.entity.generated';
import { BackgroundProcessDal } from '../dal/BackgroundProcess.provider';
import { UserPdf } from '../model/UserPdf.entity.generated';
import { UserPdfDal } from '../dal/UserPdf.provider';
import { Country } from '../model/Country.entity.generated';
import { CountryDal } from '../dal/Country.provider';
import { UserAnswer } from '../model/UserAnswer.entity.generated';
import { UserAnswerDal } from '../dal/UserAnswer.provider';
import { Event } from '../model/Event.entity.generated';
import { EventDal } from '../dal/Event.provider';
import { UserRequest } from '../model/UserRequest.entity.generated';
import { UserRequestDal } from '../dal/UserRequest.provider';
import { FfbaAssociation } from '../model/FfbaAssociation.entity.generated';
import { FfbaAssociationDal } from '../dal/FfbaAssociation.provider';
import { SocialProfileFollowing } from '../model/SocialProfileFollowing.entity.generated';
import { SocialProfileFollowingDal } from '../dal/SocialProfileFollowing.provider';
import { ImportedContact } from '../model/ImportedContact.entity.generated';
import { ImportedContactDal } from '../dal/ImportedContact.provider';
import { UserSocialPost } from '../model/UserSocialPost.entity.generated';
import { UserSocialPostDal } from '../dal/UserSocialPost.provider';
import { UserSocialProfile } from '../model/UserSocialProfile.entity.generated';
import { UserSocialProfileDal } from '../dal/UserSocialProfile.provider';
import { InvestmentOrder } from '../model/InvestmentOrder.entity.generated';
import { InvestmentOrderDal } from '../dal/InvestmentOrder.provider';
import { UserSubscription } from '../model/UserSubscription.entity.generated';
import { UserSubscriptionDal } from '../dal/UserSubscription.provider';
import { InvestmentTransaction } from '../model/InvestmentTransaction.entity.generated';
import { InvestmentTransactionDal } from '../dal/InvestmentTransaction.provider';
import { WebHook } from '../model/WebHook.entity.generated';
import { WebHookDal } from '../dal/WebHook.provider';
import { InvestmentWatchlist } from '../model/InvestmentWatchlist.entity.generated';
import { InvestmentWatchlistDal } from '../dal/InvestmentWatchlist.provider';
import { InvestmentWithdrawal } from '../model/InvestmentWithdrawal.entity.generated';
import { InvestmentWithdrawalDal } from '../dal/InvestmentWithdrawal.provider';
import { OrderAcknowledgement } from '../model/OrderAcknowledgement.entity.generated';
import { OrderAcknowledgementDal } from '../dal/OrderAcknowledgement.provider';
import { OrderAcknowledgementQuestion } from '../model/OrderAcknowledgementQuestion.entity.generated';
import { OrderAcknowledgementQuestionDal } from '../dal/OrderAcknowledgementQuestion.provider';
import { InvestorEarning } from '../model/InvestorEarning.entity.generated';
import { InvestorEarningDal } from '../dal/InvestorEarning.provider';
import { InvestorIntendedTrades } from '../model/InvestorIntendedTrades.entity.generated';
import { InvestorIntendedTradesDal } from '../dal/InvestorIntendedTrades.provider';
import { Mail } from '../model/Mail.entity.generated';
import { MailDal } from '../dal/Mail.provider';
import { Menu } from '../model/Menu.entity.generated';
import { MenuDal } from '../dal/Menu.provider';
import { ModuleAccess } from '../model/ModuleAccess.entity.generated';
import { ModuleAccessDal } from '../dal/ModuleAccess.provider';
import { AdminModule } from '../model/AdminModule.entity.generated';
import { AdminModuleDal } from '../dal/AdminModule.provider';
import { ProjectAccount } from '../model/ProjectAccount.entity.generated';
import { ProjectAccountDal } from '../dal/ProjectAccount.provider';
import { ProfileBackground } from '../model/ProfileBackground.entity.generated';
import { ProfileBackgroundDal } from '../dal/ProfileBackground.provider';
import { ProjectDocusignMapping } from '../model/ProjectDocusignMapping.entity.generated';
import { ProjectDocusignMappingDal } from '../dal/ProjectDocusignMapping.provider';
import { ProjectBalanceAdjustment } from '../model/ProjectBalanceAdjustment.entity.generated';
import { ProjectBalanceAdjustmentDal } from '../dal/ProjectBalanceAdjustment.provider';
import { ProjectEntity } from '../model/ProjectEntity.entity.generated';
import { ProjectEntityDal } from '../dal/ProjectEntity.provider';
import { ProjectEntityDetail } from '../model/ProjectEntityDetail.entity.generated';
import { ProjectEntityDetailDal } from '../dal/ProjectEntityDetail.provider';
import { ProjectImage } from '../model/ProjectImage.entity.generated';
import { ProjectImageDal } from '../dal/ProjectImage.provider';
import { ProjectKeybacker } from '../model/ProjectKeybacker.entity.generated';
import { ProjectKeybackerDal } from '../dal/ProjectKeybacker.provider';
import { ProjectPdf } from '../model/ProjectPdf.entity.generated';
import { ProjectPdfDal } from '../dal/ProjectPdf.provider';
import { ExemptDistributionOption } from '../model/ExemptDistributionOption.entity.generated';
import { ExemptDistributionOptionDal } from '../dal/ExemptDistributionOption.provider';
import { ProjectStatusReport } from '../model/ProjectStatusReport.entity.generated';
import { ProjectStatusReportDal } from '../dal/ProjectStatusReport.provider';
import { ProjectTaxReport } from '../model/ProjectTaxReport.entity.generated';
import { ProjectTaxReportDal } from '../dal/ProjectTaxReport.provider';
import { AdminUser } from '../model/AdminUser.entity.generated';
import { AdminUserDal } from '../dal/AdminUser.provider';
import { AllUserAnswer } from '../model/AllUserAnswer.entity.generated';
import { AllUserAnswerDal } from '../dal/AllUserAnswer.provider';
import { ComputedAccountBalance } from '../model/ComputedAccountBalance.entity.generated';
import { ComputedAccountBalanceDal } from '../dal/ComputedAccountBalance.provider';
import { ComputedAccountIncome } from '../model/ComputedAccountIncome.entity.generated';
import { ComputedAccountIncomeDal } from '../dal/ComputedAccountIncome.provider';
import { ComputedAccountPosition } from '../model/ComputedAccountPosition.entity.generated';
import { ComputedAccountPositionDal } from '../dal/ComputedAccountPosition.provider';
import { ComputedAccountTotalIncome } from '../model/ComputedAccountTotalIncome.entity.generated';
import { ComputedAccountTotalIncomeDal } from '../dal/ComputedAccountTotalIncome.provider';
import { ComputedProjectBalance } from '../model/ComputedProjectBalance.entity.generated';
import { ComputedProjectBalanceDal } from '../dal/ComputedProjectBalance.provider';
import { ComputedProjectIncome } from '../model/ComputedProjectIncome.entity.generated';
import { ComputedProjectIncomeDal } from '../dal/ComputedProjectIncome.provider';
import { ComputedProjectPosition } from '../model/ComputedProjectPosition.entity.generated';
import { ComputedProjectPositionDal } from '../dal/ComputedProjectPosition.provider';
import { ComputedProjectTotalIncome } from '../model/ComputedProjectTotalIncome.entity.generated';
import { ComputedProjectTotalIncomeDal } from '../dal/ComputedProjectTotalIncome.provider';
import { InvestorCobranding } from '../model/InvestorCobranding.entity.generated';
import { InvestorCobrandingDal } from '../dal/InvestorCobranding.provider';
import { InvestorSocialProfile } from '../model/InvestorSocialProfile.entity.generated';
import { InvestorSocialProfileDal } from '../dal/InvestorSocialProfile.provider';
import { Investor } from '../model/Investor.entity.generated';
import { InvestorDal } from '../dal/Investor.provider';
import { IssuerAdmin } from '../model/IssuerAdmin.entity.generated';
import { IssuerAdminDal } from '../dal/IssuerAdmin.provider';
import { NotableInvestorProfile } from '../model/NotableInvestorProfile.entity.generated';
import { NotableInvestorProfileDal } from '../dal/NotableInvestorProfile.provider';
import { PropertySocialProfile } from '../model/PropertySocialProfile.entity.generated';
import { PropertySocialProfileDal } from '../dal/PropertySocialProfile.provider';
import { SponsorSocialProfile } from '../model/SponsorSocialProfile.entity.generated';
import { SponsorSocialProfileDal } from '../dal/SponsorSocialProfile.provider';
import { UserBasic } from '../model/UserBasic.entity.generated';
import { UserBasicDal } from '../dal/UserBasic.provider';
import { UserSignupEvent } from '../model/UserSignupEvent.entity.generated';
import { UserSignupEventDal } from '../dal/UserSignupEvent.provider';
import { UserBeneficiary } from '../model/UserBeneficiary.entity.generated';
import { UserBeneficiaryDal } from '../dal/UserBeneficiary.provider';
import { UserCorporation } from '../model/UserCorporation.entity.generated';
import { UserCorporationDal } from '../dal/UserCorporation.provider';
import { UserTrust } from '../model/UserTrust.entity.generated';
import { UserTrustDal } from '../dal/UserTrust.provider';
import { ComputedAccount } from '../model/ComputedAccount.entity.generated';
import { ComputedAccountDal } from '../dal/ComputedAccount.provider';

/**
 * Business logic (service) class for model in typescript (nest.js) for Fundscraper
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * A complete system for Fundscraper
 */


/**
 * Generated base dal for the class ProjectTaxSummary, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ProjectTaxSummaryService_generated extends AbstractService<ProjectTaxSummary>
{
	constructor(private injectedDal: ProjectTaxSummaryDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class Project, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ProjectService_generated extends AbstractService<Project>
{
	constructor(private injectedDal: ProjectDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ProjectInterest, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ProjectInterestService_generated extends AbstractService<ProjectInterest>
{
	constructor(private injectedDal: ProjectInterestDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class Province, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ProvinceService_generated extends AbstractService<Province>
{
	constructor(private injectedDal: ProvinceDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class RegistrationQuestion, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class RegistrationQuestionService_generated extends AbstractService<RegistrationQuestion>
{
	constructor(private injectedDal: RegistrationQuestionDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class RoedSchedule1, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class RoedSchedule1Service_generated extends AbstractService<RoedSchedule1>
{
	constructor(private injectedDal: RoedSchedule1Dal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class Setting, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class SettingService_generated extends AbstractService<Setting>
{
	constructor(private injectedDal: SettingDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class SupportEngineer, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class SupportEngineerService_generated extends AbstractService<SupportEngineer>
{
	constructor(private injectedDal: SupportEngineerDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserIssuerAssociation, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserIssuerAssociationService_generated extends AbstractService<UserIssuerAssociation>
{
	constructor(private injectedDal: UserIssuerAssociationDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserRelationship, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserRelationshipService_generated extends AbstractService<UserRelationship>
{
	constructor(private injectedDal: UserRelationshipDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserBankingDetails, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserBankingDetailsService_generated extends AbstractService<UserBankingDetails>
{
	constructor(private injectedDal: UserBankingDetailsDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserFinancialKyc, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserFinancialKycService_generated extends AbstractService<UserFinancialKyc>
{
	constructor(private injectedDal: UserFinancialKycDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserEntity, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserEntityService_generated extends AbstractService<UserEntity>
{
	constructor(private injectedDal: UserEntityDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class AllUser, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class AllUserService_generated extends AbstractService<AllUser>
{
	constructor(private injectedDal: AllUserDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserInvitation, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserInvitationService_generated extends AbstractService<UserInvitation>
{
	constructor(private injectedDal: UserInvitationDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class BackgroundProcess, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class BackgroundProcessService_generated extends AbstractService<BackgroundProcess>
{
	constructor(private injectedDal: BackgroundProcessDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserPdf, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserPdfService_generated extends AbstractService<UserPdf>
{
	constructor(private injectedDal: UserPdfDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class Country, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class CountryService_generated extends AbstractService<Country>
{
	constructor(private injectedDal: CountryDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserAnswer, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserAnswerService_generated extends AbstractService<UserAnswer>
{
	constructor(private injectedDal: UserAnswerDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class Event, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class EventService_generated extends AbstractService<Event>
{
	constructor(private injectedDal: EventDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserRequest, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserRequestService_generated extends AbstractService<UserRequest>
{
	constructor(private injectedDal: UserRequestDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class FfbaAssociation, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class FfbaAssociationService_generated extends AbstractService<FfbaAssociation>
{
	constructor(private injectedDal: FfbaAssociationDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class SocialProfileFollowing, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class SocialProfileFollowingService_generated extends AbstractService<SocialProfileFollowing>
{
	constructor(private injectedDal: SocialProfileFollowingDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ImportedContact, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ImportedContactService_generated extends AbstractService<ImportedContact>
{
	constructor(private injectedDal: ImportedContactDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserSocialPost, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserSocialPostService_generated extends AbstractService<UserSocialPost>
{
	constructor(private injectedDal: UserSocialPostDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserSocialProfile, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserSocialProfileService_generated extends AbstractService<UserSocialProfile>
{
	constructor(private injectedDal: UserSocialProfileDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class InvestmentOrder, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class InvestmentOrderService_generated extends AbstractService<InvestmentOrder>
{
	constructor(private injectedDal: InvestmentOrderDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserSubscription, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserSubscriptionService_generated extends AbstractService<UserSubscription>
{
	constructor(private injectedDal: UserSubscriptionDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class InvestmentTransaction, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class InvestmentTransactionService_generated extends AbstractService<InvestmentTransaction>
{
	constructor(private injectedDal: InvestmentTransactionDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class WebHook, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class WebHookService_generated extends AbstractService<WebHook>
{
	constructor(private injectedDal: WebHookDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class InvestmentWatchlist, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class InvestmentWatchlistService_generated extends AbstractService<InvestmentWatchlist>
{
	constructor(private injectedDal: InvestmentWatchlistDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class InvestmentWithdrawal, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class InvestmentWithdrawalService_generated extends AbstractService<InvestmentWithdrawal>
{
	constructor(private injectedDal: InvestmentWithdrawalDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class OrderAcknowledgement, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class OrderAcknowledgementService_generated extends AbstractService<OrderAcknowledgement>
{
	constructor(private injectedDal: OrderAcknowledgementDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class OrderAcknowledgementQuestion, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class OrderAcknowledgementQuestionService_generated extends AbstractService<OrderAcknowledgementQuestion>
{
	constructor(private injectedDal: OrderAcknowledgementQuestionDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class InvestorEarning, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class InvestorEarningService_generated extends AbstractService<InvestorEarning>
{
	constructor(private injectedDal: InvestorEarningDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class InvestorIntendedTrades, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class InvestorIntendedTradesService_generated extends AbstractService<InvestorIntendedTrades>
{
	constructor(private injectedDal: InvestorIntendedTradesDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class Mail, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class MailService_generated extends AbstractService<Mail>
{
	constructor(private injectedDal: MailDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class Menu, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class MenuService_generated extends AbstractService<Menu>
{
	constructor(private injectedDal: MenuDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ModuleAccess, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ModuleAccessService_generated extends AbstractService<ModuleAccess>
{
	constructor(private injectedDal: ModuleAccessDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class AdminModule, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class AdminModuleService_generated extends AbstractService<AdminModule>
{
	constructor(private injectedDal: AdminModuleDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ProjectAccount, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ProjectAccountService_generated extends AbstractService<ProjectAccount>
{
	constructor(private injectedDal: ProjectAccountDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ProfileBackground, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ProfileBackgroundService_generated extends AbstractService<ProfileBackground>
{
	constructor(private injectedDal: ProfileBackgroundDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ProjectDocusignMapping, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ProjectDocusignMappingService_generated extends AbstractService<ProjectDocusignMapping>
{
	constructor(private injectedDal: ProjectDocusignMappingDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ProjectBalanceAdjustment, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ProjectBalanceAdjustmentService_generated extends AbstractService<ProjectBalanceAdjustment>
{
	constructor(private injectedDal: ProjectBalanceAdjustmentDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ProjectEntity, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ProjectEntityService_generated extends AbstractService<ProjectEntity>
{
	constructor(private injectedDal: ProjectEntityDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ProjectEntityDetail, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ProjectEntityDetailService_generated extends AbstractService<ProjectEntityDetail>
{
	constructor(private injectedDal: ProjectEntityDetailDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ProjectImage, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ProjectImageService_generated extends AbstractService<ProjectImage>
{
	constructor(private injectedDal: ProjectImageDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ProjectKeybacker, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ProjectKeybackerService_generated extends AbstractService<ProjectKeybacker>
{
	constructor(private injectedDal: ProjectKeybackerDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ProjectPdf, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ProjectPdfService_generated extends AbstractService<ProjectPdf>
{
	constructor(private injectedDal: ProjectPdfDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ExemptDistributionOption, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ExemptDistributionOptionService_generated extends AbstractService<ExemptDistributionOption>
{
	constructor(private injectedDal: ExemptDistributionOptionDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ProjectStatusReport, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ProjectStatusReportService_generated extends AbstractService<ProjectStatusReport>
{
	constructor(private injectedDal: ProjectStatusReportDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ProjectTaxReport, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ProjectTaxReportService_generated extends AbstractService<ProjectTaxReport>
{
	constructor(private injectedDal: ProjectTaxReportDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class AdminUser, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class AdminUserService_generated extends AbstractService<AdminUser>
{
	constructor(private injectedDal: AdminUserDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class AllUserAnswer, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class AllUserAnswerService_generated extends AbstractService<AllUserAnswer>
{
	constructor(private injectedDal: AllUserAnswerDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ComputedAccountBalance, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ComputedAccountBalanceService_generated extends AbstractService<ComputedAccountBalance>
{
	constructor(private injectedDal: ComputedAccountBalanceDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ComputedAccountIncome, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ComputedAccountIncomeService_generated extends AbstractService<ComputedAccountIncome>
{
	constructor(private injectedDal: ComputedAccountIncomeDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ComputedAccountPosition, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ComputedAccountPositionService_generated extends AbstractService<ComputedAccountPosition>
{
	constructor(private injectedDal: ComputedAccountPositionDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ComputedAccountTotalIncome, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ComputedAccountTotalIncomeService_generated extends AbstractService<ComputedAccountTotalIncome>
{
	constructor(private injectedDal: ComputedAccountTotalIncomeDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ComputedProjectBalance, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ComputedProjectBalanceService_generated extends AbstractService<ComputedProjectBalance>
{
	constructor(private injectedDal: ComputedProjectBalanceDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ComputedProjectIncome, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ComputedProjectIncomeService_generated extends AbstractService<ComputedProjectIncome>
{
	constructor(private injectedDal: ComputedProjectIncomeDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ComputedProjectPosition, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ComputedProjectPositionService_generated extends AbstractService<ComputedProjectPosition>
{
	constructor(private injectedDal: ComputedProjectPositionDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ComputedProjectTotalIncome, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ComputedProjectTotalIncomeService_generated extends AbstractService<ComputedProjectTotalIncome>
{
	constructor(private injectedDal: ComputedProjectTotalIncomeDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class InvestorCobranding, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class InvestorCobrandingService_generated extends AbstractService<InvestorCobranding>
{
	constructor(private injectedDal: InvestorCobrandingDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class InvestorSocialProfile, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class InvestorSocialProfileService_generated extends AbstractService<InvestorSocialProfile>
{
	constructor(private injectedDal: InvestorSocialProfileDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class Investor, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class InvestorService_generated extends AbstractService<Investor>
{
	constructor(private injectedDal: InvestorDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class IssuerAdmin, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class IssuerAdminService_generated extends AbstractService<IssuerAdmin>
{
	constructor(private injectedDal: IssuerAdminDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class NotableInvestorProfile, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class NotableInvestorProfileService_generated extends AbstractService<NotableInvestorProfile>
{
	constructor(private injectedDal: NotableInvestorProfileDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class PropertySocialProfile, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class PropertySocialProfileService_generated extends AbstractService<PropertySocialProfile>
{
	constructor(private injectedDal: PropertySocialProfileDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class SponsorSocialProfile, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class SponsorSocialProfileService_generated extends AbstractService<SponsorSocialProfile>
{
	constructor(private injectedDal: SponsorSocialProfileDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserBasic, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserBasicService_generated extends AbstractService<UserBasic>
{
	constructor(private injectedDal: UserBasicDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserSignupEvent, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserSignupEventService_generated extends AbstractService<UserSignupEvent>
{
	constructor(private injectedDal: UserSignupEventDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserBeneficiary, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserBeneficiaryService_generated extends AbstractService<UserBeneficiary>
{
	constructor(private injectedDal: UserBeneficiaryDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserCorporation, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserCorporationService_generated extends AbstractService<UserCorporation>
{
	constructor(private injectedDal: UserCorporationDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class UserTrust, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class UserTrustService_generated extends AbstractService<UserTrust>
{
	constructor(private injectedDal: UserTrustDal) 
	{
		super(injectedDal);
	}
}	


/**
 * Generated base dal for the class ComputedAccount, do not edit. If you need to customize edit the derivation.
 */
@Injectable()
export abstract class ComputedAccountService_generated extends AbstractService<ComputedAccount>
{
	constructor(private injectedDal: ComputedAccountDal) 
	{
		super(injectedDal);
	}
}	


