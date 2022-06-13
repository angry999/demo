import { ApiProperty } from '@nestjs/swagger';
import { InvestmentOrder } from './InvestmentOrder.entity.generated';
import { InvestmentTransaction } from './InvestmentTransaction.entity.generated';
import { InvestmentWithdrawal } from './InvestmentWithdrawal.entity.generated';
import { InvestorEarning } from './InvestorEarning.entity.generated';
import { UserSocialProfile } from './UserSocialProfile.entity.generated';
import { AllUser } from './AllUser.entity.generated';
import { Project } from './Project.entity.generated';
import { UserPdf } from './UserPdf.entity.generated';
import { EventType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for Event
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * a noteworthy occurance within the flow of the application
 */

/**
 * Event
 * a noteworthy occurance within the flow of the application
 */
export class Event {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * coded value about what kind of event has occured
	 */	
	@ApiProperty({ description: 'coded value about what kind of event has occured'}) 
	type: EventType;

	/**
	 * the user the event relates to
	 */	
	@ApiProperty({ description: 'the user the event relates to'}) 
	user_id: number;

	/**
	 * the social profile of the organization that sponsors the project that this event releates to
	 */	
	@ApiProperty({ description: 'the social profile of the organization that sponsors the project that this event releates to'}) 
	issuer_id: number;

	/**
	 * the project this event relates to
	 */	
	@ApiProperty({ description: 'the project this event relates to'}) 
	project_id: number;

	/**
	 * the financial transaction that this relates to
	 */	
	@ApiProperty({ description: 'the financial transaction that this relates to'}) 
	investment_transaction_id: number;

	/**
	 * the id of the order that this relates to
	 */	
	@ApiProperty({ description: 'the id of the order that this relates to'}) 
	investment_order_id: number;

	/**
	 * the id of the withdrawel this relates to
	 */	
	@ApiProperty({ description: 'the id of the withdrawel this relates to'}) 
	investment_withdrawel_id: number;

	/**
	 * the id of the earnings this relates to
	 */	
	@ApiProperty({ description: 'the id of the earnings this relates to'}) 
	investor_earning_id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	user_pdf_id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	additional: string;

	/**
	 * if true (1), the webhooks have been executed for this event
	 */	
	@ApiProperty({ description: 'if true (1), the webhooks have been executed for this event'}) 
	webhooks_fired: boolean;

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
	 * This was created from the details of the foreign key FK_EVENTS_TO_INVESTMENT_ORDER and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentOrder, description: 'This was created from the details of the foreign key FK_EVENTS_TO_INVESTMENT_ORDER and described as: '}) 
	investment_order: InvestmentOrder;

	/**
	 * This was created from the details of the foreign key FK_EVENTS_TO_INVESTMENT_TRANSACTION and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentTransaction, description: 'This was created from the details of the foreign key FK_EVENTS_TO_INVESTMENT_TRANSACTION and described as: '}) 
	investment_transaction: InvestmentTransaction;

	/**
	 * This was created from the details of the foreign key FK_EVENTS_TO_INVESTMENT_WITHDRAWEL and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentWithdrawal, description: 'This was created from the details of the foreign key FK_EVENTS_TO_INVESTMENT_WITHDRAWEL and described as: '}) 
	investment_withdrawel: InvestmentWithdrawal;

	/**
	 * This was created from the details of the foreign key FK_EVENTS_TO_INVESTOR_EARNINGS and described as: 
	 */	
	@ApiProperty({ type: () => InvestorEarning, description: 'This was created from the details of the foreign key FK_EVENTS_TO_INVESTOR_EARNINGS and described as: '}) 
	investor_earning: InvestorEarning;

	/**
	 * This was created from the details of the foreign key FK_EVENTS_TO_ISSUER and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, description: 'This was created from the details of the foreign key FK_EVENTS_TO_ISSUER and described as: '}) 
	issuer: UserSocialProfile;

	/**
	 * This was created from the details of the foreign key FK_EVENTS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_EVENTS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key EVENTS_PROJECT and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key EVENTS_PROJECT and described as: '}) 
	project: Project;

	/**
	 * This was created from the details of the foreign key FK_EVENTS_TO_USER and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_EVENTS_TO_USER and described as: '}) 
	user: AllUser;

	/**
	 * This was created from the details of the foreign key FK_EVENTS_TO_USERS_PDF and described as: 
	 */	
	@ApiProperty({ type: () => UserPdf, description: 'This was created from the details of the foreign key FK_EVENTS_TO_USERS_PDF and described as: '}) 
	user_pdf: UserPdf;

}
