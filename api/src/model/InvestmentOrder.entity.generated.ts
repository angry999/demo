import { ApiProperty } from '@nestjs/swagger';
import { Event } from './Event.entity.generated';
import { UserBankingDetails } from './UserBankingDetails.entity.generated';
import { FfbaAssociation } from './FfbaAssociation.entity.generated';
import { InvestmentWithdrawal } from './InvestmentWithdrawal.entity.generated';
import { UserSocialProfile } from './UserSocialProfile.entity.generated';
import { AllUser } from './AllUser.entity.generated';
import { ProjectAccount } from './ProjectAccount.entity.generated';
import { Project } from './Project.entity.generated';
import { RoedSchedule1 } from './RoedSchedule1.entity.generated';
import { UserEntity } from './UserEntity.entity.generated';
import { OrderAcknowledgement } from './OrderAcknowledgement.entity.generated';
import { InvestorEarning } from './InvestorEarning.entity.generated';
import { UserPdf } from './UserPdf.entity.generated';
import { EntityType } from 'fundscraper-model-enums';
import { PaymentStatus } from 'fundscraper-model-enums';
import { PaymentMethodType } from 'fundscraper-model-enums';
import { InvestmentOrderStatus } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for InvestmentOrder
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one request for the purchase of securities. this is NOT the transaction, just the request for a transaction.
 */

/**
 * InvestmentOrder
 * one request for the purchase of securities. this is NOT the transaction, just the request for a transaction.
 */
export class InvestmentOrder {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the type of entity that is making the purchase (UserBenficiary, UserCorporation, UserTrust)
	 */	
	@ApiProperty({ description: 'the type of entity that is making the purchase (UserBenficiary, UserCorporation, UserTrust)'}) 
	entity_type: EntityType;

	/**
	 * the id of the entity that is making the purchase. md5 of the pk value for one of UserBenficiary, UserCorporation, UserTrust
	 */	
	@ApiProperty({ description: 'the id of the entity that is making the purchase. md5 of the pk value for one of UserBenficiary, UserCorporation, UserTrust'}) 
	entity_id: string;

	/**
	 * the id of the entity that is making the purchase. pk value for one of UserBenficiary, UserCorporation, UserTrust
	 */	
	@ApiProperty({ description: 'the id of the entity that is making the purchase. pk value for one of UserBenficiary, UserCorporation, UserTrust'}) 
	user_entity_id: number;

	/**
	 * the fundscraper legal identifier for the order
	 */	
	@ApiProperty({ description: 'the fundscraper legal identifier for the order'}) 
	order_no: string;

	/**
	 * the listed price of the shares at the time of the order
	 */	
	@ApiProperty({ description: 'the listed price of the shares at the time of the order'}) 
	share_price: number;

	/**
	 * the number of shares that were ordered
	 */	
	@ApiProperty({ description: 'the number of shares that were ordered'}) 
	number_of_shares: number;

	/**
	 * the total amount of the order
	 */	
	@ApiProperty({ description: 'the total amount of the order'}) 
	total_amount: number;

	/**
	 * have the acknowledgements been completed?
	 */	
	@ApiProperty({ description: 'have the acknowledgements been completed?'}) 
	acknowledgements: boolean;

	/**
	 * have the documents been completed with docusign
	 */	
	@ApiProperty({ description: 'have the documents been completed with docusign'}) 
	docusign: boolean;

	/**
	 * the name of the file that holds the document
	 */	
	@ApiProperty({ description: 'the name of the file that holds the document'}) 
	document_name: string;

	/**
	 * the GUID Docusign uses to identify the document the user completed
	 */	
	@ApiProperty({ description: 'the GUID Docusign uses to identify the document the user completed'}) 
	docusign_guid: string;

	/**
	 * the SHA256 hash of the data merged into the document identified by docusign_guid
	 */	
	@ApiProperty({ description: 'the SHA256 hash of the data merged into the document identified by docusign_guid'}) 
	docusign_merge_hash: string;

	/**
	 * the state of the payment for the order
	 */	
	@ApiProperty({ description: 'the state of the payment for the order'}) 
	payment: PaymentStatus;

