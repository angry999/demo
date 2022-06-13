import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectTaxSummaryService } from '../bll/ProjectTaxSummary.service';
import { ProjectTaxSummaryApi } from '../api/ProjectTaxSummary.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectModule } from '../modules/Project.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => ProjectModule)],
    controllers: [ProjectTaxSummaryApi],
    providers: [ProjectTaxSummaryService],
    exports: [ProjectTaxSummaryService]
})
export class ProjectTaxSummaryModule {
    constructor() { }
}
