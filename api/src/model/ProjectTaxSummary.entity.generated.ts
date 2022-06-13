import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { Project } from './Project.entity.generated';

/**
 * Informational model in typescript (nest.js) for ProjectTaxSummary
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * details about the tax for a project for a given year
 */

/**
 * ProjectTaxSummary
 * details about the tax for a project for a given year
 */
export class ProjectTaxSummary {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the project this is for
	 */	
	@ApiProperty({ description: 'the project this is for'}) 
	project_id: number;

	/**
	 * the calendar year this represents taxes for
	 */	
	@ApiProperty({ description: 'the calendar year this represents taxes for'}) 
	taxation_year: number;

	/**
	 * general remarks about the taxes
	 */	
	@ApiProperty({ description: 'general remarks about the taxes'}) 
	remarks: string;

	/**
	 * a url to a file that has the details, typically an excel file
	 */	
	@ApiProperty({ description: 'a url to a file that has the details, typically an excel file'}) 
	document: string;

	/**
	 * the number of times its used
	 */	
	@ApiProperty({ description: 'the number of times its used'}) 
	view_count: number;

	/**
	 * if true tax reports based ont it have been published
	 */	
	@ApiProperty({ description: 'if true tax reports based ont it have been published'}) 
	is_published: boolean;

	/**
	 * if true an XML report based on it has been generated
	 */	
	@ApiProperty({ description: 'if true an XML report based on it has been generated'}) 
	xml_generated: boolean;

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
	 * This was created from the details of the foreign key FK_PROJECT_TAX_SUMMARIES_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_PROJECT_TAX_SUMMARIES_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_PROJECT_TAX_SUMMARIES_PROJECT_ID_TAX_SUMMARIES and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key FK_PROJECT_TAX_SUMMARIES_PROJECT_ID_TAX_SUMMARIES and described as: '}) 
	project: Project;

}
