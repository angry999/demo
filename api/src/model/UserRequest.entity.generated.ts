import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { UserRequestState } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for UserRequest
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * a request by a user for a change to their account. this is not for customer service type requests but rathe structural ones like becoming a notable investor
 */

/**
 * UserRequest
 * a request by a user for a change to their account. this is not for customer service type requests but rathe structural ones like becoming a notable investor
 */
export class UserRequest {
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
	 * a textual code representing the type of request
	 */	
	@ApiProperty({ description: 'a textual code representing the type of request'}) 
	request: string;

	/**
	 * the body message of the request. this is a sentence or paragraph
	 */	
	@ApiProperty({ description: 'the body message of the request. this is a sentence or paragraph'}) 
	message: string;

	/**
	 * the state in which a request may be
	 */	
	@ApiProperty({ description: 'the state in which a request may be'}) 
	status: UserRequestState;

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
	 * This was created from the details of the foreign key FK_USERS_REQUEST_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_REQUEST_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USERS_REQUEST_USER_ID_REQUESTS and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_REQUEST_USER_ID_REQUESTS and described as: '}) 
	user: AllUser;

}
