import { ApiProperty } from '@nestjs/swagger';
import { Event } from './Event.entity.generated';
import { FfbaAssociation } from './FfbaAssociation.entity.generated';
import { InvestmentOrder } from './InvestmentOrder.entity.generated';
import { InvestmentTransaction } from './InvestmentTransaction.entity.generated';
import { InvestmentWatchlist } from './InvestmentWatchlist.entity.generated';
import { InvestorEarning } from './InvestorEarning.entity.generated';
import { ProjectAccount } from './ProjectAccount.entity.generated';
import { ProjectDocusignMapping } from './ProjectDocusignMapping.entity.generated';
import { ProjectBalanceAdjustment } from './ProjectBalanceAdjustment.entity.generated';
import { ProjectEntity } from './ProjectEntity.entity.generated';
import { ProjectImage } from './ProjectImage.entity.generated';
import { ProjectKeybacker } from './ProjectKeybacker.entity.generated';
import { ProjectPdf } from './ProjectPdf.entity.generated';
import { ProjectStatusReport } from './ProjectStatusReport.entity.generated';
import { ProjectTaxReport } from './ProjectTaxReport.entity.generated';
import { ProjectTaxSummary } from './ProjectTaxSummary.entity.generated';
import { Country } from './Country.entity.generated';
import { UserSocialProfile } from './UserSocialProfile.entity.generated';
import { AllUser } from './AllUser.entity.generated';
import { Province } from './Province.entity.generated';
import { ExemptDistributionOption } from './ExemptDistributionOption.entity.generated';
import { RoedSchedule1 } from './RoedSchedule1.entity.generated';
import { WebHook } from './WebHook.entity.generated';
import { ProjectStage } from 'fundscraper-model-enums';
import { ProjectCapitalType } from 'fundscraper-model-enums';
import { ProjectAssetType } from 'fundscraper-model-enums';
import { ProjectDevelopmentType } from 'fundscraper-model-enums';
import { CurrencyCode } from 'fundscraper-model-enums';
import { DurationType } from 'fundscraper-model-enums';
import { DebtSeniorityType } from 'fundscraper-model-enums';
import { CommisionType } from 'fundscraper-model-enums';
import { ProjectUseStatus } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for Project
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * a development project for considerationn
 */

/**
 * Project
 * a development project for considerationn
 */
export class Project {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the human readable identifier of the project
	 */	
	@ApiProperty({ description: 'the human readable identifier of the project'}) 
	project_no: number;

	/**
	 * the spoken identifier of the project
	 */	
	@ApiProperty({ description: 'the spoken identifier of the project'}) 
	name: string;

	/**
	 * the registered, legal representation of the human readable identifier
	 */	
	@ApiProperty({ description: 'the registered, legal representation of the human readable identifier'}) 
	legal_name: string;

	/**
	 * a short-form human-readable identifier for when the long-form identifier is too long
	 */	
	@ApiProperty({ description: 'a short-form human-readable identifier for when the long-form identifier is too long'}) 
	short_name: string;

	/**
	 * the class of the units on offer
	 */	
	@ApiProperty({ description: 'the class of the units on offer'}) 
	unit_class: string;

	/**
	 * the series of the units on offer
	 */	
	@ApiProperty({ description: 'the series of the units on offer'}) 
	unit_series: string;

	/**
	 * the name to use in seo placement
	 */	
	@ApiProperty({ description: 'the name to use in seo placement'}) 
	seoname: string;

	/**
	 * a verbose description of the project, essentially a first level marketing description
	 */	
	@ApiProperty({ description: 'a verbose description of the project, essentially a first level marketing description'}) 
	contents: string;

	/**
	 * if true, show the sponsor label
	 */	
	@ApiProperty({ description: 'if true, show the sponsor label'}) 
	sponsor_label: boolean;

	/**
	 * the id of the organization that is issuing the project
	 */	
	@ApiProperty({ description: 'the id of the organization that is issuing the project'}) 
	issuer_id: number;

	/**
	 * a classification of where the project is along in its life cycle
	 */	
	@ApiProperty({ description: 'a classification of where the project is along in its life cycle'}) 
	project_stage: ProjectStage;

	/**
	 * if true (1) send notifications to investors
	 */	
	@ApiProperty({ description: 'if true (1) send notifications to investors'}) 
	notification: boolean;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	capital_type: ProjectCapitalType;

