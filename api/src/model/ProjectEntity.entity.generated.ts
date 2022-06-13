import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { Project } from './Project.entity.generated';
import { ProjectEntityDetail } from './ProjectEntityDetail.entity.generated';
import { ProjectImage } from './ProjectImage.entity.generated';
import { ProjectKeybacker } from './ProjectKeybacker.entity.generated';
import { ProjectEntityType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for ProjectEntity
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one visual, descriptive component of a project
 */

/**
 * ProjectEntity
 * one visual, descriptive component of a project
 */
export class ProjectEntity {
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
	 * the numerical identier of the tab this should be shown on. there is no construct for tabs so those are inferred from this value
	 */	
	@ApiProperty({ description: 'the numerical identier of the tab this should be shown on. there is no construct for tabs so those are inferred from this value'}) 
	tab_id: number;

	/**
	 * the categorzation of the entity. this used for decoding what to do with and how to represent its details
	 */	
	@ApiProperty({ description: 'the categorzation of the entity. this used for decoding what to do with and how to represent its details'}) 
	entity_type: ProjectEntityType;

	/**
	 * the title or textual display for this item
	 */	
	@ApiProperty({ description: 'the title or textual display for this item'}) 
	title: string;

	/**
	 * a secondary title or textual display for this item
	 */	
	@ApiProperty({ description: 'a secondary title or textual display for this item'}) 
	title_2: string;

	/**
	 * a textual description of this entity
	 */	
	@ApiProperty({ description: 'a textual description of this entity'}) 
	contents: string;

	/**
	 * a url to an image to use to display at the heading
	 */	
	@ApiProperty({ description: 'a url to an image to use to display at the heading'}) 
	image: string;

	/**
	 * if true, this item should be shown
	 */	
	@ApiProperty({ description: 'if true, this item should be shown'}) 
	visible: boolean;

	/**
	 * the ordinal position of this entity within the project
	 */	
	@ApiProperty({ description: 'the ordinal position of this entity within the project'}) 
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
	 * This was created from the details of the foreign key FK_PROJECT_ENTITY_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_PROJECT_ENTITY_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_PROJECT_ENTITY_PROJECT_ID_ENTITIES and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key FK_PROJECT_ENTITY_PROJECT_ID_ENTITIES and described as: '}) 
	project: Project;

	/**
	 * This was created from the details of the foreign key FK_PROJECT_ENTITY_DETAILS_PROJECT_ENTITY_ID_DETAILS and described as: 
	 */	
	@ApiProperty({ type: () => ProjectEntityDetail, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECT_ENTITY_DETAILS_PROJECT_ENTITY_ID_DETAILS and described as: '}) 
	details: ProjectEntityDetail[];

	/**
	 * This was created from the details of the foreign key FK_PROJECT_IMAGES_PROJECT_ENTITY_ID_IMAGES and described as: 
	 */	
	@ApiProperty({ type: () => ProjectImage, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECT_IMAGES_PROJECT_ENTITY_ID_IMAGES and described as: '}) 
	images: ProjectImage[];

	/**
	 * This was created from the details of the foreign key FK_PROJECT_KEYBACKERS_PROJECT_ENTITY_ID_BACKERS and described as: 
	 */	
	@ApiProperty({ type: () => ProjectKeybacker, isArray: true, description: 'This was created from the details of the foreign key FK_PROJECT_KEYBACKERS_PROJECT_ENTITY_ID_BACKERS and described as: '}) 
	backers: ProjectKeybacker[];

}
