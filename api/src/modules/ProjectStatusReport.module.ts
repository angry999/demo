import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectStatusReportService } from '../bll/ProjectStatusReport.service';
import { ProjectStatusReportApi } from '../api/ProjectStatusReport.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectModule } from '../modules/Project.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => ProjectModule)],
    controllers: [ProjectStatusReportApi],
    providers: [ProjectStatusReportService],
    exports: [ProjectStatusReportService]
})
export class ProjectStatusReportModule {
    constructor() { }
}
