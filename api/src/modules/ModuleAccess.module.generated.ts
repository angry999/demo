import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ModuleAccessService } from '../bll/ModuleAccess.service';
import { ModuleAccessApi } from '../api/ModuleAccess.controller';

/**
 * Nest.js module for REST API's in typescript for ModuleAccess
 * NOTE: Generated file, do not touch
 * the specification of what operations one user can perform in one module
 */
@Module({
	imports: [DalModule ],
	controllers: [ModuleAccessApi],
	providers: [ModuleAccessService],
	exports: [ModuleAccessService]
})
export class ModuleAccessModule 
{
	constructor() {}
}		



