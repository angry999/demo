import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { EMailStatus } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for Mail
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one email that has been sent
 */

/**
 * Mail
 * one email that has been sent
 */
export class Mail {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the id of the use it was sent to
	 */	
	@ApiProperty({ description: 'the id of the use it was sent to'}) 
	to_id: number;

	/**
	 * the id of the user who sent it
	 */	
	@ApiProperty({ description: 'the id of the user who sent it'}) 
	from_id: number;

	/**
	 * the smtp email address it was sent to. it may not be the current email address of the to_user
	 */	
	@ApiProperty({ description: 'the smtp email address it was sent to. it may not be the current email address of the to_user'}) 
	address_sent_to: string;

	/**
	 * the subject line
	 */	
	@ApiProperty({ description: 'the subject line'}) 
	subject: string;

	/**
	 * the body/text of the email
	 */	
	@ApiProperty({ description: 'the body/text of the email'}) 
	body: string;

	/**
	 * the complete body of the email that gets sent to the smtp server
	 */	
	@ApiProperty({ description: 'the complete body of the email that gets sent to the smtp server'}) 
	raw_body: string;

	/**
	 * has the email been sent to the smtp server successfully yet
	 */	
	@ApiProperty({ description: 'has the email been sent to the smtp server successfully yet'}) 
	sent_ok: boolean;

	/**
	 * the name of a file attachement that was sent with it. it is not specified where/if that file continues to exist
	 */	
	@ApiProperty({ description: 'the name of a file attachement that was sent with it. it is not specified where/if that file continues to exist'}) 
	attachment: string;

	/**
	 * did the sender flag it?
	 */	
	@ApiProperty({ description: 'did the sender flag it?'}) 
	flag: boolean;

	/**
	 * did the sender star it?
	 */	
	@ApiProperty({ description: 'did the sender star it?'}) 
	stared: boolean;

	/**
	 * the current state of the email
	 */	
	@ApiProperty({ description: 'the current state of the email'}) 
	status: EMailStatus;

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
	 * This was created from the details of the foreign key FK_MAILS_FROM_ID_SENT_EMAILS and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_MAILS_FROM_ID_SENT_EMAILS and described as: '}) 
	from: AllUser;

	/**
	 * This was created from the details of the foreign key FK_MAILS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_MAILS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_MAILS_TO_ID_RECEIVED_EMAILS and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_MAILS_TO_ID_RECEIVED_EMAILS and described as: '}) 
	to: AllUser;

}
