import { ApiProperty } from '@nestjs/swagger';

/**
 * Informational model in typescript (nest.js) for ComputedProjectIncome
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * 
 */

/**
 * ComputedProjectIncome
 * 
 */
export class ComputedProjectIncome {
	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	project_id: number;

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
