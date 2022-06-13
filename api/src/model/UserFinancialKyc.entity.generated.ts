import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { FinancialRange } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for UserFinancialKyc
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * numerous questions answered by one user about thier finances and employment
 */

/**
 * UserFinancialKyc
 * numerous questions answered by one user about thier finances and employment
 */
export class UserFinancialKyc {
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
	 * the type of employment the user currently enagages in.
	 */	
	@ApiProperty({ description: 'the type of employment the user currently enagages in.'}) 
	employment_status: string;

	/**
	 * the name of the organization that the user was employed by at the time
	 */	
	@ApiProperty({ description: 'the name of the organization that the user was employed by at the time'}) 
	employer: string;

	/**
	 * the industry the employment was engaged in
	 */	
	@ApiProperty({ description: 'the industry the employment was engaged in'}) 
	industry: string;

	/**
	 * the title/position the person held for their employment
	 */	
	@ApiProperty({ description: 'the title/position the person held for their employment'}) 
	position: string;

	/**
	 * the number of years that the person has been working for that employer
	 */	
	@ApiProperty({ description: 'the number of years that the person has been working for that employer'}) 
	years: string;

	/**
	 * text describing how income is being reported. Combined with spouse, single
	 */	
	@ApiProperty({ description: 'text describing how income is being reported. Combined with spouse, single'}) 
	income_includes_partner: string;

	/**
	 * the current year when these details were entered
	 */	
	@ApiProperty({ description: 'the current year when these details were entered'}) 
	year_entered: number;

	/**
	 * projected income for the current year
	 */	
	@ApiProperty({ description: 'projected income for the current year'}) 
	income_current_year: FinancialRange;

	/**
	 * actual income for the previous year
	 */	
	@ApiProperty({ description: 'actual income for the previous year'}) 
	income_previous_year: FinancialRange;

	/**
	 * actual income for 2 years ago
	 */	
	@ApiProperty({ description: 'actual income for 2 years ago'}) 
	income_two_years_ago: FinancialRange;

	/**
	 * a range of their net financial assets
	 */	
	@ApiProperty({ description: 'a range of their net financial assets'}) 
	net_financial_assest_range: FinancialRange;

	/**
	 * are they currently an advisor dealer?
	 */	
	@ApiProperty({ description: 'are they currently an advisor dealer?'}) 
	advisor_dealer: string;

	/**
	 * does this person represent an advisor dealer?
	 */	
	@ApiProperty({ description: 'does this person represent an advisor dealer?'}) 
	represents_advisor_dealer: string;

	/**
	 * are they managing an account for an advisor dealer
	 */	
	@ApiProperty({ description: 'are they managing an account for an advisor dealer'}) 
	acting_on_account_for_advisor_dealer: string;

	/**
	 * their net assets in a range
	 */	
	@ApiProperty({ description: 'their net assets in a range'}) 
	net_assets_range: FinancialRange;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	income_curr_new: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	income_curr1_new: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	income_curr2_new: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	income_net_new: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	assets_net_new: number;

	/**
	 * the id of the user that made the last change or in the case of its initial creation, the user that created it
	 */	
	@ApiProperty({ description: 'the id of the user that made the last change or in the case of its initial creation, the user that created it'}) 
	last_changed_by_id: number;

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
	 * the last point in time this row was modified
	 */	
	@ApiProperty({ description: 'the last point in time this row was modified'}) 
	updatetime: Date;

	/**
	 * This was created from the details of the foreign key FK_USERS_EMPLOYMENT_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_EMPLOYMENT_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USERS_EMPLOYMENT_USER_ID_FINANCIAL_KYC and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_EMPLOYMENT_USER_ID_FINANCIAL_KYC and described as: '}) 
	user: AllUser;

}