	/**
	 * the exemption that the investor qualified with at the time the order was stated
	 */	
	@ApiProperty({ description: 'the exemption that the investor qualified with at the time the order was stated'}) 
	roed_at_initiation: number;

	/**
	 * the mechanism that will be used to provide the payment
	 */	
	@ApiProperty({ description: 'the mechanism that will be used to provide the payment'}) 
	payment_mode: PaymentMethodType;

	/**
	 * the foreign ID of the payment_method used for this order
	 */	
	@ApiProperty({ description: 'the foreign ID of the payment_method used for this order'}) 
	payment_method_id: number;

	/**
	 * the foreign ID of the investment_withdrawal associated with this order, if one exists
	 */	
	@ApiProperty({ description: 'the foreign ID of the investment_withdrawal associated with this order, if one exists'}) 
	investment_withdrawal_id: number;

	/**
	 * the foreign ID of the users_banking_details to send distributions related to this order to, if one exists
	 */	
	@ApiProperty({ description: 'the foreign ID of the users_banking_details to send distributions related to this order to, if one exists'}) 
	distributions_to_id: number;

	/**
	 * the foreign ID of the users_banking_details to draw payments related to this order from, if one exists
	 */	
	@ApiProperty({ description: 'the foreign ID of the users_banking_details to draw payments related to this order from, if one exists'}) 
	payments_from_id: number;

	/**
	 * the schedule 1 it is reported on?
	 */	
	@ApiProperty({ description: 'the schedule 1 it is reported on?'}) 
	roed_schedule1_id: number;

	/**
	 * if true, the order has been confirmed
	 */	
	@ApiProperty({ description: 'if true, the order has been confirmed'}) 
	order_confirm: boolean;

	/**
	 * if true, the project has a DRIP and the user has chosen to register in it
	 */	
	@ApiProperty({ description: 'if true, the project has a DRIP and the user has chosen to register in it'}) 
	drip_registered: boolean;

	/**
	 * if true, the project allows use of the NI 45-106 2.12 asset acquisition exemption and the user has indicated they are using it
	 */	
	@ApiProperty({ description: 'if true, the project allows use of the NI 45-106 2.12 asset acquisition exemption and the user has indicated they are using it'}) 
	acquiring_with_assets: boolean;

	/**
	 * can only be true if acquiring_with_assets is, indicates that the total amount of assets involved (potentially split over multiple orders) is 150K+
	 */	
	@ApiProperty({ description: 'can only be true if acquiring_with_assets is, indicates that the total amount of assets involved (potentially split over multiple orders) is 150K+'}) 
	total_assets_150_k: boolean;

	/**
	 * true if the user indicates they are transferring funds or other assets from a different registered account to fund this purchase
	 */	
	@ApiProperty({ description: 'true if the user indicates they are transferring funds or other assets from a different registered account to fund this purchase'}) 
	transferring_assets: boolean;

	/**
	 * true if the user indicates they are transferring funds (transferring_assets) in whole, false if in part
	 */	
	@ApiProperty({ description: 'true if the user indicates they are transferring funds (transferring_assets) in whole, false if in part'}) 
	transfer_whole_or_part: boolean;

	/**
	 * the status of creating this in hubspot. 0 &#x3D; nothing, 1 &#x3D; request sent, 2 &#x3D; completed
	 */	
	@ApiProperty({ description: 'the status of creating this in hubspot. 0 &#x3D; nothing, 1 &#x3D; request sent, 2 &#x3D; completed'}) 
	hubspot_creation: number;

	/**
	 * the id of the deal in hubspot that matches this order
	 */	
	@ApiProperty({ description: 'the id of the deal in hubspot that matches this order'}) 
	hubspot_dealid: string;

	/**
	 * the identifier for an esrow of funds
	 */	
	@ApiProperty({ description: 'the identifier for an esrow of funds'}) 
	escrow_no: string;

	/**
	 * the identifier of an escrow settling
	 */	
	@ApiProperty({ description: 'the identifier of an escrow settling'}) 
	escrow_settled_no: string;

