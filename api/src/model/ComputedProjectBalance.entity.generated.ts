import { ApiProperty } from '@nestjs/swagger';

/**
 * Informational model in typescript (nest.js) for ComputedProjectBalance
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * 
 */

/**
 * ComputedProjectBalance
 * 
 */
export class ComputedProjectBalance {
	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	project_id: number;

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
