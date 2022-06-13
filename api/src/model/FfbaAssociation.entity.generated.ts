import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './UserEntity.entity.generated';
import { AllUser } from './AllUser.entity.generated';
import { Project } from './Project.entity.generated';

/**
 * Informational model in typescript (nest.js) for FfbaAssociation
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * the details describing a single FFBA relationship between a user and a project
 */

/**
 * FfbaAssociation
 * the details describing a single FFBA relationship between a user and a project
 */
export class FfbaAssociation {
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
	 * the foreign ID of the project side of this relationship
	 */	
	@ApiProperty({ description: 'the foreign ID of the project side of this relationship'}) 
	project_id: number;

	/**
	 * the foreign ID of the entity this relationship extends through, if relevant
	 */	
	@ApiProperty({ description: 'the foreign ID of the entity this relationship extends through, if relevant'}) 
	entity_id: number;

	/**
	 * if true, the user is a director at the issuer
	 */	
	@ApiProperty({ description: 'if true, the user is a director at the issuer'}) 
	is_director: boolean;

	/**
	 * if true, the user is an executive officer at the issuer
	 */	
	@ApiProperty({ description: 'if true, the user is an executive officer at the issuer'}) 
	is_executive_officer: boolean;

	/**
	 * if true, the user is a control person at the issuer
	 */	
	@ApiProperty({ description: 'if true, the user is a control person at the issuer'}) 
	is_control_person: boolean;

	/**
	 * if true, the user is a founder of the issuer
	 */	
	@ApiProperty({ description: 'if true, the user is a founder of the issuer'}) 
	is_founder: boolean;

	/**
	 * if true, the user is a family member of a contact at the issuer
	 */	
	@ApiProperty({ description: 'if true, the user is a family member of a contact at the issuer'}) 
	is_family_member: boolean;

	/**
	 * if true, the user is a close personal friend of a contact at the issuer
	 */	
	@ApiProperty({ description: 'if true, the user is a close personal friend of a contact at the issuer'}) 
	is_friend: boolean;

	/**
	 * if true, the user is a close business associate of a contact at the issuer
	 */	
	@ApiProperty({ description: 'if true, the user is a close business associate of a contact at the issuer'}) 
	is_associate: boolean;

	/**
	 * the first name of the users contact at the issuer
	 */	
	@ApiProperty({ description: 'the first name of the users contact at the issuer'}) 
	contact_first_name: string;

	/**
	 * the last name of the users contact at the issuer
	 */	
	@ApiProperty({ description: 'the last name of the users contact at the issuer'}) 
	contact_last_name: string;

	/**
	 * the position of the users contact at the issuer
	 */	
	@ApiProperty({ description: 'the position of the users contact at the issuer'}) 
	contact_position: string;

	/**
	 * the familial relationship the user has with their contact at the issuer
	 */	
	@ApiProperty({ description: 'the familial relationship the user has with their contact at the issuer'}) 
	contact_relationship: string;

	/**
	 * the number of years the user has known their contact at the issuer
	 */	
	@ApiProperty({ description: 'the number of years the user has known their contact at the issuer'}) 
	contact_years_known: number;

	/**
	 * the email address of the users contact at the issuer
	 */	
	@ApiProperty({ description: 'the email address of the users contact at the issuer'}) 
	contact_email: string;

	/**
	 * the phone number of the users contact at the issuer
	 */	
	@ApiProperty({ description: 'the phone number of the users contact at the issuer'}) 
	contact_phone: string;

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
	 * This was created from the details of the foreign key FK_FFBA_ASSOCIATION_TO_USER_ENTITY and described as: 
	 */	
	@ApiProperty({ type: () => UserEntity, description: 'This was created from the details of the foreign key FK_FFBA_ASSOCIATION_TO_USER_ENTITY and described as: '}) 
	entity: UserEntity;

	/**
	 * This was created from the details of the foreign key FK_FFBA_ASSOCIATION_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_FFBA_ASSOCIATION_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_FFBA_ASSOCIATION_TO_PROJECT and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key FK_FFBA_ASSOCIATION_TO_PROJECT and described as: '}) 
	project: Project;

	/**
	 * This was created from the details of the foreign key FK_FFBA_ASSOCIATION_TO_USER and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_FFBA_ASSOCIATION_TO_USER and described as: '}) 
	user: AllUser;

}
