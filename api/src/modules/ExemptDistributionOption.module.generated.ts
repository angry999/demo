import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ExemptDistributionOptionService } from '../bll/ExemptDistributionOption.service';
import { ExemptDistributionOptionApi } from '../api/ExemptDistributionOption.controller';

/**
 * Nest.js module for REST API's in typescript for ExemptDistributionOption
 * NOTE: Generated file, do not touch
 * an option for reporting distributions
 */
@Module({
	imports: [DalModule ],
	controllers: [ExemptDistributionOptionApi],
	providers: [ExemptDistributionOptionService],
	exports: [ExemptDistributionOptionService]
})
export class ExemptDistributionOptionModule 
{
	constructor() {}
}		



