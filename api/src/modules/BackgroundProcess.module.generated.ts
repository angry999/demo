import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { BackgroundProcessService } from '../bll/BackgroundProcess.service';
import { BackgroundProcessApi } from '../api/BackgroundProcess.controller';

/**
 * Nest.js module for REST API's in typescript for BackgroundProcess
 * NOTE: Generated file, do not touch
 * one job that needs to be run in the background
 */
@Module({
	imports: [DalModule ],
	controllers: [BackgroundProcessApi],
	providers: [BackgroundProcessService],
	exports: [BackgroundProcessService]
})
export class BackgroundProcessModule 
{
	constructor() {}
}		



