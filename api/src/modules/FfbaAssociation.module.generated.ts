import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { FfbaAssociationService } from '../bll/FfbaAssociation.service';
import { FfbaAssociationApi } from '../api/FfbaAssociation.controller';

/**
 * Nest.js module for REST API's in typescript for FfbaAssociation
 * NOTE: Generated file, do not touch
 * the details describing a single FFBA relationship between a user and a project
 */
@Module({
	imports: [DalModule ],
	controllers: [FfbaAssociationApi],
	providers: [FfbaAssociationService],
	exports: [FfbaAssociationService]
})
export class FfbaAssociationModule 
{
	constructor() {}
}		



