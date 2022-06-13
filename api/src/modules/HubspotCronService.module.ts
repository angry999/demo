import { forwardRef, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/common/http/http.module";
import { DatabaseConnectionPool } from "../dal/DatabaseConnectionPool.provider";
import { DalModule } from "../dal/Dal.module";
import { ScheduleModule } from "@nestjs/schedule";
import { EmailModule } from "./Email.module";
import { InvestmentOrderModule } from "./InvestmentOrder.module";
import { InvestorModule } from "./Investor.module";
import { ProjectModule } from "./Project.module";
import { HubspotDealModule } from "./HubspotDeal.module";
import { HubspotContactModule } from "./HubspotContact.module";
import { HubspotProjectModule } from "./HubspotProject.module";
import { HubspotContactCobrandersModule } from "./HubspotContactCobranders.module";

@Module({
    imports: [HttpModule, ScheduleModule.forRoot(), DalModule
        , forwardRef(() => EmailModule)
        , forwardRef(() => HubspotContactCobrandersModule)
        , forwardRef(() => HubspotProjectModule)
        , forwardRef(() => HubspotContactModule)
        , forwardRef(() => HubspotDealModule)
        , forwardRef(() => ProjectModule)
        , forwardRef(() => InvestorModule)
        , forwardRef(() => InvestmentOrderModule)],
    controllers: [],
    providers: [...DatabaseConnectionPool, HubspotCronServiceModule],
    exports: [HubspotCronServiceModule]
})
export class HubspotCronServiceModule {
    constructor() { }
}

