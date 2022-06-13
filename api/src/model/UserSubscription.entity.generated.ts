import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { UserSubscriptionState } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for UserSubscription
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one user indicating they want to receive notifications about activity on one subject
 */

/**
 * UserSubscription
 * one user indicating they want to receive notifications about activity on one subject
 */
export class UserSubscription {
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
	 * a textual categorization of what the user is asking for notifications about
	 */	
	@ApiProperty({ description: 'a textual categorization of what the user is asking for notifications about'}) 
	flag: string;

	/**
	 * the email address to send the notifications to
	 */	
	@ApiProperty({ description: 'the email address to send the notifications to'}) 
	email: string;

	/**
	 * the current state of the subscription
	 */	
	@ApiProperty({ description: 'the current state of the subscription'}) 
	status: UserSubscriptionState;

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
	 * This was created from the details of the foreign key FK_USERS_SUBSCRIBE_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_SUBSCRIBE_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USERS_SUBSCRIBE_USER_ID_SUBSCRIPTIONS and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_SUBSCRIBE_USER_ID_SUBSCRIPTIONS and described as: '}) 
	user: AllUser;

}
