import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserInvitationService } from '../bll/UserInvitation.service';
import { UserInvitationApi } from '../api/UserInvitation.controller';

/**
 * Nest.js module for REST API's in typescript for UserInvitation
 * NOTE: Generated file, do not touch
 * an invitation from one user to another user to join the system
 */
@Module({
	imports: [DalModule ],
	controllers: [UserInvitationApi],
	providers: [UserInvitationService],
	exports: [UserInvitationService]
})
export class UserInvitationModule 
{
	constructor() {}
}		



