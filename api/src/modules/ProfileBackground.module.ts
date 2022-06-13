import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProfileBackgroundService } from '../bll/ProfileBackground.service';
import { ProfileBackgroundApi } from '../api/ProfileBackground.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule)],
    controllers: [ProfileBackgroundApi],
    providers: [ProfileBackgroundService],
    exports: [ProfileBackgroundService]
})
export class ProfileBackgroundModule {
    constructor() { }
}
