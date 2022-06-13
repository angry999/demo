import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { RegistrationQuestionService } from '../bll/RegistrationQuestion.service';
import { RegistrationQuestionApi } from '../api/RegistrationQuestion.controller';

/**
 * Nest.js module for REST API's in typescript for RegistrationQuestion
 * NOTE: Generated file, do not touch
 * one question that should be asked of users when they register
 */
@Module({
	imports: [DalModule ],
	controllers: [RegistrationQuestionApi],
	providers: [RegistrationQuestionService],
	exports: [RegistrationQuestionService]
})
export class RegistrationQuestionModule 
{
	constructor() {}
}		



