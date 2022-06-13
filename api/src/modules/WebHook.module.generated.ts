import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { WebHookService } from '../bll/WebHook.service';
import { WebHookApi } from '../api/WebHook.controller';

/**
 * Nest.js module for REST API's in typescript for WebHook
 * NOTE: Generated file, do not touch
 * one url to be invoked upon a given event ocurrance
 */
@Module({
	imports: [DalModule ],
	controllers: [WebHookApi],
	providers: [WebHookService],
	exports: [WebHookService]
})
export class WebHookModule 
{
	constructor() {}
}		



