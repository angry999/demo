import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { MailService } from '../bll/Mail.service';
import { MailApi } from '../api/Mail.controller';

/**
 * Nest.js module for REST API's in typescript for Mail
 * NOTE: Generated file, do not touch
 * one email that has been sent
 */
@Module({
	imports: [DalModule ],
	controllers: [MailApi],
	providers: [MailService],
	exports: [MailService]
})
export class MailModule 
{
	constructor() {}
}		



