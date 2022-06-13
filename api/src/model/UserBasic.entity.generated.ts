import { ApiProperty } from '@nestjs/swagger';
import { UserType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for UserBasic
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * An administrative user
 */

/**
 * UserBasic
 * An administrative user
 */
export class UserBasic {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the category of user this is (i&#x3D;investor, a&#x3D;admin, c&#x3D;issuer admin)
	 */	
	@ApiProperty({ description: 'the category of user this is (i&#x3D;investor, a&#x3D;admin, c&#x3D;issuer admin)'}) 
	user_type: UserType;

	/**
	 * the first name of the person who uses the account
	 */	
	@ApiProperty({ description: 'the first name of the person who uses the account'}) 
	first_name: string;

	/**
	 * the initial of the persons last name
	 */	
	@ApiProperty({ description: 'the initial of the persons last name'}) 
	last_initial: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	cobranded_client_of_id: number;

	/**
	 * the name of the file that holds the avatars picture. this is the resouce relative, not site relative.
	 */	
	@ApiProperty({ description: 'the name of the file that holds the avatars picture. this is the resouce relative, not site relative.'}) 
	avatar_image_file_name: string;

	/**
	 * the point in time the user first signed up
	 */	
	@ApiProperty({ description: 'the point in time the user first signed up'}) 
	signup_date: Date;

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

}
