import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { Project } from './Project.entity.generated';
import { ROEDCategory } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for ExemptDistributionOption
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * an option for reporting distributions
 */

/**
 * ExemptDistributionOption
 * an option for reporting distributions
 */
export class ExemptDistributionOption {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the type of option it is
	 */	
	@ApiProperty({ description: 'the type of option it is'}) 
	category: ROEDCategory;

	/**
	 * a short code denotig the option
	 */	
	@ApiProperty({ description: 'a short code denotig the option'}) 
	code: string;

	/**
	 * a more verbose description of the option
	 */	
	@ApiProperty({ description: 'a more verbose description of the option'}) 
	detail: string;

	/**
	 * the ordinal position of the item in a list of these items
	 */	
	@ApiProperty({ description: 'the ordinal position of the item in a list of these items'}) 
	sort_order: number;

	/**
	 * if true, the item is no longer active and should not be used
	 */	
	@ApiProperty({ description: 'if true, the item is no longer active and should not be used'}) 
	inactive: boolean;

	/**
	 * the name of the item this row, and others, are regional variations of
	 */	
	@ApiProperty({ description: 'the name of the item this row, and others, are regional variations of'}) 
	regional_variation_of: string;

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
	 * This was created from the details of the foreign key FK_PROJECT_ROED_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_PROJECT_ROED_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_PROJECTS_ROED_SECURITYCODE_PROJECTS and described as: 
	 */	
	@ApiProperty({ type: () => Project, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECTS_ROED_SECURITYCODE_PROJECTS and described as: '}) 
	projects: Project[];

}
