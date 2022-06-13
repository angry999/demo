import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ComputedAccountIncomeService } from '../bll/ComputedAccountIncome.service';
import { ComputedAccountIncomeApi } from '../api/ComputedAccountIncome.controller';

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
