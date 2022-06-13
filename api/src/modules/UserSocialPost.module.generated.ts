import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserSocialPostService } from '../bll/UserSocialPost.service';
import { UserSocialPostApi } from '../api/UserSocialPost.controller';

/**
 * Nest.js module for REST API's in typescript for UserSocialPost
 * NOTE: Generated file, do not touch
 * one activity or comment of one user shared socially
 */
@Module({
	imports: [DalModule ],
	controllers: [UserSocialPostApi],
	providers: [UserSocialPostService],
	exports: [UserSocialPostService]
})
export class UserSocialPostModule 
{
	constructor() {}
}		



