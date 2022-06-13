import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { UserRelationshipType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for UserRelationship
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * the details describing a single relationship between two users
 */

/**
 * UserRelationship
 * the details describing a single relationship between two users
 */
export class UserRelationship {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * one of the users involved in the relationship
	 */	
	@ApiProperty({ description: 'one of the users involved in the relationship'}) 
	user_1_id: number;

	/**
	 * one of the users involved in the relationship
	 */	
	@ApiProperty({ description: 'one of the users involved in the relationship'}) 
	user_2_id: number;

	/**
	 * the nature of the relationship (enumerated)
	 */	
	@ApiProperty({ description: 'the nature of the relationship (enumerated)'}) 
	relationship_type: UserRelationshipType;

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
	 * This was created from the details of the foreign key FK_USER_RELATIONSHIP_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USER_RELATIONSHIP_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USER_RELATIONSHIP_TO_USER_1 and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USER_RELATIONSHIP_TO_USER_1 and described as: '}) 
	user_1: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USER_RELATIONSHIP_TO_USER_2 and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USER_RELATIONSHIP_TO_USER_2 and described as: '}) 
	user_2: AllUser;

}