	/**
	 * the identifier for a refund
	 */	
	@ApiProperty({ description: 'the identifier for a refund'}) 
	refund_no: string;

	/**
	 * the verification identifier for a refund
	 */	
	@ApiProperty({ description: 'the verification identifier for a refund'}) 
	refund_settled_no: string;

	/**
	 * the identification for a transfer
	 */	
	@ApiProperty({ description: 'the identification for a transfer'}) 
	transfer_no: string;

	/**
	 * the name of the trust company associated with the project that the user has indicated they have an existing account with
	 */	
	@ApiProperty({ description: 'the name of the trust company associated with the project that the user has indicated they have an existing account with'}) 
	trust_company_name: string;

	/**
	 * the number of the existing account the user has with the trust company indicated in trust_company_name
	 */	
	@ApiProperty({ description: 'the number of the existing account the user has with the trust company indicated in trust_company_name'}) 
	trust_company_account_no: string;

	/**
	 * the final price per share that the oder was processed with
	 */	
	@ApiProperty({ description: 'the final price per share that the oder was processed with'}) 
	sale_price: number;

	/**
	 * the commision rate the agent will receive
	 */	
	@ApiProperty({ description: 'the commision rate the agent will receive'}) 
	agent_comm: number;

	/**
	 * the current degree of completion
	 */	
	@ApiProperty({ description: 'the current degree of completion'}) 
	status: InvestmentOrderStatus;

	/**
	 * the id of the project that the security is for
	 */	
	@ApiProperty({ description: 'the id of the project that the security is for'}) 
	project_id: number;

	/**
	 * the id of the organization that issued the security
	 */	
	@ApiProperty({ description: 'the id of the organization that issued the security'}) 
	issuer_id: number;

	/**
	 * the user that the order is for
	 */	
	@ApiProperty({ description: 'the user that the order is for'}) 
	user_id: number;

	/**
	 * the FFBA association relevant to this order
	 */	
	@ApiProperty({ description: 'the FFBA association relevant to this order'}) 
	ffba_id: number;

	/**
	 * the joint subsciber associated with this order
	 */	
	@ApiProperty({ description: 'the joint subsciber associated with this order'}) 
	joint_subscriber_id: number;

	/**
	 * the row number in the filed roed report that this order matches to
	 */	
	@ApiProperty({ description: 'the row number in the filed roed report that this order matches to'}) 
	filed_roed_row_match: number;

	/**
	 * the date the order was placed
	 */	
	@ApiProperty({ description: 'the date the order was placed'}) 
	order_date: Date;

	/**
	 * the date the documents were signed with docusign
	 */	
	@ApiProperty({ description: 'the date the documents were signed with docusign'}) 
	docusign_date: Date;

	/**
	 * the date an escrow was recorded
	 */	
	@ApiProperty({ description: 'the date an escrow was recorded'}) 
	escrow_date: Date;

	/**
	 * the effective date of a transfer
	 */	
	@ApiProperty({ description: 'the effective date of a transfer'}) 
	transfer_date: Date;

	/**
	 * the date a transfer settled
	 */	
	@ApiProperty({ description: 'the date a transfer settled'}) 
	transfer_settled_date: Date;

	/**
	 * the date an escrow settled
	 */	
	@ApiProperty({ description: 'the date an escrow settled'}) 
	escrow_settled_date: Date;

	/**
	 * the date a refund was settled
	 */	
	@ApiProperty({ description: 'the date a refund was settled'}) 
	refund_settled_date: Date;

	/**
	 * the date a refund was recorded
	 */	
	@ApiProperty({ description: 'the date a refund was recorded'}) 
	refund_date: Date;

	/**
	 * the date of the sale
	 */	
	@ApiProperty({ description: 'the date of the sale'}) 
	sell_date: Date;

	/**
	 * the date of the trade
	 */	
	@ApiProperty({ description: 'the date of the trade'}) 
	trade_date: Date;

	/**
	 * the date that the trade is expected to occur
	 */	
	@ApiProperty({ description: 'the date that the trade is expected to occur'}) 
	estimated_trade_date: Date;

