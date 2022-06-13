import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProvinceService } from '../bll/Province.service';
import { ProvinceApi } from '../api/Province.controller';

/**
 * Nest.js module for REST API's in typescript for Province
 * NOTE: Generated file, do not touch
 * a first order geo political breakdown of a country, in some countries this is called a state
 */
@Module({
	imports: [DalModule ],
	controllers: [ProvinceApi],
	providers: [ProvinceService],
	exports: [ProvinceService]
})
export class ProvinceModule 
{
	constructor() {}
}		



