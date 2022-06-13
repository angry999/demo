import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { PropertySocialProfileService } from '../bll/PropertySocialProfile.service';
import { PropertySocialProfileApi } from '../api/PropertySocialProfile.controller';

/**
 * Nest.js module for REST API's in typescript for PropertySocialProfile
 * NOTE: Generated file, do not touch
 * An overview of a property/project
 */
@Module({
	imports: [DalModule ],
	controllers: [PropertySocialProfileApi],
	providers: [PropertySocialProfileService],
	exports: [PropertySocialProfileService]
})
export class PropertySocialProfileModule 
{
	constructor() {}
}		



