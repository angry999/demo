import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProfileBackgroundService } from '../bll/ProfileBackground.service';
import { ProfileBackgroundApi } from '../api/ProfileBackground.controller';

/**
 * Nest.js module for REST API's in typescript for ProfileBackground
 * NOTE: Generated file, do not touch
 * an image that is available for use as a background of a profile
 */
@Module({
	imports: [DalModule ],
	controllers: [ProfileBackgroundApi],
	providers: [ProfileBackgroundService],
	exports: [ProfileBackgroundService]
})
export class ProfileBackgroundModule 
{
	constructor() {}
}		



