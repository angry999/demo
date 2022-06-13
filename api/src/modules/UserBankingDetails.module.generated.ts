import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserBankingDetailsService } from '../bll/UserBankingDetails.service';
import { UserBankingDetailsApi } from '../api/UserBankingDetails.controller';

/**
 * Nest.js module for REST API's in typescript for UserBankingDetails
 * NOTE: Generated file, do not touch
 * a single users banking information - this is transient data, only held and forwarded then removed
 */
@Module({
	imports: [DalModule ],
	controllers: [UserBankingDetailsApi],
	providers: [UserBankingDetailsService],
	exports: [UserBankingDetailsService]
})
export class UserBankingDetailsModule 
{
	constructor() {}
}		



