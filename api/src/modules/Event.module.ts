import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { EventService } from '../bll/Event.service';
import { EventApi } from '../api/Event.controller';
import { InvestmentOrderModule } from '../modules/InvestmentOrder.module';
import { InvestmentTransactionModule } from '../modules/InvestmentTransaction.module';
import { InvestmentWithdrawalModule } from '../modules/InvestmentWithdrawal.module';
import { InvestorEarningModule } from '../modules/InvestorEarning.module';
import { UserSocialProfileModule } from '../modules/UserSocialProfile.module.generated';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectModule } from '../modules/Project.module';
import { UserPdfModule } from '../modules/UserPdf.module';

@Module({
    imports: [DalModule, forwardRef(() => InvestmentOrderModule), forwardRef(() => InvestmentTransactionModule), forwardRef(() => InvestmentWithdrawalModule), forwardRef(() => InvestorEarningModule), forwardRef(() => UserSocialProfileModule), forwardRef(() => AllUserModule), forwardRef(() => ProjectModule), forwardRef(() => UserPdfModule)],
    controllers: [EventApi],
    providers: [EventService],
    exports: [EventService]
})
export class EventModule {
    constructor() { }
}
