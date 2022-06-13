import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';
import { AdminModule } from './AdminModule.entity.generated';

/**
 * Informational model in typescript (nest.js) for ModuleAccess
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * the specification of what operations one user can perform in one module
 */

/**
 * ModuleAccess
 * the specification of what operations one user can perform in one module
 */
export class ModuleAccess {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the id of the user that is given the permissions
	 */	
	@ApiProperty({ description: 'the id of the user that is given the permissions'}) 
	user_id: number;

	/**
	 * the id of the module that the permissions are granted on
	 */	
	@ApiProperty({ description: 'the id of the module that the permissions are granted on'}) 
	module_id: number;

	/**
	 * if true, the user can view items
	 */	
	@ApiProperty({ description: 'if true, the user can view items'}) 
	can_view: boolean;

	/**
	 * if true, the user can create new items
	 */	
	@ApiProperty({ description: 'if true, the user can create new items'}) 
	can_add: boolean;

	/**
	 * if true, the user can alter existing items
	 */	
	@ApiProperty({ description: 'if true, the user can alter existing items'}) 
	can_edit: boolean;

	/**
	 * if true, the user can delete items
	 */	
	@ApiProperty({ description: 'if true, the user can delete items'}) 
	can_delete: boolean;

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
	 * This was created from the details of the foreign key FK_MODULE_ACCESS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_MODULE_ACCESS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

	/**
	 * This was created from the details of the foreign key FK_MODULE_ACCESS_MODULE_ID_GRANTS and described as: 
	 */	
	@ApiProperty({ type: () => AdminModule, description: 'This was created from the details of the foreign key FK_MODULE_ACCESS_MODULE_ID_GRANTS and described as: '}) 
	module: AdminModule;

	/**
	 * This was created from the details of the foreign key FK_MODULE_ACCESS_USER_ID_ACCESSIBLE_MODULES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_MODULE_ACCESS_USER_ID_ACCESSIBLE_MODULES and described as: '}) 
	user: AllUser;

}
