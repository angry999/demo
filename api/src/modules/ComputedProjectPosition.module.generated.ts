import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ComputedProjectPositionService } from '../bll/ComputedProjectPosition.service';
import { ComputedProjectPositionApi } from '../api/ComputedProjectPosition.controller';

/**
 * Nest.js module for REST API's in typescript for ComputedProjectPosition
 * NOTE: Generated file, do not touch
 * 
 */
@Module({
	imports: [DalModule ],
	controllers: [ComputedProjectPositionApi],
	providers: [ComputedProjectPositionService],
	exports: [ComputedProjectPositionService]
})
export class ComputedProjectPositionModule 
{
	constructor() {}
}		



