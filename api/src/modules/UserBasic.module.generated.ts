import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserBasicService } from '../bll/UserBasic.service';
import { UserBasicApi } from '../api/UserBasic.controller';

/**
 * Nest.js module for REST API's in typescript for UserBasic
 * NOTE: Generated file, do not touch
 * An administrative user
 */
@Module({
	imports: [DalModule ],
	controllers: [UserBasicApi],
	providers: [UserBasicService],
	exports: [UserBasicService]
})
export class UserBasicModule 
{
	constructor() {}
}		



