import { ApiProperty } from '@nestjs/swagger';
import { Event } from './Event.entity.generated';
import { AllUser } from './AllUser.entity.generated';
import { InvestmentOrder } from './InvestmentOrder.entity.generated';
import { ProjectBalanceAdjustment } from './ProjectBalanceAdjustment.entity.generated';
import { Project } from './Project.entity.generated';
import { UserEntity } from './UserEntity.entity.generated';
import { EntityType } from 'fundscraper-model-enums';
import { EarningsAdjustmentType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for InvestorEarning
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * earnings, adjustments and charges to an investors accounts
 */

/**
 * InvestorEarning
 * earnings, adjustments and charges to an investors accounts
 */
export class InvestorEarning {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the id of project earnings that this is one portion of
	 */	
	@ApiProperty({ description: 'the id of project earnings that this is one portion of'}) 
	project_earnings_id: number;

	/**
	 * the id of the user that should receive these earnings
	 */	
	@ApiProperty({ description: 'the id of the user that should receive these earnings'}) 
	user_id: number;

	/**
	 * the id of the project that the income/charges relate to
	 */	
	@ApiProperty({ description: 'the id of the project that the income/charges relate to'}) 
	project_id: number;

	/**
	 * the id of the order that the adjustment relates to
	 */	
	@ApiProperty({ description: 'the id of the order that the adjustment relates to'}) 
	order_id: number;

	/**
	 * the type of account the transaction was made against
	 */	
	@ApiProperty({ description: 'the type of account the transaction was made against'}) 
	entity_type: EntityType;

	/**
	 * md5 of the identifier of the account the transaction was against
	 */	
	@ApiProperty({ description: 'md5 of the identifier of the account the transaction was against'}) 
	entity_id: string;

	/**
	 * the identifier of the account the transaction was against
	 */	
	@ApiProperty({ description: 'the identifier of the account the transaction was against'}) 
	user_entity_id: number;

	/**
	 * the type of adjustment
	 */	
	@ApiProperty({ description: 'the type of adjustment'}) 
	type: EarningsAdjustmentType;

	/**
	 * predetermined textual description of the type
	 */	
	@ApiProperty({ description: 'predetermined textual description of the type'}) 
	category: string;

	/**
	 * additional descriptive details of the action
	 */	
	@ApiProperty({ description: 'additional descriptive details of the action'}) 
	description: string;

	/**
	 * the amount of the adjustment
	 */	
	@ApiProperty({ description: 'the amount of the adjustment'}) 
	amount: number;

	/**
	 * the date that the amount is expected to be applied
	 */	
	@ApiProperty({ description: 'the date that the amount is expected to be applied'}) 
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
	 * This was created from the details of the foreign key FK_EVENTS_TO_INVESTOR_EARNINGS and described as: 
	 */	
	@ApiProperty({ type: () => Event, isArray: true, description: 'This was created from the details of the foreign key FK_EVENTS_TO_INVESTOR_EARNINGS and described as: '}) 
	events_to_investor_earnings: Event[];

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_EARNINGS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_INVESTOR_EARNINGS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_EARNINGS_ORDER_ID_ADJUSTMENTS and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentOrder, description: 'This was created from the details of the foreign key FK_INVESTOR_EARNINGS_ORDER_ID_ADJUSTMENTS and described as: '}) 
	order: InvestmentOrder;

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_EARNINGS_PE_ID_INVESTOR_EARNINGS and described as: 
	 */	
	@ApiProperty({ type: () => ProjectBalanceAdjustment, description: 'This was created from the details of the foreign key FK_INVESTOR_EARNINGS_PE_ID_INVESTOR_EARNINGS and described as: '}) 
	project_earnings: ProjectBalanceAdjustment;

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_EARNINGS_PROJECT_ID_INVESTOR_EARNINGS and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key FK_INVESTOR_EARNINGS_PROJECT_ID_INVESTOR_EARNINGS and described as: '}) 
	project: Project;

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_EARNINGS_USER_ENTITY_ID_EARNINGS and described as: 
	 */	
	@ApiProperty({ type: () => UserEntity, description: 'This was created from the details of the foreign key FK_INVESTOR_EARNINGS_USER_ENTITY_ID_EARNINGS and described as: '}) 
	user_entity: UserEntity;

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_EARNINGS_USER_D and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_INVESTOR_EARNINGS_USER_D and described as: '}) 
	user: AllUser;

}
