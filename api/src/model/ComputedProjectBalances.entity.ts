import { ApiProperty } from '@nestjs/swagger';

/**
 * description not specified 
 * Model class for data backed by the table computed_project_balances
 */
export class ComputedProjectBalances 
{
    /**
	 * description not specified
	 * Supported by the column 'project_id'
     */
	@ApiProperty({description: 'description not specified'})
	project_id :  number;

    /**
	 * description not specified
	 * Supported by the column 'balance'
     */
	@ApiProperty({description: 'description not specified'})
	balance :  number;
}
