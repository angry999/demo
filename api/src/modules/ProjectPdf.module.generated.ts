import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectPdfService } from '../bll/ProjectPdf.service';
import { ProjectPdfApi } from '../api/ProjectPdf.controller';

/**
 * Nest.js module for REST API's in typescript for ProjectPdf
 * NOTE: Generated file, do not touch
 * one pdf for one project or project entity
 */
@Module({
	imports: [DalModule ],
	controllers: [ProjectPdfApi],
	providers: [ProjectPdfService],
	exports: [ProjectPdfService]
})
export class ProjectPdfModule 
{
	constructor() {}
}		



