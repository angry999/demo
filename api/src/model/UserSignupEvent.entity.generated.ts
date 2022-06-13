import { ApiProperty } from '@nestjs/swagger';

/**
 * Informational model in typescript (nest.js) for UserSignupEvent
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * 
 */

/**
 * UserSignupEvent
 * 
 */
export class UserSignupEvent {
	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	user_id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	basic_info: Date;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	kyc_done: Date;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	retrn_pref: Date;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	time_hrzn: Date;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	risk_toler: Date;

}
