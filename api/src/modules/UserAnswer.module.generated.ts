import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserAnswerService } from '../bll/UserAnswer.service';
import { UserAnswerApi } from '../api/UserAnswer.controller';

/**
 * Nest.js module for REST API's in typescript for UserAnswer
 * NOTE: Generated file, do not touch
 * one answer one user provided to one question
 */
@Module({
	imports: [DalModule ],
	controllers: [UserAnswerApi],
	providers: [UserAnswerService],
	exports: [UserAnswerService]
})
export class UserAnswerModule 
{
	constructor() {}
}		