	/**
	 * the type of asset being offered
	 */	
	@ApiProperty({ description: 'the type of asset being offered'}) 
	asset_type: ProjectAssetType;

	/**
	 * the type of development
	 */	
	@ApiProperty({ description: 'the type of development'}) 
	development_type: ProjectDevelopmentType;

	/**
	 * if true, move the data to hubspot
	 */	
	@ApiProperty({ description: 'if true, move the data to hubspot'}) 
	sync_to_hubspot: number;

	/**
	 * the amount that is being raised
	 */	
	@ApiProperty({ description: 'the amount that is being raised'}) 
	offering_amount: number;

	/**
	 * the expected range of annual return
	 */	
	@ApiProperty({ description: 'the expected range of annual return'}) 
	annual_irr: string;

	/**
	 * the percentage of overall value the load represents
	 */	
	@ApiProperty({ description: 'the percentage of overall value the load represents'}) 
	loan_to_value_ratio: string;

	/**
	 * ?
	 */	
	@ApiProperty({ description: '?'}) 
	matrix_id: number;

	/**
	 * ?
	 */	
	@ApiProperty({ description: '?'}) 
	matrix_input: string;

	/**
	 * the currency the prices are quoted in
	 */	
	@ApiProperty({ description: 'the currency the prices are quoted in'}) 
	currency_label: CurrencyCode;

	/**
	 * the total number of shares for purchase
	 */	
	@ApiProperty({ description: 'the total number of shares for purchase'}) 
	total_share: number;

	/**
	 * the current price shares are being offered for purchase at
	 */	
	@ApiProperty({ description: 'the current price shares are being offered for purchase at'}) 
	share_price: number;

	/**
	 * the perceived market value of the shares
	 */	
	@ApiProperty({ description: 'the perceived market value of the shares'}) 
	market_price: number;

	/**
	 * the price the shares have most recently transacted at
	 */	
	@ApiProperty({ description: 'the price the shares have most recently transacted at'}) 
	sale_price: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	default_share: number;

	/**
	 * the minimum number of shares that must be purchased to participate in this project
	 */	
	@ApiProperty({ description: 'the minimum number of shares that must be purchased to participate in this project'}) 
	min_share: number;

	/**
	 * the maximum number of shares that can be owned when a party is participating in the project
	 */	
	@ApiProperty({ description: 'the maximum number of shares that can be owned when a party is participating in the project'}) 
	max_share: number;

	/**
	 * the percentage rate, expressed as a string, interest will be charged at
	 */	
	@ApiProperty({ description: 'the percentage rate, expressed as a string, interest will be charged at'}) 
	interest_rate: string;

	/**
	 * the length of the investment (typed free form)
	 */	
	@ApiProperty({ description: 'the length of the investment (typed free form)'}) 
	investment_term: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	minimum_duration_units: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	maximum_duration_units: number;

	/**
	 * the period of time used in minimum duration
	 */	
	@ApiProperty({ description: 'the period of time used in minimum duration'}) 
	minimum_duration_type: DurationType;

	/**
	 * the period of time used in maximum duration
	 */	
	@ApiProperty({ description: 'the period of time used in maximum duration'}) 
	maximum_duration_type: DurationType;

	/**
	 * the number of days left for funding activities
	 */	
	@ApiProperty({ description: 'the number of days left for funding activities'}) 
	daysleft_flag: boolean;

	/**
	 * if true, all funds have been raised and it is closed to further investments
	 */	
	@ApiProperty({ description: 'if true, all funds have been raised and it is closed to further investments'}) 
	funded_flag: boolean;

	/**
	 * a narrative of where/how the dividends, if any, are expected to be returned from
	 */	
	@ApiProperty({ description: 'a narrative of where/how the dividends, if any, are expected to be returned from'}) 
	dividend_desc: string;

	/**
	 * a statement of the order in which this debt is repaid compared to other debt
	 */	
	@ApiProperty({ description: 'a statement of the order in which this debt is repaid compared to other debt'}) 
	debt_seniority: DebtSeniorityType;

	/**
	 * if true, it can be redeemed prior to ending
	 */	
	@ApiProperty({ description: 'if true, it can be redeemed prior to ending'}) 
	redeem_ability: string;

	/**
	 * the type of accounts and/or organizations that can take advantage of this funding
	 */	
	@ApiProperty({ description: 'the type of accounts and/or organizations that can take advantage of this funding'}) 
	investment_eligibility: string;

