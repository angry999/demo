import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './UserEntity.entity.generated';

/**
 * Informational model in typescript (nest.js) for UserCorporation
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * An investment entity for users corporations
 */

/**
 * UserCorporation
 * An investment entity for users corporations
 */
export class UserCorporation extends UserEntity {
	/**
	 * the number the company is identified by according to the registration authority where it is domiciled
	 */	
	@ApiProperty({ description: 'the number the company is identified by according to the registration authority where it is domiciled'}) 
	reg_no: string;

	/**
	 * the name of the are where the company is domiciled
	 */	
	@ApiProperty({ description: 'the name of the are where the company is domiciled'}) 
	reg_domicile: string;

	/**
	 * the id of the province that the company is in
	 */	
	@ApiProperty({ description: 'the id of the province that the company is in'}) 
	company_province_id: number;

	/**
	 * a short description of the type of business the company is engaged in
	 */	
	@ApiProperty({ description: 'a short description of the type of business the company is engaged in'}) 
	business_nature: string;

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
	 * ^separated list of the first names of the directoros of the company
	 */	
	@ApiProperty({ description: '^separated list of the first names of the directoros of the company'}) 
	director_first_name: string;

	/**
	 * ^separated list of the last names of the directors of the company
	 */	
	@ApiProperty({ description: '^separated list of the last names of the directors of the company'}) 
	director_last_name: string;

	/**
	 * ^separated list of the addresses of the directors
	 */	
	@ApiProperty({ description: '^separated list of the addresses of the directors'}) 
	director_address: string;

	/**
	 * ^separated list of whether the director is a canadian
	 */	
	@ApiProperty({ description: '^separated list of whether the director is a canadian'}) 
	director_canadian: string;

	/**
	 * ^separated list of the shareholders first names
	 */	
	@ApiProperty({ description: '^separated list of the shareholders first names'}) 
	shareholder_first_name: string;

	/**
	 * ^separated list of the shareholders last names
	 */	
	@ApiProperty({ description: '^separated list of the shareholders last names'}) 
	shareholder_last_name: string;

	/**
	 * ^separated list of the shareholders addresses
	 */	
	@ApiProperty({ description: '^separated list of the shareholders addresses'}) 
	shareholder_address: string;

	/**
	 * ^separated list of whether the shareholder is canadian
	 */	
	@ApiProperty({ description: '^separated list of whether the shareholder is canadian'}) 
	shareholder_canadian: string;

	/**
	 * ^separated list of the signing officers first names
	 */	
	@ApiProperty({ description: '^separated list of the signing officers first names'}) 
	signing_officer_first_name: string;

	/**
	 * ^separated list of the signing officers last names
	 */	
	@ApiProperty({ description: '^separated list of the signing officers last names'}) 
	signing_officer_last_name: string;

	/**
	 * ^separated list of the signing officers titles
	 */	
	@ApiProperty({ description: '^separated list of the signing officers titles'}) 
	signing_officer_title: string;

	/**
	 * if true, the account holder is a shareholder
	 */	
	@ApiProperty({ description: 'if true, the account holder is a shareholder'}) 
	shareholder: string;

}
