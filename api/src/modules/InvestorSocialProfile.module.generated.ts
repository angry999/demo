import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestorSocialProfileService } from '../bll/InvestorSocialProfile.service';
import { InvestorSocialProfileApi } from '../api/InvestorSocialProfile.controller';

/**
 * Nest.js module for REST API's in typescript for InvestorSocialProfile
 * NOTE: Generated file, do not touch
 * A typical investor
 */
@Module({
	imports: [DalModule ],
	controllers: [InvestorSocialProfileApi],
	providers: [InvestorSocialProfileService],
	exports: [InvestorSocialProfileService]
})
export class InvestorSocialProfileModule 
{
	constructor() {}
}		



