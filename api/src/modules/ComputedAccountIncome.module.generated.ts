import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ComputedAccountIncomeService } from '../bll/ComputedAccountIncome.service';
import { ComputedAccountIncomeApi } from '../api/ComputedAccountIncome.controller';

/**
 * Nest.js module for REST API's in typescript for ComputedAccountIncome
 * NOTE: Generated file, do not touch
 * 
 */
@Module({
	imports: [DalModule ],
	controllers: [ComputedAccountIncomeApi],
	providers: [ComputedAccountIncomeService],
	exports: [ComputedAccountIncomeService]
})
export class ComputedAccountIncomeModule 
{
	constructor() {}
}		



