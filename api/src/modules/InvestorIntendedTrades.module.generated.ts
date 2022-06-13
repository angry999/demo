import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestorIntendedTradesService } from '../bll/InvestorIntendedTrades.service';
import { InvestorIntendedTradesApi } from '../api/InvestorIntendedTrades.controller';

/**
 * Nest.js module for REST API's in typescript for InvestorIntendedTrades
 * NOTE: Generated file, do not touch
 * single investor intended future trade infomation
 */
@Module({
	imports: [DalModule ],
	controllers: [InvestorIntendedTradesApi],
	providers: [InvestorIntendedTradesService],
	exports: [InvestorIntendedTradesService]
})
export class InvestorIntendedTradesModule 
{
	constructor() {}
}		



