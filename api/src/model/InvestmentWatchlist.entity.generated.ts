import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { Project } from './Project.entity.generated';

/**
 * Informational model in typescript (nest.js) for InvestmentWatchlist
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * the recognition of one user wanting an alert when an investment achieves a certain degree of performance
 */

/**
 * InvestmentWatchlist
 * the recognition of one user wanting an alert when an investment achieves a certain degree of performance
 */
export class InvestmentWatchlist {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the user that is watching
	 */	
	@ApiProperty({ description: 'the user that is watching'}) 
	user_id: number;

	/**
	 * the id of the project that is being watched
	 */	
	@ApiProperty({ description: 'the id of the project that is being watched'}) 
	project_id: number;

	/**
	 * true if the user has been notified of 20% being placed
	 */	
	@ApiProperty({ description: 'true if the user has been notified of 20% being placed'}) 
	at20: boolean;

	/**
	 * true if the user has been notified of 20% being placed
	 */	
	@ApiProperty({ description: 'true if the user has been notified of 20% being placed'}) 
	at40: boolean;

	/**
	 * true if the user has been notified of 40% being placed
	 */	
	@ApiProperty({ description: 'true if the user has been notified of 40% being placed'}) 
	at60: boolean;

	/**
	 *  true if the user has been notified of 60% being placed
	 */	
	@ApiProperty({ description: ' true if the user has been notified of 60% being placed'}) 
	at80: boolean;

	/**
	 * true if the user has been notified of 80% being placed
	 */	
	@ApiProperty({ description: 'true if the user has been notified of 80% being placed'}) 
	at100: boolean;

	/**
	 * if true, its an active watch otherwise its disabled
	 */	
	@ApiProperty({ description: 'if true, its an active watch otherwise its disabled'}) 
	in_active: boolean;

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
	 * This was created from the details of the foreign key FK_INVESTMENT_WATCHLIST_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_INVESTMENT_WATCHLIST_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_WATCHLIST_PROJECT_ID_WATCHES and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key FK_INVESTMENT_WATCHLIST_PROJECT_ID_WATCHES and described as: '}) 
	project: Project;

	/**
	 * This was created from the details of the foreign key FK_INVESTMENT_WATCHLIST_USER_ID_WATCHES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_INVESTMENT_WATCHLIST_USER_ID_WATCHES and described as: '}) 
	user: AllUser;

}
