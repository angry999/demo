import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { InvestmentOrder } from './InvestmentOrder.entity.generated';

/**
 * Informational model in typescript (nest.js) for OrderAcknowledgement
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one answer to one question by one user to approve an order
 */

/**
 * OrderAcknowledgement
 * one answer to one question by one user to approve an order
 */
export class OrderAcknowledgement {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the user that made the acknowledgement
	 */	
	@ApiProperty({ description: 'the user that made the acknowledgement'}) 
	user_id: number;

	/**
	 * the id of order that was acknowledged
	 */	
	@ApiProperty({ description: 'the id of order that was acknowledged'}) 
	order_id: number;

	/**
	 * the id of the question that was asked
	 */	
	@ApiProperty({ description: 'the id of the question that was asked'}) 
	acknowledgement_order: number;

	/**
	 * the text of the question that was asked.
	 */	
	@ApiProperty({ description: 'the text of the question that was asked.'}) 
	question_text: string;

	/**
	 * the decoded value of the text
	 */	
	@ApiProperty({ description: 'the decoded value of the text'}) 
	answer: string;

	/**
	 * the text answered
	 */	
	@ApiProperty({ description: 'the text answered'}) 
	answer_text: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	additional_answer: string;

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
	 * This was created from the details of the foreign key FK_INVESTOR_ACK_ORDERS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_INVESTOR_ACK_ORDERS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_ACK_ORDERS_ORDER_ID_ACKNOWLEDGEMENT_DETAILS and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentOrder, description: 'This was created from the details of the foreign key FK_INVESTOR_ACK_ORDERS_ORDER_ID_ACKNOWLEDGEMENT_DETAILS and described as: '}) 
	order: InvestmentOrder;

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_ACK_ORDERS_USER_ORDER_ACKNOWLEDGEMENTS and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_INVESTOR_ACK_ORDERS_USER_ORDER_ACKNOWLEDGEMENTS and described as: '}) 
	user: AllUser;

}
