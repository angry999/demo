import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestmentOrderService } from '../bll/InvestmentOrder.service';
import { InvestmentOrderApi } from '../api/InvestmentOrder.controller';

/**
 * Nest.js module for REST API's in typescript for InvestmentOrder
 * NOTE: Generated file, do not touch
 * one request for the purchase of securities. this is NOT the transaction, just the request for a transaction.
 */
@Module({
	imports: [DalModule ],
	controllers: [InvestmentOrderApi],
	providers: [InvestmentOrderService],
	exports: [InvestmentOrderService]
})
export class InvestmentOrderModule 
{
	constructor() {}
}		



