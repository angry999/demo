import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ImportedContactService } from '../bll/ImportedContact.service';
import { ImportedContactApi } from '../api/ImportedContact.controller';

/**
 * Nest.js module for REST API's in typescript for ImportedContact
 * NOTE: Generated file, do not touch
 * one external contact imported with permission for a given user
 */
@Module({
	imports: [DalModule ],
	controllers: [ImportedContactApi],
	providers: [ImportedContactService],
	exports: [ImportedContactService]
})
export class ImportedContactModule 
{
	constructor() {}
}		



