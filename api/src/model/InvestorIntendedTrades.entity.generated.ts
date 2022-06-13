import { ApiProperty } from '@nestjs/swagger';
import { UserSocialProfile } from './UserSocialProfile.entity.generated';
import { AllUser } from './AllUser.entity.generated';

/**
 * Informational model in typescript (nest.js) for InvestorIntendedTrades
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * single investor intended future trade infomation
 */

/**
 * InvestorIntendedTrades
 * single investor intended future trade infomation
 */
export class InvestorIntendedTrades {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the issuer the investor is intended to trade with
	 */	
	@ApiProperty({ description: 'the issuer the investor is intended to trade with'}) 
	intended_issuer_id: number;

	/**
	 * the investor this is for
	 */	
	@ApiProperty({ description: 'the investor this is for'}) 
	user_id: number;

	/**
	 * the investor intended trade amount
	 */	
	@ApiProperty({ description: 'the investor intended trade amount'}) 
	intended_trade_amount: number;

	/**
	 * the investor intended trade date
	 */	
	@ApiProperty({ description: 'the investor intended trade date'}) 
	intended_trade_date: Date;

	/**
	 * the notes for an investor intended trade
	 */	
	@ApiProperty({ description: 'the notes for an investor intended trade'}) 
	notes: string;

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
	 * This was created from the details of the foreign key FK_INVESTOR_INTENDED_TRADES_INTENDED_ISSUER_ID_INTENDED_TRADES and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, description: 'This was created from the details of the foreign key FK_INVESTOR_INTENDED_TRADES_INTENDED_ISSUER_ID_INTENDED_TRADES and described as: '}) 
	intended_issuer: UserSocialProfile;

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_INTENDED_TRADES_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_INVESTOR_INTENDED_TRADES_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_INVESTOR_INTENDED_TRADES_USER_ID_INTENDED_TRADES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_INVESTOR_INTENDED_TRADES_USER_ID_INTENDED_TRADES and described as: '}) 
	user: AllUser;

}
