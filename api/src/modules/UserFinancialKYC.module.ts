import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserFinancialKycService } from '../bll/UserFinancialKyc.service';
import { UserFinancialKycApi } from '../api/UserFinancialKyc.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule)],
    controllers: [UserFinancialKycApi],
    providers: [UserFinancialKycService],
    exports: [UserFinancialKycService]
})
export class UserFinancialKYCModule {
    constructor() { }
}
