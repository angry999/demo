import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectInterestService } from '../bll/ProjectInterest.service';
import { ProjectInterestApi } from '../api/ProjectInterest.controller';
import { UserSocialProfileModule } from '../modules/UserSocialProfile.module.generated';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => UserSocialProfileModule), forwardRef(() => AllUserModule)],
    controllers: [ProjectInterestApi],
    providers: [ProjectInterestService],
    exports: [ProjectInterestService]
})
export class ProjectInterestModule {
    constructor() { }
}
