import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { SupportEngineerService } from '../bll/SupportEngineer.service';
import { SupportEngineerApi } from '../api/SupportEngineer.controller';

/**
 * Nest.js module for REST API's in typescript for SupportEngineer
 * NOTE: Generated file, do not touch
 * one user who performs a support role
 */
@Module({
	imports: [DalModule ],
	controllers: [SupportEngineerApi],
	providers: [SupportEngineerService],
	exports: [SupportEngineerService]
})
export class SupportEngineerModule 
{
	constructor() {}
}		



