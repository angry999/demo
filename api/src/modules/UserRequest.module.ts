import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserRequestService } from '../bll/UserRequest.service';
import { UserRequestApi } from '../api/UserRequest.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule)],
    controllers: [UserRequestApi],
    providers: [UserRequestService],
    exports: [UserRequestService]
})
export class UserRequestModule {
    constructor() { }
}
