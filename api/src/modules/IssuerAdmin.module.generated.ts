import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { IssuerAdminService } from '../bll/IssuerAdmin.service';
import { IssuerAdminApi } from '../api/IssuerAdmin.controller';

/**
 * Nest.js module for REST API's in typescript for IssuerAdmin
 * NOTE: Generated file, do not touch
 * An administrative user for issuers
 */
@Module({
	imports: [DalModule ],
	controllers: [IssuerAdminApi],
	providers: [IssuerAdminService],
	exports: [IssuerAdminService]
})
export class IssuerAdminModule 
{
	constructor() {}
}		



