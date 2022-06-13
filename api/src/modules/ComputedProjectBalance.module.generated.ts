import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ComputedProjectBalanceService } from '../bll/ComputedProjectBalance.service';
import { ComputedProjectBalanceApi } from '../api/ComputedProjectBalance.controller';

/**
 * Nest.js module for REST API's in typescript for ComputedProjectBalance
 * NOTE: Generated file, do not touch
 * 
 */
@Module({
	imports: [DalModule ],
	controllers: [ComputedProjectBalanceApi],
	providers: [ComputedProjectBalanceService],
	exports: [ComputedProjectBalanceService]
})
export class ComputedProjectBalanceModule 
{
	constructor() {}
}		