	/**
	 * the id of the old order in a transfer
	 */	
	@ApiProperty({ description: 'the id of the old order in a transfer'}) 
	transfer_old_id: number;

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
	 * This was created from the details of the foreign key FK_EVENTS_TO_INVESTMENT_ORDER and described as: 
	 */	
	@ApiProperty({ type: () => Event, isArray: true, description: 'This was created from the details of the foreign key FK_EVENTS_TO_INVESTMENT_ORDER and described as: '}) 
	events_to_investment_order: Event[];

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_DISTRIBUTIONS_TO_ID and described as: 
	 */	
	@ApiProperty({ type: () => UserBankingDetails, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_DISTRIBUTIONS_TO_ID and described as: '}) 
	distributions_to: UserBankingDetails;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_FFBA_ID and described as: 
	 */	
	@ApiProperty({ type: () => FfbaAssociation, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_FFBA_ID and described as: '}) 
	ffba: FfbaAssociation;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_INVESTMENT_WITHDRAWAL_ID and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentWithdrawal, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_INVESTMENT_WITHDRAWAL_ID and described as: '}) 
	investment_withdrawal: InvestmentWithdrawal;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_ISSUER_ID_ORDERS and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_ISSUER_ID_ORDERS and described as: '}) 
	issuer: UserSocialProfile;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_JOINT_SUBSCRIBER_TO_USER and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_JOINT_SUBSCRIBER_TO_USER and described as: '}) 
	joint_subscriber: AllUser;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_PAYMENT_METHOD_ID and described as: 
	 */	
	@ApiProperty({ type: () => ProjectAccount, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_PAYMENT_METHOD_ID and described as: '}) 
	payment_method: ProjectAccount;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_PAYMENTS_FROM_ID and described as: 
	 */	
	@ApiProperty({ type: () => UserBankingDetails, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_PAYMENTS_FROM_ID and described as: '}) 
	payments_from: UserBankingDetails;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_PROJECT_ID_ORDERS and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_PROJECT_ID_ORDERS and described as: '}) 
	project: Project;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_ROED_SCHEDULE1_ID_ORDERS and described as: 
	 */	
	@ApiProperty({ type: () => RoedSchedule1, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_ROED_SCHEDULE1_ID_ORDERS and described as: '}) 
	roed_schedule1: RoedSchedule1;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_TRANSFER_OLD_ID and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentOrder, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_TRANSFER_OLD_ID and described as: '}) 
	transfer_old: InvestmentOrder;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_USER_ENTITY_ID and described as: 
	 */	
	@ApiProperty({ type: () => UserEntity, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_USER_ENTITY_ID and described as: '}) 
	user_entity: UserEntity;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_USER_ID_ORDERS and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_USER_ID_ORDERS and described as: '}) 
	user: AllUser;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_WITHDRAWAL_HEAD_TO_INVESTMENT_ORDERS and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentWithdrawal, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTMENT_WITHDRAWAL_HEAD_TO_INVESTMENT_ORDERS and described as: '}) 
	investment_withdrawal_head_to_investment_orders: InvestmentWithdrawal[];

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_ACK_ORDERS_ORDER_ID_ACKNOWLEDGEMENT_DETAILS and described as: 
	 */	
	@ApiProperty({ type: () => OrderAcknowledgement, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTOR_ACK_ORDERS_ORDER_ID_ACKNOWLEDGEMENT_DETAILS and described as: '}) 
	acknowledgement_details: OrderAcknowledgement[];

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_EARNINGS_ORDER_ID_ADJUSTMENTS and described as: 
	 */	
	@ApiProperty({ type: () => InvestorEarning, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTOR_EARNINGS_ORDER_ID_ADJUSTMENTS and described as: '}) 
	adjustments: InvestorEarning[];

	/**
	 * This was created from the details of the foreign key FK_USERS_PDF_ORDER_ID_PDFS and described as: 
	 */	
	@ApiProperty({ type: () => UserPdf, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_PDF_ORDER_ID_PDFS and described as: '}) 
	pdfs: UserPdf[];

}
