import { ApiProperty } from '@nestjs/swagger';
import { UserSocialProfile } from './UserSocialProfile.entity.generated';
import { SocialProfileType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for SponsorSocialProfile
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * A sponsor/issuer of a properrty/project
 */

/**
 * SponsorSocialProfile
 * A sponsor/issuer of a properrty/project
 */
export class SponsorSocialProfile extends UserSocialProfile {
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
	 * the id of the sub-national region that legal proceeding are bound to
	 */	
	@ApiProperty({ description: 'the id of the sub-national region that legal proceeding are bound to'}) 
	jurisdiction_id: number;

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
	 * the quantity of projects that have been built so far
	 */	
	@ApiProperty({ description: 'the quantity of projects that have been built so far'}) 
	total_built: string;

	/**
	 * the total value of properties built by the originator of the project so far
	 */	
	@ApiProperty({ description: 'the total value of properties built by the originator of the project so far'}) 
	value_built: string;

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
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	rep_first_name: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	rep_last_name: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	rep_email: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	rep_phone: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	signup_greeting: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	signup_paragraph: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	signup_link: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	signup_logo: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	investment_step_cc_email: string;

	/**
	 * if true (1) they are actively investing
	 */	
	@ApiProperty({ description: 'if true (1) they are actively investing'}) 
	investment_status: number;

	/**
	 * if true, a message alerting the user to a financial incentive should be shown on the referral page
	 */	
	@ApiProperty({ description: 'if true, a message alerting the user to a financial incentive should be shown on the referral page'}) 
	show_referral_text: boolean;

	/**
	 * if true (1), users signing up cobranded to this profile will have the referall dialog presented to them at the end of the proces
	 */	
	@ApiProperty({ description: 'if true (1), users signing up cobranded to this profile will have the referall dialog presented to them at the end of the proces'}) 
	show_referral_dialog: boolean;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	signup_splash_logo: string;

	/**
	 * a url to an image to show in the background for the project
	 */	
	@ApiProperty({ description: 'a url to an image to show in the background for the project'}) 
	background_image: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	referral_bonus: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	referral_disclaimer: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	referral_expiry: Date;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	referral_link: string;

}
