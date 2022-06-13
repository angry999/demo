import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectEntityService } from '../bll/ProjectEntity.service';
import { ProjectEntityApi } from '../api/ProjectEntity.controller';

/**
 * Nest.js module for REST API's in typescript for ProjectEntity
 * NOTE: Generated file, do not touch
 * one visual, descriptive component of a project
 */
@Module({
	imports: [DalModule ],
	controllers: [ProjectEntityApi],
	providers: [ProjectEntityService],
	exports: [ProjectEntityService]
})
export class ProjectEntityModule 
{
	constructor() {}
}		



