import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserRelationshipService } from '../bll/UserRelationship.service';
import { UserRelationshipApi } from '../api/UserRelationship.controller';

/**
 * Nest.js module for REST API's in typescript for UserRelationship
 * NOTE: Generated file, do not touch
 * the details describing a single relationship between two users
 */
@Module({
	imports: [DalModule ],
	controllers: [UserRelationshipApi],
	providers: [UserRelationshipService],
	exports: [UserRelationshipService]
})
export class UserRelationshipModule 
{
	constructor() {}
}		



