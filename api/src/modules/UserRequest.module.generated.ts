import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserRequestService } from '../bll/UserRequest.service';
import { UserRequestApi } from '../api/UserRequest.controller';

/**
 * Nest.js module for REST API's in typescript for UserRequest
 * NOTE: Generated file, do not touch
 * a request by a user for a change to their account. this is not for customer service type requests but rathe structural ones like becoming a notable investor
 */
@Module({
	imports: [DalModule ],
	controllers: [UserRequestApi],
	providers: [UserRequestService],
	exports: [UserRequestService]
})
export class UserRequestModule 
{
	constructor() {}
}		



