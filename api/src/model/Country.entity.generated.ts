import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { Project } from './Project.entity.generated';
import { Province } from './Province.entity.generated';
import { UserEntity } from './UserEntity.entity.generated';
import { UserSocialProfile } from './UserSocialProfile.entity.generated';

/**
 * Informational model in typescript (nest.js) for Country
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * a primary geopolitical entity
 */

/**
 * Country
 * a primary geopolitical entity
 */
export class Country {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * its human readable identifier
	 */	
	@ApiProperty({ description: 'its human readable identifier'}) 
	name: string;

	/**
	 * the 2 character iso code
	 */	
	@ApiProperty({ description: 'the 2 character iso code'}) 
	isocode2: string;

	/**
	 * the 3 character iso code
	 */	
	@ApiProperty({ description: 'the 3 character iso code'}) 
	isocode3: string;

	/**
	 * the telephone system country code prefix
	 */	
	@ApiProperty({ description: 'the telephone system country code prefix'}) 
	telephone_prefix: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	region_id: number;

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
	 * This was created from the details of the foreign key FK_ALL_USERS_TO_COUNTRIES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, isArray: true, description: 'This was created from the details of the foreign key FK_ALL_USERS_TO_COUNTRIES and described as: '}) 
	all_users_to_countries: AllUser[];

	/**
	 * This was created from the details of the foreign key FK_ALL_USERS_TO_MCOUNTRIES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, isArray: true, description: 'This was created from the details of the foreign key FK_ALL_USERS_TO_MCOUNTRIES and described as: '}) 
	all_users_to_mcountries: AllUser[];

	/**
	 * This was created from the details of the foreign key FK_COUNTRIES_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_COUNTRIES_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_PROJECTS_COUNTRY_ID_PROJECTS and described as: 
	 */	
	@ApiProperty({ type: () => Project, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECTS_COUNTRY_ID_PROJECTS and described as: '}) 
	projects: Project[];

	/**
	 * This was created from the details of the foreign key FK_PROVINCES_TO_COUNTRIES and described as: 
	 */	
	@ApiProperty({ type: () => Province, isArray: true, description: 'This was created from the details of the foreign key FK_PROVINCES_TO_COUNTRIES and described as: '}) 
	provinces_to_countries: Province[];

	/**
	 * This was created from the details of the foreign key FK_USERS_ENTITY_COUNTRY_ID_INVESTOR_COMPANIES and described as: 
	 */	
	@ApiProperty({ type: () => UserEntity, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_ENTITY_COUNTRY_ID_INVESTOR_COMPANIES and described as: '}) 
	investor_companies: UserEntity[];

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_COUNTRY_ID and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_COUNTRY_ID and described as: '}) 
	users_socialprofile_country_id: UserSocialProfile[];

}
