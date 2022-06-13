import { Module, forwardRef, HttpModule } from '@nestjs/common';
import { DatabaseConnectionPool } from './DatabaseConnectionPool.provider';
import { AdminUserDal } from '../dal/AdminUser.provider';
import { AllUserDal } from '../dal/AllUser.provider';
import { AllUserAnswerDal } from '../dal/AllUserAnswer.provider';
import { BackgroundProcessDal } from '../dal/BackgroundProcess.provider';
import { CountryDal } from '../dal/Country.provider';
import { EventDal } from '../dal/Event.provider';
import { FfbaAssociationDal } from '../dal/FfbaAssociation.provider';
import { ImportedContactDal } from '../dal/ImportedContact.provider';
import { InvestmentOrderDal } from '../dal/InvestmentOrder.provider';
import { InvestmentTransactionDal } from '../dal/InvestmentTransaction.provider';
import { InvestmentWatchlistDal } from '../dal/InvestmentWatchlist.provider';
import { OrderAcknowledgementDal } from '../dal/OrderAcknowledgement.provider';
import { OrderAcknowledgementQuestionDal } from '../dal/OrderAcknowledgementQuestion.provider';
import { InvestorEarningDal } from '../dal/InvestorEarning.provider';
import { InvestorIntendedTradesDal } from '../dal/InvestorIntendedTrades.provider';
import { InvestorSocialProfileDal } from '../dal/InvestorSocialProfile.provider';
import { InvestorDal } from '../dal/Investor.provider';
import { InvestorCobrandingDal } from '../dal/InvestorCobranding.provider';
import { IssuerAdminDal } from '../dal/IssuerAdmin.provider';
import { MailDal } from '../dal/Mail.provider';
import { MenuDal } from '../dal/Menu.provider';
import { ModuleAccessDal } from '../dal/ModuleAccess.provider';
import { AdminModuleDal } from '../dal/AdminModule.provider';
import { NotableInvestorProfileDal } from '../dal/NotableInvestorProfile.provider';
import { ProjectAccountDal } from '../dal/ProjectAccount.provider';
import { ProfileBackgroundDal } from '../dal/ProfileBackground.provider';
import { ProjectDocusignMappingDal } from '../dal/ProjectDocusignMapping.provider';
import { ProjectBalanceAdjustmentDal } from '../dal/ProjectBalanceAdjustment.provider';
import { ProjectEntityDal } from '../dal/ProjectEntity.provider';
import { ProjectEntityDetailDal } from '../dal/ProjectEntityDetail.provider';
import { ProjectImageDal } from '../dal/ProjectImage.provider';
import { ProjectKeybackerDal } from '../dal/ProjectKeybacker.provider';
import { ProjectPdfDal } from '../dal/ProjectPdf.provider';
import { ExemptDistributionOptionDal } from '../dal/ExemptDistributionOption.provider';
import { ProjectStatusReportDal } from '../dal/ProjectStatusReport.provider';
import { ProjectTaxReportDal } from '../dal/ProjectTaxReport.provider';
import { ProjectTaxSummaryDal } from '../dal/ProjectTaxSummary.provider';
import { ProjectDal } from '../dal/Project.provider';
import { ProjectInterestDal } from '../dal/ProjectInterest.provider';
import { PropertySocialProfileDal } from '../dal/PropertySocialProfile.provider';
import { ProvinceDal } from '../dal/Province.provider';
import { RegistrationQuestionDal } from '../dal/RegistrationQuestion.provider';
import { SettingDal } from '../dal/Setting.provider';
import { SponsorSocialProfileDal } from '../dal/SponsorSocialProfile.provider';
import { SupportEngineerDal } from '../dal/SupportEngineer.provider';
import { UserBasicDal } from '../dal/UserBasic.provider';
import { UserIssuerAssociationDal } from '../dal/UserIssuerAssociation.provider';
import { UserRelationshipDal } from '../dal/UserRelationship.provider';
import { UserBankingDetailsDal } from '../dal/UserBankingDetails.provider';
import { UserBeneficiaryDal } from '../dal/UserBeneficiary.provider';
import { UserCorporationDal } from '../dal/UserCorporation.provider';
import { UserFinancialKycDal } from './UserFinancialKyc.provider';
import { UserEntityDal } from '../dal/UserEntity.provider';
import { UserInvitationDal } from '../dal/UserInvitation.provider';
import { UserPdfDal } from '../dal/UserPdf.provider';
import { UserAnswerDal } from '../dal/UserAnswer.provider';
import { UserRequestDal } from '../dal/UserRequest.provider';
import { SocialProfileFollowingDal } from '../dal/SocialProfileFollowing.provider';
import { UserSocialPostDal } from '../dal/UserSocialPost.provider';
import { UserSocialProfileDal } from '../dal/UserSocialProfile.provider';
import { UserSubscriptionDal } from '../dal/UserSubscription.provider';
import { UserTrustDal } from '../dal/UserTrust.provider';
import { WebHookDal } from '../dal/WebHook.provider';
import { InvestmentWithdrawalDal } from './InvestmentWithdrawal.provider';
import { ComputedAccountPositionDal } from './ComputedAccountPosition.provider';
import { ComputedAccountDal } from './ComputedAccount.provider';
import { RoedSchedule1Dal } from './RoedSchedule1.provider';
import { UserSignupEventDal } from './UserSignupEvent.provider';
import { ComputedAccountIncomeDal } from './ComputedAccountIncome.provider';
import { ComputedAccountTotalIncomeDal } from './ComputedAccountTotalIncome.provider';
import { ComputedProjectIncomeDal } from './ComputedProjectIncome.provider';
import { ComputedProjectTotalIncomeDal } from './ComputedProjectTotalIncome.provider';

