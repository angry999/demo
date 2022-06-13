import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { SponsorSocialProfileService } from '../bll/SponsorSocialProfile.service';
import { SponsorSocialProfileApi } from '../api/SponsorSocialProfile.controller';
import { CountryModule } from '../modules/Country.module';
import { ProvinceModule } from '../modules/Province.module';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectModule } from '../modules/Project.module';
import { ProjectInterestModule } from '../modules/ProjectInterest.module';
import { InvestmentOrderModule } from '../modules/InvestmentOrder.module';
import { UserIssuerAssociationModule } from '../modules/UserIssuerAssociation.module.generated';
import { SocialProfileFollowingModule } from '../modules/SocialProfileFollowing.module';
import { UserSocialPostModule } from '../modules/UserSocialPost.module';

@Module({
    imports: [DalModule, forwardRef(() => CountryModule), forwardRef(() => ProvinceModule), forwardRef(() => AllUserModule), forwardRef(() => ProjectModule), forwardRef(() => ProjectInterestModule), forwardRef(() => InvestmentOrderModule), forwardRef(() => UserIssuerAssociationModule), forwardRef(() => SocialProfileFollowingModule), forwardRef(() => UserSocialPostModule)],
    controllers: [SponsorSocialProfileApi],
    providers: [SponsorSocialProfileService],
    exports: [SponsorSocialProfileService]
})
export class SponsorSocialProfileModule {
    constructor() { }
}
