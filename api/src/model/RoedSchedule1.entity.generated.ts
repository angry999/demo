import { ApiProperty } from '@nestjs/swagger';
import { InvestmentOrder } from './InvestmentOrder.entity.generated';
import { AllUser } from './AllUser.entity.generated';
import { Project } from './Project.entity.generated';
import { RoedSchedule1State } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for RoedSchedule1
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * 
 */

/**
 * RoedSchedule1
 * 
 */
export class RoedSchedule1 {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * a human readable identifier of the report
	 */	
	@ApiProperty({ description: 'a human readable identifier of the report'}) 
	name: string;

	/**
	 * general remarks about the report
	 */	
	@ApiProperty({ description: 'general remarks about the report'}) 
	remarks: string;

	/**
	 * the project it belongs to
	 */	
	@ApiProperty({ description: 'the project it belongs to'}) 
	project_id: number;

	/**
	 * a url to a file that has the report, usually an excel file
	 */	
	@ApiProperty({ description: 'a url to a file that has the report, usually an excel file'}) 
	document: string;

	/**
	 * a list of rows to be ignored in the filed document
	 */	
	@ApiProperty({ description: 'a list of rows to be ignored in the filed document'}) 
	filed_rows_to_ignore: string;

	/**
	 * the current state of the schedule 1
	 */	
	@ApiProperty({ description: 'the current state of the schedule 1'}) 
	status: RoedSchedule1State;

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
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_ROED_SCHEDULE1_ID_ORDERS and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentOrder, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_ROED_SCHEDULE1_ID_ORDERS and described as: '}) 
	orders: InvestmentOrder[];

	/**
	 * This was created from the details of the foreign key FK_ROED_SCHEDULE1S_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_ROED_SCHEDULE1S_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_ROED_SCHEDULE1S_TO_PROJECTS and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key FK_ROED_SCHEDULE1S_TO_PROJECTS and described as: '}) 
	project: Project;

}
