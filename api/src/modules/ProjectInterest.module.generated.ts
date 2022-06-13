import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectInterestService } from '../bll/ProjectInterest.service';
import { ProjectInterestApi } from '../api/ProjectInterest.controller';

/**
 * Nest.js module for REST API's in typescript for ProjectInterest
 * NOTE: Generated file, do not touch
 * one user expressing an interest in one property
 */
@Module({
	imports: [DalModule ],
	controllers: [ProjectInterestApi],
	providers: [ProjectInterestService],
	exports: [ProjectInterestService]
})
export class ProjectInterestModule 
{
	constructor() {}
}		



