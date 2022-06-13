import { AbstractDal } from './AbstractDal';
import { ProjectTaxSummary } from '../model/ProjectTaxSummary.entity.generated';
import { Project } from '../model/Project.entity.generated';
import { ProjectInterest } from '../model/ProjectInterest.entity.generated';
import { Province } from '../model/Province.entity.generated';
import { RegistrationQuestion } from '../model/RegistrationQuestion.entity.generated';
import { RoedSchedule1 } from '../model/RoedSchedule1.entity.generated';
import { Setting } from '../model/Setting.entity.generated';
import { SupportEngineer } from '../model/SupportEngineer.entity.generated';
import { UserIssuerAssociation } from '../model/UserIssuerAssociation.entity.generated';
import { UserRelationship } from '../model/UserRelationship.entity.generated';
import { UserBankingDetails } from '../model/UserBankingDetails.entity.generated';
import { UserFinancialKyc } from '../model/UserFinancialKyc.entity.generated';
import { UserEntity } from '../model/UserEntity.entity.generated';
import { AllUser } from '../model/AllUser.entity.generated';
import { UserInvitation } from '../model/UserInvitation.entity.generated';
import { BackgroundProcess } from '../model/BackgroundProcess.entity.generated';
import { UserPdf } from '../model/UserPdf.entity.generated';
import { Country } from '../model/Country.entity.generated';
import { UserAnswer } from '../model/UserAnswer.entity.generated';
import { Event } from '../model/Event.entity.generated';
import { UserRequest } from '../model/UserRequest.entity.generated';
import { FfbaAssociation } from '../model/FfbaAssociation.entity.generated';
import { SocialProfileFollowing } from '../model/SocialProfileFollowing.entity.generated';
import { ImportedContact } from '../model/ImportedContact.entity.generated';
import { UserSocialPost } from '../model/UserSocialPost.entity.generated';
import { UserSocialProfile } from '../model/UserSocialProfile.entity.generated';
import { InvestmentOrder } from '../model/InvestmentOrder.entity.generated';
import { UserSubscription } from '../model/UserSubscription.entity.generated';
import { InvestmentTransaction } from '../model/InvestmentTransaction.entity.generated';
import { WebHook } from '../model/WebHook.entity.generated';
import { InvestmentWatchlist } from '../model/InvestmentWatchlist.entity.generated';
import { InvestmentWithdrawal } from '../model/InvestmentWithdrawal.entity.generated';
import { OrderAcknowledgement } from '../model/OrderAcknowledgement.entity.generated';
import { OrderAcknowledgementQuestion } from '../model/OrderAcknowledgementQuestion.entity.generated';
import { InvestorEarning } from '../model/InvestorEarning.entity.generated';
import { InvestorIntendedTrades } from '../model/InvestorIntendedTrades.entity.generated';
import { Mail } from '../model/Mail.entity.generated';
import { Menu } from '../model/Menu.entity.generated';
import { ModuleAccess } from '../model/ModuleAccess.entity.generated';
import { AdminModule } from '../model/AdminModule.entity.generated';
import { ProjectAccount } from '../model/ProjectAccount.entity.generated';
import { ProfileBackground } from '../model/ProfileBackground.entity.generated';
import { ProjectDocusignMapping } from '../model/ProjectDocusignMapping.entity.generated';
import { ProjectBalanceAdjustment } from '../model/ProjectBalanceAdjustment.entity.generated';
import { ProjectEntity } from '../model/ProjectEntity.entity.generated';
import { ProjectEntityDetail } from '../model/ProjectEntityDetail.entity.generated';
import { ProjectImage } from '../model/ProjectImage.entity.generated';
import { ProjectKeybacker } from '../model/ProjectKeybacker.entity.generated';
import { ProjectPdf } from '../model/ProjectPdf.entity.generated';
import { ExemptDistributionOption } from '../model/ExemptDistributionOption.entity.generated';
import { ProjectStatusReport } from '../model/ProjectStatusReport.entity.generated';
import { ProjectTaxReport } from '../model/ProjectTaxReport.entity.generated';
import { AdminUser } from '../model/AdminUser.entity.generated';
import { AllUserAnswer } from '../model/AllUserAnswer.entity.generated';
import { ComputedAccountBalance } from '../model/ComputedAccountBalance.entity.generated';
import { ComputedAccountIncome } from '../model/ComputedAccountIncome.entity.generated';
import { ComputedAccountPosition } from '../model/ComputedAccountPosition.entity.generated';
import { ComputedAccountTotalIncome } from '../model/ComputedAccountTotalIncome.entity.generated';
import { ComputedProjectBalance } from '../model/ComputedProjectBalance.entity.generated';
import { ComputedProjectIncome } from '../model/ComputedProjectIncome.entity.generated';
import { ComputedProjectPosition } from '../model/ComputedProjectPosition.entity.generated';
import { ComputedProjectTotalIncome } from '../model/ComputedProjectTotalIncome.entity.generated';
import { InvestorCobranding } from '../model/InvestorCobranding.entity.generated';
import { InvestorSocialProfile } from '../model/InvestorSocialProfile.entity.generated';
import { Investor } from '../model/Investor.entity.generated';
import { IssuerAdmin } from '../model/IssuerAdmin.entity.generated';
import { NotableInvestorProfile } from '../model/NotableInvestorProfile.entity.generated';
import { PropertySocialProfile } from '../model/PropertySocialProfile.entity.generated';
import { SponsorSocialProfile } from '../model/SponsorSocialProfile.entity.generated';
import { UserBasic } from '../model/UserBasic.entity.generated';
import { UserSignupEvent } from '../model/UserSignupEvent.entity.generated';
import { UserBeneficiary } from '../model/UserBeneficiary.entity.generated';
import { UserCorporation } from '../model/UserCorporation.entity.generated';
import { UserTrust } from '../model/UserTrust.entity.generated';
import { ComputedAccount } from '../model/ComputedAccount.entity.generated';

