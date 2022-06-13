import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectKeybackerService } from '../bll/ProjectKeybacker.service';
import { ProjectKeybackerApi } from '../api/ProjectKeybacker.controller';

/**
 * Nest.js module for REST API's in typescript for ProjectKeybacker
 * NOTE: Generated file, do not touch
 * one person or organizatoin that is backing the project
 */
@Module({
	imports: [DalModule ],
	controllers: [ProjectKeybackerApi],
	providers: [ProjectKeybackerService],
	exports: [ProjectKeybackerService]
})
export class ProjectKeybackerModule 
{
	constructor() {}
}		



