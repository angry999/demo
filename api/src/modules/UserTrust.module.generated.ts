import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserTrustService } from '../bll/UserTrust.service';
import { UserTrustApi } from '../api/UserTrust.controller';

/**
 * Nest.js module for REST API's in typescript for UserTrust
 * NOTE: Generated file, do not touch
 * An investment entity for users trusts
 */
@Module({
	imports: [DalModule ],
	controllers: [UserTrustApi],
	providers: [UserTrustService],
	exports: [UserTrustService]
})
export class UserTrustModule 
{
	constructor() {}
}		



