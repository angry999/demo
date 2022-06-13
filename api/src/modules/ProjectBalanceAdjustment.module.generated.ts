import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectBalanceAdjustmentService } from '../bll/ProjectBalanceAdjustment.service';
import { ProjectBalanceAdjustmentApi } from '../api/ProjectBalanceAdjustment.controller';

/**
 * Nest.js module for REST API's in typescript for ProjectBalanceAdjustment
 * NOTE: Generated file, do not touch
 * one change in the balance of a project for one financial period
 */
@Module({
	imports: [DalModule ],
	controllers: [ProjectBalanceAdjustmentApi],
	providers: [ProjectBalanceAdjustmentService],
	exports: [ProjectBalanceAdjustmentService]
})
export class ProjectBalanceAdjustmentModule 
{
	constructor() {}
}		



