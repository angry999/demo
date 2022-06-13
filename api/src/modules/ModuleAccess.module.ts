import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ModuleAccessService } from '../bll/ModuleAccess.service';
import { ModuleAccessApi } from '../api/ModuleAccess.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { AdminModuleModule } from '../modules/AdminModule.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => AdminModuleModule)],
    controllers: [ModuleAccessApi],
    providers: [ModuleAccessService],
    exports: [ModuleAccessService]
})
export class ModuleAccessModule {
    constructor() { }
}
