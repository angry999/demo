import { ApiProperty } from '@nestjs/swagger';
import { Event } from './Event.entity.generated';
import { AllUser } from './AllUser.entity.generated';
import { InvestmentOrder } from './InvestmentOrder.entity.generated';
import { UserPdfType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for UserPdf
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one pdf that exists for one user
 */

/**
 * UserPdf
 * one pdf that exists for one user
 */
export class UserPdf {
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
	 * an order that the document is related to
	 */	
	@ApiProperty({ description: 'an order that the document is related to'}) 
	order_id: number;

	/**
	 * a textual (non-code) categorization of the purpose of the pdf
	 */	
	@ApiProperty({ description: 'a textual (non-code) categorization of the purpose of the pdf'}) 
	pdf_type: UserPdfType;

	/**
	 * a url to the pdf
	 */	
	@ApiProperty({ description: 'a url to the pdf'}) 
	pdf_name: string;

	/**
	 * unused
	 */	
	@ApiProperty({ description: 'unused'}) 
	exel_name: string;

	/**
	 * if the pdf is relevant to a given point in time, such as a bank statement, this is the month of that point in time
	 */	
	@ApiProperty({ description: 'if the pdf is relevant to a given point in time, such as a bank statement, this is the month of that point in time'}) 
	relevant_month: number;

	/**
	 * if the pdf is relevant to a given point in time, such as a bank statement, this is the year of that point in time
	 */	
	@ApiProperty({ description: 'if the pdf is relevant to a given point in time, such as a bank statement, this is the year of that point in time'}) 
	relevant_year: number;

	/**
	 * generic remarks about what the pdf is
	 */	
	@ApiProperty({ description: 'generic remarks about what the pdf is'}) 
	remarks: string;

	/**
	 * an effective date of the pdf
	 */	
	@ApiProperty({ description: 'an effective date of the pdf'}) 
	effective_date: Date;

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
	 * This was created from the details of the foreign key FK_EVENTS_TO_USERS_PDF and described as: 
	 */	
	@ApiProperty({ type: () => Event, isArray: true, description: 'This was created from the details of the foreign key FK_EVENTS_TO_USERS_PDF and described as: '}) 
	events_to_users_pdf: Event[];

	/**
	 * This was created from the details of the foreign key FK_USERS_PDF_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_PDF_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USERS_PDF_ORDER_ID_PDFS and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentOrder, description: 'This was created from the details of the foreign key FK_USERS_PDF_ORDER_ID_PDFS and described as: '}) 
	order: InvestmentOrder;

	/**
	 * This was created from the details of the foreign key FK_USERS_PDF_USER_ID_PDFS and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_PDF_USER_ID_PDFS and described as: '}) 
	user: AllUser;

}
