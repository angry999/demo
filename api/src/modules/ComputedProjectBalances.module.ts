import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ComputedProjectBalancesService } from '../bll/ComputedProjectBalances.service';
import { ComputedProjectBalancesApi } from '../api/ComputedProjectBalances.controller';

@Module({
	imports: [DalModule ],
	controllers: [ComputedProjectBalancesApi],
	providers: [ComputedProjectBalancesService],
	exports: [ComputedProjectBalancesService]
})
export class ComputedProjectBalancesModule 
{
	constructor() {}
}		
