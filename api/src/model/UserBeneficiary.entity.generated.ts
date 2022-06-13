import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './UserEntity.entity.generated';

/**
 * Informational model in typescript (nest.js) for UserBeneficiary
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * An investment entity for users beneficiaries
 */

/**
 * UserBeneficiary
 * An investment entity for users beneficiaries
 */
export class UserBeneficiary extends UserEntity {
	/**
	 * The first name of the beneficiary
	 */	
	@ApiProperty({ description: 'The first name of the beneficiary'}) 
	beneficiary_first_name: string;

	/**
	 * The last name of the beneficiary
	 */	
	@ApiProperty({ description: 'The last name of the beneficiary'}) 
	beneficiary_last_name: string;

	/**
	 * the relationship the beneficiary has with the entities founder
	 */	
	@ApiProperty({ description: 'the relationship the beneficiary has with the entities founder'}) 
	beneficiary_relationship: string;

	/**
	 * the percentage portion this beneficiary has of the entity
	 */	
	@ApiProperty({ description: 'the percentage portion this beneficiary has of the entity'}) 
	beneficiary_share: string;

	/**
	 * general purpose comments
	 */	
	@ApiProperty({ description: 'general purpose comments'}) 
	comments: string;

}
