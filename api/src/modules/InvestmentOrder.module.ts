import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestmentOrderService } from '../bll/InvestmentOrder.service';
import { InvestmentOrderApi } from '../api/InvestmentOrder.controller';
import { UserBankingDetailsModule } from '../modules/UserBankingDetails.module';
import { FfbaAssociationModule } from '../modules/FfbaAssociation.module';
import { InvestmentWithdrawalModule } from '../modules/InvestmentWithdrawal.module';
import { UserSocialProfileModule } from '../modules/UserSocialProfile.module.generated';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectAccountModule } from '../modules/ProjectAccount.module';
import { ProjectModule } from '../modules/Project.module';
import { RoedSchedule1Module } from '../modules/RoedSchedule1.module';
import { UserEntityModule } from '../modules/UserEntity.module.generated';
import { OrderAcknowledgementModule } from '../modules/OrderAcknowledgement.module';
import { InvestorEarningModule } from '../modules/InvestorEarning.module';

@Module({
    imports: [DalModule, forwardRef(() => UserBankingDetailsModule), forwardRef(() => FfbaAssociationModule), forwardRef(() => InvestmentWithdrawalModule), forwardRef(() => UserSocialProfileModule), forwardRef(() => AllUserModule), forwardRef(() => ProjectAccountModule), forwardRef(() => ProjectModule), forwardRef(() => RoedSchedule1Module), forwardRef(() => UserEntityModule), forwardRef(() => OrderAcknowledgementModule), forwardRef(() => InvestorEarningModule)],
    controllers: [InvestmentOrderApi],
    providers: [InvestmentOrderService],
    exports: [InvestmentOrderService]
})
export class InvestmentOrderModule {
    constructor() { }
}
