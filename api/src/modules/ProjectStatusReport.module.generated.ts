import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectStatusReportService } from '../bll/ProjectStatusReport.service';
import { ProjectStatusReportApi } from '../api/ProjectStatusReport.controller';

/**
 * Nest.js module for REST API's in typescript for ProjectStatusReport
 * NOTE: Generated file, do not touch
 * an intermittent report about the progress of a project
 */
@Module({
	imports: [DalModule ],
	controllers: [ProjectStatusReportApi],
	providers: [ProjectStatusReportService],
	exports: [ProjectStatusReportService]
})
export class ProjectStatusReportModule 
{
	constructor() {}
}		



