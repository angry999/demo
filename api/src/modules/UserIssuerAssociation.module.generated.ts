import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserIssuerAssociationService } from '../bll/UserIssuerAssociation.service';
import { UserIssuerAssociationApi } from '../api/UserIssuerAssociation.controller';

/**
 * Nest.js module for REST API's in typescript for UserIssuerAssociation
 * NOTE: Generated file, do not touch
 * 
 */
@Module({
	imports: [DalModule ],
	controllers: [UserIssuerAssociationApi],
	providers: [UserIssuerAssociationService],
	exports: [UserIssuerAssociationService]
})
export class UserIssuerAssociationModule 
{
	constructor() {}
}		



