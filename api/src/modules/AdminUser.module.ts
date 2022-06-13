import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { AdminUserService } from '../bll/AdminUser.service';
import { AdminUserApi } from '../api/AdminUser.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { MailModule } from '../modules/Mail.module';
import { InvestmentWatchlistModule } from '../modules/InvestmentWatchlist.module';
import { ModuleAccessModule } from '../modules/ModuleAccess.module';
import { UserIssuerAssociationModule } from '../modules/UserIssuerAssociation.module.generated';
import { UserEntityModule } from '../modules/UserEntity.module.generated';
import { UserInvitationModule } from '../modules/UserInvitation.module';
import { UserAnswerModule } from '../modules/UserAnswer.module';
import { UserRequestModule } from '../modules/UserRequest.module';
import { UserSocialProfileModule } from '../modules/UserSocialProfile.module.generated';
import { UserSubscriptionModule } from '../modules/UserSubscription.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => MailModule), forwardRef(() => InvestmentWatchlistModule), forwardRef(() => ModuleAccessModule), forwardRef(() => UserIssuerAssociationModule), forwardRef(() => UserEntityModule), forwardRef(() => UserInvitationModule), forwardRef(() => UserAnswerModule), forwardRef(() => UserRequestModule), forwardRef(() => UserSocialProfileModule), forwardRef(() => UserSubscriptionModule)],
    controllers: [AdminUserApi],
    providers: [AdminUserService],
    exports: [AdminUserService]
})
export class AdminUserModule {
    constructor() { }
}
