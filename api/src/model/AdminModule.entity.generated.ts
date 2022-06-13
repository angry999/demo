import { ApiProperty } from '@nestjs/swagger';
import { ModuleAccess } from './ModuleAccess.entity.generated';
import { AllUser } from './AllUser.entity.generated';

/**
 * Informational model in typescript (nest.js) for AdminModule
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one section of functionality in the administrative application
 */

/**
 * AdminModule
 * one section of functionality in the administrative application
 */
export class AdminModule {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the id of the module that this is a child of
	 */	
	@ApiProperty({ description: 'the id of the module that this is a child of'}) 
	sub_id: number;

	/**
	 * the human readable identifier of the module (its name)
	 */	
	@ApiProperty({ description: 'the human readable identifier of the module (its name)'}) 
	name: string;

	/**
	 * the identifier to use for seo for the module
	 */	
	@ApiProperty({ description: 'the identifier to use for seo for the module'}) 
	module_seo: string;

	/**
	 * a url to the icon to use to represent the module
	 */	
	@ApiProperty({ description: 'a url to the icon to use to represent the module'}) 
	module_icon: string;

	/**
	 * unused
	 */	
	@ApiProperty({ description: 'unused'}) 
	status: number;

	/**
	 * the ordinal position of the module
	 */	
	@ApiProperty({ description: 'the ordinal position of the module'}) 
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
	 * This was created from the details of the foreign key FK_MODULE_ACCESS_MODULE_ID_GRANTS and described as: 
	 */	
	@ApiProperty({ type: () => ModuleAccess, isArray: true, description: 'This was created from the details of the foreign key FK_MODULE_ACCESS_MODULE_ID_GRANTS and described as: '}) 
	grants: ModuleAccess[];

	/**
	 * This was created from the details of the foreign key FK_MODULES_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_MODULES_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_MODULES_SUB_ID_CHILD_MODULES and described as: 
	 */	
	@ApiProperty({ type: () => AdminModule, description: 'This was created from the details of the foreign key FK_MODULES_SUB_ID_CHILD_MODULES and described as: '}) 
	sub: AdminModule;

	/**
	 * This was created from the details of the foreign key FK_MODULES_SUB_ID_CHILD_MODULES and described as: 
	 */	
	@ApiProperty({ type: () => AdminModule, isArray: true, description: 'This was created from the details of the foreign key FK_MODULES_SUB_ID_CHILD_MODULES and described as: '}) 
	child_modules: AdminModule[];

}
