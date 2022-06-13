import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestorService } from '../bll/Investor.service';
import { InvestorApi } from '../api/Investor.controller';

/**
 * Nest.js module for REST API's in typescript for Investor
 * NOTE: Generated file, do not touch
 * A user that invests
 */
@Module({
	imports: [DalModule ],
	controllers: [InvestorApi],
	providers: [InvestorService],
	exports: [InvestorService]
})
export class InvestorModule 
{
	constructor() {}
}		



