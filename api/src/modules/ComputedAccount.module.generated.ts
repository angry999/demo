import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ComputedAccountService } from '../bll/ComputedAccount.service';
import { ComputedAccountApi } from '../api/ComputedAccount.controller';

/**
 * Nest.js module for REST API's in typescript for ComputedAccount
 * NOTE: Generated file, do not touch
 * 
 */
@Module({
	imports: [DalModule ],
	controllers: [ComputedAccountApi],
	providers: [ComputedAccountService],
	exports: [ComputedAccountService]
})
export class ComputedAccountModule 
{
	constructor() {}
}		



