import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { ProjectEntity } from './ProjectEntity.entity.generated';

/**
 * Informational model in typescript (nest.js) for ProjectEntityDetail
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * additional specification for a project entity. the specifics are determined by what kind of entity it is
 */

/**
 * ProjectEntityDetail
 * additional specification for a project entity. the specifics are determined by what kind of entity it is
 */
export class ProjectEntityDetail {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the id of the entity this is details for
	 */	
	@ApiProperty({ description: 'the id of the entity this is details for'}) 
	project_entity_id: number;

	/**
	 * the first piece of details. the exact use and type are determined by the entity type
	 */	
	@ApiProperty({ description: 'the first piece of details. the exact use and type are determined by the entity type'}) 
	f1: string;

	/**
	 * the 2nd piece of details. the exact use and type are determined by the entity type
	 */	
	@ApiProperty({ description: 'the 2nd piece of details. the exact use and type are determined by the entity type'}) 
	f2: string;

	/**
	 * the 3rd piece of details. the exact use and type are determined by the entity type
	 */	
	@ApiProperty({ description: 'the 3rd piece of details. the exact use and type are determined by the entity type'}) 
	f3: string;

	/**
	 * the fourth piece of details. the exact use and type are determined by the entity type
	 */	
	@ApiProperty({ description: 'the fourth piece of details. the exact use and type are determined by the entity type'}) 
	f4: string;

	/**
	 * the fifth piece of details. the exact use and type are determined by the entity type
	 */	
	@ApiProperty({ description: 'the fifth piece of details. the exact use and type are determined by the entity type'}) 
	f5: string;

	/**
	 * the sixth piece of details. the exact use and type are determined by the entity type
	 */	
	@ApiProperty({ description: 'the sixth piece of details. the exact use and type are determined by the entity type'}) 
	f6: string;

	/**
	 * the sevenh piece of details. the exact use and type are determined by the entity type
	 */	
	@ApiProperty({ description: 'the sevenh piece of details. the exact use and type are determined by the entity type'}) 
	f7: string;

	/**
	 * the eigth piece of details. the exact use and type are determined by the entity type
	 */	
	@ApiProperty({ description: 'the eigth piece of details. the exact use and type are determined by the entity type'}) 
	f8: string;

	/**
	 * the ninth piece of details. the exact use and type are determined by the entity type
	 */	
	@ApiProperty({ description: 'the ninth piece of details. the exact use and type are determined by the entity type'}) 
	f9: string;

	/**
	 * the tenth piece of details. the exact use and type are determined by the entity type
	 */	
	@ApiProperty({ description: 'the tenth piece of details. the exact use and type are determined by the entity type'}) 
	f10: string;

	/**
	 * if true, this row is &quot;logically&quot; deleted. that is, its not to be used any more and is kept for historical/audit purposes only
	 */	
	@ApiProperty({ description: 'if true, this row is &quot;logically&quot; deleted. that is, its not to be used any more and is kept for historical/audit purposes only'}) 
	is_deleted: boolean;

	/**
	 * the id of the user that made the last change or in the case of its initial creation, the user that created it
	 */	
	@ApiProperty({ description: 'the id of the user that made the last change or in the case of its initial creation, the user that created it'}) 
	last_changed_by_id: number;

	/**
	 * the point in time this row was first created regardless of modifications
	 */	
	@ApiProperty({ description: 'the point in time this row was first created regardless of modifications'}) 
	createtime: Date;

	/**
	 * the last point in time this row was modified
	 */	
	@ApiProperty({ description: 'the last point in time this row was modified'}) 
	updatetime: Date;

	/**
	 * This was created from the details of the foreign key FK_PROJECT_ENTITY_DETAILS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_PROJECT_ENTITY_DETAILS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_PROJECT_ENTITY_DETAILS_PROJECT_ENTITY_ID_DETAILS and described as: 
	 */	
	@ApiProperty({ type: () => ProjectEntity, description: 'This was created from the details of the foreign key FK_PROJECT_ENTITY_DETAILS_PROJECT_ENTITY_ID_DETAILS and described as: '}) 
	project_entity: ProjectEntity;

}
