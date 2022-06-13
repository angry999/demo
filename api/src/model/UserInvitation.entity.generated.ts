import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';

/**
 * Informational model in typescript (nest.js) for UserInvitation
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * an invitation from one user to another user to join the system
 */

/**
 * UserInvitation
 * an invitation from one user to another user to join the system
 */
export class UserInvitation {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the user this is for
	 */	
	@ApiProperty({ description: 'the user this is for'}) 
	user_id: number;

	/**
	 * the first name of the person that was invited
	 */	
	@ApiProperty({ description: 'the first name of the person that was invited'}) 
	first_name: string;

	/**
	 * the last name of the person that was invited
	 */	
	@ApiProperty({ description: 'the last name of the person that was invited'}) 
	last_name: string;

	/**
	 * the email address that the invitation was sent to
	 */	
	@ApiProperty({ description: 'the email address that the invitation was sent to'}) 
	email: string;

	/**
	 * the message that was entered by the user to extended the invitations
	 */	
	@ApiProperty({ description: 'the message that was entered by the user to extended the invitations'}) 
	message: string;

	/**
	 * unused
	 */	
	@ApiProperty({ description: 'unused'}) 
	status: number;

	/**
	 * if true, this row is &quot;logically&quot; deleted. that is, its not to be used any more and is kept for historical/audit purposes only
	 */	
	@ApiProperty({ description: 'if true, this row is &quot;logically&quot; deleted. that is, its not to be used any more and is kept for historical/audit purposes only'}) 
	is_deleted: boolean;

	/**
	 * the id of the user that made the last change or in the case of its initial creation, the user that created it
	 */	
	@ApiProperty({ description: 'the id of the user that made the last change or in the case of its initial creation, the user that created it'}) 
	last_changed_by_id: number;

	/**
	 * the point in time this row was first created regardless of modifications
	 */	
	@ApiProperty({ description: 'the point in time this row was first created regardless of modifications'}) 
	createtime: Date;

	/**
	 * the last point in time this row was modified
	 */	
	@ApiProperty({ description: 'the last point in time this row was modified'}) 
	updatetime: Date;

	/**
	 * This was created from the details of the foreign key FK_USERS_INVITEE_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_INVITEE_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USERS_INVITEE_USER_ID_INVITATIONS and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_INVITEE_USER_ID_INVITATIONS and described as: '}) 
	user: AllUser;

}
