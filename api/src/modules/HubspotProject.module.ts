import { forwardRef, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/common/http/http.module";
import { ProjectService } from "../bll/Project.service";
import { ProjectDal } from "../dal/Project.provider";
import { DalModule } from "../dal/Dal.module";
import { DatabaseConnectionPool } from "../dal/DatabaseConnectionPool.provider";
import { EmailModule } from "./Email.module";
import { EmailService } from "../util/Email";
import { HubspotProjectService } from "../bll/HubspotProject.service";
import { HubspotProjectController } from "../api/HubspotProject.controller";

@Module({
	imports: [HttpModule, forwardRef(() => DalModule), forwardRef(() => EmailModule)],
	controllers: [HubspotProjectController],
	providers: [...DatabaseConnectionPool, HubspotProjectService, ProjectDal, ProjectService, EmailService], 
	exports: [HubspotProjectService]
})
export class HubspotProjectModule 
{
	constructor() {}
}	

