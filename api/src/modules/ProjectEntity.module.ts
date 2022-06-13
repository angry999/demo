import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectEntityService } from '../bll/ProjectEntity.service';
import { ProjectEntityApi } from '../api/ProjectEntity.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectModule } from '../modules/Project.module';
import { ProjectEntityDetailModule } from '../modules/ProjectEntityDetail.module';
import { ProjectImageModule } from '../modules/ProjectImage.module';
import { ProjectKeybackerModule } from '../modules/ProjectKeybacker.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => ProjectModule), forwardRef(() => ProjectEntityDetailModule), forwardRef(() => ProjectImageModule), forwardRef(() => ProjectKeybackerModule)],
    controllers: [ProjectEntityApi],
    providers: [ProjectEntityService],
    exports: [ProjectEntityService]
})
export class ProjectEntityModule {
    constructor() { }
}
