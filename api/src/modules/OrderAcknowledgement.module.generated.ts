import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { OrderAcknowledgementService } from '../bll/OrderAcknowledgement.service';
import { OrderAcknowledgementApi } from '../api/OrderAcknowledgement.controller';

/**
 * Nest.js module for REST API's in typescript for OrderAcknowledgement
 * NOTE: Generated file, do not touch
 * one answer to one question by one user to approve an order
 */
@Module({
	imports: [DalModule ],
	controllers: [OrderAcknowledgementApi],
	providers: [OrderAcknowledgementService],
	exports: [OrderAcknowledgementService]
})
export class OrderAcknowledgementModule 
{
	constructor() {}
}		



