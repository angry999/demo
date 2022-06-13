import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';

/**
 * Informational model in typescript (nest.js) for Menu
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * one item in a menu including menus themselves
 */

/**
 * Menu
 * one item in a menu including menus themselves
 */
export class Menu {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * the id of the page to show the menu on
	 */	
	@ApiProperty({ description: 'the id of the page to show the menu on'}) 
	page_id: number;

	/**
	 * the text to show as the item
	 */	
	@ApiProperty({ description: 'the text to show as the item'}) 
	name: string;

	/**
	 * the text to use for seo for the menu item
	 */	
	@ApiProperty({ description: 'the text to use for seo for the menu item'}) 
	name_seo: string;

	/**
	 * a url to an image resource to show alongside the menu
	 */	
	@ApiProperty({ description: 'a url to an image resource to show alongside the menu'}) 
	image: string;

	/**
	 * the primary descriptive text for the item (fly over)
	 */	
	@ApiProperty({ description: 'the primary descriptive text for the item (fly over)'}) 
	content: string;

	/**
	 * the secondary descriptive text for the item (what for???)
	 */	
	@ApiProperty({ description: 'the secondary descriptive text for the item (what for???)'}) 
	content2: string;

	/**
	 * the ordinal position of this item in the page or parent menu
	 */	
	@ApiProperty({ description: 'the ordinal position of this item in the page or parent menu'}) 
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
	 * This was created from the details of the foreign key FK_MENU_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_MENU_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

}