@Module({
    imports: [],
    controllers: [],
    providers: [...DatabaseConnectionPool, HttpModule
        , AdminUserDal
        , AllUserDal
        , AllUserAnswerDal
        , BackgroundProcessDal
        , ComputedAccountIncomeDal
        , ComputedAccountPositionDal
        , ComputedAccountTotalIncomeDal
        , ComputedProjectIncomeDal
        , ComputedProjectTotalIncomeDal
        , ComputedAccountDal
        , CountryDal
        , EventDal
        , FfbaAssociationDal
        , ImportedContactDal
        , InvestmentOrderDal
        , InvestmentTransactionDal
        , InvestmentWatchlistDal
        , InvestmentWithdrawalDal
        , OrderAcknowledgementDal
        , OrderAcknowledgementQuestionDal
        , InvestorEarningDal
        , InvestorIntendedTradesDal
        , InvestorSocialProfileDal
        , InvestorDal
        , InvestorCobrandingDal
        , IssuerAdminDal
        , MailDal
        , MenuDal
        , ModuleAccessDal
        , AdminModuleDal
        , NotableInvestorProfileDal
        , ProjectAccountDal
        , ProfileBackgroundDal
        , ProjectDocusignMappingDal
        , ProjectBalanceAdjustmentDal
        , ProjectEntityDal
        , ProjectEntityDetailDal
        , ProjectImageDal
        , ProjectKeybackerDal
        , ProjectPdfDal
        , ExemptDistributionOptionDal
        , ProjectStatusReportDal
        , ProjectTaxReportDal
        , ProjectTaxSummaryDal
        , ProjectDal
        , ProjectInterestDal
        , PropertySocialProfileDal
        , ProvinceDal
        , RegistrationQuestionDal
        , RoedSchedule1Dal
        , SettingDal
        , SponsorSocialProfileDal
        , SupportEngineerDal
        , UserBasicDal
        , UserIssuerAssociationDal
        , UserRelationshipDal
        , UserBankingDetailsDal
        , UserBeneficiaryDal
        , UserCorporationDal
        , UserFinancialKycDal
        , UserEntityDal
        , UserInvitationDal
        , UserPdfDal
        , UserAnswerDal
        , UserRequestDal
        , SocialProfileFollowingDal
        , UserSocialPostDal
        , UserSocialProfileDal
        , UserSignupEventDal
        , UserSubscriptionDal
        , UserTrustDal
        , WebHookDal
    ],
    exports: [
        AdminUserDal
        , AllUserDal
        , AllUserAnswerDal
        , BackgroundProcessDal
        , ComputedAccountIncomeDal
        , ComputedAccountPositionDal
        , ComputedAccountTotalIncomeDal
        , ComputedProjectIncomeDal
        , ComputedProjectTotalIncomeDal
        , ComputedAccountDal
        , CountryDal
        , EventDal
        , FfbaAssociationDal
        , ImportedContactDal
        , InvestmentOrderDal
        , InvestmentTransactionDal
        , InvestmentWatchlistDal
        , InvestmentWithdrawalDal
        , OrderAcknowledgementDal
        , OrderAcknowledgementQuestionDal
        , InvestorCobrandingDal
        , InvestorEarningDal
        , InvestorIntendedTradesDal
        , InvestorSocialProfileDal
        , InvestorDal
        , IssuerAdminDal
        , MailDal
        , MenuDal
        , ModuleAccessDal
        , AdminModuleDal
        , NotableInvestorProfileDal
        , ProjectAccountDal
        , ProfileBackgroundDal
        , ProjectDocusignMappingDal
        , ProjectBalanceAdjustmentDal
        , ProjectEntityDal
        , ProjectEntityDetailDal
        , ProjectImageDal
        , ProjectKeybackerDal
        , ProjectPdfDal
        , ExemptDistributionOptionDal
        , ProjectStatusReportDal
        , ProjectTaxReportDal
        , ProjectTaxSummaryDal
        , ProjectDal
        , ProjectInterestDal
        , PropertySocialProfileDal
        , ProvinceDal
        , RegistrationQuestionDal
        , RoedSchedule1Dal
        , SettingDal
        , SponsorSocialProfileDal
        , SupportEngineerDal
        , UserBasicDal
        , UserIssuerAssociationDal
        , UserRelationshipDal
        , UserBankingDetailsDal
        , UserBeneficiaryDal
        , UserCorporationDal
        , UserFinancialKycDal
        , UserEntityDal
        , UserInvitationDal
        , UserPdfDal
        , UserAnswerDal
        , UserRequestDal
        , SocialProfileFollowingDal
        , UserSignupEventDal
        , UserSocialPostDal
        , UserSocialProfileDal
        , UserSubscriptionDal
        , UserTrustDal
        , WebHookDal]
})
export class DalModule {
    constructor() { }
}
