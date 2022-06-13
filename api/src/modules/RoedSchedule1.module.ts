import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { RoedSchedule1Service } from '../bll/RoedSchedule1.service';
import { RoedSchedule1Api } from '../api/RoedSchedule1.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectModule } from '../modules/Project.module';
import { InvestmentOrderModule } from '../modules/InvestmentOrder.module';
import { InvestmentTransactionModule } from './InvestmentTransaction.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => ProjectModule), forwardRef(() => InvestmentOrderModule), forwardRef(() => InvestmentTransactionModule)],
    controllers: [RoedSchedule1Api],
    providers: [RoedSchedule1Service],
    exports: [RoedSchedule1Service]
})
export class RoedSchedule1Module {
    constructor() { }
}
