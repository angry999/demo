import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { UserAnswer } from './UserAnswer.entity.generated';
import { RegistrationQuestionCategory } from 'fundscraper-model-enums';
import { QuestionAnswerType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for RegistrationQuestion
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one question that should be asked of users when they register
 */

/**
 * RegistrationQuestion
 * one question that should be asked of users when they register
 */
export class RegistrationQuestion {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the category of the question
	 */	
	@ApiProperty({ description: 'the category of the question'}) 
	category: RegistrationQuestionCategory;

	/**
	 * the textual identifier (key phrase) of the question to ask
	 */	
	@ApiProperty({ description: 'the textual identifier (key phrase) of the question to ask'}) 
	question: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	wellknown: string;

	/**
	 * the body text of the question to ask
	 */	
	@ApiProperty({ description: 'the body text of the question to ask'}) 
	content: string;

	/**
	 * the set of questions (version) this set belongs to
	 */	
	@ApiProperty({ description: 'the set of questions (version) this set belongs to'}) 
	question_set: number;

	/**
	 * a url to an image that can be used to represent the question
	 */	
	@ApiProperty({ description: 'a url to an image that can be used to represent the question'}) 
	representative_image: string;

	/**
	 * the type of presentation to use to present the asnwer
	 */	
	@ApiProperty({ description: 'the type of presentation to use to present the asnwer'}) 
	answer_type: QuestionAnswerType;

	/**
	 * if its question type 3, this is a string with 2 numbers separated by a comma. those values are the low and high of the permitted range
	 */	
	@ApiProperty({ description: 'if its question type 3, this is a string with 2 numbers separated by a comma. those values are the low and high of the permitted range'}) 
	type_3_range: string;

	/**
	 * if its question type 3, this what the sum of the answers must match (eg, 100%)
	 */	
	@ApiProperty({ description: 'if its question type 3, this what the sum of the answers must match (eg, 100%)'}) 
	type_3_total: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	slider_display: boolean;

	/**
	 * the first possible choice as an answer
	 */	
	@ApiProperty({ description: 'the first possible choice as an answer'}) 
	answer_choice_1: string;

	/**
	 * a url to an image that can be used to represent the first answer choice
	 */	
	@ApiProperty({ description: 'a url to an image that can be used to represent the first answer choice'}) 
	answer1_image: string;

	/**
	 * the second possible choice as an answer
	 */	
	@ApiProperty({ description: 'the second possible choice as an answer'}) 
	answer_choice_2: string;

	/**
	 * a url to an image that can be used to represent the second answer choice
	 */	
	@ApiProperty({ description: 'a url to an image that can be used to represent the second answer choice'}) 
	answer2_image: string;

	/**
	 * the third possible choice as an answer
	 */	
	@ApiProperty({ description: 'the third possible choice as an answer'}) 
	answer_choice_3: string;

	/**
	 * a url to an image that can be used to represent the third answer choice
	 */	
	@ApiProperty({ description: 'a url to an image that can be used to represent the third answer choice'}) 
	answer3_image: string;

	/**
	 * the fourth possible choice as an answer
	 */	
	@ApiProperty({ description: 'the fourth possible choice as an answer'}) 
	answer_choice_4: string;

	/**
	 * a url to an image that can be used to represent the fourth answer choice
	 */	
	@ApiProperty({ description: 'a url to an image that can be used to represent the fourth answer choice'}) 
	answer4_image: string;

	/**
	 * the fifth possible choice as an answer
	 */	
	@ApiProperty({ description: 'the fifth possible choice as an answer'}) 
	answer_choice_5: string;

	/**
	 * a url to an image that can be used to represent the fifth answer choice
	 */	
	@ApiProperty({ description: 'a url to an image that can be used to represent the fifth answer choice'}) 
	answer5_image: string;

	/**
	 * the sixth possible choice as an answer
	 */	
	@ApiProperty({ description: 'the sixth possible choice as an answer'}) 
	answer_choice_6: string;

	/**
	 * a url to an image that can be used to represent the sixth answer choice
	 */	
	@ApiProperty({ description: 'a url to an image that can be used to represent the sixth answer choice'}) 
	answer6_image: string;

	/**
	 * the seventh possible choice as an answer
	 */	
	@ApiProperty({ description: 'the seventh possible choice as an answer'}) 
	answer_choice_7: string;

	/**
	 * a url to an image that can be used to represent the seventh answer choice
	 */	
	@ApiProperty({ description: 'a url to an image that can be used to represent the seventh answer choice'}) 
	answer7_image: string;

	/**
	 * the eigth possible choice as an answer
	 */	
	@ApiProperty({ description: 'the eigth possible choice as an answer'}) 
	answer_choice_8: string;

	/**
	 * a url to an image that can be used to represent the eigth answer choice
	 */	
	@ApiProperty({ description: 'a url to an image that can be used to represent the eigth answer choice'}) 
	answer8_image: string;

	/**
	 * the ninth possible choice as an answer
	 */	
	@ApiProperty({ description: 'the ninth possible choice as an answer'}) 
	answer_choice_9: string;

	/**
	 * a url to an image that can be used to represent the ninth answer choice
	 */	
	@ApiProperty({ description: 'a url to an image that can be used to represent the ninth answer choice'}) 
	answer9_image: string;

	/**
	 * the tenth possible choice as an answer
	 */	
	@ApiProperty({ description: 'the tenth possible choice as an answer'}) 
	answer_choice_10: string;

	/**
	 * a url to an image that can be used to represent the tenth answer choice
	 */	
	@ApiProperty({ description: 'a url to an image that can be used to represent the tenth answer choice'}) 
	answer10_image: string;

	/**
	 * the ordinal position of this question in the list of questions to ask
	 */	
	@ApiProperty({ description: 'the ordinal position of this question in the list of questions to ask'}) 
	sort_order: number;

	/**
	 * if true the question should be shown otherwise is should not be shown
	 */	
	@ApiProperty({ description: 'if true the question should be shown otherwise is should not be shown'}) 
	visible: boolean;

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
	 * This was created from the details of the foreign key FK_REGISTRATION_QUESTIONARY_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_REGISTRATION_QUESTIONARY_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USERS_QUESTIONARY_QUESTION_ID_ANSWERS and described as: 
	 */	
	@ApiProperty({ type: () => UserAnswer, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_QUESTIONARY_QUESTION_ID_ANSWERS and described as: '}) 
	answers: UserAnswer[];

}
