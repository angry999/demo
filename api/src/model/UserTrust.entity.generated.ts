import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './UserEntity.entity.generated';

/**
 * Informational model in typescript (nest.js) for UserTrust
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * An investment entity for users trusts
 */

/**
 * UserTrust
 * An investment entity for users trusts
 */
export class UserTrust extends UserEntity {
	/**
	 * the point in time the trust was registered
	 */	
	@ApiProperty({ description: 'the point in time the trust was registered'}) 
	registration_date: string;

	/**
	 * an email address to use to contact individuals at the company
	 */	
	@ApiProperty({ description: 'an email address to use to contact individuals at the company'}) 
	email: string;

	/**
	 * a telephone number to use to contact people at the company
	 */	
	@ApiProperty({ description: 'a telephone number to use to contact people at the company'}) 
	phone: string;

	/**
	 * an extenstion to the telephone number to use to contact people at the company
	 */	
	@ApiProperty({ description: 'an extenstion to the telephone number to use to contact people at the company'}) 
	phone_ext: string;

	/**
	 * ^caret separated list of the first names of the trustees
	 */	
	@ApiProperty({ description: '^caret separated list of the first names of the trustees'}) 
	trustee_first_name: string;

	/**
	 * caret separated list of the last names of the trustees
	 */	
	@ApiProperty({ description: 'caret separated list of the last names of the trustees'}) 
	trustee_last_name: string;

	/**
	 * caret separated list of the titles of the trustees
	 */	
	@ApiProperty({ description: 'caret separated list of the titles of the trustees'}) 
	trustee_title: string;

}
