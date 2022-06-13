import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectDocusignMappingService } from '../bll/ProjectDocusignMapping.service';
import { ProjectDocusignMappingApi } from '../api/ProjectDocusignMapping.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectModule } from '../modules/Project.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => ProjectModule)],
    controllers: [ProjectDocusignMappingApi],
    providers: [ProjectDocusignMappingService],
    exports: [ProjectDocusignMappingService]
})
export class ProjectDocusignMappingModule {
    constructor() { }
}
