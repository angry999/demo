import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestmentWithdrawalService } from '../bll/InvestmentWithdrawal.service';
import { InvestmentWithdrawalApi } from '../api/InvestmentWithdrawal.controller';
import { ProvinceModule } from '../modules/Province.module';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { InvestmentOrderModule } from '../modules/InvestmentOrder.module';

@Module({
    imports: [DalModule, forwardRef(() => ProvinceModule), forwardRef(() => AllUserModule), forwardRef(() => InvestmentOrderModule)],
    controllers: [InvestmentWithdrawalApi],
    providers: [InvestmentWithdrawalService],
    exports: [InvestmentWithdrawalService]
})
export class InvestmentWithdrawalModule {
    constructor() { }
}
