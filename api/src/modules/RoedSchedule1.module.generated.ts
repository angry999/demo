import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { RoedSchedule1Service } from '../bll/RoedSchedule1.service';
import { RoedSchedule1Api } from '../api/RoedSchedule1.controller';

/**
 * Nest.js module for REST API's in typescript for RoedSchedule1
 * NOTE: Generated file, do not touch
 * 
 */
@Module({
	imports: [DalModule ],
	controllers: [RoedSchedule1Api],
	providers: [RoedSchedule1Service],
	exports: [RoedSchedule1Service]
})
export class RoedSchedule1Module 
{
	constructor() {}
}		



