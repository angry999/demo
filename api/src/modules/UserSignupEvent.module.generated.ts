import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserSignupEventService } from '../bll/UserSignupEvent.service';
import { UserSignupEventApi } from '../api/UserSignupEvent.controller';

/**
 * Nest.js module for REST API's in typescript for UserSignupEvent
 * NOTE: Generated file, do not touch
 * 
 */
@Module({
	imports: [DalModule ],
	controllers: [UserSignupEventApi],
	providers: [UserSignupEventService],
	exports: [UserSignupEventService]
})
export class UserSignupEventModule 
{
	constructor() {}
}		



