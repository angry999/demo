import { ApiProperty } from '@nestjs/swagger';

/**
 * Informational model in typescript (nest.js) for ComputedAccountBalance
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * 
 */

/**
 * ComputedAccountBalance
 * 
 */
export class ComputedAccountBalance {
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
	balance: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	pending_balance: number;

}
