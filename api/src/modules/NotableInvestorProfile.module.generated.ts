import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { NotableInvestorProfileService } from '../bll/NotableInvestorProfile.service';
import { NotableInvestorProfileApi } from '../api/NotableInvestorProfile.controller';

/**
 * Nest.js module for REST API's in typescript for NotableInvestorProfile
 * NOTE: Generated file, do not touch
 * An investor that has notarity and is promoted online
 */
@Module({
	imports: [DalModule ],
	controllers: [NotableInvestorProfileApi],
	providers: [NotableInvestorProfileService],
	exports: [NotableInvestorProfileService]
})
export class NotableInvestorProfileModule 
{
	constructor() {}
}		



