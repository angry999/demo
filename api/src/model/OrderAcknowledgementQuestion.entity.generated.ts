import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { QuestionAnswerType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for OrderAcknowledgementQuestion
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * a single question to ask an investor to achknowledge an order
 */

/**
 * OrderAcknowledgementQuestion
 * a single question to ask an investor to achknowledge an order
 */
export class OrderAcknowledgementQuestion {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the text of the question to ask
	 */	
	@ApiProperty({ description: 'the text of the question to ask'}) 
	question: string;

	/**
	 * uncertain
	 */	
	@ApiProperty({ description: 'uncertain'}) 
	answer_type: QuestionAnswerType;

	/**
	 * an alternative way of phrasing the question or additional details for clarification
	 */	
	@ApiProperty({ description: 'an alternative way of phrasing the question or additional details for clarification'}) 
	explanation: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	additional_acknowldgement: string;

	/**
	 * the ordinal position of the question
	 */	
	@ApiProperty({ description: 'the ordinal position of the question'}) 
	sort_order: number;

	/**
	 * if true, the investor should be shown this question
	 */	
	@ApiProperty({ description: 'if true, the investor should be shown this question'}) 
	visible: boolean;

	/**
	 * if true, this question is a component of the Offering Memorandum exemption, and should be used only in that context
	 */	
	@ApiProperty({ description: 'if true, this question is a component of the Offering Memorandum exemption, and should be used only in that context'}) 
	om_component: number;

	/**
	 * the well-known name of a specific question, to allow it be invoked in specific circumstances
	 */	
	@ApiProperty({ description: 'the well-known name of a specific question, to allow it be invoked in specific circumstances'}) 
	wellknown: string;

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
	 * This was created from the details of the foreign key FK_INVESTOR_ACKNOWLEDGEMENTS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_INVESTOR_ACKNOWLEDGEMENTS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

}
