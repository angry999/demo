import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { Project } from './Project.entity.generated';
import { PaymentMethodType } from 'fundscraper-model-enums';

/**
 * Informational model in typescript (nest.js) for ProjectAccount
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one method of payments that can be mode to a project
 */

/**
 * ProjectAccount
 * one method of payments that can be mode to a project
 */
export class ProjectAccount {
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
	 * unused
	 */	
	@ApiProperty({ description: 'unused'}) 
	method: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	eligibility_types: string;

	/**
	 * the method in which the funds are transferred
	 */	
	@ApiProperty({ description: 'the method in which the funds are transferred'}) 
	payment_type: PaymentMethodType;

	/**
	 * the name of the projects trust organization. this needs to be the name of the account holder
	 */	
	@ApiProperty({ description: 'the name of the projects trust organization. this needs to be the name of the account holder'}) 
	trust_name: string;

	/**
	 * the address of the trust
	 */	
	@ApiProperty({ description: 'the address of the trust'}) 
	trust_address: string;

	/**
	 *  the primary contact of the projects trust
	 */	
	@ApiProperty({ description: ' the primary contact of the projects trust'}) 
	trust_contact: string;

	/**
	 * the name of the institution that will receive the funds
	 */	
	@ApiProperty({ description: 'the name of the institution that will receive the funds'}) 
	institution: string;

	/**
	 * the identifier of the institution
	 */	
	@ApiProperty({ description: 'the identifier of the institution'}) 
	institution_number: string;

	/**
	 * the identifier of the branch at the institution
	 */	
	@ApiProperty({ description: 'the identifier of the branch at the institution'}) 
	branch_number: string;

	/**
	 * the bank account number the trust maintains at the branch
	 */	
	@ApiProperty({ description: 'the bank account number the trust maintains at the branch'}) 
	bank_account_number: string;

	/**
	 * the address of the institution
	 */	
	@ApiProperty({ description: 'the address of the institution'}) 
	branch_mailing_address: string;

	/**
	 * the swift code for the institution
	 */	
	@ApiProperty({ description: 'the swift code for the institution'}) 
	swift_code: string;

	/**
	 * the ordinal position of this account in the list of accounts for the project
	 */	
	@ApiProperty({ description: 'the ordinal position of this account in the list of accounts for the project'}) 
	sort_order: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	custom_text: string;

	/**
	 * if true, the method is still active and can used
	 */	
	@ApiProperty({ description: 'if true, the method is still active and can used'}) 
	is_active: boolean;

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
	 * This was created from the details of the foreign key FK_PAYMENT_METHODS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_PAYMENT_METHODS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_PAYMENT_METHODS_PROJECT_ID_ACCOUNTS and described as: 
	 */	
	@ApiProperty({ type: () => Project, description: 'This was created from the details of the foreign key FK_PAYMENT_METHODS_PROJECT_ID_ACCOUNTS and described as: '}) 
	project: Project;

}
