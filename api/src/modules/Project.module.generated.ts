import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectService } from '../bll/Project.service';
import { ProjectApi } from '../api/Project.controller';

/**
 * Nest.js module for REST API's in typescript for Project
 * NOTE: Generated file, do not touch
 * a development project for considerationn
 */
@Module({
	imports: [DalModule ],
	controllers: [ProjectApi],
	providers: [ProjectService],
	exports: [ProjectService]
})
export class ProjectModule 
{
	constructor() {}
}		



