import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { CountryService } from '../bll/Country.service';
import { CountryApi } from '../api/Country.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule)],
    controllers: [CountryApi],
    providers: [CountryService],
    exports: [CountryService]
})
export class CountryModule {
    constructor() { }
}
