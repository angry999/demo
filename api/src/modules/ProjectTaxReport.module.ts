import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectTaxReportService } from '../bll/ProjectTaxReport.service';
import { ProjectTaxReportApi } from '../api/ProjectTaxReport.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectModule } from '../modules/Project.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => ProjectModule)],
    controllers: [ProjectTaxReportApi],
    providers: [ProjectTaxReportService],
    exports: [ProjectTaxReportService]
})
export class ProjectTaxReportModule {
    constructor() { }
}
