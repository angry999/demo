import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ComputedAccountBalanceService } from '../bll/ComputedAccountBalance.service';
import { ComputedAccountBalanceApi } from '../api/ComputedAccountBalance.controller';

/**
 * Nest.js module for REST API's in typescript for ComputedAccountBalance
 * NOTE: Generated file, do not touch
 * 
 */
@Module({
	imports: [DalModule ],
	controllers: [ComputedAccountBalanceApi],
	providers: [ComputedAccountBalanceService],
	exports: [ComputedAccountBalanceService]
})
export class ComputedAccountBalanceModule 
{
	constructor() {}
}		



