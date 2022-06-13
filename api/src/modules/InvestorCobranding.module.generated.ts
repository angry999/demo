import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestorCobrandingService } from '../bll/InvestorCobranding.service';
import { InvestorCobrandingApi } from '../api/InvestorCobranding.controller';

/**
 * Nest.js module for REST API's in typescript for InvestorCobranding
 * NOTE: Generated file, do not touch
 * 
 */
@Module({
	imports: [DalModule ],
	controllers: [InvestorCobrandingApi],
	providers: [InvestorCobrandingService],
	exports: [InvestorCobrandingService]
})
export class InvestorCobrandingModule 
{
	constructor() {}
}		



