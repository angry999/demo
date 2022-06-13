import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { OrderAcknowledgementQuestionService } from '../bll/OrderAcknowledgementQuestion.service';
import { OrderAcknowledgementQuestionApi } from '../api/OrderAcknowledgementQuestion.controller';

/**
 * Nest.js module for REST API's in typescript for OrderAcknowledgementQuestion
 * NOTE: Generated file, do not touch
 * a single question to ask an investor to achknowledge an order
 */
@Module({
	imports: [DalModule ],
	controllers: [OrderAcknowledgementQuestionApi],
	providers: [OrderAcknowledgementQuestionService],
	exports: [OrderAcknowledgementQuestionService]
})
export class OrderAcknowledgementQuestionModule 
{
	constructor() {}
}		



