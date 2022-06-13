import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestmentTransactionService } from '../bll/InvestmentTransaction.service';
import { InvestmentTransactionApi } from '../api/InvestmentTransaction.controller';
import { InvestorEarningModule } from '../modules/InvestorEarning.module';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { InvestmentOrderModule } from '../modules/InvestmentOrder.module';
import { ProjectModule } from '../modules/Project.module';
import { UserEntityModule } from '../modules/UserEntity.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => InvestorEarningModule), forwardRef(() => AllUserModule), forwardRef(() => InvestmentOrderModule), forwardRef(() => ProjectModule), forwardRef(() => UserEntityModule)],
    controllers: [InvestmentTransactionApi],
    providers: [InvestmentTransactionService],
    exports: [InvestmentTransactionService]
})
export class InvestmentTransactionModule {
    constructor() { }
}
