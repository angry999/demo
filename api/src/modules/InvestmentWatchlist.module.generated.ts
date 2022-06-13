import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestmentWatchlistService } from '../bll/InvestmentWatchlist.service';
import { InvestmentWatchlistApi } from '../api/InvestmentWatchlist.controller';

/**
 * Nest.js module for REST API's in typescript for InvestmentWatchlist
 * NOTE: Generated file, do not touch
 * the recognition of one user wanting an alert when an investment achieves a certain degree of performance
 */
@Module({
	imports: [DalModule ],
	controllers: [InvestmentWatchlistApi],
	providers: [InvestmentWatchlistService],
	exports: [InvestmentWatchlistService]
})
export class InvestmentWatchlistModule 
{
	constructor() {}
}		



