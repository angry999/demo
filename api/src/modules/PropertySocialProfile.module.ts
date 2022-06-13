import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { PropertySocialProfileService } from '../bll/PropertySocialProfile.service';
import { PropertySocialProfileApi } from '../api/PropertySocialProfile.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectModule } from '../modules/Project.module';
import { ProjectInterestModule } from '../modules/ProjectInterest.module';
import { InvestmentOrderModule } from '../modules/InvestmentOrder.module';
import { UserIssuerAssociationModule } from '../modules/UserIssuerAssociation.module.generated';
import { SocialProfileFollowingModule } from '../modules/SocialProfileFollowing.module';
import { UserSocialPostModule } from '../modules/UserSocialPost.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => ProjectModule), forwardRef(() => ProjectInterestModule), forwardRef(() => InvestmentOrderModule), forwardRef(() => UserIssuerAssociationModule), forwardRef(() => SocialProfileFollowingModule), forwardRef(() => UserSocialPostModule)],
    controllers: [PropertySocialProfileApi],
    providers: [PropertySocialProfileService],
    exports: [PropertySocialProfileService]
})
export class PropertySocialProfileModule {
    constructor() { }
}