/**
 * Informational model in typescript (nest.js) for Fundscraper
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * A complete system for Fundscraper
 */


/**
 * Generated base dal for the class ProjectTaxSummary, do not edit. If you need to customize edit the derivation.
 */
export class ProjectTaxSummaryDal_generated extends AbstractDal<ProjectTaxSummary>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ProjectTaxSummary);
    }
}	


/**
 * Generated base dal for the class Project, do not edit. If you need to customize edit the derivation.
 */
export class ProjectDal_generated extends AbstractDal<Project>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(Project);
    }
}	


/**
 * Generated base dal for the class ProjectInterest, do not edit. If you need to customize edit the derivation.
 */
export class ProjectInterestDal_generated extends AbstractDal<ProjectInterest>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ProjectInterest);
    }
}	


/**
 * Generated base dal for the class Province, do not edit. If you need to customize edit the derivation.
 */
export class ProvinceDal_generated extends AbstractDal<Province>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(Province);
    }
}	


/**
 * Generated base dal for the class RegistrationQuestion, do not edit. If you need to customize edit the derivation.
 */
export class RegistrationQuestionDal_generated extends AbstractDal<RegistrationQuestion>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(RegistrationQuestion);
    }
}	


/**
 * Generated base dal for the class RoedSchedule1, do not edit. If you need to customize edit the derivation.
 */
export class RoedSchedule1Dal_generated extends AbstractDal<RoedSchedule1>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(RoedSchedule1);
    }
}	


/**
 * Generated base dal for the class Setting, do not edit. If you need to customize edit the derivation.
 */
export class SettingDal_generated extends AbstractDal<Setting>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(Setting);
    }
}	


/**
 * Generated base dal for the class SupportEngineer, do not edit. If you need to customize edit the derivation.
 */
export class SupportEngineerDal_generated extends AbstractDal<SupportEngineer>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(SupportEngineer);
    }
}	


/**
 * Generated base dal for the class UserIssuerAssociation, do not edit. If you need to customize edit the derivation.
 */
