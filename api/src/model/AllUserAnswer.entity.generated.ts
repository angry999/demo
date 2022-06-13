import { ApiProperty } from '@nestjs/swagger';

/**
 * Informational model in typescript (nest.js) for AllUserAnswer
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * An answer from and type of question that has been asked of the user
 */

/**
 * AllUserAnswer
 * An answer from and type of question that has been asked of the user
 */
export class AllUserAnswer {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	question_type: number;

	/**
	 * the user this is for
	 */	
	@ApiProperty({ description: 'the user this is for'}) 
	user_id: number;

	/**
	 * the id of the user entity that they were acting on the behalf of when they answered it
	 */	
	@ApiProperty({ description: 'the id of the user entity that they were acting on the behalf of when they answered it'}) 
	user_entity_id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	order_id: number;

	/**
	 * the id of the question that was answered
	 */	
	@ApiProperty({ description: 'the id of the question that was answered'}) 
	question_id: number;

	/**
	 * the text of the question when it was asked. assuming the original question has not change this should still match it
	 */	
	@ApiProperty({ description: 'the text of the question when it was asked. assuming the original question has not change this should still match it'}) 
	question_text: string;

	/**
	 * the response the user provided. if its a multipart response then its a collection of caret (^) separated answers
	 */	
	@ApiProperty({ description: 'the response the user provided. if its a multipart response then its a collection of caret (^) separated answers'}) 
	answer_text: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	did_answer: number;

	/**
	 * extra notes by admin for the user answer of a question
	 */	
	@ApiProperty({ description: 'extra notes by admin for the user answer of a question'}) 
	notes: string;

	/**
	 * identify if the answer has been confirmed
	 */	
	@ApiProperty({ description: 'identify if the answer has been confirmed'}) 
	is_confirmed: boolean;

	/**
	 * the identification of what category the question is about
	 */	
	@ApiProperty({ description: 'the identification of what category the question is about'}) 
	category: number;

	/**
	 * the way on the ui in which the question was answer
	 */	
	@ApiProperty({ description: 'the way on the ui in which the question was answer'}) 
	presentation_type: number;

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

}