	/**
	 * the rules that must be obsered about redeeming shares
	 */	
	@ApiProperty({ description: 'the rules that must be obsered about redeeming shares'}) 
	redemption_info: string;

	/**
	 * the street/local address of the project
	 */	
	@ApiProperty({ description: 'the street/local address of the project'}) 
	address: string;

	/**
	 * the postal code of the project
	 */	
	@ApiProperty({ description: 'the postal code of the project'}) 
	zip: string;

	/**
	 * the municiple location of the porject
	 */	
	@ApiProperty({ description: 'the municiple location of the porject'}) 
	city: string;

	/**
	 * the id of the province that the project is in
	 */	
	@ApiProperty({ description: 'the id of the province that the project is in'}) 
	province_id: number;

	/**
	 * the id of the country the project is in
	 */	
	@ApiProperty({ description: 'the id of the country the project is in'}) 
	country_id: number;

	/**
	 * a url to the primary image to display for marketing this project
	 */	
	@ApiProperty({ description: 'a url to the primary image to display for marketing this project'}) 
	image: string;

	/**
	 * a description of the assets, steps and/or actions to ensure there is no loss of captial to investors
	 */	
	@ApiProperty({ description: 'a description of the assets, steps and/or actions to ensure there is no loss of captial to investors'}) 
	credit_guarantee: string;

	/**
	 * the primary business the issuer engages in
	 */	
	@ApiProperty({ description: 'the primary business the issuer engages in'}) 
	issuer_business: string;

	/**
	 * the name of the organization that is placing the securities
	 */	
	@ApiProperty({ description: 'the name of the organization that is placing the securities'}) 
	agent_name: string;

	/**
	 * the method use for determining the commission paid to the agent
	 */	
	@ApiProperty({ description: 'the method use for determining the commission paid to the agent'}) 
	commission_type: CommisionType;

	/**
	 * the numberical amount for the commission that agent is taking. this has to be used with commission_type to determine whether its a pecentage or dollar amount
	 */	
	@ApiProperty({ description: 'the numberical amount for the commission that agent is taking. this has to be used with commission_type to determine whether its a pecentage or dollar amount'}) 
	agent_commission: number;

	/**
	 * the contact details for the registrant
	 */	
	@ApiProperty({ description: 'the contact details for the registrant'}) 
	registrant_contact: string;

	/**
	 * a statement of how the issuer intends to use the funds that are raised
	 */	
	@ApiProperty({ description: 'a statement of how the issuer intends to use the funds that are raised'}) 
	use_of_proceeds: string;

	/**
	 * additional ^ separated name value pairs of properties about the project. eg Trustee~Some Trust Company, or such other trust company as may be selected by the Manager^Auditor~KPMG LLP^Fund Administrator~My Fund Services Ltd.
	 */	
	@ApiProperty({ description: 'additional ^ separated name value pairs of properties about the project. eg Trustee~Some Trust Company, or such other trust company as may be selected by the Manager^Auditor~KPMG LLP^Fund Administrator~My Fund Services Ltd.'}) 
	additional_desc: string;

	/**
	 * a ^ separated list of questions that the user must acknowledge prior to investing
	 */	
	@ApiProperty({ description: 'a ^ separated list of questions that the user must acknowledge prior to investing'}) 
	acknowledgements: string;

	/**
	 * a longer descriptive text for display
	 */	
	@ApiProperty({ description: 'a longer descriptive text for display'}) 
	long_desc: string;

	/**
	 * text to show as a disclaime prior to investments proceeding
	 */	
	@ApiProperty({ description: 'text to show as a disclaime prior to investments proceeding'}) 
	disclaimer_note: string;

	/**
	 * a ^ separated list of key value pairs to provide additional properties about the project
	 */	
	@ApiProperty({ description: 'a ^ separated list of key value pairs to provide additional properties about the project'}) 
	properties: string;

	/**
	 * a ^ separate list of the name of tabs to display project entities on
	 */	
	@ApiProperty({ description: 'a ^ separate list of the name of tabs to display project entities on'}) 
	tabs: string;

	/**
	 * if true, it should be private
	 */	
	@ApiProperty({ description: 'if true, it should be private'}) 
	is_private: boolean;

