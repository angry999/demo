import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { SocialProfileFollowingService } from '../bll/SocialProfileFollowing.service';
import { SocialProfileFollowingApi } from '../api/SocialProfileFollowing.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { UserSocialProfileModule } from '../modules/UserSocialProfile.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => UserSocialProfileModule)],
    controllers: [SocialProfileFollowingApi],
    providers: [SocialProfileFollowingService],
    exports: [SocialProfileFollowingService]
})
export class SocialProfileFollowingModule {
    constructor() { }
}
