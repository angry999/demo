import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { ProjectEntity } from './ProjectEntity.entity.generated';
import { Project } from './Project.entity.generated';

/**
 * Informational model in typescript (nest.js) for ProjectImage
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one image for one project or project entity. if project entity is filled in it for that entity otherwise its for the project
 */

/**
 * ProjectImage
 * one image for one project or project entity. if project entity is filled in it for that entity otherwise its for the project
 */
export class ProjectImage {
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
	 * the id of the entity its for
	 */	
	@ApiProperty({ description: 'the id of the entity its for'}) 
	project_entity_id: number;

	/**
	 * the title to show with it
	 */	
	@ApiProperty({ description: 'the title to show with it'}) 
	title: string;

	/**
	 * a url to the location of the image
	 */	
	@ApiProperty({ description: 'a url to the location of the image'}) 
	image: string;

	/**
	 * the ordinal value of the image in the list of images
	 */	
	@ApiProperty({ description: 'the ordinal value of the image in the list of images'}) 
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
	 * This was created from the details of the foreign key FK_PROJECT_IMAGES_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_PROJECT_IMAGES_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_PROJECT_IMAGES_PROJECT_ENTITY_ID_IMAGES and described as: 
	 */	
	@ApiProperty({ type: () => ProjectEntity, description: 'This was created from the details of the foreign key FK_PROJECT_IMAGES_PROJECT_ENTITY_ID_IMAGES and described as: '}) 
	project_entity: ProjectEntity;

	/**
	 * This was created from the details of the foreign key FK_PROJECT_IMAGES_PROJECT_ID_IMAGES and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key FK_PROJECT_IMAGES_PROJECT_ID_IMAGES and described as: '}) 
	project: Project;

}
