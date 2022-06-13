import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ExemptDistributionOptionService } from '../bll/ExemptDistributionOption.service';
import { ExemptDistributionOptionApi } from '../api/ExemptDistributionOption.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule)],
    controllers: [ExemptDistributionOptionApi],
    providers: [ExemptDistributionOptionService],
    exports: [ExemptDistributionOptionService]
})
export class ExemptDistributionOptionModule {
    constructor() { }
}
