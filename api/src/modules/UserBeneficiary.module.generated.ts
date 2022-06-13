import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserBeneficiaryService } from '../bll/UserBeneficiary.service';
import { UserBeneficiaryApi } from '../api/UserBeneficiary.controller';

/**
 * Nest.js module for REST API's in typescript for UserBeneficiary
 * NOTE: Generated file, do not touch
 * An investment entity for users beneficiaries
 */
@Module({
	imports: [DalModule ],
	controllers: [UserBeneficiaryApi],
	providers: [UserBeneficiaryService],
	exports: [UserBeneficiaryService]
})
export class UserBeneficiaryModule 
{
	constructor() {}
}		



