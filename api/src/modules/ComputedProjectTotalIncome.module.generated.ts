import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ComputedProjectTotalIncomeService } from '../bll/ComputedProjectTotalIncome.service';
import { ComputedProjectTotalIncomeApi } from '../api/ComputedProjectTotalIncome.controller';

/**
 * Nest.js module for REST API's in typescript for ComputedProjectTotalIncome
 * NOTE: Generated file, do not touch
 * 
 */
@Module({
	imports: [DalModule ],
	controllers: [ComputedProjectTotalIncomeApi],
	providers: [ComputedProjectTotalIncomeService],
	exports: [ComputedProjectTotalIncomeService]
})
export class ComputedProjectTotalIncomeModule 
{
	constructor() {}
}		



