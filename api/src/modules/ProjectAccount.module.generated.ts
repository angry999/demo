import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectAccountService } from '../bll/ProjectAccount.service';
import { ProjectAccountApi } from '../api/ProjectAccount.controller';

/**
 * Nest.js module for REST API's in typescript for ProjectAccount
 * NOTE: Generated file, do not touch
 * one method of payments that can be mode to a project
 */
@Module({
	imports: [DalModule ],
	controllers: [ProjectAccountApi],
	providers: [ProjectAccountService],
	exports: [ProjectAccountService]
})
export class ProjectAccountModule 
{
	constructor() {}
}		



