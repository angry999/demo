import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { AdminModuleService } from '../bll/AdminModule.service';
import { AdminModuleApi } from '../api/AdminModule.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ModuleAccessModule } from '../modules/ModuleAccess.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => ModuleAccessModule)],
    controllers: [AdminModuleApi],
    providers: [AdminModuleService],
    exports: [AdminModuleService]
})
export class AdminModuleModule {
    constructor() { }
}
