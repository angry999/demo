import { HttpModule, Module, forwardRef } from '@nestjs/common';
import { DalModule } from './dal/Dal.module';
import { HubspotContactModule } from './modules/HubspotContact.module';
import { HubspotContactCobrandersModule } from './modules/HubspotContactCobranders.module';
import { HubspotCronServiceModule } from './modules/HubspotCronService.module';
import { HubspotDealModule } from './modules/HubspotDeal.module';
import { HubspotProjectModule } from './modules/HubspotProject.module';
import { MetricsModule } from './modules/Metrics.module';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { DatabaseConnectionPool } from './dal/DatabaseConnectionPool.provider';
import { AdminUserDal } from './dal/AdminUser.provider';
import { AllUserDal } from './dal/AllUser.provider';
import { AllUserService } from './bll/AllUser.service';
import { AccessTokenAuthGuard } from './security/AccessTokenAuthGuard';
import { ApiAuthGuard } from './security/ApiAuthGuard';
import { AzureADStrategy } from './security/AzureADStrategy';
import { AdminUserModule } from './modules/AdminUser.module';
import { AllUserModule } from './modules/AllUser.module.generated';
import { AllUserAnswerModule } from './modules/AllUserAnswer.module.generated';
import { BackgroundProcessModule } from './modules/BackgroundProcess.module';
import { ComputedAccountPositionModule } from './modules/ComputedAccountPosition.module.generated';
import { ComputedAccountModule } from './modules/ComputedAccount.module.generated';
import { CountryModule } from './modules/Country.module';
import { EventModule } from './modules/Event.module';
import { FfbaAssociationModule } from './modules/FfbaAssociation.module';
import { ImportedContactModule } from './modules/ImportedContact.module';
import { InvestmentOrderModule } from './modules/InvestmentOrder.module';
import { InvestmentTransactionModule } from './modules/InvestmentTransaction.module';
import { InvestmentWatchlistModule } from './modules/InvestmentWatchlist.module';
import { InvestmentWithdrawalModule } from './modules/InvestmentWithdrawal.module';
import { OrderAcknowledgementModule } from './modules/OrderAcknowledgement.module';
import { OrderAcknowledgementQuestionModule } from './modules/OrderAcknowledgementQuestion.module';
import { InvestorCobrandingModule } from './modules/InvestorCobranding.module.generated';
import { InvestorEarningModule } from './modules/InvestorEarning.module';
import { InvestorIntendedTradesModule } from './modules/InvestorIntendedTrades.module';
import { InvestorSocialProfileModule } from './modules/InvestorSocialProfile.module';
import { InvestorModule } from './modules/Investor.module';
import { IssuerAdminModule } from './modules/IssuerAdmin.module';
import { MailModule } from './modules/Mail.module';
import { MenuModule } from './modules/Menu.module';
import { ModuleAccessModule } from './modules/ModuleAccess.module';
import { AdminModuleModule } from './modules/AdminModule.module';
import { NotableInvestorProfileModule } from './modules/NotableInvestorProfile.module';
import { ProjectAccountModule } from './modules/ProjectAccount.module';
import { ProfileBackgroundModule } from './modules/ProfileBackground.module';
import { ProjectDocusignMappingModule } from './modules/ProjectDocusignMapping.module';
import { ProjectBalanceAdjustmentModule } from './modules/ProjectBalanceAdjustment.module';
import { ProjectEntityModule } from './modules/ProjectEntity.module';
import { ProjectEntityDetailModule } from './modules/ProjectEntityDetail.module';
import { ProjectImageModule } from './modules/ProjectImage.module';
import { ProjectKeybackerModule } from './modules/ProjectKeybacker.module';
import { ProjectPdfModule } from './modules/ProjectPdf.module';
import { ExemptDistributionOptionModule } from './modules/ExemptDistributionOption.module';
import { ProjectStatusReportModule } from './modules/ProjectStatusReport.module';
import { ProjectTaxReportModule } from './modules/ProjectTaxReport.module';
import { ProjectTaxSummaryModule } from './modules/ProjectTaxSummary.module';
import { ProjectModule } from './modules/Project.module';
import { ProjectInterestModule } from './modules/ProjectInterest.module';
import { PropertySocialProfileModule } from './modules/PropertySocialProfile.module';
import { ProvinceModule } from './modules/Province.module';
import { RegistrationQuestionModule } from './modules/RegistrationQuestion.module';
import { RoedSchedule1Module } from './modules/RoedSchedule1.module';
import { SettingModule } from './modules/Setting.module.generated';
import { SponsorSocialProfileModule } from './modules/SponsorSocialProfile.module';
import { SupportEngineerModule } from './modules/SupportEngineer.module';
import { UserBasicModule } from './modules/UserBasic.module.generated';
import { UserIssuerAssociationModule } from './modules/UserIssuerAssociation.module.generated';
import { UserRelationshipModule } from './modules/UserRelationship.module';
import { UserSignupEventModule } from './modules/UserSignupEvent.module.generated';
import { UserBankingDetailsModule } from './modules/UserBankingDetails.module';
import { UserBeneficiaryModule } from './modules/UserBeneficiary.module';
import { UserCorporationModule } from './modules/UserCorporation.module';
import { UserFinancialKYCModule } from './modules/UserFinancialKYC.module';
import { UserEntityModule } from './modules/UserEntity.module.generated';
import { UserInvitationModule } from './modules/UserInvitation.module';
import { UserPdfModule } from './modules/UserPdf.module';
import { UserAnswerModule } from './modules/UserAnswer.module';
import { UserRequestModule } from './modules/UserRequest.module';
import { SocialProfileFollowingModule } from './modules/SocialProfileFollowing.module';
import { UserSocialPostModule } from './modules/UserSocialPost.module';
import { UserSocialProfileModule } from './modules/UserSocialProfile.module.generated';
import { UserSubscriptionModule } from './modules/UserSubscription.module';
import { UserTrustModule } from './modules/UserTrust.module';
import { WebHookModule } from './modules/WebHook.module';
import { ComputedProjectTotalIncomeModule } from './modules/ComputedProjectTotalIncome.module.generated';
import { ComputedProjectIncomeModule } from './modules/ComputedProjectIncome.module.generated';
import { ComputedAccountTotalIncomeModule } from './modules/ComputedAccountTotalIncome.module.generated';
import { ComputedAccountIncomeModule } from './modules/ComputedAccountIncome.module.generated';

