import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { SupportEngineerService } from '../bll/SupportEngineer.service';
import { SupportEngineerApi } from '../api/SupportEngineer.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule)],
    controllers: [SupportEngineerApi],
    providers: [SupportEngineerService],
    exports: [SupportEngineerService]
})
export class SupportEngineerModule {
    constructor() { }
}
