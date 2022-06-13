import { ApiProperty } from '@nestjs/swagger';
import { Event } from './Event.entity.generated';
import { Province } from './Province.entity.generated';
import { AllUser } from './AllUser.entity.generated';
import { InvestmentOrder } from './InvestmentOrder.entity.generated';

/**
 * Informational model in typescript (nest.js) for InvestmentWithdrawal
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one withdrawel of funds
 */

/**
 * InvestmentWithdrawal
 * one withdrawel of funds
 */
export class InvestmentWithdrawal {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the id of the order for the withdrawel
	 */	
	@ApiProperty({ description: 'the id of the order for the withdrawel'}) 
	order_id: number;

	/**
	 * the amount to withdraw (may not be identical to the order amount)
	 */	
	@ApiProperty({ description: 'the amount to withdraw (may not be identical to the order amount)'}) 
	amount: number;

	/**
	 * the name of the bank
	 */	
	@ApiProperty({ description: 'the name of the bank'}) 
	bank_name: string;

	/**
	 * the id number of the bank
	 */	
	@ApiProperty({ description: 'the id number of the bank'}) 
	bank_institution_number: string;

	/**
	 * the transit number of the bank
	 */	
	@ApiProperty({ description: 'the transit number of the bank'}) 
	bank_transit: string;

	/**
	 * the account number to put the funds into
	 */	
	@ApiProperty({ description: 'the account number to put the funds into'}) 
	bank_account_number: string;

	/**
	 * the address of the bank to send it to
	 */	
	@ApiProperty({ description: 'the address of the bank to send it to'}) 
	bank_address: string;

	/**
	 * the province of the bank to send it to
	 */	
	@ApiProperty({ description: 'the province of the bank to send it to'}) 
	bank_province_id: number;

	/**
	 * the city of the bank to send it to
	 */	
	@ApiProperty({ description: 'the city of the bank to send it to'}) 
	bank_city: string;

	/**
	 * the postal code of the bank to send it to
	 */	
	@ApiProperty({ description: 'the postal code of the bank to send it to'}) 
	bank_postal_code: string;

	/**
	 * the contact telephone number of the bank to send the funds to
	 */	
	@ApiProperty({ description: 'the contact telephone number of the bank to send the funds to'}) 
	bank_telephone: string;

	/**
	 * the number of times to execute the withdrawel
	 */	
	@ApiProperty({ description: 'the number of times to execute the withdrawel'}) 
	number_of_withdrawels: number;

	/**
	 * unused
	 */	
	@ApiProperty({ description: 'unused'}) 
	status: number;

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
	 * This was created from the details of the foreign key FK_EVENTS_TO_INVESTMENT_WITHDRAWEL and described as: 
	 */	
	@ApiProperty({ type: () => Event, isArray: true, description: 'This was created from the details of the foreign key FK_EVENTS_TO_INVESTMENT_WITHDRAWEL and described as: '}) 
	events_to_investment_withdrawel: Event[];

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_WITHDRAWAL_TO_PROVINCE and described as: 
	 */	
	@ApiProperty({ type: () => Province, description: 'This was created from the details of the foreign key FK_INVESTMENT_WITHDRAWAL_TO_PROVINCE and described as: '}) 
	bank_province: Province;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_WITHDRAWAL_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_INVESTMENT_WITHDRAWAL_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_WITHDRAWAL_HEAD_TO_INVESTMENT_ORDERS and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentOrder, description: 'This was created from the details of the foreign key FK_INVESTMENT_WITHDRAWAL_HEAD_TO_INVESTMENT_ORDERS and described as: '}) 
	order: InvestmentOrder;

}
