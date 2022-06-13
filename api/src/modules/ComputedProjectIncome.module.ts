import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ComputedProjectIncomeService } from '../bll/ComputedProjectIncome.service';
import { ComputedProjectIncomeApi } from '../api/ComputedProjectIncome.controller';

@Module({
	imports: [DalModule ],
	controllers: [ComputedProjectIncomeApi],
	providers: [ComputedProjectIncomeService],
	exports: [ComputedProjectIncomeService]
})
export class ComputedProjectIncomeModule 
{
	constructor() {}
}		
