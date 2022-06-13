import { ApiProperty } from '@nestjs/swagger';
import { UserSocialProfile } from './UserSocialProfile.entity.generated';
import { Country } from './Country.entity.generated';
import { WebHook } from './WebHook.entity.generated';
import { Province } from './Province.entity.generated';
import { BackgroundProcess } from './BackgroundProcess.entity.generated';
import { Event } from './Event.entity.generated';
import { FfbaAssociation } from './FfbaAssociation.entity.generated';
import { ImportedContact } from './ImportedContact.entity.generated';
import { InvestmentOrder } from './InvestmentOrder.entity.generated';
import { InvestmentTransaction } from './InvestmentTransaction.entity.generated';
import { InvestmentWatchlist } from './InvestmentWatchlist.entity.generated';
import { OrderAcknowledgement } from './OrderAcknowledgement.entity.generated';
import { InvestorEarning } from './InvestorEarning.entity.generated';
import { InvestorIntendedTrades } from './InvestorIntendedTrades.entity.generated';
import { Mail } from './Mail.entity.generated';
import { ModuleAccess } from './ModuleAccess.entity.generated';
import { ProjectTaxReport } from './ProjectTaxReport.entity.generated';
import { SupportEngineer } from './SupportEngineer.entity.generated';
import { UserIssuerAssociation } from './UserIssuerAssociation.entity.generated';
import { UserRelationship } from './UserRelationship.entity.generated';
import { UserBankingDetails } from './UserBankingDetails.entity.generated';
import { UserFinancialKyc } from './UserFinancialKyc.entity.generated';
import { UserEntity } from './UserEntity.entity.generated';
import { UserInvitation } from './UserInvitation.entity.generated';
import { UserPdf } from './UserPdf.entity.generated';
import { UserAnswer } from './UserAnswer.entity.generated';
import { UserRequest } from './UserRequest.entity.generated';
import { UserSubscription } from './UserSubscription.entity.generated';
import { UserType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for AllUser
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one person, identified by an email address, who uses the system
 */

/**
 * AllUser
 * one person, identified by an email address, who uses the system
 */
export class AllUser {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the category of user this is (i&#x3D;investor, a&#x3D;admin, c&#x3D;issuer admin)
	 */	
	@ApiProperty({ description: 'the category of user this is (i&#x3D;investor, a&#x3D;admin, c&#x3D;issuer admin)'}) 
	user_type: UserType;

	/**
	 * the first name of the person who uses the account
	 */	
	@ApiProperty({ description: 'the first name of the person who uses the account'}) 
	first_name: string;

	/**
	 * the last name of the person who uses the account
	 */	
	@ApiProperty({ description: 'the last name of the person who uses the account'}) 
	last_name: string;

	/**
	 * the name of the file that holds the avatars picture. this is the resouce relative, not site relative.
	 */	
	@ApiProperty({ description: 'the name of the file that holds the avatars picture. this is the resouce relative, not site relative.'}) 
	avatar_image_file_name: string;

	/**
	 * the email address that identifies the account
	 */	
	@ApiProperty({ description: 'the email address that identifies the account'}) 
	email: string;

	/**
	 * the last point in time the user logged in
	 */	
	@ApiProperty({ description: 'the last point in time the user logged in'}) 
	last_login: Date;

	/**
	 * the last ip that they used to access the site from
	 */	
	@ApiProperty({ description: 'the last ip that they used to access the site from'}) 
	last_ip: string;

	/**
	 * the name of the service that verifies the identity of the user (according to azure b2c))
	 */	
	@ApiProperty({ description: 'the name of the service that verifies the identity of the user (according to azure b2c))'}) 
	identity_provider: string;

	/**
	 * the identifier for the user in the b2c system
	 */	
	@ApiProperty({ description: 'the identifier for the user in the b2c system'}) 
	user_principle_name: string;

	/**
	 * json format values that are used by applications as preferences
	 */	
	@ApiProperty({ description: 'json format values that are used by applications as preferences'}) 
	preferences_as_json: string;

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
	@ApiProperty({ type: () => UserSocialProfile, description: 'This was created from the details of the foreign key FK_ALL_USERS_COBRANDED_TO_SOCIAL_PROFILE and described as: '}) 
	cobranded_client_of: UserSocialProfile;

	/**
	 * This was created from the details of the foreign key FK_ALL_USERS_TO_COUNTRIES and described as: 
	 */	
	@ApiProperty({ type: () => Country, description: 'This was created from the details of the foreign key FK_ALL_USERS_TO_COUNTRIES and described as: '}) 
	country: Country;

	/**
	 * This was created from the details of the foreign key FK_ALL_USERS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_ALL_USERS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * 
	 */	
	@ApiProperty({ type: () => WebHook, isArray: true, description: ''}) 
	changes: WebHook[];

	/**
	 * This was created from the details of the foreign key FK_ALL_USERS_TO_MCOUNTRIES and described as: 
	 */	
	@ApiProperty({ type: () => Country, description: 'This was created from the details of the foreign key FK_ALL_USERS_TO_MCOUNTRIES and described as: '}) 
	mailing_country: Country;

	/**
	 * This was created from the details of the foreign key FK_ALL_USERS_TO_MPROVINCES and described as: 
	 */	
	@ApiProperty({ type: () => Province, description: 'This was created from the details of the foreign key FK_ALL_USERS_TO_MPROVINCES and described as: '}) 
	mailing_province: Province;

	/**
	 * This was created from the details of the foreign key FK_ALL_USERS_TO_PROVINCE and described as: 
	 */	
	@ApiProperty({ type: () => Province, description: 'This was created from the details of the foreign key FK_ALL_USERS_TO_PROVINCE and described as: '}) 
	province: Province;

	/**
	 * This was created from the details of the foreign key FK_BACKGROUND_PROCESSS_LASTUSER_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => BackgroundProcess, isArray: true, description: 'This was created from the details of the foreign key FK_BACKGROUND_PROCESSS_LASTUSER_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	background_processs_lastuser_last_changed_by_id_changes: BackgroundProcess[];

	/**
	 * This was created from the details of the foreign key FK_EVENTS_TO_USER and described as: 
	 */	
	@ApiProperty({ type: () => Event, isArray: true, description: 'This was created from the details of the foreign key FK_EVENTS_TO_USER and described as: '}) 
	events_to_user: Event[];

	/**
	 * This was created from the details of the foreign key FK_FFBA_ASSOCIATION_TO_USER and described as: 
	 */	
	@ApiProperty({ type: () => FfbaAssociation, isArray: true, description: 'This was created from the details of the foreign key FK_FFBA_ASSOCIATION_TO_USER and described as: '}) 
	ffba_association_to_user: FfbaAssociation[];

	/**
	 * This was created from the details of the foreign key FK_IMPORTED_CONTACTS_USER_ID_CONTACTS and described as: 
	 */	
	@ApiProperty({ type: () => ImportedContact, isArray: true, description: 'This was created from the details of the foreign key FK_IMPORTED_CONTACTS_USER_ID_CONTACTS and described as: '}) 
	contacts: ImportedContact[];

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_JOINT_SUBSCRIBER_TO_USER and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentOrder, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_JOINT_SUBSCRIBER_TO_USER and described as: '}) 
	investment_orders_joint_subscriber_to_user: InvestmentOrder[];

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_USER_ID_ORDERS and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentOrder, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_USER_ID_ORDERS and described as: '}) 
	orders: InvestmentOrder[];

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_USER_ID_TRANSACTIONS and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentTransaction, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_USER_ID_TRANSACTIONS and described as: '}) 
	transactions: InvestmentTransaction[];

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_WATCHLIST_USER_ID_WATCHES and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentWatchlist, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTMENT_WATCHLIST_USER_ID_WATCHES and described as: '}) 
	watches: InvestmentWatchlist[];

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_ACK_ORDERS_USER_ORDER_ACKNOWLEDGEMENTS and described as: 
	 */	
	@ApiProperty({ type: () => OrderAcknowledgement, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTOR_ACK_ORDERS_USER_ORDER_ACKNOWLEDGEMENTS and described as: '}) 
	investor_ack_orders_user_order_acknowledgements: OrderAcknowledgement[];

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_EARNINGS_USER_D and described as: 
	 */	
	@ApiProperty({ type: () => InvestorEarning, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTOR_EARNINGS_USER_D and described as: '}) 
	investor_earnings_user_d: InvestorEarning[];

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_INTENDED_TRADES_USER_ID_INTENDED_TRADES and described as: 
	 */	
	@ApiProperty({ type: () => InvestorIntendedTrades, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTOR_INTENDED_TRADES_USER_ID_INTENDED_TRADES and described as: '}) 
	intended_trades: InvestorIntendedTrades[];

	/**
	 * This was created from the details of the foreign key FK_MAILS_FROM_ID_SENT_EMAILS and described as: 
	 */	
	@ApiProperty({ type: () => Mail, isArray: true, description: 'This was created from the details of the foreign key FK_MAILS_FROM_ID_SENT_EMAILS and described as: '}) 
	sent_emails: Mail[];

	/**
	 * This was created from the details of the foreign key FK_MAILS_TO_ID_RECEIVED_EMAILS and described as: 
	 */	
	@ApiProperty({ type: () => Mail, isArray: true, description: 'This was created from the details of the foreign key FK_MAILS_TO_ID_RECEIVED_EMAILS and described as: '}) 
	received_emails: Mail[];

	/**
	 * This was created from the details of the foreign key FK_MODULE_ACCESS_USER_ID_ACCESSIBLE_MODULES and described as: 
	 */	
	@ApiProperty({ type: () => ModuleAccess, isArray: true, description: 'This was created from the details of the foreign key FK_MODULE_ACCESS_USER_ID_ACCESSIBLE_MODULES and described as: '}) 
	accessible_modules: ModuleAccess[];

	/**
	 * This was created from the details of the foreign key FK_PROJECT_TAX_REPORTS_USER_ID_TAX_REPORTS and described as: 
	 */	
	@ApiProperty({ type: () => ProjectTaxReport, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECT_TAX_REPORTS_USER_ID_TAX_REPORTS and described as: '}) 
	tax_reports: ProjectTaxReport[];

	/**
	 * This was created from the details of the foreign key FK_SUPPORT_ENGINEERS_USER_ID_OWNER_USER and described as: 
	 */	
	@ApiProperty({ type: () => SupportEngineer, isArray: true, description: 'This was created from the details of the foreign key FK_SUPPORT_ENGINEERS_USER_ID_OWNER_USER and described as: '}) 
	owner_user: SupportEngineer[];

	/**
	 * This was created from the details of the foreign key FK_USER_ISSUER_ASSOCIATIONS_TO_USER_ID_ISSUER_ASSOCIATIONS and described as: 
	 */	
	@ApiProperty({ type: () => UserIssuerAssociation, isArray: true, description: 'This was created from the details of the foreign key FK_USER_ISSUER_ASSOCIATIONS_TO_USER_ID_ISSUER_ASSOCIATIONS and described as: '}) 
	user_issuer_associations_to_user_id_issuer_associations: UserIssuerAssociation[];

	/**
	 * This was created from the details of the foreign key FK_USER_RELATIONSHIP_TO_USER_1 and described as: 
	 */	
	@ApiProperty({ type: () => UserRelationship, isArray: true, description: 'This was created from the details of the foreign key FK_USER_RELATIONSHIP_TO_USER_1 and described as: '}) 
	user_relationship_to_user_1: UserRelationship[];

	/**
	 * This was created from the details of the foreign key FK_USER_RELATIONSHIP_TO_USER_2 and described as: 
	 */	
	@ApiProperty({ type: () => UserRelationship, isArray: true, description: 'This was created from the details of the foreign key FK_USER_RELATIONSHIP_TO_USER_2 and described as: '}) 
	user_relationship_to_user_2: UserRelationship[];

	/**
	 * This was created from the details of the foreign key FK_USERS_BANKING_DETAILS_TO_JOINT_USER and described as: 
	 */	
	@ApiProperty({ type: () => UserBankingDetails, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_BANKING_DETAILS_TO_JOINT_USER and described as: '}) 
	users_banking_details_to_joint_user: UserBankingDetails[];

	/**
	 * This was created from the details of the foreign key FK_USERS_BANKING_DETAILS_TO_USER and described as: 
	 */	
	@ApiProperty({ type: () => UserBankingDetails, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_BANKING_DETAILS_TO_USER and described as: '}) 
	users_banking_details_to_user: UserBankingDetails[];

	/**
	 * This was created from the details of the foreign key FK_USERS_EMPLOYMENT_USER_ID_FINANCIAL_KYC and described as: 
	 */	
	@ApiProperty({ type: () => UserFinancialKyc, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_EMPLOYMENT_USER_ID_FINANCIAL_KYC and described as: '}) 
	financial_kyc: UserFinancialKyc[];

	/**
	 * This was created from the details of the foreign key FK_USERS_ENTITY_USER_ID_ENTITIES and described as: 
	 */	
	@ApiProperty({ type: () => UserEntity, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_ENTITY_USER_ID_ENTITIES and described as: '}) 
	entities: UserEntity[];

	/**
	 * This was created from the details of the foreign key FK_USERS_INVITEE_USER_ID_INVITATIONS and described as: 
	 */	
	@ApiProperty({ type: () => UserInvitation, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_INVITEE_USER_ID_INVITATIONS and described as: '}) 
	invitations: UserInvitation[];

	/**
	 * This was created from the details of the foreign key FK_USERS_PDF_USER_ID_PDFS and described as: 
	 */	
	@ApiProperty({ type: () => UserPdf, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_PDF_USER_ID_PDFS and described as: '}) 
	pdfs: UserPdf[];

	/**
	 * This was created from the details of the foreign key FK_USERS_QUESTIONARY_USER_ID_ANSWERS and described as: 
	 */	
	@ApiProperty({ type: () => UserAnswer, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_QUESTIONARY_USER_ID_ANSWERS and described as: '}) 
	answers: UserAnswer[];

	/**
	 * This was created from the details of the foreign key FK_USERS_REQUEST_USER_ID_REQUESTS and described as: 
	 */	
	@ApiProperty({ type: () => UserRequest, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_REQUEST_USER_ID_REQUESTS and described as: '}) 
	requests: UserRequest[];

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	users_socialprofile_last_changed_by_id_changes: UserSocialProfile[];

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_USER_ID_PROFILES and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_USER_ID_PROFILES and described as: '}) 
	users_socialprofile_user_id_profiles: UserSocialProfile[];

	/**
	 * This was created from the details of the foreign key FK_USERS_SUBSCRIBE_USER_ID_SUBSCRIPTIONS and described as: 
	 */	
	@ApiProperty({ type: () => UserSubscription, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_SUBSCRIBE_USER_ID_SUBSCRIPTIONS and described as: '}) 
	subscriptions: UserSubscription[];

	/**
	 * This was created from the details of the foreign key FK_WEB_HOOKS_TO_USER and described as: 
	 */	
	@ApiProperty({ type: () => WebHook, isArray: true, description: 'This was created from the details of the foreign key FK_WEB_HOOKS_TO_USER and described as: '}) 
	web_hooks_to_user: WebHook[];

}
