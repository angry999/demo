import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { InvestmentWithdrawal } from './InvestmentWithdrawal.entity.generated';
import { Project } from './Project.entity.generated';
import { Country } from './Country.entity.generated';
import { UserEntity } from './UserEntity.entity.generated';
import { UserSocialProfile } from './UserSocialProfile.entity.generated';

/**
 * Informational model in typescript (nest.js) for Province
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * a first order geo political breakdown of a country, in some countries this is called a state
 */

/**
 * Province
 * a first order geo political breakdown of a country, in some countries this is called a state
 */
export class Province {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the human readable identifier
	 */	
	@ApiProperty({ description: 'the human readable identifier'}) 
	name: string;

	/**
	 * the id of the country it is in
	 */	
	@ApiProperty({ description: 'the id of the country it is in'}) 
	country_id: number;

	/**
	 * the code typically used to denote it inside the country
	 */	
	@ApiProperty({ description: 'the code typically used to denote it inside the country'}) 
	code: string;

	/**
	 * the latitude of its geographic center
	 */	
	@ApiProperty({ description: 'the latitude of its geographic center'}) 
	latitude: number;

	/**
	 * the longitude of its geographic center
	 */	
	@ApiProperty({ description: 'the longitude of its geographic center'}) 
	longitude: number;

	/**
	 * the most commonly known or used timezone in it
	 */	
	@ApiProperty({ description: 'the most commonly known or used timezone in it'}) 
	timezone: string;

	/**
	 * if true it should be shown in pick lists
	 */	
	@ApiProperty({ description: 'if true it should be shown in pick lists'}) 
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
	 * This was created from the details of the foreign key FK_ALL_USERS_TO_MPROVINCES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, isArray: true, description: 'This was created from the details of the foreign key FK_ALL_USERS_TO_MPROVINCES and described as: '}) 
	all_users_to_mprovinces: AllUser[];

	/**
	 * This was created from the details of the foreign key FK_ALL_USERS_TO_PROVINCE and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, isArray: true, description: 'This was created from the details of the foreign key FK_ALL_USERS_TO_PROVINCE and described as: '}) 
	all_users_to_province: AllUser[];

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_WITHDRAWAL_TO_PROVINCE and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentWithdrawal, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTMENT_WITHDRAWAL_TO_PROVINCE and described as: '}) 
	investment_withdrawal_to_province: InvestmentWithdrawal[];

	/**
	 * This was created from the details of the foreign key FK_PROJECTS_PROVINCE_ID_PROJECTS and described as: 
	 */	
	@ApiProperty({ type: () => Project, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECTS_PROVINCE_ID_PROJECTS and described as: '}) 
	projects: Project[];

	/**
	 * This was created from the details of the foreign key FK_PROVINCES_TO_COUNTRIES and described as: 
	 */	
	@ApiProperty({ type: () => Country, description: 'This was created from the details of the foreign key FK_PROVINCES_TO_COUNTRIES and described as: '}) 
	country: Country;

	/**
	 * This was created from the details of the foreign key FK_PROVINCES_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_PROVINCES_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * 
	 */	
	@ApiProperty({ type: () => UserEntity, isArray: true, description: ''}) 
	investor_companies: UserEntity[];

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_JURISDICTION_ID_PROFILES and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_JURISDICTION_ID_PROFILES and described as: '}) 
	users_socialprofile_jurisdiction_id_profiles: UserSocialProfile[];

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_PROVINCE_ID and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_PROVINCE_ID and described as: '}) 
	users_socialprofile_province_id: UserSocialProfile[];

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_STATUTE_ID_TO_PROVINCES and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_STATUTE_ID_TO_PROVINCES and described as: '}) 
	users_socialprofile_statute_id_to_provinces: UserSocialProfile[];

}