export class UserIssuerAssociationDal_generated extends AbstractDal<UserIssuerAssociation>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserIssuerAssociation);
    }
}	


/**
 * Generated base dal for the class UserRelationship, do not edit. If you need to customize edit the derivation.
 */
export class UserRelationshipDal_generated extends AbstractDal<UserRelationship>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserRelationship);
    }
}	


/**
 * Generated base dal for the class UserBankingDetails, do not edit. If you need to customize edit the derivation.
 */
export class UserBankingDetailsDal_generated extends AbstractDal<UserBankingDetails>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserBankingDetails);
    }
}	


/**
 * Generated base dal for the class UserFinancialKyc, do not edit. If you need to customize edit the derivation.
 */
export class UserFinancialKycDal_generated extends AbstractDal<UserFinancialKyc>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserFinancialKyc);
    }
}	


/**
 * Generated base dal for the class UserEntity, do not edit. If you need to customize edit the derivation.
 */
export class UserEntityDal_generated extends AbstractDal<UserEntity>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserEntity);
    }
}	


/**
 * Generated base dal for the class AllUser, do not edit. If you need to customize edit the derivation.
 */
export class AllUserDal_generated extends AbstractDal<AllUser>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(AllUser);
    }
}	


/**
 * Generated base dal for the class UserInvitation, do not edit. If you need to customize edit the derivation.
 */
export class UserInvitationDal_generated extends AbstractDal<UserInvitation>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserInvitation);
    }
}	


/**
 * Generated base dal for the class BackgroundProcess, do not edit. If you need to customize edit the derivation.
 */
export class BackgroundProcessDal_generated extends AbstractDal<BackgroundProcess>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(BackgroundProcess);
    }
}	


/**
 * Generated base dal for the class UserPdf, do not edit. If you need to customize edit the derivation.
 */
export class UserPdfDal_generated extends AbstractDal<UserPdf>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserPdf);
    }
}	


/**
 * Generated base dal for the class Country, do not edit. If you need to customize edit the derivation.
 */
export class CountryDal_generated extends AbstractDal<Country>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(Country);
    }
}	


/**
 * Generated base dal for the class UserAnswer, do not edit. If you need to customize edit the derivation.
 */
export class UserAnswerDal_generated extends AbstractDal<UserAnswer>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserAnswer);
    }
}	


/**
 * Generated base dal for the class Event, do not edit. If you need to customize edit the derivation.
 */
export class EventDal_generated extends AbstractDal<Event>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(Event);
    }
}	


/**
 * Generated base dal for the class UserRequest, do not edit. If you need to customize edit the derivation.
 */
export class UserRequestDal_generated extends AbstractDal<UserRequest>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserRequest);
    }
}	


/**
 * Generated base dal for the class FfbaAssociation, do not edit. If you need to customize edit the derivation.
 */
export class FfbaAssociationDal_generated extends AbstractDal<FfbaAssociation>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(FfbaAssociation);
    }
}	


/**
 * Generated base dal for the class SocialProfileFollowing, do not edit. If you need to customize edit the derivation.
 */
export class SocialProfileFollowingDal_generated extends AbstractDal<SocialProfileFollowing>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(SocialProfileFollowing);
    }
}	


/**
 * Generated base dal for the class ImportedContact, do not edit. If you need to customize edit the derivation.
 */
export class ImportedContactDal_generated extends AbstractDal<ImportedContact>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ImportedContact);
    }
}	


/**
 * Generated base dal for the class UserSocialPost, do not edit. If you need to customize edit the derivation.
 */
export class UserSocialPostDal_generated extends AbstractDal<UserSocialPost>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserSocialPost);
    }
}	


/**
 * Generated base dal for the class UserSocialProfile, do not edit. If you need to customize edit the derivation.
 */
export class UserSocialProfileDal_generated extends AbstractDal<UserSocialProfile>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserSocialProfile);
    }
}	


