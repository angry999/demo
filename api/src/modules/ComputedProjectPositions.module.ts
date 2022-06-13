import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ComputedProjectPositionsService } from '../bll/ComputedProjectPositions.service';
import { ComputedProjectPositionsApi } from '../api/ComputedProjectPositions.controller';

@Module({
	imports: [DalModule ],
	controllers: [ComputedProjectPositionsApi],
	providers: [ComputedProjectPositionsService],
	exports: [ComputedProjectPositionsService]
})
export class ComputedProjectPositionsModule 
{
	constructor() {}
}		
