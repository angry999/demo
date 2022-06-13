import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { Event } from './Event.entity.generated';
import { InvestmentOrder } from './InvestmentOrder.entity.generated';
import { InvestorIntendedTrades } from './InvestorIntendedTrades.entity.generated';
import { Project } from './Project.entity.generated';
import { ProjectInterest } from './ProjectInterest.entity.generated';
import { UserIssuerAssociation } from './UserIssuerAssociation.entity.generated';
import { SocialProfileFollowing } from './SocialProfileFollowing.entity.generated';
import { UserSocialPost } from './UserSocialPost.entity.generated';
import { Country } from './Country.entity.generated';
import { Province } from './Province.entity.generated';
import { WebHook } from './WebHook.entity.generated';

/**
 * Informational model in typescript (nest.js) for UserSocialProfile
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * a profile of some entity used for sharing and communicating
 */

/**
 * UserSocialProfile
 * a profile of some entity used for sharing and communicating
 */
export class UserSocialProfile {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the user this is for
	 */	
	@ApiProperty({ description: 'the user this is for'}) 
	user_id: number;

	/**
	 * the name of the project the profile is for
	 */	
	@ApiProperty({ description: 'the name of the project the profile is for'}) 
	name: string;

	/**
	 * a url to an image to use to represent the profile
	 */	
	@ApiProperty({ description: 'a url to an image to use to represent the profile'}) 
	image: string;

	/**
	 * a url to the facebook presence for the profile
	 */	
	@ApiProperty({ description: 'a url to the facebook presence for the profile'}) 
	facebook: string;

	/**
	 * a url to the twitter feed for the profile
	 */	
	@ApiProperty({ description: 'a url to the twitter feed for the profile'}) 
	twitter: string;

	/**
	 * a url to the linked in presence for the profile
	 */	
	@ApiProperty({ description: 'a url to the linked in presence for the profile'}) 
	linkedin: string;

	/**
	 * ?
	 */	
	@ApiProperty({ description: '?'}) 
	status: number;

	/**
	 * for user profiles, if true the user should receive notification
	 */	
	@ApiProperty({ description: 'for user profiles, if true the user should receive notification'}) 
	notification: boolean;

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
	 * This was created from the details of the foreign key FK_ALL_USERS_COBRANDED_TO_SOCIAL_PROFILE and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, isArray: true, description: 'This was created from the details of the foreign key FK_ALL_USERS_COBRANDED_TO_SOCIAL_PROFILE and described as: '}) 
	all_users_cobranded_to_social_profile: AllUser[];

	/**
	 * This was created from the details of the foreign key FK_EVENTS_TO_ISSUER and described as: 
	 */	
	@ApiProperty({ type: () => Event, isArray: true, description: 'This was created from the details of the foreign key FK_EVENTS_TO_ISSUER and described as: '}) 
	events_to_issuer: Event[];

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_ISSUER_ID_ORDERS and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentOrder, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_ISSUER_ID_ORDERS and described as: '}) 
	orders: InvestmentOrder[];

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_INTENDED_TRADES_INTENDED_ISSUER_ID_INTENDED_TRADES and described as: 
	 */	
	@ApiProperty({ type: () => InvestorIntendedTrades, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTOR_INTENDED_TRADES_INTENDED_ISSUER_ID_INTENDED_TRADES and described as: '}) 
	intended_trades: InvestorIntendedTrades[];

	/**
	 * This was created from the details of the foreign key FK_PROJECTS_ISSUER_ID_PROJECTS and described as: 
	 */	
	@ApiProperty({ type: () => Project, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECTS_ISSUER_ID_PROJECTS and described as: '}) 
	projects: Project[];

	/**
	 * This was created from the details of the foreign key FK_PROPERTY_INTEREST_INTEREST_BY_ID_INTERESTS and described as: 
	 */	
	@ApiProperty({ type: () => ProjectInterest, isArray: true, description: 'This was created from the details of the foreign key FK_PROPERTY_INTEREST_INTEREST_BY_ID_INTERESTS and described as: '}) 
	interests: ProjectInterest[];

	/**
	 * This was created from the details of the foreign key FK_PROPERTY_INTEREST_INTEREST_IN_ID_INVESTOR_INTERESTS and described as: 
	 */	
	@ApiProperty({ type: () => ProjectInterest, isArray: true, description: 'This was created from the details of the foreign key FK_PROPERTY_INTEREST_INTEREST_IN_ID_INVESTOR_INTERESTS and described as: '}) 
	investor_interests: ProjectInterest[];

	/**
	 * This was created from the details of the foreign key FK_USER_ISSUER_ASSOCIATIONS_TO_ISSUER_ID_ASSOCIATED_USERS and described as: 
	 */	
	@ApiProperty({ type: () => UserIssuerAssociation, isArray: true, description: 'This was created from the details of the foreign key FK_USER_ISSUER_ASSOCIATIONS_TO_ISSUER_ID_ASSOCIATED_USERS and described as: '}) 
	user_issuer_associations_to_issuer_id_associated_users: UserIssuerAssociation[];

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIAL_LINKUP_LINK_ID_FOLLOWERS and described as: 
	 */	
	@ApiProperty({ type: () => SocialProfileFollowing, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_SOCIAL_LINKUP_LINK_ID_FOLLOWERS and described as: '}) 
	followers: SocialProfileFollowing[];

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIAL_LINKUP_PROFILE_ID_FOLLOWING and described as: 
	 */	
	@ApiProperty({ type: () => SocialProfileFollowing, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_SOCIAL_LINKUP_PROFILE_ID_FOLLOWING and described as: '}) 
	following: SocialProfileFollowing[];

	/**
	 * 
	 */	
	@ApiProperty({ type: () => UserSocialPost, isArray: true, description: ''}) 
	posts: UserSocialPost[];

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_COUNTRY_ID and described as: 
	 */	
	@ApiProperty({ type: () => Country, description: 'This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_COUNTRY_ID and described as: '}) 
	country: Country;

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_JURISDICTION_ID_PROFILES and described as: 
	 */	
	@ApiProperty({ type: () => Province, description: 'This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_JURISDICTION_ID_PROFILES and described as: '}) 
	jurisdiction: Province;

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_PROJECT_ID_PROFILES and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_PROJECT_ID_PROFILES and described as: '}) 
	project: Project;

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_PROVINCE_ID and described as: 
	 */	
	@ApiProperty({ type: () => Province, description: 'This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_PROVINCE_ID and described as: '}) 
	province: Province;

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_STATUTE_ID_TO_PROVINCES and described as: 
	 */	
	@ApiProperty({ type: () => Province, description: 'This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_STATUTE_ID_TO_PROVINCES and described as: '}) 
	statute: Province;

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_USER_ID_PROFILES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_USER_ID_PROFILES and described as: '}) 
	user: AllUser;

	/**
	 * This was created from the details of the foreign key FK_WEB_HOOKS_TO_ISSUER and described as: 
	 */	
	@ApiProperty({ type: () => WebHook, isArray: true, description: 'This was created from the details of the foreign key FK_WEB_HOOKS_TO_ISSUER and described as: '}) 
	web_hooks_to_issuer: WebHook[];

}
