import { forwardRef, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/common/http/http.module";
import { DalModule } from "../dal/Dal.module";
import { DatabaseConnectionPool } from "../dal/DatabaseConnectionPool.provider";
import { EmailModule } from "./Email.module";
import { EmailService } from "../util/Email";
import { MetricsApi } from "../api/Metrics.controller";
import { MetricsService } from "../bll/Metrics.service";
import { InvestorMetricsDal } from '../dal/InvestorMetricsDal.provider';
import { InvestmentOrderMetricsDal } from '../dal/InvestmentOrderMetricsDal.provider';
import { ProjectMetricsDal } from '../dal/ProjectMetricsDal.provider';
import { MetricsDal } from '../dal/Metrics.provider';
import { AllUserDal } from '../dal/AllUser.provider';
import { AllUserService } from '../bll/AllUser.service';

@Module({
    imports: [HttpModule, DalModule, forwardRef(() => EmailModule)],
    controllers: [MetricsApi],
    providers: [...DatabaseConnectionPool, EmailService, AllUserDal, AllUserService, InvestorMetricsDal, InvestmentOrderMetricsDal, ProjectMetricsDal, MetricsDal, MetricsService],
})
export class MetricsModule {
    constructor() { }
}

