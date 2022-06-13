import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';

/**
 * Informational model in typescript (nest.js) for ImportedContact
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one external contact imported with permission for a given user
 */

/**
 * ImportedContact
 * one external contact imported with permission for a given user
 */
export class ImportedContact {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the user that imported the contact
	 */	
	@ApiProperty({ description: 'the user that imported the contact'}) 
	user_id: number;

	/**
	 * the name of the system or service that the contacts were received from
	 */	
	@ApiProperty({ description: 'the name of the system or service that the contacts were received from'}) 
	source: string;

	/**
	 * the list of contacts exactly as the source system provided them in json
	 */	
	@ApiProperty({ description: 'the list of contacts exactly as the source system provided them in json'}) 
	contact_as_original_json: string;

	/**
	 * the imported list of contacts adjusted for local user in json format
	 */	
	@ApiProperty({ description: 'the imported list of contacts adjusted for local user in json format'}) 
	contact_as_json: string;

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
	 * This was created from the details of the foreign key FK_IMPORTED_CONTACTS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_IMPORTED_CONTACTS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_IMPORTED_CONTACTS_USER_ID_CONTACTS and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_IMPORTED_CONTACTS_USER_ID_CONTACTS and described as: '}) 
	user: AllUser;

}
