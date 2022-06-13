import { ApiProperty } from '@nestjs/swagger';

/**
 * description not specified 
 * Model class for data backed by the table computed_account_balances
 */
export class ComputedAccountBalances 
{
    /**
	 * description not specified
	 * Supported by the column 'user_id'
     */
	@ApiProperty({description: 'description not specified'})
	user_id :  number;

    /**
	 * description not specified
	 * Supported by the column 'account'
     */
	@ApiProperty({description: 'description not specified'})
	account :  string;

    /**
	 * description not specified
	 * Supported by the column 'user_entity_id'
     */
	@ApiProperty({description: 'description not specified'})
	user_entity_id :  number;

    /**
	 * description not specified
	 * Supported by the column 'entity_type'
     */
	@ApiProperty({description: 'description not specified'})
	entity_type :  number;

    /**
	 * description not specified
	 * Supported by the column 'balance'
     */
	@ApiProperty({description: 'description not specified'})
	balance :  number;
}
