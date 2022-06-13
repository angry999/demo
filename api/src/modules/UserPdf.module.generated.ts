import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserPdfService } from '../bll/UserPdf.service';
import { UserPdfApi } from '../api/UserPdf.controller';

/**
 * Nest.js module for REST API's in typescript for UserPdf
 * NOTE: Generated file, do not touch
 * one pdf that exists for one user
 */
@Module({
	imports: [DalModule ],
	controllers: [UserPdfApi],
	providers: [UserPdfService],
	exports: [UserPdfService]
})
export class UserPdfModule 
{
	constructor() {}
}		



