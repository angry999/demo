import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectEntityDetailService } from '../bll/ProjectEntityDetail.service';
import { ProjectEntityDetailApi } from '../api/ProjectEntityDetail.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectEntityModule } from '../modules/ProjectEntity.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => ProjectEntityModule)],
    controllers: [ProjectEntityDetailApi],
    providers: [ProjectEntityDetailService],
    exports: [ProjectEntityDetailService]
})
export class ProjectEntityDetailModule {
    constructor() { }
}
