import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { AdminUserService } from '../bll/AdminUser.service';
import { AdminUserApi } from '../api/AdminUser.controller';

/**
 * Nest.js module for REST API's in typescript for AdminUser
 * NOTE: Generated file, do not touch
 * An administrative user
 */
@Module({
	imports: [DalModule ],
	controllers: [AdminUserApi],
	providers: [AdminUserService],
	exports: [AdminUserService]
})
export class AdminUserModule 
{
	constructor() {}
}		



