import { ApiProperty } from '@nestjs/swagger';

/**
 * Informational model in typescript (nest.js) for ComputedAccountIncome
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * 
 */

/**
 * ComputedAccountIncome
 * 
 */
export class ComputedAccountIncome {
	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	user_id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	project_id: number;

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
	activity: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	activity_desc: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	order_id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	transaction_date: Date;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	amount: number;

}
