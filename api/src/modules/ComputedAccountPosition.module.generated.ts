import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ComputedAccountPositionService } from '../bll/ComputedAccountPosition.service';
import { ComputedAccountPositionApi } from '../api/ComputedAccountPosition.controller';

/**
 * Nest.js module for REST API's in typescript for ComputedAccountPosition
 * NOTE: Generated file, do not touch
 * 
 */
@Module({
	imports: [DalModule ],
	controllers: [ComputedAccountPositionApi],
	providers: [ComputedAccountPositionService],
	exports: [ComputedAccountPositionService]
})
export class ComputedAccountPositionModule 
{
	constructor() {}
}		



