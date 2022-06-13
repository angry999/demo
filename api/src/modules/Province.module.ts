import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProvinceService } from '../bll/Province.service';
import { ProvinceApi } from '../api/Province.controller';
import { CountryModule } from '../modules/Country.module';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => CountryModule), forwardRef(() => AllUserModule)],
    controllers: [ProvinceApi],
    providers: [ProvinceService],
    exports: [ProvinceService]
})
export class ProvinceModule {
    constructor() { }
}
