import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectPdfService } from '../bll/ProjectPdf.service';
import { ProjectPdfApi } from '../api/ProjectPdf.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectModule } from '../modules/Project.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => ProjectModule)],
    controllers: [ProjectPdfApi],
    providers: [ProjectPdfService],
    exports: [ProjectPdfService]
})
export class ProjectPdfModule {
    constructor() { }
}
