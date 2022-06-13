import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectKeybackerService } from '../bll/ProjectKeybacker.service';
import { ProjectKeybackerApi } from '../api/ProjectKeybacker.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectEntityModule } from '../modules/ProjectEntity.module';
import { ProjectModule } from '../modules/Project.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => ProjectEntityModule), forwardRef(() => ProjectModule)],
    controllers: [ProjectKeybackerApi],
    providers: [ProjectKeybackerService],
    exports: [ProjectKeybackerService]
})
export class ProjectKeybackerModule {
    constructor() { }
}
