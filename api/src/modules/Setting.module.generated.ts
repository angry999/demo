import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { SettingService } from '../bll/Setting.service';
import { SettingApi } from '../api/Setting.controller';

/**
 * Nest.js module for REST API's in typescript for Setting
 * NOTE: Generated file, do not touch
 * a whole bunch of settings for the system
 */
@Module({
	imports: [DalModule ],
	controllers: [SettingApi],
	providers: [SettingService],
	exports: [SettingService]
})
export class SettingModule 
{
	constructor() {}
}		



