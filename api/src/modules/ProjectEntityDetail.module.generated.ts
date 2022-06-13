import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectEntityDetailService } from '../bll/ProjectEntityDetail.service';
import { ProjectEntityDetailApi } from '../api/ProjectEntityDetail.controller';

/**
 * Nest.js module for REST API's in typescript for ProjectEntityDetail
 * NOTE: Generated file, do not touch
 * additional specification for a project entity. the specifics are determined by what kind of entity it is
 */
@Module({
	imports: [DalModule ],
	controllers: [ProjectEntityDetailApi],
	providers: [ProjectEntityDetailService],
	exports: [ProjectEntityDetailService]
})
export class ProjectEntityDetailModule 
{
	constructor() {}
}		



