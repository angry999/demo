import { forwardRef, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/common/http/http.module";
import { HubspotDealService } from "../bll/HubspotDeal.service";
import { InvestmentOrderService } from "../bll/InvestmentOrder.service";
import { InvestmentOrderDal } from "../dal/InvestmentOrder.provider";
import { DatabaseConnectionPool } from "../dal/DatabaseConnectionPool.provider";
import { HubspotDealController } from '../api/HubspotDeal.controller';
import { DalModule } from "../dal/Dal.module";
import { EmailModule } from "./Email.module";
import { EmailService } from "../util/Email";
import { InvestorService } from '../bll/Investor.service';
import { ProjectService } from '../bll/Project.service';
import { HubspotContactService } from '../bll/HubspotContact.service';
import { HubspotContactModule } from './HubspotContact.module';
import { ProvinceService } from '../bll/Province.service';

@Module({
    imports: [HttpModule, forwardRef(() => EmailModule), forwardRef(() => DalModule), forwardRef(() => HubspotContactModule)],
    controllers: [HubspotDealController],
    providers: [...DatabaseConnectionPool, HubspotDealService, HubspotContactService, InvestmentOrderDal, InvestmentOrderService, InvestorService, ProjectService, ProvinceService, EmailService],
    exports: [HubspotDealService]
})
export class HubspotDealModule {
    constructor() { }
}

