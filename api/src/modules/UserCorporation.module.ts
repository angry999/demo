import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserCorporationService } from '../bll/UserCorporation.service';
import { UserCorporationApi } from '../api/UserCorporation.controller';
import { ProvinceModule } from '../modules/Province.module';
import { CountryModule } from '../modules/Country.module';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => ProvinceModule), forwardRef(() => CountryModule), forwardRef(() => AllUserModule)],
    controllers: [UserCorporationApi],
    providers: [UserCorporationService],
    exports: [UserCorporationService]
})
export class UserCorporationModule {
    constructor() { }
}
