import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectTaxReportService } from '../bll/ProjectTaxReport.service';
import { ProjectTaxReportApi } from '../api/ProjectTaxReport.controller';

/**
 * Nest.js module for REST API's in typescript for ProjectTaxReport
 * NOTE: Generated file, do not touch
 * details about the tax for a project for a given person for a year
 */
@Module({
	imports: [DalModule ],
	controllers: [ProjectTaxReportApi],
	providers: [ProjectTaxReportService],
	exports: [ProjectTaxReportService]
})
export class ProjectTaxReportModule 
{
	constructor() {}
}		



