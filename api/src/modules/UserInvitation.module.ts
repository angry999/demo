import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserInvitationService } from '../bll/UserInvitation.service';
import { UserInvitationApi } from '../api/UserInvitation.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule)],
    controllers: [UserInvitationApi],
    providers: [UserInvitationService],
    exports: [UserInvitationService]
})
export class UserInvitationModule {
    constructor() { }
}
