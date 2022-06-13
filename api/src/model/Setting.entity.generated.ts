import { ApiProperty } from '@nestjs/swagger';
import { AllUser } from './AllUser.entity.generated';

/**
 * Informational model in typescript (nest.js) for Setting
 * IMPORTANT, DO NOT EDIT: this is a generated file and is over written by subsequent runs of the generator. Any changes will be lost
 * a whole bunch of settings for the system
 */

/**
 * Setting
 * a whole bunch of settings for the system
 */
export class Setting {
	/**
	 * the unique internal identifier (primary key) of the row
	 */	
	@ApiProperty({ description: 'the unique internal identifier (primary key) of the row'}) 
	id: number;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	company: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	address: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	address2: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	city: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	zip: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	province: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	country: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	site_name: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	site_domain: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	phone: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	phone2: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	fax: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	info_email: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	petoes: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	title: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	keywords: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	description: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	facebook: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	twitter: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	google: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	pinterest: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	linkedin: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	instagram: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	tumblr: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	youtube: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	blog: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	relationship_disclosure: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	google_analytics: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	google_analytics_body: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	dev_company: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	dev_address: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	dev_address2: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	dev_city: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	dev_zip: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	dev_province: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	dev_country: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	dev_phone: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	dev_fax: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	dev_email: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	dev_web: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	timezone: string;

	/**
	 * 
	 */	
	@ApiProperty({ description: ''}) 
	use_openssl: boolean;

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
	 * if true, this row is &quot;logically&quot; deleted. that is, its not to be used any more and is kept for historical/audit purposes only
	 */	
	@ApiProperty({ description: 'if true, this row is &quot;logically&quot; deleted. that is, its not to be used any more and is kept for historical/audit purposes only'}) 
	is_deleted: boolean;

	/**
	 * the point in time this row was first created regardless of modifications
	 */	
	@ApiProperty({ description: 'the point in time this row was first created regardless of modifications'}) 
	createtime: Date;

	/**
	 * This was created from the details of the foreign key FK_SETTINGS_LAST_CHANGED_BY_ID_CHANGES and described as: 
	 */	
	@ApiProperty({ type: () => AllUser, description: 'This was created from the details of the foreign key FK_SETTINGS_LAST_CHANGED_BY_ID_CHANGES and described as: '}) 
	last_changed_by: AllUser;

}
