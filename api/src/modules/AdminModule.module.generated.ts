import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { AdminModuleService } from '../bll/AdminModule.service';
import { AdminModuleApi } from '../api/AdminModule.controller';

/**
 * Nest.js module for REST API's in typescript for AdminModule
 * NOTE: Generated file, do not touch
 * one section of functionality in the administrative application
 */
@Module({
	imports: [DalModule ],
	controllers: [AdminModuleApi],
	providers: [AdminModuleService],
	exports: [AdminModuleService]
})
export class AdminModuleModule 
{
	constructor() {}
}		



