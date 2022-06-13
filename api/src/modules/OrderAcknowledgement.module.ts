import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { OrderAcknowledgementService } from '../bll/OrderAcknowledgement.service';
import { OrderAcknowledgementApi } from '../api/OrderAcknowledgement.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { InvestmentOrderModule } from '../modules/InvestmentOrder.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => InvestmentOrderModule)],
    controllers: [OrderAcknowledgementApi],
    providers: [OrderAcknowledgementService],
    exports: [OrderAcknowledgementService]
})
export class OrderAcknowledgementModule {
    constructor() { }
}
