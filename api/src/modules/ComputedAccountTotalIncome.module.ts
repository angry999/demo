import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ComputedAccountTotalIncomeService } from '../bll/ComputedAccountTotalIncome.service';
import { ComputedAccountTotalIncomeApi } from '../api/ComputedAccountTotalIncome.controller';

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
