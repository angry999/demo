import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';

/**
 * Informational model in typescript (nest.js) for SupportEngineer
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one user who performs a support role
 */

/**
 * SupportEngineer
 * one user who performs a support role
 */
export class SupportEngineer {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the id of the user who performs support
	 */	
	@ApiProperty({ description: 'the id of the user who performs support'}) 
	user_id: number;

	/**
	 * the users first name
	 */	
	@ApiProperty({ description: 'the users first name'}) 
	first_name: string;

	/**
	 * the users last name
	 */	
	@ApiProperty({ description: 'the users last name'}) 
	last_name: string;

	/**
	 * the identifier of the role the person performs for support
	 */	
	@ApiProperty({ description: 'the identifier of the role the person performs for support'}) 
	title: string;

	/**
	 * the telephone number to use to contact them
	 */	
	@ApiProperty({ description: 'the telephone number to use to contact them'}) 
	phone: string;

	/**
	 * the email address to use to contact the person
	 */	
	@ApiProperty({ description: 'the email address to use to contact the person'}) 
	email: string;

	/**
	 * a url to the photo used to represent the support person
	 */	
	@ApiProperty({ description: 'a url to the photo used to represent the support person'}) 
	image: string;

	/**
	 * a paragraph describing the persons role
	 */	
	@ApiProperty({ description: 'a paragraph describing the persons role'}) 
	content: string;

	/**
	 * uncertain
	 */	
	@ApiProperty({ description: 'uncertain'}) 
	profile_cap: number;

	/**
	 * the ordinal position of the engineer
	 */	
	@ApiProperty({ description: 'the ordinal position of the engineer'}) 
	sort_order: number;

	/**
	 * if true the support engineer should be shown
	 */	
	@ApiProperty({ description: 'if true the support engineer should be shown'}) 
	visible: boolean;

	/**
	 * if true, this row is &quot;logically&quot; deleted. that is, its not to be used any more and is kept for historical/audit purposes only
	 */	
	@ApiProperty({ description: 'if true, this row is &quot;logically&quot; deleted. that is, its not to be used any more and is kept for historical/audit purposes only'}) 
	is_deleted: boolean;

	/**
	 * the last point in time this row was modified
	 */	
	@ApiProperty({ description: 'the last point in time this row was modified'}) 
	updatetime: Date;

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
	 * This was created from the details of the foreign key FK_SUPPORT_ENGINEERS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_SUPPORT_ENGINEERS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_SUPPORT_ENGINEERS_USER_ID_OWNER_USER and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_SUPPORT_ENGINEERS_USER_ID_OWNER_USER and described as: '}) 
	user: AllUser;

}
