import { ApiProperty } from '@nestjs/swagger';

/**
 * description not specified 
 * Model class for data backed by the table computed_project_positions
 */
export class ComputedProjectPositions 
{
    /**
	 * description not specified
	 * Supported by the column 'project_id'
     */
	@ApiProperty({description: 'description not specified'})
	project_id :  number;

    /**
	 * description not specified
	 * Supported by the column 'book_value'
     */
	@ApiProperty({description: 'description not specified'})
	book_value :  number;

    /**
	 * description not specified
	 * Supported by the column 'market_value'
     */
	@ApiProperty({description: 'description not specified'})
	market_value :  number;

    /**
	 * description not specified
	 * Supported by the column 'shares'
     */
	@ApiProperty({description: 'description not specified'})
	shares :  number;
}
