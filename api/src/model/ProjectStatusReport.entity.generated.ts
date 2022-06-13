import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { Project } from './Project.entity.generated';

/**
 * Informational model in typescript (nest.js) for ProjectStatusReport
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * an intermittent report about the progress of a project
 */

/**
 * ProjectStatusReport
 * an intermittent report about the progress of a project
 */
export class ProjectStatusReport {
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
	 * a textual synopsis of the contents of the report
	 */	
	@ApiProperty({ description: 'a textual synopsis of the contents of the report'}) 
	contents: string;

	/**
	 * a url to where a file with the details of the report is located, typically pdf
	 */	
	@ApiProperty({ description: 'a url to where a file with the details of the report is located, typically pdf'}) 
	document: string;

	/**
	 * the date the report was issued FOR, not when it was issued
	 */	
	@ApiProperty({ description: 'the date the report was issued FOR, not when it was issued'}) 
	report_date: Date;

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
	 * This was created from the details of the foreign key FK_PROJECT_STATUS_REPORTS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_PROJECT_STATUS_REPORTS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_PROJECT_STATUS_REPORTS_PROJECT_ID_STATUS_REPORTS and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key FK_PROJECT_STATUS_REPORTS_PROJECT_ID_STATUS_REPORTS and described as: '}) 
	project: Project;

}
