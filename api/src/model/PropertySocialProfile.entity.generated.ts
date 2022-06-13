import { ApiProperty } from '@nestjs/swagger';
import { UserSocialProfile } from './UserSocialProfile.entity.generated';
import { SocialProfileType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for PropertySocialProfile
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * An overview of a property/project
 */

/**
 * PropertySocialProfile
 * An overview of a property/project
 */
export class PropertySocialProfile extends UserSocialProfile {
	/**
	 * if the profile is for a project, the id of that project
	 */	
	@ApiProperty({ description: 'if the profile is for a project, the id of that project'}) 
	project_id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	developer_number: number;

	/**
	 * the short identifier of an issuer
	 */	
	@ApiProperty({ description: 'the short identifier of an issuer'}) 
	issuer_code: string;

	/**
	 * ?
	 */	
	@ApiProperty({ description: '?'}) 
	profile_type: SocialProfileType;

	/**
	 * the legal name of the project
	 */	
	@ApiProperty({ description: 'the legal name of the project'}) 
	legal_name: string;

	/**
	 * a caret (^) separated list of category tags for the invesmtent. the tags are currently unstructured
	 */	
	@ApiProperty({ description: 'a caret (^) separated list of category tags for the invesmtent. the tags are currently unstructured'}) 
	categories: string;

	/**
	 * for a user profile, the tags of projects that person is interested in
	 */	
	@ApiProperty({ description: 'for a user profile, the tags of projects that person is interested in'}) 
	self_category: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	bg_image: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	signup_image: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	signup_guide_image: string;

	/**
	 * a url to an image to use for the project when it is displayed &quot;in our network&quot;
	 */	
	@ApiProperty({ description: 'a url to an image to use for the project when it is displayed &quot;in our network&quot;'}) 
	network_logo: string;

	/**
	 * a url to an image to use for the background of the project when it is displayed &quot;in our network&quot;
	 */	
	@ApiProperty({ description: 'a url to an image to use for the background of the project when it is displayed &quot;in our network&quot;'}) 
	network_background: string;

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
	 * internal storage for the list of person ids
	 */	
	@ApiProperty({ description: 'internal storage for the list of person ids'}) 
	person_ids: string;

	/**
	 * if true (1) they are actively investing
	 */	
	@ApiProperty({ description: 'if true (1) they are actively investing'}) 
	investment_status: number;

	/**
	 * a url to an image to show in the background for the project
	 */	
	@ApiProperty({ description: 'a url to an image to show in the background for the project'}) 
	background_image: string;

}
