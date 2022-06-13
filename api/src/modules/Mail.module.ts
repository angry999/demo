import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { MailService } from '../bll/Mail.service';
import { MailApi } from '../api/Mail.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule)],
    controllers: [MailApi],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {
    constructor() { }
}
