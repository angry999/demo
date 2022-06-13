import { forwardRef, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/common/http/http.module";
import { DalModule } from "../dal/Dal.module";
import { DatabaseConnectionPool } from "../dal/DatabaseConnectionPool.provider";
import { EmailModule } from "./Email.module";
import { EmailService } from "../util/Email";
import { HubspotContactCobrandersController } from "../api/HubspotContactCobranders.controller";
import { HubspotContactCobrandersService } from "../bll/HubspotContactCobranders.service";
import { SponsorSocialProfileDal } from "../dal/SponsorSocialProfile.provider";
import { SponsorSocialProfileService } from "../bll/SponsorSocialProfile.service";

@Module({
	imports: [HttpModule, DalModule, forwardRef(() => EmailModule)],
	controllers: [HubspotContactCobrandersController],
	providers: [...DatabaseConnectionPool, HubspotContactCobrandersService, SponsorSocialProfileDal, SponsorSocialProfileService, EmailService], 
	exports: [HubspotContactCobrandersService]
})
export class HubspotContactCobrandersModule 
{
	constructor() {}
}	

