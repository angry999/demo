import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { InvestorAccreditation } from 'fundscraper-model-enums';
import { UserState } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for Investor
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * A user that invests
 */

/**
 * Investor
 * A user that invests
 */
export class Investor extends AllUser {
	/**
	 * the unique id in hubspot for the contact that has a 1:1 relationship with this user
	 */	
	@ApiProperty({ description: 'the unique id in hubspot for the contact that has a 1:1 relationship with this user'}) 
	hubspot_vid: string;

	/**
	 * true if the user or someone at fundscraper has verified their email address
	 */	
	@ApiProperty({ description: 'true if the user or someone at fundscraper has verified their email address'}) 
	email_verified_status: boolean;

	/**
	 * the identifier the user uses on linked in
	 */	
	@ApiProperty({ description: 'the identifier the user uses on linked in'}) 
	linkedin: string;

	/**
	 * the identifier the user uses on facebook
	 */	
	@ApiProperty({ description: 'the identifier the user uses on facebook'}) 
	facebook: string;

	/**
	 * the identifier the user uses for googe social (deprecated)
	 */	
	@ApiProperty({ description: 'the identifier the user uses for googe social (deprecated)'}) 
	google_address: string;

	/**
	 * if the user is in a multi-unit building, the number/designation of that unit
	 */	
	@ApiProperty({ description: 'if the user is in a multi-unit building, the number/designation of that unit'}) 
	apt_number: string;

	/**
	 * the level of investment the user is capable of
	 */	
	@ApiProperty({ description: 'the level of investment the user is capable of'}) 
	actual_investment_level: InvestorAccreditation;

	/**
	 * the level of investment the user proposed they are capable of
	 */	
	@ApiProperty({ description: 'the level of investment the user proposed they are capable of'}) 
	user_proposed_investment_level: InvestorAccreditation;

	/**
	 * if true, they are taking an exemption for investment
	 */	
	@ApiProperty({ description: 'if true, they are taking an exemption for investment'}) 
	exemption: boolean;

	/**
	 * is the user eligibible for an exemption to exeed the limit?
	 */	
	@ApiProperty({ description: 'is the user eligibible for an exemption to exeed the limit?'}) 
	eligible_exemption: boolean;

	/**
	 * if true, send the user statements
	 */	
	@ApiProperty({ description: 'if true, send the user statements'}) 
	statements_flag: boolean;

	/**
	 * if true, admin has confirmed user KYC is accurate
	 */	
	@ApiProperty({ description: 'if true, admin has confirmed user KYC is accurate'}) 
	kyc_confirmed: boolean;

	/**
	 * if true, admin has confirmed user Equifax is accurate
	 */	
	@ApiProperty({ description: 'if true, admin has confirmed user Equifax is accurate'}) 
	equifax_confirmed: boolean;

	/**
	 * if true, admin has confirmed user identity
	 */	
	@ApiProperty({ description: 'if true, admin has confirmed user identity'}) 
	identity_confirmed: boolean;

	/**
	 * Yes if they are a citizen of canada
	 */	
	@ApiProperty({ description: 'Yes if they are a citizen of canada'}) 
	citizen: string;

	/**
	 * Yes if they are a resident of canada
	 */	
	@ApiProperty({ description: 'Yes if they are a resident of canada'}) 
	resident: string;

	/**
	 * the street address of where the user lives
	 */	
	@ApiProperty({ description: 'the street address of where the user lives'}) 
	address: string;

	/**
	 * the postal identifier of where the person lives
	 */	
	@ApiProperty({ description: 'the postal identifier of where the person lives'}) 
	zip: string;

	/**
	 * the name of the city the person lives in
	 */	
	@ApiProperty({ description: 'the name of the city the person lives in'}) 
	city: string;

	/**
	 * the id of the province the user lives in
	 */	
	@ApiProperty({ description: 'the id of the province the user lives in'}) 
	province_id: number;

	/**
	 * the street address of where to send mail to for the person
	 */	
	@ApiProperty({ description: 'the street address of where to send mail to for the person'}) 
	mailing_address: string;

	/**
	 * the postal identifier to send mail to
	 */	
	@ApiProperty({ description: 'the postal identifier to send mail to'}) 
	mailing_zip: string;

	/**
	 * the name of the city to send mail to
	 */	
	@ApiProperty({ description: 'the name of the city to send mail to'}) 
	mailing_city: string;

	/**
	 * if the user is in a multi-unit building, the number/designation of that unit
	 */	
	@ApiProperty({ description: 'if the user is in a multi-unit building, the number/designation of that unit'}) 
	mailing_apt_number: string;

	/**
	 * the persons government identifier for social services
	 */	
	@ApiProperty({ description: 'the persons government identifier for social services'}) 
	sin: string;

	/**
	 * the telephone number to use to contact the person at
	 */	
	@ApiProperty({ description: 'the telephone number to use to contact the person at'}) 
	phone: string;

