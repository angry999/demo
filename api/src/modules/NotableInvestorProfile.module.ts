import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { NotableInvestorProfileService } from '../bll/NotableInvestorProfile.service';
import { NotableInvestorProfileApi } from '../api/NotableInvestorProfile.controller';
import { CountryModule } from '../modules/Country.module';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProvinceModule } from '../modules/Province.module';
import { ProjectInterestModule } from '../modules/ProjectInterest.module';
import { InvestmentOrderModule } from '../modules/InvestmentOrder.module';
import { ProjectModule } from '../modules/Project.module';
import { UserIssuerAssociationModule } from '../modules/UserIssuerAssociation.module.generated';
import { SocialProfileFollowingModule } from '../modules/SocialProfileFollowing.module';
import { UserSocialPostModule } from '../modules/UserSocialPost.module';

@Module({
    imports: [DalModule, forwardRef(() => CountryModule), forwardRef(() => AllUserModule), forwardRef(() => ProvinceModule), forwardRef(() => ProjectInterestModule), forwardRef(() => InvestmentOrderModule), forwardRef(() => ProjectModule), forwardRef(() => UserIssuerAssociationModule), forwardRef(() => SocialProfileFollowingModule), forwardRef(() => UserSocialPostModule)],
    controllers: [NotableInvestorProfileApi],
    providers: [NotableInvestorProfileService],
    exports: [NotableInvestorProfileService]
})
export class NotableInvestorProfileModule {
    constructor() { }
}
