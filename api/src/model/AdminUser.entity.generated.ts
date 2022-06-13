import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { AdminUserRole } from 'fundscraper-model-enums';
import { AdminAccountAvailability } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for AdminUser
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * An administrative user
 */

/**
 * AdminUser
 * An administrative user
 */
export class AdminUser extends AllUser {
	/**
	 * the type of function the administrator performs
	 */	
	@ApiProperty({ description: 'the type of function the administrator performs'}) 
	role: string;

	/**
	 * deprecated, do not use
	 */	
	@ApiProperty({ description: 'deprecated, do not use'}) 
	username: string;

	/**
	 * the token used to identify the current session
	 */	
	@ApiProperty({ description: 'the token used to identify the current session'}) 
	token: string;

	/**
	 * the last time the session token was updated
	 */	
	@ApiProperty({ description: 'the last time the session token was updated'}) 
	token_update: Date;

	/**
	 * the type of administrative role performed
	 */	
	@ApiProperty({ description: 'the type of administrative role performed'}) 
	admin_role: AdminUserRole;

	/**
	 * the avilability of the account for use
	 */	
	@ApiProperty({ description: 'the avilability of the account for use'}) 
	availability: AdminAccountAvailability;

	/**
	 * The name of the timezone the administrator typically connects from
	 */	
	@ApiProperty({ description: 'The name of the timezone the administrator typically connects from'}) 
	timezone: string;

	/**
	 * The name of the country the administrator is generally located in
	 */	
	@ApiProperty({ description: 'The name of the country the administrator is generally located in'}) 
	location: string;

	/**
	 * The name of the file that holds the image of the country flag the administrators location is in
	 */	
	@ApiProperty({ description: 'The name of the file that holds the image of the country flag the administrators location is in'}) 
	flag: string;

}
