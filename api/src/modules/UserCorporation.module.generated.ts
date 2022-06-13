import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserCorporationService } from '../bll/UserCorporation.service';
import { UserCorporationApi } from '../api/UserCorporation.controller';

/**
 * Nest.js module for REST API's in typescript for UserCorporation
 * NOTE: Generated file, do not touch
 * An investment entity for users corporations
 */
@Module({
	imports: [DalModule ],
	controllers: [UserCorporationApi],
	providers: [UserCorporationService],
	exports: [UserCorporationService]
})
export class UserCorporationModule 
{
	constructor() {}
}		



