import { ApiProperty } from '@nestjs/swagger';
import { UserSocialProfile } from './UserSocialProfile.entity.generated';
import { AllUser } from './AllUser.entity.generated';
import { UserIssuerAssociationType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for UserIssuerAssociation
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * 
 */

/**
 * UserIssuerAssociation
 * 
 */
export class UserIssuerAssociation {
	/**
	 * the unique, internal identifier for the association
	 */	
	@ApiProperty({ description: 'the unique, internal identifier for the association'}) 
	id: number;

	/**
	 * the id of the user that has a direct association with an issuer
	 */	
	@ApiProperty({ description: 'the id of the user that has a direct association with an issuer'}) 
	user_id: number;

	/**
	 * the issuer that has the association with the user
	 */	
	@ApiProperty({ description: 'the issuer that has the association with the user'}) 
	issuer_id: number;

	/**
	 * a characterization of the association between the user and the issuer
	 */	
	@ApiProperty({ description: 'a characterization of the association between the user and the issuer'}) 
	association_type: UserIssuerAssociationType;

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
	 * This was created from the details of the foreign key FK_USER_ISSUER_ASSOCIATIONS_TO_ISSUER_ID_ASSOCIATED_USERS and described as: 
	 */	
	@ApiProperty({ type: () => UserSocialProfile, description: 'This was created from the details of the foreign key FK_USER_ISSUER_ASSOCIATIONS_TO_ISSUER_ID_ASSOCIATED_USERS and described as: '}) 
	issuer: UserSocialProfile;

	/**
	 * This was created from the details of the foreign key FK_USER_ISSUER_ASSOCIATIONS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USER_ISSUER_ASSOCIATIONS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_USER_ISSUER_ASSOCIATIONS_TO_USER_ID_ISSUER_ASSOCIATIONS and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_USER_ISSUER_ASSOCIATIONS_TO_USER_ID_ISSUER_ASSOCIATIONS and described as: '}) 
	user: AllUser;

}
