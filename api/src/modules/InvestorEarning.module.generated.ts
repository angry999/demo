import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestorEarningService } from '../bll/InvestorEarning.service';
import { InvestorEarningApi } from '../api/InvestorEarning.controller';

/**
 * Nest.js module for REST API's in typescript for InvestorEarning
 * NOTE: Generated file, do not touch
 * earnings, adjustments and charges to an investors accounts
 */
@Module({
	imports: [DalModule ],
	controllers: [InvestorEarningApi],
	providers: [InvestorEarningService],
	exports: [InvestorEarningService]
})
export class InvestorEarningModule 
{
	constructor() {}
}		



