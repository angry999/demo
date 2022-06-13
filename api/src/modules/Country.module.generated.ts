import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { CountryService } from '../bll/Country.service';
import { CountryApi } from '../api/Country.controller';

/**
 * Nest.js module for REST API's in typescript for Country
 * NOTE: Generated file, do not touch
 * a primary geopolitical entity
 */
@Module({
	imports: [DalModule ],
	controllers: [CountryApi],
	providers: [CountryService],
	exports: [CountryService]
})
export class CountryModule 
{
	constructor() {}
}		



