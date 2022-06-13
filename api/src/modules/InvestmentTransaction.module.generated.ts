import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestmentTransactionService } from '../bll/InvestmentTransaction.service';
import { InvestmentTransactionApi } from '../api/InvestmentTransaction.controller';

/**
 * Nest.js module for REST API's in typescript for InvestmentTransaction
 * NOTE: Generated file, do not touch
 * 
 */
@Module({
	imports: [DalModule ],
	controllers: [InvestmentTransactionApi],
	providers: [InvestmentTransactionService],
	exports: [InvestmentTransactionService]
})
export class InvestmentTransactionModule 
{
	constructor() {}
}		



