import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { AllUserService } from '../bll/AllUser.service';
import { AllUserApi } from '../api/AllUser.controller';

/**
 * Nest.js module for REST API's in typescript for AllUser
 * NOTE: Generated file, do not touch
 * one person, identified by an email address, who uses the system
 */
@Module({
	imports: [DalModule ],
	controllers: [AllUserApi],
	providers: [AllUserService],
	exports: [AllUserService]
})
export class AllUserModule 
{
	constructor() {}
}		



