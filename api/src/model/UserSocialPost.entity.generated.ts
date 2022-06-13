import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { UserSocialProfile } from './UserSocialProfile.entity.generated';
import { UserSocialPostType } from 'fundscraper-model-enums';
import { SocialProfilePostState } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for UserSocialPost
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one activity or comment of one user shared socially
 */

/**
 * UserSocialPost
 * one activity or comment of one user shared socially
 */
export class UserSocialPost {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * a categorization of the post type. some of the fields below are directly dependent upon the post type for their context
	 */	
	@ApiProperty({ description: 'a categorization of the post type. some of the fields below are directly dependent upon the post type for their context'}) 
	post_type: UserSocialPostType;

	/**
	 * the id of the user profile that originated the item to be shared
	 */	
	@ApiProperty({ description: 'the id of the user profile that originated the item to be shared'}) 
	profile_id: number;

	/**
	 * the id of of a related profile. the specific purpose of this link is dependent upon the type of post
	 */	
	@ApiProperty({ description: 'the id of of a related profile. the specific purpose of this link is dependent upon the type of post'}) 
	related_profile_id: number;

	/**
	 * the id of a post that this is related to
	 */	
	@ApiProperty({ description: 'the id of a post that this is related to'}) 
	related_post_id: number;

	/**
	 * the state the post may be in
	 */	
	@ApiProperty({ description: 'the state the post may be in'}) 
	status: SocialProfilePostState;

	/**
	 * the text of this post
	 */	
	@ApiProperty({ description: 'the text of this post'}) 
	post: string;

	/**
	 * a url to an image to display alongside this post
	 */	
	@ApiProperty({ description: 'a url to an image to display alongside this post'}) 
	image: string;

	/**
	 * doesnt seem to be used
	 */	
	@ApiProperty({ description: 'doesnt seem to be used'}) 
	link: string;

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
	 * This was created from the details of the foreign key FK_USERS_SOCIAL_POST_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_SOCIAL_POST_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIAL_POST_LINK_ID_POSTS and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, description: 'This was created from the details of the foreign key FK_USERS_SOCIAL_POST_LINK_ID_POSTS and described as: '}) 
	related_profile: UserSocialProfile;

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIAL_POST_PROFILE_ID_POSTS and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, description: 'This was created from the details of the foreign key FK_USERS_SOCIAL_POST_PROFILE_ID_POSTS and described as: '}) 
	profile: UserSocialProfile;

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIAL_POST_RELATED_POST_ID_RELATED_TO and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialPost, description: 'This was created from the details of the foreign key FK_USERS_SOCIAL_POST_RELATED_POST_ID_RELATED_TO and described as: '}) 
	related_post: UserSocialPost;

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIAL_POST_RELATED_POST_ID_RELATED_TO and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialPost, isArray: true, description: 'This was created from the details of the foreign key FK_USERS_SOCIAL_POST_RELATED_POST_ID_RELATED_TO and described as: '}) 
	related_to: UserSocialPost[];

}