/**
 * Generated base dal for the class InvestmentOrder, do not edit. If you need to customize edit the derivation.
 */
export class InvestmentOrderDal_generated extends AbstractDal<InvestmentOrder>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(InvestmentOrder);
    }
}	


/**
 * Generated base dal for the class UserSubscription, do not edit. If you need to customize edit the derivation.
 */
export class UserSubscriptionDal_generated extends AbstractDal<UserSubscription>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserSubscription);
    }
}	


/**
 * Generated base dal for the class InvestmentTransaction, do not edit. If you need to customize edit the derivation.
 */
export class InvestmentTransactionDal_generated extends AbstractDal<InvestmentTransaction>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(InvestmentTransaction);
    }
}	


/**
 * Generated base dal for the class WebHook, do not edit. If you need to customize edit the derivation.
 */
export class WebHookDal_generated extends AbstractDal<WebHook>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(WebHook);
    }
}	


/**
 * Generated base dal for the class InvestmentWatchlist, do not edit. If you need to customize edit the derivation.
 */
export class InvestmentWatchlistDal_generated extends AbstractDal<InvestmentWatchlist>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(InvestmentWatchlist);
    }
}	


/**
 * Generated base dal for the class InvestmentWithdrawal, do not edit. If you need to customize edit the derivation.
 */
export class InvestmentWithdrawalDal_generated extends AbstractDal<InvestmentWithdrawal>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(InvestmentWithdrawal);
    }
}	


/**
 * Generated base dal for the class OrderAcknowledgement, do not edit. If you need to customize edit the derivation.
 */
export class OrderAcknowledgementDal_generated extends AbstractDal<OrderAcknowledgement>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(OrderAcknowledgement);
    }
}	


/**
 * Generated base dal for the class OrderAcknowledgementQuestion, do not edit. If you need to customize edit the derivation.
 */
export class OrderAcknowledgementQuestionDal_generated extends AbstractDal<OrderAcknowledgementQuestion>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(OrderAcknowledgementQuestion);
    }
}	


/**
 * Generated base dal for the class InvestorEarning, do not edit. If you need to customize edit the derivation.
 */
export class InvestorEarningDal_generated extends AbstractDal<InvestorEarning>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(InvestorEarning);
    }
}	


/**
 * Generated base dal for the class InvestorIntendedTrades, do not edit. If you need to customize edit the derivation.
 */
export class InvestorIntendedTradesDal_generated extends AbstractDal<InvestorIntendedTrades>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(InvestorIntendedTrades);
    }
}	


/**
 * Generated base dal for the class Mail, do not edit. If you need to customize edit the derivation.
 */
export class MailDal_generated extends AbstractDal<Mail>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(Mail);
    }
}	


/**
 * Generated base dal for the class Menu, do not edit. If you need to customize edit the derivation.
 */
export class MenuDal_generated extends AbstractDal<Menu>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(Menu);
    }
}	


/**
 * Generated base dal for the class ModuleAccess, do not edit. If you need to customize edit the derivation.
 */
export class ModuleAccessDal_generated extends AbstractDal<ModuleAccess>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ModuleAccess);
    }
}	


/**
 * Generated base dal for the class AdminModule, do not edit. If you need to customize edit the derivation.
 */
export class AdminModuleDal_generated extends AbstractDal<AdminModule>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(AdminModule);
    }
}	


/**
 * Generated base dal for the class ProjectAccount, do not edit. If you need to customize edit the derivation.
 */
export class ProjectAccountDal_generated extends AbstractDal<ProjectAccount>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ProjectAccount);
    }
}	


/**
 * Generated base dal for the class ProfileBackground, do not edit. If you need to customize edit the derivation.
 */
export class ProfileBackgroundDal_generated extends AbstractDal<ProfileBackground>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ProfileBackground);
    }
}	


/**
 * Generated base dal for the class ProjectDocusignMapping, do not edit. If you need to customize edit the derivation.
 */
export class ProjectDocusignMappingDal_generated extends AbstractDal<ProjectDocusignMapping>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ProjectDocusignMapping);
    }
}	


