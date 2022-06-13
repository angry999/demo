import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectTaxSummaryService } from '../bll/ProjectTaxSummary.service';
import { ProjectTaxSummaryApi } from '../api/ProjectTaxSummary.controller';

/**
 * Nest.js module for REST API's in typescript for ProjectTaxSummary
 * NOTE: Generated file, do not touch
 * details about the tax for a project for a given year
 */
@Module({
	imports: [DalModule ],
	controllers: [ProjectTaxSummaryApi],
	providers: [ProjectTaxSummaryService],
	exports: [ProjectTaxSummaryService]
})
export class ProjectTaxSummaryModule 
{
	constructor() {}
}		



