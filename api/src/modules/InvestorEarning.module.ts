import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestorEarningService } from '../bll/InvestorEarning.service';
import { InvestorEarningApi } from '../api/InvestorEarning.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { InvestmentOrderModule } from '../modules/InvestmentOrder.module';
import { ProjectBalanceAdjustmentModule } from '../modules/ProjectBalanceAdjustment.module';
import { ProjectModule } from '../modules/Project.module';
import { UserEntityModule } from '../modules/UserEntity.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => InvestmentOrderModule), forwardRef(() => ProjectBalanceAdjustmentModule), forwardRef(() => ProjectModule), forwardRef(() => UserEntityModule)],
    controllers: [InvestorEarningApi],
    providers: [InvestorEarningService],
    exports: [InvestorEarningService]
})
export class InvestorEarningModule {
    constructor() { }
}
