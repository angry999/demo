import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserSubscriptionService } from '../bll/UserSubscription.service';
import { UserSubscriptionApi } from '../api/UserSubscription.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule)],
    controllers: [UserSubscriptionApi],
    providers: [UserSubscriptionService],
    exports: [UserSubscriptionService]
})
export class UserSubscriptionModule {
    constructor() { }
}
