import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserFinancialKycService } from '../bll/UserFinancialKyc.service';
import { UserFinancialKycApi } from '../api/UserFinancialKyc.controller';

/**
 * Nest.js module for REST API's in typescript for UserFinancialKyc
 * NOTE: Generated file, do not touch
 * numerous questions answered by one user about thier finances and employment
 */
@Module({
	imports: [DalModule ],
	controllers: [UserFinancialKycApi],
	providers: [UserFinancialKycService],
	exports: [UserFinancialKycService]
})
export class UserFinancialKycModule 
{
	constructor() {}
}		