	/**
	 * the telephone number to use to contact the person at their place of work
	 */	
	@ApiProperty({ description: 'the telephone number to use to contact the person at their place of work'}) 
	workphone: string;

	/**
	 * the telephone number of the persons primary residence
	 */	
	@ApiProperty({ description: 'the telephone number of the persons primary residence'}) 
	homephone: string;

	/**
	 * the telephone number to use to fax documents to
	 */	
	@ApiProperty({ description: 'the telephone number to use to fax documents to'}) 
	fax: string;

	/**
	 * the email address the person uses for work purposes
	 */	
	@ApiProperty({ description: 'the email address the person uses for work purposes'}) 
	workemail: string;

	/**
	 * the date of birth of the person
	 */	
	@ApiProperty({ description: 'the date of birth of the person'}) 
	dob: string;

	/**
	 * general notes about investments for the user
	 */	
	@ApiProperty({ description: 'general notes about investments for the user'}) 
	notes: string;

	/**
	 * if true they are relying on section 2.3 of the legislation for exempt distributions
	 */	
	@ApiProperty({ description: 'if true they are relying on section 2.3 of the legislation for exempt distributions'}) 
	section_23: string;

	/**
	 * if true they are relying on section 2.9 for exempt distributions
	 */	
	@ApiProperty({ description: 'if true they are relying on section 2.9 for exempt distributions'}) 
	section_29: string;

	/**
	 * are they a &quot;registrant&quot; for exempt distributions?
	 */	
	@ApiProperty({ description: 'are they a &quot;registrant&quot; for exempt distributions?'}) 
	is_registrant: string;

	/**
	 * a they a securities insider?
	 */	
	@ApiProperty({ description: 'a they a securities insider?'}) 
	is_insider: string;

	/**
	 * the full legal name of the person
	 */	
	@ApiProperty({ description: 'the full legal name of the person'}) 
	legal_person: string;

	/**
	 * the human readable number assigned by FS to identify the account
	 */	
	@ApiProperty({ description: 'the human readable number assigned by FS to identify the account'}) 
	client_number: string;

	/**
	 * the identifier for the marketing system that was responsible for originating the user
	 */	
	@ApiProperty({ description: 'the identifier for the marketing system that was responsible for originating the user'}) 
	utm_source: string;

	/**
	 * additional marketing origin information
	 */	
	@ApiProperty({ description: 'additional marketing origin information'}) 
	utm_medium: string;

	/**
	 * the marketing campiagn that originated the user
	 */	
	@ApiProperty({ description: 'the marketing campiagn that originated the user'}) 
	utm_campaign: string;

	/**
	 * additional marketing origin information
	 */	
	@ApiProperty({ description: 'additional marketing origin information'}) 
	utm_content: string;

	/**
	 * additional marketing origin information
	 */	
	@ApiProperty({ description: 'additional marketing origin information'}) 
	utm_term: string;

	/**
	 * the avilability of the account for use
	 */	
	@ApiProperty({ description: 'the avilability of the account for use'}) 
	status: UserState;

	/**
	 * if true, the user is actively attempting to suspend their account
	 */	
	@ApiProperty({ description: 'if true, the user is actively attempting to suspend their account'}) 
	suspend_request: boolean;

	/**
	 * the id of the country the user lives in
	 */	
	@ApiProperty({ description: 'the id of the country the user lives in'}) 
	country_id: number;

	/**
	 * the id of the country to send mail to
	 */	
	@ApiProperty({ description: 'the id of the country to send mail to'}) 
	mailing_country_id: number;

	/**
	 * the id of the province to send mail to 
	 */	
	@ApiProperty({ description: 'the id of the province to send mail to '}) 
	mailing_province_id: number;

	/**
	 * the sponsor that essentially owns this investor
	 */	
	@ApiProperty({ description: 'the sponsor that essentially owns this investor'}) 
	cobranded_client_of_id: number;

	/**
	 * the amount of money fundscraper owes the user
	 */	
	@ApiProperty({ description: 'the amount of money fundscraper owes the user'}) 
	balance: number;

	/**
	 * a url that the investor can forward to friends for sign up in order to get a referral fee
	 */	
	@ApiProperty({ description: 'a url that the investor can forward to friends for sign up in order to get a referral fee'}) 
	referral_link: string;

	/**
	 * the last point in time the user altered their account
	 */	
	@ApiProperty({ description: 'the last point in time the user altered their account'}) 
	last_edit: Date;

	/**
	 * the point in time the user first signed up
	 */	
	@ApiProperty({ description: 'the point in time the user first signed up'}) 
	signup_date: Date;

	/**
	 * the url to the site that was the &quot;referrer&quot; when the user first signed up
	 */	
	@ApiProperty({ description: 'the url to the site that was the &quot;referrer&quot; when the user first signed up'}) 
	referrer_site: string;

	/**
	 * a marketing specified value used to connect the marketing program or source responible for signing up the user
	 */	
	@ApiProperty({ description: 'a marketing specified value used to connect the marketing program or source responible for signing up the user'}) 
	referrer_attribution: string;

}
