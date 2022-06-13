import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserSocialProfileService } from '../bll/UserSocialProfile.service';
import { UserSocialProfileApi } from '../api/UserSocialProfile.controller';

/**
 * Nest.js module for REST API's in typescript for UserSocialProfile
 * NOTE: Generated file, do not touch
 * a profile of some entity used for sharing and communicating
 */
@Module({
	imports: [DalModule ],
	controllers: [UserSocialProfileApi],
	providers: [UserSocialProfileService],
	exports: [UserSocialProfileService]
})
export class UserSocialProfileModule 
{
	constructor() {}
}		



