import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { UserSocialProfile } from './UserSocialProfile.entity.generated';
import { SocialProfileFollowingStatus } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for SocialProfileFollowing
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one user watching or referring to another user
 */

/**
 * SocialProfileFollowing
 * one user watching or referring to another user
 */
export class SocialProfileFollowing {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the id of the user that is being observed
	 */	
	@ApiProperty({ description: 'the id of the user that is being observed'}) 
	following_id: number;

	/**
	 * the id of the user that is observing
	 */	
	@ApiProperty({ description: 'the id of the user that is observing'}) 
	follower_id: number;

	/**
	 * the current state of the connection
	 */	
	@ApiProperty({ description: 'the current state of the connection'}) 
	status: SocialProfileFollowingStatus;

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
	 * This was created from the details of the foreign key FK_USERS_SOCIAL_LINKUP_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USERS_SOCIAL_LINKUP_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIAL_LINKUP_LINK_ID_FOLLOWERS and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, description: 'This was created from the details of the foreign key FK_USERS_SOCIAL_LINKUP_LINK_ID_FOLLOWERS and described as: '}) 
	follower: UserSocialProfile;

	/**
	 * This was created from the details of the foreign key FK_USERS_SOCIAL_LINKUP_PROFILE_ID_FOLLOWING and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, description: 'This was created from the details of the foreign key FK_USERS_SOCIAL_LINKUP_PROFILE_ID_FOLLOWING and described as: '}) 
	following: UserSocialProfile;

}
