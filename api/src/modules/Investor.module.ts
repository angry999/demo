import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestorService } from '../bll/Investor.service';
import { InvestorApi } from '../api/Investor.controller';
import { UserSocialProfileModule } from '../modules/UserSocialProfile.module.generated';
import { CountryModule } from '../modules/Country.module';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProvinceModule } from '../modules/Province.module';
import { MailModule } from '../modules/Mail.module';
import { ImportedContactModule } from '../modules/ImportedContact.module';
import { InvestmentOrderModule } from '../modules/InvestmentOrder.module';
import { InvestmentTransactionModule } from '../modules/InvestmentTransaction.module';
import { InvestmentWatchlistModule } from '../modules/InvestmentWatchlist.module';
import { InvestorIntendedTradesModule } from '../modules/InvestorIntendedTrades.module';
import { ModuleAccessModule } from '../modules/ModuleAccess.module';
import { UserIssuerAssociationModule } from '../modules/UserIssuerAssociation.module.generated';
import { UserFinancialKYCModule } from '../modules/UserFinancialKYC.module';
import { UserEntityModule } from '../modules/UserEntity.module.generated';
import { UserInvitationModule } from '../modules/UserInvitation.module';
import { UserPdfModule } from '../modules/UserPdf.module';
import { UserAnswerModule } from '../modules/UserAnswer.module';
import { UserRequestModule } from '../modules/UserRequest.module';
import { UserSubscriptionModule } from '../modules/UserSubscription.module';

@Module({
    imports: [DalModule, forwardRef(() => UserSocialProfileModule), forwardRef(() => CountryModule), forwardRef(() => AllUserModule), forwardRef(() => ProvinceModule), forwardRef(() => MailModule), forwardRef(() => ImportedContactModule), forwardRef(() => InvestmentOrderModule), forwardRef(() => InvestmentTransactionModule), forwardRef(() => InvestmentWatchlistModule), forwardRef(() => InvestorIntendedTradesModule), forwardRef(() => ModuleAccessModule), forwardRef(() => UserIssuerAssociationModule), forwardRef(() => UserFinancialKYCModule), forwardRef(() => UserEntityModule), forwardRef(() => UserInvitationModule), forwardRef(() => UserPdfModule), forwardRef(() => UserAnswerModule), forwardRef(() => UserRequestModule), forwardRef(() => UserSubscriptionModule)],
    controllers: [InvestorApi],
    providers: [InvestorService],
    exports: [InvestorService]
})
export class InvestorModule {
    constructor() { }
}
