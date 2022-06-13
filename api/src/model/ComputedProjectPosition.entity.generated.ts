import { ApiProperty } from '@nestjs/swagger';

/**
 * Informational model in typescript (nest.js) for ComputedProjectPosition
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * 
 */

/**
 * ComputedProjectPosition
 * 
 */
export class ComputedProjectPosition {
	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	project_id: number;

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

}
