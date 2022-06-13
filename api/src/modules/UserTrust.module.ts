import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserTrustService } from '../bll/UserTrust.service';
import { UserTrustApi } from '../api/UserTrust.controller';
import { CountryModule } from '../modules/Country.module';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProvinceModule } from '../modules/Province.module';

@Module({
    imports: [DalModule, forwardRef(() => CountryModule), forwardRef(() => AllUserModule), forwardRef(() => ProvinceModule)],
    controllers: [UserTrustApi],
    providers: [UserTrustService],
    exports: [UserTrustService]
})
export class UserTrustModule {
    constructor() { }
}
