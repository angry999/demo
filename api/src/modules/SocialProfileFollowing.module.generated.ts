import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { SocialProfileFollowingService } from '../bll/SocialProfileFollowing.service';
import { SocialProfileFollowingApi } from '../api/SocialProfileFollowing.controller';

/**
 * Nest.js module for REST API's in typescript for SocialProfileFollowing
 * NOTE: Generated file, do not touch
 * one user watching or referring to another user
 */
@Module({
	imports: [DalModule ],
	controllers: [SocialProfileFollowingApi],
	providers: [SocialProfileFollowingService],
	exports: [SocialProfileFollowingService]
})
export class SocialProfileFollowingModule 
{
	constructor() {}
}		



