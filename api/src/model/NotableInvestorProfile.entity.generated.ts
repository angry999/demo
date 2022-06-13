import { ApiProperty } from '@nestjs/swagger';
import { UserSocialProfile } from './UserSocialProfile.entity.generated';
import { SocialProfileType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for NotableInvestorProfile
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * An investor that has notarity and is promoted online
 */

/**
 * NotableInvestorProfile
 * An investor that has notarity and is promoted online
 */
export class NotableInvestorProfile extends UserSocialProfile {
	/**
	 * ?
	 */	
	@ApiProperty({ description: '?'}) 
	profile_type: SocialProfileType;

	/**
	 * the id of the sub-national region that the project must comply to for compliance
	 */	
	@ApiProperty({ description: 'the id of the sub-national region that the project must comply to for compliance'}) 
	statute_id: number;

	/**
	 * the id of the country the project is in
	 */	
	@ApiProperty({ description: 'the id of the country the project is in'}) 
	country_id: number;

	/**
	 * the id of the province the project is in
	 */	
	@ApiProperty({ description: 'the id of the province the project is in'}) 
	province_id: number;

	/**
	 * the city the project is in
	 */	
	@ApiProperty({ description: 'the city the project is in'}) 
	city: string;

	/**
	 * the legal address of the project
	 */	
	@ApiProperty({ description: 'the legal address of the project'}) 
	address: string;

	/**
	 * the mailing identifier for the address of the project
	 */	
	@ApiProperty({ description: 'the mailing identifier for the address of the project'}) 
	zip: string;

	/**
	 * the email address to use to contact the project with
	 */	
	@ApiProperty({ description: 'the email address to use to contact the project with'}) 
	email: string;

	/**
	 * the telephone number to use to reach out to contact someone at the project
	 */	
	@ApiProperty({ description: 'the telephone number to use to reach out to contact someone at the project'}) 
	phone: string;

	/**
	 * a sentence or paragraph about the history of the person/project
	 */	
	@ApiProperty({ description: 'a sentence or paragraph about the history of the person/project'}) 
	biography: string;

	/**
	 * a narrative about the persons (not projects) career so far
	 */	
	@ApiProperty({ description: 'a narrative about the persons (not projects) career so far'}) 
	career: string;

	/**
	 * a narrative about the persons (not projects) educational background
	 */	
	@ApiProperty({ description: 'a narrative about the persons (not projects) educational background'}) 
	education: string;

	/**
	 * a free form narrative of what the person prefers to work with
	 */	
	@ApiProperty({ description: 'a free form narrative of what the person prefers to work with'}) 
	preferences: string;

	/**
	 * if true (1) they are actively investing
	 */	
	@ApiProperty({ description: 'if true (1) they are actively investing'}) 
	investment_status: number;

}
