import { forwardRef, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/common/http/http.module";
import { HubspotContactService } from "../bll/HubspotContact.service";
import { InvestorService } from "../bll/Investor.service";
import { InvestorDal } from "../dal/Investor.provider";
import { DatabaseConnectionPool } from "../dal/DatabaseConnectionPool.provider";
import { HubspotContactController } from '../api/HubspotContact.controller';
import { DalModule } from "../dal/Dal.module";
import { EmailModule } from "./Email.module";
import { EmailService } from "../util/Email";
import { ProvinceService } from "../bll/Province.service";
import { ProvinceDal } from "../dal/Province.provider";
import { InvestorModule } from './Investor.module';
import { ProvinceModule } from './Province.module';

@Module({
    imports: [HttpModule, forwardRef(() => EmailModule), forwardRef(() => DalModule), forwardRef(() => InvestorModule), forwardRef(() => ProvinceModule)],
    controllers: [HubspotContactController],
    providers: [...DatabaseConnectionPool, InvestorDal, InvestorService, EmailService, ProvinceDal, ProvinceService, HubspotContactService],
    exports: [HubspotContactService]
})
export class HubspotContactModule {
    constructor() { }
}

