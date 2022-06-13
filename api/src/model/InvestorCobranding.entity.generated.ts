import { ApiProperty } from '@nestjs/swagger';

/**
 * Informational model in typescript (nest.js) for InvestorCobranding
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * 
 */

/**
 * InvestorCobranding
 * 
 */
export class InvestorCobranding {
	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	user_id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	primary_cobrander_id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	primary_cobrander_name: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	cobrander_ids: string;

}