/**
 * Generated base dal for the class ProjectBalanceAdjustment, do not edit. If you need to customize edit the derivation.
 */
export class ProjectBalanceAdjustmentDal_generated extends AbstractDal<ProjectBalanceAdjustment>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ProjectBalanceAdjustment);
    }
}	


/**
 * Generated base dal for the class ProjectEntity, do not edit. If you need to customize edit the derivation.
 */
export class ProjectEntityDal_generated extends AbstractDal<ProjectEntity>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ProjectEntity);
    }
}	


/**
 * Generated base dal for the class ProjectEntityDetail, do not edit. If you need to customize edit the derivation.
 */
export class ProjectEntityDetailDal_generated extends AbstractDal<ProjectEntityDetail>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ProjectEntityDetail);
    }
}	


/**
 * Generated base dal for the class ProjectImage, do not edit. If you need to customize edit the derivation.
 */
export class ProjectImageDal_generated extends AbstractDal<ProjectImage>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ProjectImage);
    }
}	


/**
 * Generated base dal for the class ProjectKeybacker, do not edit. If you need to customize edit the derivation.
 */
export class ProjectKeybackerDal_generated extends AbstractDal<ProjectKeybacker>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ProjectKeybacker);
    }
}	


/**
 * Generated base dal for the class ProjectPdf, do not edit. If you need to customize edit the derivation.
 */
export class ProjectPdfDal_generated extends AbstractDal<ProjectPdf>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ProjectPdf);
    }
}	


/**
 * Generated base dal for the class ExemptDistributionOption, do not edit. If you need to customize edit the derivation.
 */
export class ExemptDistributionOptionDal_generated extends AbstractDal<ExemptDistributionOption>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ExemptDistributionOption);
    }
}	


/**
 * Generated base dal for the class ProjectStatusReport, do not edit. If you need to customize edit the derivation.
 */
export class ProjectStatusReportDal_generated extends AbstractDal<ProjectStatusReport>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ProjectStatusReport);
    }
}	


/**
 * Generated base dal for the class ProjectTaxReport, do not edit. If you need to customize edit the derivation.
 */
export class ProjectTaxReportDal_generated extends AbstractDal<ProjectTaxReport>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ProjectTaxReport);
    }
}	


/**
 * Generated base dal for the class AdminUser, do not edit. If you need to customize edit the derivation.
 */
export class AdminUserDal_generated extends AbstractDal<AdminUser>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(AdminUser);
    }
}	


/**
 * Generated base dal for the class AllUserAnswer, do not edit. If you need to customize edit the derivation.
 */
export class AllUserAnswerDal_generated extends AbstractDal<AllUserAnswer>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(AllUserAnswer);
    }
}	


/**
 * Generated base dal for the class ComputedAccountBalance, do not edit. If you need to customize edit the derivation.
 */
export class ComputedAccountBalanceDal_generated extends AbstractDal<ComputedAccountBalance>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ComputedAccountBalance);
    }
}	


/**
 * Generated base dal for the class ComputedAccountIncome, do not edit. If you need to customize edit the derivation.
 */
export class ComputedAccountIncomeDal_generated extends AbstractDal<ComputedAccountIncome>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ComputedAccountIncome);
    }
}	


/**
 * Generated base dal for the class ComputedAccountPosition, do not edit. If you need to customize edit the derivation.
 */
export class ComputedAccountPositionDal_generated extends AbstractDal<ComputedAccountPosition>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ComputedAccountPosition);
    }
}	


/**
 * Generated base dal for the class ComputedAccountTotalIncome, do not edit. If you need to customize edit the derivation.
 */
export class ComputedAccountTotalIncomeDal_generated extends AbstractDal<ComputedAccountTotalIncome>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ComputedAccountTotalIncome);
    }
}	


/**
 * Generated base dal for the class ComputedProjectBalance, do not edit. If you need to customize edit the derivation.
 */
