import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ComputedAccountTotalIncomeService } from '../bll/ComputedAccountTotalIncome.service';
import { ComputedAccountTotalIncomeApi } from '../api/ComputedAccountTotalIncome.controller';

/**
 * Nest.js module for REST API's in typescript for ComputedAccountTotalIncome
 * NOTE: Generated file, do not touch
 * 
 */
@Module({
	imports: [DalModule ],
	controllers: [ComputedAccountTotalIncomeApi],
	providers: [ComputedAccountTotalIncomeService],
	exports: [ComputedAccountTotalIncomeService]
})
export class ComputedAccountTotalIncomeModule 
{
	constructor() {}
}		



