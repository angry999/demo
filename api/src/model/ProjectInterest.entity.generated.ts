import { ApiProperty } from '@nestjs/swagger';
import { UserSocialProfile } from './UserSocialProfile.entity.generated';
import { AllUser } from './AllUser.entity.generated';

/**
 * Informational model in typescript (nest.js) for ProjectInterest
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one user expressing an interest in one property
 */

/**
 * ProjectInterest
 * one user expressing an interest in one property
 */
export class ProjectInterest {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the id of the profile of the person interested
	 */	
	@ApiProperty({ description: 'the id of the profile of the person interested'}) 
	interest_by_id: number;

	/**
	 * the id of the property they have an interest in
	 */	
	@ApiProperty({ description: 'the id of the property they have an interest in'}) 
	interest_in_id: number;

	/**
	 * an amount the person would expect to invest
	 */	
	@ApiProperty({ description: 'an amount the person would expect to invest'}) 
	amount_to_invest: number;

	/**
	 * the time period that they would like to invest within
	 */	
	@ApiProperty({ description: 'the time period that they would like to invest within'}) 
	time_until_investment: string;

	/**
	 * general remarks about the potential invesmtent
	 */	
	@ApiProperty({ description: 'general remarks about the potential invesmtent'}) 
	remarks: string;

	/**
	 * doesnt seem used
	 */	
	@ApiProperty({ description: 'doesnt seem used'}) 
	status: number;

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
	 * This was created from the details of the foreign key FK_PROPERTY_INTEREST_INTEREST_BY_ID_INTERESTS and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, description: 'This was created from the details of the foreign key FK_PROPERTY_INTEREST_INTEREST_BY_ID_INTERESTS and described as: '}) 
	interest_by: UserSocialProfile;

	/**
	 * This was created from the details of the foreign key FK_PROPERTY_INTEREST_INTEREST_IN_ID_INVESTOR_INTERESTS and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, description: 'This was created from the details of the foreign key FK_PROPERTY_INTEREST_INTEREST_IN_ID_INVESTOR_INTERESTS and described as: '}) 
	interest_in: UserSocialProfile;

	/**
	 * This was created from the details of the foreign key FK_PROPERTY_INTEREST_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_PROPERTY_INTEREST_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

}