// npm run start
@Module({
    imports: [HttpModule, ScheduleModule.forRoot(), forwardRef(() => PassportModule)
        , forwardRef(() => DalModule)
        , forwardRef(() => HubspotContactModule)
        , forwardRef(() => HubspotContactCobrandersModule)
        , forwardRef(() => HubspotCronServiceModule)
        , forwardRef(() => HubspotDealModule)
        , forwardRef(() => HubspotProjectModule)
        , forwardRef(() => MetricsModule)
        , forwardRef(() => AdminUserModule), forwardRef(() => AllUserModule), forwardRef(() => AllUserAnswerModule), forwardRef(() => BackgroundProcessModule), forwardRef(() => ComputedAccountPositionModule), forwardRef(() => ComputedAccountModule), forwardRef(() => CountryModule), forwardRef(() => EventModule), forwardRef(() => FfbaAssociationModule), forwardRef(() => ImportedContactModule), forwardRef(() => InvestmentOrderModule), forwardRef(() => InvestmentTransactionModule), forwardRef(() => InvestmentWatchlistModule), forwardRef(() => InvestmentWithdrawalModule), forwardRef(() => OrderAcknowledgementModule), forwardRef(() => OrderAcknowledgementQuestionModule), forwardRef(() => InvestorCobrandingModule), forwardRef(() => InvestorEarningModule), forwardRef(() => InvestorIntendedTradesModule), forwardRef(() => InvestorSocialProfileModule), forwardRef(() => InvestorModule), forwardRef(() => IssuerAdminModule), forwardRef(() => MailModule), forwardRef(() => MenuModule), forwardRef(() => ModuleAccessModule), forwardRef(() => AdminModuleModule), forwardRef(() => NotableInvestorProfileModule), forwardRef(() => ProjectAccountModule), forwardRef(() => ProfileBackgroundModule), forwardRef(() => ProjectDocusignMappingModule), forwardRef(() => ProjectBalanceAdjustmentModule), forwardRef(() => ProjectEntityModule), forwardRef(() => ProjectEntityDetailModule), forwardRef(() => ProjectImageModule), forwardRef(() => ProjectKeybackerModule), forwardRef(() => ProjectPdfModule), forwardRef(() => ExemptDistributionOptionModule), forwardRef(() => ProjectStatusReportModule), forwardRef(() => ProjectTaxReportModule), forwardRef(() => ProjectTaxSummaryModule), forwardRef(() => ProjectModule), forwardRef(() => ProjectInterestModule), forwardRef(() => PropertySocialProfileModule), forwardRef(() => ProvinceModule), forwardRef(() => RegistrationQuestionModule), forwardRef(() => RoedSchedule1Module), forwardRef(() => SettingModule), forwardRef(() => SponsorSocialProfileModule), forwardRef(() => SupportEngineerModule), forwardRef(() => UserBasicModule), forwardRef(() => UserIssuerAssociationModule), forwardRef(() => UserRelationshipModule), forwardRef(() => UserSignupEventModule), forwardRef(() => UserBankingDetailsModule), forwardRef(() => UserBeneficiaryModule), forwardRef(() => UserCorporationModule), forwardRef(() => UserFinancialKYCModule), forwardRef(() => UserEntityModule), forwardRef(() => UserInvitationModule), forwardRef(() => UserPdfModule), forwardRef(() => UserAnswerModule), forwardRef(() => UserRequestModule), forwardRef(() => SocialProfileFollowingModule), forwardRef(() => UserSocialPostModule), forwardRef(() => UserSocialProfileModule), forwardRef(() => UserSubscriptionModule), forwardRef(() => UserTrustModule), forwardRef(() => WebHookModule)
        , forwardRef(() => ComputedProjectTotalIncomeModule)
        , forwardRef(() => ComputedProjectIncomeModule)
        , forwardRef(() => ComputedAccountTotalIncomeModule)
        , forwardRef(() => ComputedAccountIncomeModule)
    ],
    controllers: [],
    providers: [
        ...DatabaseConnectionPool, AllUserDal, AllUserService, AdminUserDal
        , AzureADStrategy, AccessTokenAuthGuard, ApiAuthGuard, {
            provide: APP_GUARD,
            useClass: ApiAuthGuard,
        }],
})
export class AppModule {
    constructor() { }
}
