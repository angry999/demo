import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserEntityService } from '../bll/UserEntity.service';
import { UserEntityApi } from '../api/UserEntity.controller';

/**
 * Nest.js module for REST API's in typescript for UserEntity
 * NOTE: Generated file, do not touch
 * a legal entity. this should be re-done to not include properties, rather its three derivations (UserTrust, UserCorporation and UserBeneficiary) should take its place
 */
@Module({
	imports: [DalModule ],
	controllers: [UserEntityApi],
	providers: [UserEntityService],
	exports: [UserEntityService]
})
export class UserEntityModule 
{
	constructor() {}
}		



