import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { SponsorSocialProfileService } from '../bll/SponsorSocialProfile.service';
import { SponsorSocialProfileApi } from '../api/SponsorSocialProfile.controller';

/**
 * Nest.js module for REST API's in typescript for SponsorSocialProfile
 * NOTE: Generated file, do not touch
 * A sponsor/issuer of a properrty/project
 */
@Module({
	imports: [DalModule ],
	controllers: [SponsorSocialProfileApi],
	providers: [SponsorSocialProfileService],
	exports: [SponsorSocialProfileService]
})
export class SponsorSocialProfileModule 
{
	constructor() {}
}		



