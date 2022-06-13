import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestmentWithdrawalService } from '../bll/InvestmentWithdrawal.service';
import { InvestmentWithdrawalApi } from '../api/InvestmentWithdrawal.controller';

/**
 * Nest.js module for REST API's in typescript for InvestmentWithdrawal
 * NOTE: Generated file, do not touch
 * one withdrawel of funds
 */
@Module({
	imports: [DalModule ],
	controllers: [InvestmentWithdrawalApi],
	providers: [InvestmentWithdrawalService],
	exports: [InvestmentWithdrawalService]
})
export class InvestmentWithdrawalModule 
{
	constructor() {}
}		



