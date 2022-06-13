import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { UserEntity } from './UserEntity.entity.generated';

/**
 * Informational model in typescript (nest.js) for UserBankingDetails
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * a single users banking information - this is transient data, only held and forwarded then removed
 */

/**
 * UserBankingDetails
 * a single users banking information - this is transient data, only held and forwarded then removed
 */
export class UserBankingDetails {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the foreign ID of the user side of this relationship
	 */	
	@ApiProperty({ description: 'the foreign ID of the user side of this relationship'}) 
	user_id: number;

	/**
	 * the foreign ID of the user entity the details are associated with, if any
	 */	
	@ApiProperty({ description: 'the foreign ID of the user entity the details are associated with, if any'}) 
	user_entity_id: number;

	/**
	 * the foreign ID of the joint subscriber the details are also associated with, if any
	 */	
	@ApiProperty({ description: 'the foreign ID of the joint subscriber the details are also associated with, if any'}) 
	joint_subscriber_id: number;

	/**
	 * the name associated with the details
	 */	
	@ApiProperty({ description: 'the name associated with the details'}) 
	beneficiary_name: string;

	/**
	 * the securely encrypted data representing the users banking details
	 */	
	@ApiProperty({ description: 'the securely encrypted data representing the users banking details'}) 
	encrypted_data: string;

	/**
	 * whether the users data is saved securely offline - if 1, encrypted_data should be blank as the value is stored elsewhere
	 */	
	@ApiProperty({ description: 'whether the users data is saved securely offline - if 1, encrypted_data should be blank as the value is stored elsewhere'}) 
	stored_offline: boolean;

	/**
	 * the id of the user that made the last change or in the case of its initial creation, the user that created it
	 */	
	@ApiProperty({ description: 'the id of the user that made the last change or in the case of its initial creation, the user that created it'}) 
	last_changed_by_id: number;

	/**
	 * the last point in time this row was modified
	 */	
	@ApiProperty({ description: 'the last point in time this row was modified'}) 
	updatetime: Date;

	/**
	 * the point in time this row was first created regardless of modifications
	 */	
	@ApiProperty({ description: 'the point in time this row was first created regardless of modifications'}) 
	createtime: Date;

	/**
	 * This was created from the details of the foreign key FK_USERS_BANKING_DETAILS_TO_JOINT_USER and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_BANKING_DETAILS_TO_JOINT_USER and described as: '}) 
	joint_subscriber: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USERS_BANKING_DETAILS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_BANKING_DETAILS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USERS_BANKING_DETAILS_TO_USER_ENTITY and described as: 
	 */	
	@ApiProperty({ type: () => UserEntity, description: 'This was created from the details of the foreign key FK_USERS_BANKING_DETAILS_TO_USER_ENTITY and described as: '}) 
	user_entity: UserEntity;

	/**
	 * This was created from the details of the foreign key FK_USERS_BANKING_DETAILS_TO_USER and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_BANKING_DETAILS_TO_USER and described as: '}) 
	user: AllUser;

}