	/**
	 * a comma separate list of user ids that are specifically permitted to view this project even if its private
	 */	
	@ApiProperty({ description: 'a comma separate list of user ids that are specifically permitted to view this project even if its private'}) 
	private_ids: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	auto_invite: boolean;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	allow_ineligible: boolean;

	/**
	 * the state of the project for use in the system
	 */	
	@ApiProperty({ description: 'the state of the project for use in the system'}) 
	system_status: ProjectUseStatus;

	/**
	 * if true, project has a dividend reinvestment plan available, and the user should be asked if they wish to sign up for it in the order process
	 */	
	@ApiProperty({ description: 'if true, project has a dividend reinvestment plan available, and the user should be asked if they wish to sign up for it in the order process'}) 
	drip_available: boolean;

	/**
	 * if true, the project should use the OM programmed into the system rather than DocuSign
	 */	
	@ApiProperty({ description: 'if true, the project should use the OM programmed into the system rather than DocuSign'}) 
	use_system_om: boolean;

	/**
	 * if true, the project should automatically calculate the months remaining in the term for display on the front end
	 */	
	@ApiProperty({ description: 'if true, the project should automatically calculate the months remaining in the term for display on the front end'}) 
	calc_months_remaining: boolean;

	/**
	 * if true, the project allows for joint subscription, and should ask the user if they intend to do so during the order process
	 */	
	@ApiProperty({ description: 'if true, the project allows for joint subscription, and should ask the user if they intend to do so during the order process'}) 
	allow_joint_subscription: boolean;

	/**
	 * if true, the project does not currently allow for any further orders to be started
	 */	
	@ApiProperty({ description: 'if true, the project does not currently allow for any further orders to be started'}) 
	investments_locked: boolean;

	/**
	 * if true, the project will not show its estimated completion date in the UI
	 */	
	@ApiProperty({ description: 'if true, the project will not show its estimated completion date in the UI'}) 
	hide_est_complete_date: boolean;

	/**
	 * if true, the projects settlement date should always be the first of the following month
	 */	
	@ApiProperty({ description: 'if true, the projects settlement date should always be the first of the following month'}) 
	continuous_offering: boolean;

	/**
	 * if true, this should be shown on the &quot;home&quot; page
	 */	
	@ApiProperty({ description: 'if true, this should be shown on the &quot;home&quot; page'}) 
	show_on_home: boolean;

	/**
	 * if true over subscriptions should be allowed
	 */	
	@ApiProperty({ description: 'if true over subscriptions should be allowed'}) 
	over_subscriptions: boolean;

	/**
	 * the id of its exemption
	 */	
	@ApiProperty({ description: 'the id of its exemption'}) 
	exempt_option_id: number;

	/**
	 * if true it is exempt
	 */	
	@ApiProperty({ description: 'if true it is exempt'}) 
	roed_exemption: boolean;

	/**
	 * stores a CSV list of IDs for the ROED exemptions under which investors can invest in this project
	 */	
	@ApiProperty({ description: 'stores a CSV list of IDs for the ROED exemptions under which investors can invest in this project'}) 
	roed_exemption_list: string;

	/**
	 * ?
	 */	
	@ApiProperty({ description: '?'}) 
	view_counts: number;

	/**
	 * the ordinal position of the project displayed with others
	 */	
	@ApiProperty({ description: 'the ordinal position of the project displayed with others'}) 
	sort_order: number;

	/**
	 * the docusign id of the docusign template that will be used for testing signing documents
	 */	
	@ApiProperty({ description: 'the docusign id of the docusign template that will be used for testing signing documents'}) 
	docusign_template_dev_test: string;

	/**
	 * the docusign id of the docusign template that will be used for production document signing.  NOTE: this should always be a clone of the dev/test document. A change should occur in test first then be COPIED to prod
	 */	
	@ApiProperty({ description: 'the docusign id of the docusign template that will be used for production document signing.  NOTE: this should always be a clone of the dev/test document. A change should occur in test first then be COPIED to prod'}) 
	docusign_template_production: string;

	/**
	 * the rules for merging data from the database into docusign. NOTE: its important that both the dev/test and prod documents match this mapping!
	 */	
	@ApiProperty({ description: 'the rules for merging data from the database into docusign. NOTE: its important that both the dev/test and prod documents match this mapping!'}) 
	docusign_template_merge_rules: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	docusign_additional_recipients_sending_order: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	docusign_additional_recipients_role_name: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	docusign_additional_recipients_person_name: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	docusign_additional_recipients_person_email: string;

