import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { WebHookService } from '../bll/WebHook.service';
import { WebHookApi } from '../api/WebHook.controller';
import { UserSocialProfileModule } from '../modules/UserSocialProfile.module.generated';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectModule } from '../modules/Project.module';

@Module({
    imports: [DalModule, forwardRef(() => UserSocialProfileModule), forwardRef(() => AllUserModule), forwardRef(() => ProjectModule)],
    controllers: [WebHookApi],
    providers: [WebHookService],
    exports: [WebHookService]
})
export class WebHookModule {
    constructor() { }
}
