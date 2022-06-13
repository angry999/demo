import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { UserState } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for IssuerAdmin
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * An administrative user for issuers
 */

/**
 * IssuerAdmin
 * An administrative user for issuers
 */
export class IssuerAdmin extends AllUser {
	/**
	 * the token used to identify the current session
	 */	
	@ApiProperty({ description: 'the token used to identify the current session'}) 
	token: string;

	/**
	 * the last time the session token was updated
	 */	
	@ApiProperty({ description: 'the last time the session token was updated'}) 
	token_update: Date;

	/**
	 * the sponsor that essentially owns this investor
	 */	
	@ApiProperty({ description: 'the sponsor that essentially owns this investor'}) 
	cobranded_client_of_id: number;

	/**
	 * the avilability of the account for use
	 */	
	@ApiProperty({ description: 'the avilability of the account for use'}) 
	status: UserState;

}