export class ComputedProjectBalanceDal_generated extends AbstractDal<ComputedProjectBalance>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ComputedProjectBalance);
    }
}	


/**
 * Generated base dal for the class ComputedProjectIncome, do not edit. If you need to customize edit the derivation.
 */
export class ComputedProjectIncomeDal_generated extends AbstractDal<ComputedProjectIncome>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ComputedProjectIncome);
    }
}	


/**
 * Generated base dal for the class ComputedProjectPosition, do not edit. If you need to customize edit the derivation.
 */
export class ComputedProjectPositionDal_generated extends AbstractDal<ComputedProjectPosition>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ComputedProjectPosition);
    }
}	


/**
 * Generated base dal for the class ComputedProjectTotalIncome, do not edit. If you need to customize edit the derivation.
 */
export class ComputedProjectTotalIncomeDal_generated extends AbstractDal<ComputedProjectTotalIncome>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ComputedProjectTotalIncome);
    }
}	


/**
 * Generated base dal for the class InvestorCobranding, do not edit. If you need to customize edit the derivation.
 */
export class InvestorCobrandingDal_generated extends AbstractDal<InvestorCobranding>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(InvestorCobranding);
    }
}	


/**
 * Generated base dal for the class InvestorSocialProfile, do not edit. If you need to customize edit the derivation.
 */
export class InvestorSocialProfileDal_generated extends AbstractDal<InvestorSocialProfile>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(InvestorSocialProfile);
    }
}	


/**
 * Generated base dal for the class Investor, do not edit. If you need to customize edit the derivation.
 */
export class InvestorDal_generated extends AbstractDal<Investor>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(Investor);
    }
}	


/**
 * Generated base dal for the class IssuerAdmin, do not edit. If you need to customize edit the derivation.
 */
export class IssuerAdminDal_generated extends AbstractDal<IssuerAdmin>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(IssuerAdmin);
    }
}	


/**
 * Generated base dal for the class NotableInvestorProfile, do not edit. If you need to customize edit the derivation.
 */
export class NotableInvestorProfileDal_generated extends AbstractDal<NotableInvestorProfile>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(NotableInvestorProfile);
    }
}	


/**
 * Generated base dal for the class PropertySocialProfile, do not edit. If you need to customize edit the derivation.
 */
export class PropertySocialProfileDal_generated extends AbstractDal<PropertySocialProfile>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(PropertySocialProfile);
    }
}	


/**
 * Generated base dal for the class SponsorSocialProfile, do not edit. If you need to customize edit the derivation.
 */
export class SponsorSocialProfileDal_generated extends AbstractDal<SponsorSocialProfile>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(SponsorSocialProfile);
    }
}	


/**
 * Generated base dal for the class UserBasic, do not edit. If you need to customize edit the derivation.
 */
export class UserBasicDal_generated extends AbstractDal<UserBasic>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserBasic);
    }
}	


/**
 * Generated base dal for the class UserSignupEvent, do not edit. If you need to customize edit the derivation.
 */
export class UserSignupEventDal_generated extends AbstractDal<UserSignupEvent>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserSignupEvent);
    }
}	


/**
 * Generated base dal for the class UserBeneficiary, do not edit. If you need to customize edit the derivation.
 */
export class UserBeneficiaryDal_generated extends AbstractDal<UserBeneficiary>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserBeneficiary);
    }
}	


/**
 * Generated base dal for the class UserCorporation, do not edit. If you need to customize edit the derivation.
 */
export class UserCorporationDal_generated extends AbstractDal<UserCorporation>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserCorporation);
    }
}	


/**
 * Generated base dal for the class UserTrust, do not edit. If you need to customize edit the derivation.
 */
export class UserTrustDal_generated extends AbstractDal<UserTrust>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(UserTrust);
    }
}	


/**
 * Generated base dal for the class ComputedAccount, do not edit. If you need to customize edit the derivation.
 */
export class ComputedAccountDal_generated extends AbstractDal<ComputedAccount>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ComputedAccount);
    }
}	


