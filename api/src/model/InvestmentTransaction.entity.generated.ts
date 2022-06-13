import { ApiProperty } from '@nestjs/swagger';
import { Event } from './Event.entity.generated';
import { InvestorEarning } from './InvestorEarning.entity.generated';
import { AllUser } from './AllUser.entity.generated';
import { InvestmentOrder } from './InvestmentOrder.entity.generated';
import { Project } from './Project.entity.generated';
import { UserEntity } from './UserEntity.entity.generated';
import { EntityType } from 'fundscraper-model-enums';
import { InvestmentActivity } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for InvestmentTransaction
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * 
 */

/**
 * InvestmentTransaction
 * 
 */
export class InvestmentTransaction {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

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
	 * the human identifier of the order
	 */	
	@ApiProperty({ description: 'the human identifier of the order'}) 
	order_no: string;

	/**
	 * the identifier of the order
	 */	
	@ApiProperty({ description: 'the identifier of the order'}) 
	order_id: number;

	/**
	 * the type of activity that occured
	 */	
	@ApiProperty({ description: 'the type of activity that occured'}) 
	activity: InvestmentActivity;

	/**
	 * a terse sentence describing the action
	 */	
	@ApiProperty({ description: 'a terse sentence describing the action'}) 
	activity_desc: string;

	/**
	 * the number of shares that transacted
	 */	
	@ApiProperty({ description: 'the number of shares that transacted'}) 
	number_of_shares: number;

	/**
	 * the CAD dollar value per share
	 */	
	@ApiProperty({ description: 'the CAD dollar value per share'}) 
	amount_per_share: number;

	/**
	 * the amount credited to the account
	 */	
	@ApiProperty({ description: 'the amount credited to the account'}) 
	credit: number;

	/**
	 * the amount debited against the account
	 */	
	@ApiProperty({ description: 'the amount debited against the account'}) 
	debit: number;

	/**
	 * is the transaction still valid?
	 */	
	@ApiProperty({ description: 'is the transaction still valid?'}) 
	is_cancelled: boolean;

	/**
	 * the user who is the receiptient of the transaction
	 */	
	@ApiProperty({ description: 'the user who is the receiptient of the transaction'}) 
	user_id: number;

	/**
	 * the identifier of the project that the transaction was placed against
	 */	
	@ApiProperty({ description: 'the identifier of the project that the transaction was placed against'}) 
	project_id: number;

	/**
	 * the date of the order
	 */	
	@ApiProperty({ description: 'the date of the order'}) 
	transaction_date: Date;

	/**
	 * the name of the eft file this transaction was sent in
	 */	
	@ApiProperty({ description: 'the name of the eft file this transaction was sent in'}) 
	eft_file: string;

	/**
	 * the identifier of the investor_earning this transaction was created as part of, if any
	 */	
	@ApiProperty({ description: 'the identifier of the investor_earning this transaction was created as part of, if any'}) 
	investor_earning_id: number;

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
	 * This was created from the details of the foreign key FK_EVENTS_TO_INVESTMENT_TRANSACTION and described as: 
	 */	
	@ApiProperty({ type: () => Event, isArray: true, description: 'This was created from the details of the foreign key FK_EVENTS_TO_INVESTMENT_TRANSACTION and described as: '}) 
	events_to_investment_transaction: Event[];

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_INVESTOR_EARNING_ID and described as: 
	 */	
	@ApiProperty({ type: () => InvestorEarning, description: 'This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_INVESTOR_EARNING_ID and described as: '}) 
	investor_earning: InvestorEarning;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_ORDER_ID and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentOrder, description: 'This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_ORDER_ID and described as: '}) 
	order: InvestmentOrder;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_PROJECT_ID_TRANSACTIONS and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_PROJECT_ID_TRANSACTIONS and described as: '}) 
	project: Project;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_USER_ENTITY_ID and described as: 
	 */	
	@ApiProperty({ type: () => UserEntity, description: 'This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_USER_ENTITY_ID and described as: '}) 
	user_entity: UserEntity;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_USER_ID_TRANSACTIONS and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_USER_ID_TRANSACTIONS and described as: '}) 
	user: AllUser;

}
