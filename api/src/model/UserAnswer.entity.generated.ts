import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './UserEntity.entity.generated';
import { AllUser } from './AllUser.entity.generated';
import { RegistrationQuestion } from './RegistrationQuestion.entity.generated';
import { RegistrationQuestionCategory } from 'fundscraper-model-enums';
import { QuestionAnswerType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for UserAnswer
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one answer one user provided to one question
 */

/**
 * UserAnswer
 * one answer one user provided to one question
 */
export class UserAnswer {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the user this is for
	 */	
	@ApiProperty({ description: 'the user this is for'}) 
	user_id: number;

	/**
	 * the id of the user entity that they were acting on the behalf of when they answered it
	 */	
	@ApiProperty({ description: 'the id of the user entity that they were acting on the behalf of when they answered it'}) 
	entity_id: number;

	/**
	 * the identification of what category the question is about
	 */	
	@ApiProperty({ description: 'the identification of what category the question is about'}) 
	category: RegistrationQuestionCategory;

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
	 * the way on the ui in which the question was answer
	 */	
	@ApiProperty({ description: 'the way on the ui in which the question was answer'}) 
	answer_type: QuestionAnswerType;

	/**
	 * the response the user provided. if its a multipart response then its a collection of caret (^) separated answers
	 */	
	@ApiProperty({ description: 'the response the user provided. if its a multipart response then its a collection of caret (^) separated answers'}) 
	answer_text: string;

	/**
	 * identify if the answer has been confirmed
	 */	
	@ApiProperty({ description: 'identify if the answer has been confirmed'}) 
	is_confirmed: boolean;

	/**
	 * extra notes by admin for the user answer of a question
	 */	
	@ApiProperty({ description: 'extra notes by admin for the user answer of a question'}) 
	notes: string;

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
	 * This was created from the details of the foreign key FK_USERS_QUESTIONARY_ENTITY_ANSWERS and described as: 
	 */	
	@ApiProperty({ type: () => UserEntity, description: 'This was created from the details of the foreign key FK_USERS_QUESTIONARY_ENTITY_ANSWERS and described as: '}) 
	entity: UserEntity;

	/**
	 * This was created from the details of the foreign key FK_USERS_QUESTIONARY_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_QUESTIONARY_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USERS_QUESTIONARY_QUESTION_ID_ANSWERS and described as: 
	 */	
	@ApiProperty({ type: () => RegistrationQuestion, description: 'This was created from the details of the foreign key FK_USERS_QUESTIONARY_QUESTION_ID_ANSWERS and described as: '}) 
	question: RegistrationQuestion;

	/**
	 * This was created from the details of the foreign key FK_USERS_QUESTIONARY_USER_ID_ANSWERS and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_QUESTIONARY_USER_ID_ANSWERS and described as: '}) 
	user: AllUser;

}
