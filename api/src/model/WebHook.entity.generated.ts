import { ApiProperty } from '@nestjs/swagger';
import { UserSocialProfile } from './UserSocialProfile.entity.generated';
import { AllUser } from './AllUser.entity.generated';
import { Project } from './Project.entity.generated';
import { EventType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for WebHook
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one url to be invoked upon a given event ocurrance
 */

/**
 * WebHook
 * one url to be invoked upon a given event ocurrance
 */
export class WebHook {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the type of event that triggers this hook being called
	 */	
	@ApiProperty({ description: 'the type of event that triggers this hook being called'}) 
	event_type: EventType;

	/**
	 * the url that gets called
	 */	
	@ApiProperty({ description: 'the url that gets called'}) 
	url: string;

	/**
	 * the user that the hook listens to
	 */	
	@ApiProperty({ description: 'the user that the hook listens to'}) 
	user_id: number;

	/**
	 * the project that the hook listens to
	 */	
	@ApiProperty({ description: 'the project that the hook listens to'}) 
	project_id: number;

	/**
	 * the issuer (social profile) the that hook listens to
	 */	
	@ApiProperty({ description: 'the issuer (social profile) the that hook listens to'}) 
	issuer_id: number;

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
	 * the last point in time this row was modified
	 */	
	@ApiProperty({ description: 'the last point in time this row was modified'}) 
	updatetime: Date;

	/**
	 * the point in time this row was first created regardless of modifications
	 */	
	@ApiProperty({ description: 'the point in time this row was first created regardless of modifications'}) 
	createtime: Date;

	/**
	 * This was created from the details of the foreign key FK_WEB_HOOKS_TO_ISSUER and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, description: 'This was created from the details of the foreign key FK_WEB_HOOKS_TO_ISSUER and described as: '}) 
	issuer: UserSocialProfile;

	/**
	 * This was created from the details of the foreign key FK_WEB_HOOKS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_WEB_HOOKS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_WEB_HOOKS_PROJECT and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key FK_WEB_HOOKS_PROJECT and described as: '}) 
	project: Project;

	/**
	 * This was created from the details of the foreign key FK_WEB_HOOKS_TO_USER and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_WEB_HOOKS_TO_USER and described as: '}) 
	user: AllUser;

}
