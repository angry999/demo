import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { IssuerAdminService } from '../bll/IssuerAdmin.service';
import { IssuerAdminApi } from '../api/IssuerAdmin.controller';
import { UserSocialProfileModule } from '../modules/UserSocialProfile.module.generated';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { MailModule } from '../modules/Mail.module';
import { InvestmentWatchlistModule } from '../modules/InvestmentWatchlist.module';
import { ModuleAccessModule } from '../modules/ModuleAccess.module';
import { UserIssuerAssociationModule } from '../modules/UserIssuerAssociation.module.generated';
import { UserEntityModule } from '../modules/UserEntity.module.generated';
import { UserInvitationModule } from '../modules/UserInvitation.module';
import { UserAnswerModule } from '../modules/UserAnswer.module';
import { UserRequestModule } from '../modules/UserRequest.module';
import { UserSubscriptionModule } from '../modules/UserSubscription.module';

@Module({
    imports: [DalModule, forwardRef(() => UserSocialProfileModule), forwardRef(() => AllUserModule), forwardRef(() => MailModule), forwardRef(() => InvestmentWatchlistModule), forwardRef(() => ModuleAccessModule), forwardRef(() => UserIssuerAssociationModule), forwardRef(() => UserEntityModule), forwardRef(() => UserInvitationModule), forwardRef(() => UserAnswerModule), forwardRef(() => UserRequestModule), forwardRef(() => UserSubscriptionModule)],
    controllers: [IssuerAdminApi],
    providers: [IssuerAdminService],
    exports: [IssuerAdminService]
})
export class IssuerAdminModule {
    constructor() { }
}
