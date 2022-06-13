import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { EventService } from '../bll/Event.service';
import { EventApi } from '../api/Event.controller';

/**
 * Nest.js module for REST API's in typescript for Event
 * NOTE: Generated file, do not touch
 * a noteworthy occurance within the flow of the application
 */
@Module({
	imports: [DalModule ],
	controllers: [EventApi],
	providers: [EventService],
	exports: [EventService]
})
export class EventModule 
{
	constructor() {}
}		



