import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserSubscriptionService } from '../bll/UserSubscription.service';
import { UserSubscriptionApi } from '../api/UserSubscription.controller';

/**
 * Nest.js module for REST API's in typescript for UserSubscription
 * NOTE: Generated file, do not touch
 * one user indicating they want to receive notifications about activity on one subject
 */
@Module({
	imports: [DalModule ],
	controllers: [UserSubscriptionApi],
	providers: [UserSubscriptionService],
	exports: [UserSubscriptionService]
})
export class UserSubscriptionModule 
{
	constructor() {}
}		



