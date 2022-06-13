import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserSocialPostService } from '../bll/UserSocialPost.service';
import { UserSocialPostApi } from '../api/UserSocialPost.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { UserSocialProfileModule } from '../modules/UserSocialProfile.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => UserSocialProfileModule)],
    controllers: [UserSocialPostApi],
    providers: [UserSocialPostService],
    exports: [UserSocialPostService]
})
export class UserSocialPostModule {
    constructor() { }
}
