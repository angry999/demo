import { ApiProperty } from '@nestjs/swagger';
import { FfbaAssociation } from './FfbaAssociation.entity.generated';
import { InvestorEarning } from './InvestorEarning.entity.generated';
import { UserBankingDetails } from './UserBankingDetails.entity.generated';
import { Province } from './Province.entity.generated';
import { Country } from './Country.entity.generated';
import { AllUser } from './AllUser.entity.generated';
import { UserAnswer } from './UserAnswer.entity.generated';
import { EntityType } from 'fundscraper-model-enums';
import { UserEntityStatus } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for UserEntity
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * a legal entity. this should be re-done to not include properties, rather its three derivations (UserTrust, UserCorporation and UserBeneficiary) should take its place
 */

/**
 * UserEntity
 * a legal entity. this should be re-done to not include properties, rather its three derivations (UserTrust, UserCorporation and UserBeneficiary) should take its place
 */
export class UserEntity {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the type of entitye this is. for trusts its 2
	 */	
	@ApiProperty({ description: 'the type of entitye this is. for trusts its 2'}) 
	type: EntityType;

	/**
	 * the user this is for
	 */	
	@ApiProperty({ description: 'the user this is for'}) 
	user_id: number;

	/**
	 * the fs id for the corporation
	 */	
	@ApiProperty({ description: 'the fs id for the corporation'}) 
	client_number: string;

	/**
	 * the legal name of the corporation
	 */	
	@ApiProperty({ description: 'the legal name of the corporation'}) 
	name: string;

	/**
	 * the street addresss of where the corporation is located
	 */	
	@ApiProperty({ description: 'the street addresss of where the corporation is located'}) 
	address: string;

	/**
	 * the second line of the street address for where the corporation is located
	 */	
	@ApiProperty({ description: 'the second line of the street address for where the corporation is located'}) 
	address2: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	apt_number: string;

	/**
	 * the id of the country where the company is located
	 */	
	@ApiProperty({ description: 'the id of the country where the company is located'}) 
	country_id: number;

	/**
	 * the id of the province for where the company is located
	 */	
	@ApiProperty({ description: 'the id of the province for where the company is located'}) 
	province_id: number;

	/**
	 * the postal identifier for where the company is located
	 */	
	@ApiProperty({ description: 'the postal identifier for where the company is located'}) 
	zip: string;

	/**
	 * the city for where the company is located
	 */	
	@ApiProperty({ description: 'the city for where the company is located'}) 
	city: string;

	/**
	 * a url to an additional document if required to clarify disbursements
	 */	
	@ApiProperty({ description: 'a url to an additional document if required to clarify disbursements'}) 
	pdf_file: string;

	/**
	 * the usability state of the trust
	 */	
	@ApiProperty({ description: 'the usability state of the trust'}) 
	status: UserEntityStatus;

	/**
	 * if true, this row is &quot;logically&quot; deleted. that is, its not to be used any more and is kept for historical/audit purposes only
	 */	
	@ApiProperty({ description: 'if true, this row is &quot;logically&quot; deleted. that is, its not to be used any more and is kept for historical/audit purposes only'}) 
	is_deleted: boolean;

	/**
	 * the point in time this row was first created regardless of modifications
	 */	
	@ApiProperty({ description: 'the point in time this row was first created regardless of modifications'}) 
	createtime: Date;

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
	 * This was created from the details of the foreign key FK_FFBA_ASSOCIATION_TO_USER_ENTITY and described as: 
	 */	
	@ApiProperty({ type: () => FfbaAssociation, isArray: true, description: 'This was created from the details of the foreign key FK_FFBA_ASSOCIATION_TO_USER_ENTITY and described as: '}) 
	ffba_association_to_user_entity: FfbaAssociation[];

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_EARNINGS_USER_ENTITY_ID_EARNINGS and described as: 
	 */	
	@ApiProperty({ type: () => InvestorEarning, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTOR_EARNINGS_USER_ENTITY_ID_EARNINGS and described as: '}) 
	earnings: InvestorEarning[];

	/**
	 * This was created from the details of the foreign key FK_USERS_BANKING_DETAILS_TO_USER_ENTITY and described as: 
	 */	
	@ApiProperty({ type: () => UserBankingDetails, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_BANKING_DETAILS_TO_USER_ENTITY and described as: '}) 
	users_banking_details_to_user_entity: UserBankingDetails[];

	/**
	 * This was created from the details of the foreign key FK_USERS_ENTITY_COMPANY_PROVINCE_ID_INVESTOR_COMPANIES and described as: 
	 */	
	@ApiProperty({ type: () => Province, description: 'This was created from the details of the foreign key FK_USERS_ENTITY_COMPANY_PROVINCE_ID_INVESTOR_COMPANIES and described as: '}) 
	company_province: Province;

	/**
	 * This was created from the details of the foreign key FK_USERS_ENTITY_COUNTRY_ID_INVESTOR_COMPANIES and described as: 
	 */	
	@ApiProperty({ type: () => Country, description: 'This was created from the details of the foreign key FK_USERS_ENTITY_COUNTRY_ID_INVESTOR_COMPANIES and described as: '}) 
	country: Country;

	/**
	 * This was created from the details of the foreign key FK_USERS_ENTITY_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_ENTITY_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USERS_ENTITY_PROVINCE_ID_INVESTOR_COMPANIES and described as: 
	 */	
	@ApiProperty({ type: () => Province, description: 'This was created from the details of the foreign key FK_USERS_ENTITY_PROVINCE_ID_INVESTOR_COMPANIES and described as: '}) 
	province: Province;

	/**
	 * This was created from the details of the foreign key FK_USERS_ENTITY_USER_ID_ENTITIES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_ENTITY_USER_ID_ENTITIES and described as: '}) 
	user: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USERS_QUESTIONARY_ENTITY_ANSWERS and described as: 
	 */	
	@ApiProperty({ type: () => UserAnswer, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_QUESTIONARY_ENTITY_ANSWERS and described as: '}) 
	users_questionary_entity_answers: UserAnswer[];

}
