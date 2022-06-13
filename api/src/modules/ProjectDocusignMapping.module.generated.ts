import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectDocusignMappingService } from '../bll/ProjectDocusignMapping.service';
import { ProjectDocusignMappingApi } from '../api/ProjectDocusignMapping.controller';

/**
 * Nest.js module for REST API's in typescript for ProjectDocusignMapping
 * NOTE: Generated file, do not touch
 * one set of instructions of how to take data from one project and place it into a docusign document
 */
@Module({
	imports: [DalModule ],
	controllers: [ProjectDocusignMappingApi],
	providers: [ProjectDocusignMappingService],
	exports: [ProjectDocusignMappingService]
})
export class ProjectDocusignMappingModule 
{
	constructor() {}
}		



