import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectImageService } from '../bll/ProjectImage.service';
import { ProjectImageApi } from '../api/ProjectImage.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectEntityModule } from '../modules/ProjectEntity.module';
import { ProjectModule } from '../modules/Project.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => ProjectEntityModule), forwardRef(() => ProjectModule)],
    controllers: [ProjectImageApi],
    providers: [ProjectImageService],
    exports: [ProjectImageService]
})
export class ProjectImageModule {
    constructor() { }
}
