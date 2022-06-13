import { ApiProperty } from '@nestjs/swagger';

/**
 * Informational model in typescript (nest.js) for ComputedAccountPosition
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * 
 */

/**
 * ComputedAccountPosition
 * 
 */
export class ComputedAccountPosition {
	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	project_id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	user_id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	account: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	user_entity_id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	entity_type: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	book_value: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	market_value: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	shares: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	pending_shares: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	earliest_order_placed: Date;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	earliest_funds_received: Date;

}
