import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectAccountService } from '../bll/ProjectAccount.service';
import { ProjectAccountApi } from '../api/ProjectAccount.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectModule } from '../modules/Project.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => ProjectModule)],
    controllers: [ProjectAccountApi],
    providers: [ProjectAccountService],
    exports: [ProjectAccountService]
})
export class ProjectAccountModule {
    constructor() { }
}