	/**
	 * a CSV list of the names of the trust companies involved with this project
	 */	
	@ApiProperty({ description: 'a CSV list of the names of the trust companies involved with this project'}) 
	trust_company_names: string;

	/**
	 * the point in time that funding will start being placed
	 */	
	@ApiProperty({ description: 'the point in time that funding will start being placed'}) 
	funding_start: Date;

	/**
	 * the date that funding is set to cease even if its not full
	 */	
	@ApiProperty({ description: 'the date that funding is set to cease even if its not full'}) 
	funding_expiry: Date;

	/**
	 * the date that the investment completes/matures/ends
	 */	
	@ApiProperty({ description: 'the date that the investment completes/matures/ends'}) 
	maturity_date: Date;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	hubspot_id: string;

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
	 * This was created from the details of the foreign key EVENTS_PROJECT and described as: 
	 */	
	@ApiProperty({ type: () => Event, isArray: true, description: 'This was created from the details of the foreign key EVENTS_PROJECT and described as: '}) 
	events_project: Event[];

	/**
	 * This was created from the details of the foreign key FK_FFBA_ASSOCIATION_TO_PROJECT and described as: 
	 */	
	@ApiProperty({ type: () => FfbaAssociation, isArray: true, description: 'This was created from the details of the foreign key FK_FFBA_ASSOCIATION_TO_PROJECT and described as: '}) 
	ffba_association_to_project: FfbaAssociation[];

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_ORDERS_PROJECT_ID_ORDERS and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentOrder, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTMENT_ORDERS_PROJECT_ID_ORDERS and described as: '}) 
	orders: InvestmentOrder[];

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_PROJECT_ID_TRANSACTIONS and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentTransaction, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTMENT_TRANSACTION_PROJECT_ID_TRANSACTIONS and described as: '}) 
	transactions: InvestmentTransaction[];

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_WATCHLIST_PROJECT_ID_WATCHES and described as: 
	 */	
	@ApiProperty({ type: () => InvestmentWatchlist, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTMENT_WATCHLIST_PROJECT_ID_WATCHES and described as: '}) 
	watches: InvestmentWatchlist[];

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_EARNINGS_PROJECT_ID_INVESTOR_EARNINGS and described as: 
	 */	
	@ApiProperty({ type: () => InvestorEarning, isArray: true, description: 'This was created from the details of the foreign key FK_INVESTOR_EARNINGS_PROJECT_ID_INVESTOR_EARNINGS and described as: '}) 
	investor_earnings: InvestorEarning[];

	/**
	 * This was created from the details of the foreign key FK_PAYMENT_METHODS_PROJECT_ID_ACCOUNTS and described as: 
	 */	
	@ApiProperty({ type: () => ProjectAccount, isArray: true, description: 'This was created from the details of the foreign key FK_PAYMENT_METHODS_PROJECT_ID_ACCOUNTS and described as: '}) 
	accounts: ProjectAccount[];

	/**
	 * This was created from the details of the foreign key FK_PROJECT_DOCUSIGN_MAPPINGS_PROJECT_ID_DOCUSIGN_MAPPINGS and described as: 
	 */	
	@ApiProperty({ type: () => ProjectDocusignMapping, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECT_DOCUSIGN_MAPPINGS_PROJECT_ID_DOCUSIGN_MAPPINGS and described as: '}) 
	project_docusign_mappings_project_id_docusign_mappings: ProjectDocusignMapping[];

	/**
	 * This was created from the details of the foreign key FK_PROJECT_EARNINGS_PROJECT_ID_ADJUSTMENTS and described as: 
	 */	
	@ApiProperty({ type: () => ProjectBalanceAdjustment, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECT_EARNINGS_PROJECT_ID_ADJUSTMENTS and described as: '}) 
	adjustments: ProjectBalanceAdjustment[];

	/**
	 * This was created from the details of the foreign key FK_PROJECT_ENTITY_PROJECT_ID_ENTITIES and described as: 
	 */	
	@ApiProperty({ type: () => ProjectEntity, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECT_ENTITY_PROJECT_ID_ENTITIES and described as: '}) 
	entities: ProjectEntity[];

	/**
	 * This was created from the details of the foreign key FK_PROJECT_IMAGES_PROJECT_ID_IMAGES and described as: 
	 */	
	@ApiProperty({ type: () => ProjectImage, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECT_IMAGES_PROJECT_ID_IMAGES and described as: '}) 
	images: ProjectImage[];

	/**
	 * This was created from the details of the foreign key FK_PROJECT_KEYBACKERS_PROJECT_ID_BACKERS and described as: 
	 */	
	@ApiProperty({ type: () => ProjectKeybacker, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECT_KEYBACKERS_PROJECT_ID_BACKERS and described as: '}) 
	backers: ProjectKeybacker[];

	/**
	 * This was created from the details of the foreign key FK_PROJECT_PDFS_PROJECT_ID_PDFS and described as: 
	 */	
	@ApiProperty({ type: () => ProjectPdf, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECT_PDFS_PROJECT_ID_PDFS and described as: '}) 
	pdfs: ProjectPdf[];

	/**
	 * This was created from the details of the foreign key FK_PROJECT_STATUS_REPORTS_PROJECT_ID_STATUS_REPORTS and described as: 
	 */	
	@ApiProperty({ type: () => ProjectStatusReport, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECT_STATUS_REPORTS_PROJECT_ID_STATUS_REPORTS and described as: '}) 
	status_reports: ProjectStatusReport[];

	/**
	 * This was created from the details of the foreign key FK_PROJECT_TAX_REPORTS_PROJECT_ID_TAX_REPORTS and described as: 
	 */	
	@ApiProperty({ type: () => ProjectTaxReport, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECT_TAX_REPORTS_PROJECT_ID_TAX_REPORTS and described as: '}) 
	tax_reports: ProjectTaxReport[];

	/**
	 * This was created from the details of the foreign key FK_PROJECT_TAX_SUMMARIES_PROJECT_ID_TAX_SUMMARIES and described as: 
	 */	
	@ApiProperty({ type: () => ProjectTaxSummary, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECT_TAX_SUMMARIES_PROJECT_ID_TAX_SUMMARIES and described as: '}) 
	tax_summaries: ProjectTaxSummary[];

	/**
	 * This was created from the details of the foreign key FK_PROJECTS_COUNTRY_ID_PROJECTS and described as: 
	 */	
	@ApiProperty({ type: () => Country, description: 'This was created from the details of the foreign key FK_PROJECTS_COUNTRY_ID_PROJECTS and described as: '}) 
	country: Country;

	/**
	 * This was created from the details of the foreign key FK_PROJECTS_ISSUER_ID_PROJECTS and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, description: 'This was created from the details of the foreign key FK_PROJECTS_ISSUER_ID_PROJECTS and described as: '}) 
	issuer: UserSocialProfile;

	/**
	 * This was created from the details of the foreign key FK_PROJECTS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_PROJECTS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_PROJECTS_PROVINCE_ID_PROJECTS and described as: 
	 */	
	@ApiProperty({ type: () => Province, description: 'This was created from the details of the foreign key FK_PROJECTS_PROVINCE_ID_PROJECTS and described as: '}) 
	province: Province;

	/**
	 * This was created from the details of the foreign key FK_PROJECTS_ROED_SECURITYCODE_PROJECTS and described as: 
	 */	
	@ApiProperty({ type: () => ExemptDistributionOption, description: 'This was created from the details of the foreign key FK_PROJECTS_ROED_SECURITYCODE_PROJECTS and described as: '}) 
	exempt_option: ExemptDistributionOption;

	/**
	 * This was created from the details of the foreign key FK_ROED_SCHEDULE1S_TO_PROJECTS and described as: 
	 */	
	@ApiProperty({ type: () => RoedSchedule1, isArray: true, description: 'This was created from the details of the foreign key FK_ROED_SCHEDULE1S_TO_PROJECTS and described as: '}) 
	roed_schedule1_s_to_projects: RoedSchedule1[];

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_PROJECT_ID_PROFILES and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_SOCIALPROFILE_PROJECT_ID_PROFILES and described as: '}) 
	users_socialprofile_project_id_profiles: UserSocialProfile[];

	/**
	 * This was created from the details of the foreign key FK_WEB_HOOKS_PROJECT and described as: 
	 */	
	@ApiProperty({ type: () => WebHook, isArray: true, description: 'This was created from the details of the foreign key FK_WEB_HOOKS_PROJECT and described as: '}) 
	web_hooks_project: WebHook[];

}
