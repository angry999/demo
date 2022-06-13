import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { ProjectEntity } from './ProjectEntity.entity.generated';
import { Project } from './Project.entity.generated';

/**
 * Informational model in typescript (nest.js) for ProjectKeybacker
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one person or organizatoin that is backing the project
 */

/**
 * ProjectKeybacker
 * one person or organizatoin that is backing the project
 */
export class ProjectKeybacker {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the project this is for
	 */	
	@ApiProperty({ description: 'the project this is for'}) 
	project_id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	project_entity_id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	name: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	type: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	city: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	work: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	info: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	image: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	sort_order: number;

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
	 * This was created from the details of the foreign key FK_PROJECT_KEYBACKERS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_PROJECT_KEYBACKERS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_PROJECT_KEYBACKERS_PROJECT_ENTITY_ID_BACKERS and described as: 
	 */	
	@ApiProperty({ type: () => ProjectEntity, description: 'This was created from the details of the foreign key FK_PROJECT_KEYBACKERS_PROJECT_ENTITY_ID_BACKERS and described as: '}) 
	project_entity: ProjectEntity;

	/**
	 * This was created from the details of the foreign key FK_PROJECT_KEYBACKERS_PROJECT_ID_BACKERS and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key FK_PROJECT_KEYBACKERS_PROJECT_ID_BACKERS and described as: '}) 
	project: Project;

}
