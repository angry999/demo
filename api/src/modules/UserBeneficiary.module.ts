import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserBeneficiaryService } from '../bll/UserBeneficiary.service';
import { UserBeneficiaryApi } from '../api/UserBeneficiary.controller';
import { CountryModule } from '../modules/Country.module';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProvinceModule } from '../modules/Province.module';

@Module({
    imports: [DalModule, forwardRef(() => CountryModule), forwardRef(() => AllUserModule), forwardRef(() => ProvinceModule)],
    controllers: [UserBeneficiaryApi],
    providers: [UserBeneficiaryService],
    exports: [UserBeneficiaryService]
})
export class UserBeneficiaryModule {
    constructor() { }
}
