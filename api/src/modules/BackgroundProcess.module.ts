import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { BackgroundProcessService } from '../bll/BackgroundProcess.service';
import { BackgroundProcessApi } from '../api/BackgroundProcess.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule)],
    controllers: [BackgroundProcessApi],
    providers: [BackgroundProcessService],
    exports: [BackgroundProcessService]
})
export class BackgroundProcessModule {
    constructor() { }
}
