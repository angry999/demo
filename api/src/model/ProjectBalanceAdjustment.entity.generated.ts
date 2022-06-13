import { ApiProperty } from '@nestjs/swagger';
import { InvestorEarning } from './InvestorEarning.entity.generated';
import { AllUser } from './AllUser.entity.generated';
import { Project } from './Project.entity.generated';
import { ProjectAdjustmentType } from 'fundscraper-model-enums';
import { InvestmentActivity } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for ProjectBalanceAdjustment
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one change in the balance of a project for one financial period
 */

/**
 * ProjectBalanceAdjustment
 * one change in the balance of a project for one financial period
 */
export class ProjectBalanceAdjustment {
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
	 * the type of adjustment
	 */	
	@ApiProperty({ description: 'the type of adjustment'}) 
	adjustment_type: ProjectAdjustmentType;

	/**
	 * a textual coded value represent the category of the earning/fee
	 */	
	@ApiProperty({ description: 'a textual coded value represent the category of the earning/fee'}) 
	category: InvestmentActivity;

	/**
	 * a description of the earning or fee
	 */	
	@ApiProperty({ description: 'a description of the earning or fee'}) 
	description: string;

	/**
	 * the amount it earned
	 */	
	@ApiProperty({ description: 'the amount it earned'}) 
	amount: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	transaction_date: Date;

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
	 * This was created from the details of the foreign key FK_INVESTOR_EARNINGS_PE_ID_INVESTOR_EARNINGS and described as: 
	 */	
	@ApiProperty({ type: () => InvestorEarning, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTOR_EARNINGS_PE_ID_INVESTOR_EARNINGS and described as: '}) 
	investor_earnings: InvestorEarning[];

	/**
	 * This was created from the details of the foreign key FK_PROJECT_EARNINGS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_PROJECT_EARNINGS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_PROJECT_EARNINGS_PROJECT_ID_ADJUSTMENTS and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key FK_PROJECT_EARNINGS_PROJECT_ID_ADJUSTMENTS and described as: '}) 
	project: Project;

}
