import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ComputedAccountBalancesService } from '../bll/ComputedAccountBalances.service';
import { ComputedAccountBalancesApi } from '../api/ComputedAccountBalances.controller';

@Module({
	imports: [DalModule ],
	controllers: [ComputedAccountBalancesApi],
	providers: [ComputedAccountBalancesService],
	exports: [ComputedAccountBalancesService]
})
export class ComputedAccountBalancesModule 
{
	constructor() {}
}		
