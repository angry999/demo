import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { AllUserAnswerService } from '../bll/AllUserAnswer.service';
import { AllUserAnswerApi } from '../api/AllUserAnswer.controller';

/**
 * Nest.js module for REST API's in typescript for AllUserAnswer
 * NOTE: Generated file, do not touch
 * An answer from and type of question that has been asked of the user
 */
@Module({
	imports: [DalModule ],
	controllers: [AllUserAnswerApi],
	providers: [AllUserAnswerService],
	exports: [AllUserAnswerService]
})
export class AllUserAnswerModule 
{
	constructor() {}
}		



