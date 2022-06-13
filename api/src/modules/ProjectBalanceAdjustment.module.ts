import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectBalanceAdjustmentService } from '../bll/ProjectBalanceAdjustment.service';
import { ProjectBalanceAdjustmentApi } from '../api/ProjectBalanceAdjustment.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectModule } from '../modules/Project.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => ProjectModule)],
    controllers: [ProjectBalanceAdjustmentApi],
    providers: [ProjectBalanceAdjustmentService],
    exports: [ProjectBalanceAdjustmentService]
})
export class ProjectBalanceAdjustmentModule {
    constructor() { }
}
