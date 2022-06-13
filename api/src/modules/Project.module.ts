import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectService } from '../bll/Project.service';
import { ProjectApi } from '../api/Project.controller';
import { CountryModule } from '../modules/Country.module';
import { UserSocialProfileModule } from '../modules/UserSocialProfile.module.generated';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProvinceModule } from '../modules/Province.module';
import { ProjectDocusignMappingModule } from '../modules/ProjectDocusignMapping.module';
import { InvestmentOrderModule } from '../modules/InvestmentOrder.module';
import { InvestmentTransactionModule } from '../modules/InvestmentTransaction.module';
import { InvestmentWatchlistModule } from '../modules/InvestmentWatchlist.module';
import { ProjectAccountModule } from '../modules/ProjectAccount.module';
import { ProjectBalanceAdjustmentModule } from '../modules/ProjectBalanceAdjustment.module';
import { ProjectEntityModule } from '../modules/ProjectEntity.module';
import { ProjectImageModule } from '../modules/ProjectImage.module';
import { ProjectKeybackerModule } from '../modules/ProjectKeybacker.module';
import { ProjectPdfModule } from '../modules/ProjectPdf.module';
import { ProjectStatusReportModule } from '../modules/ProjectStatusReport.module';
import { ProjectTaxReportModule } from '../modules/ProjectTaxReport.module';
import { ProjectTaxSummaryModule } from '../modules/ProjectTaxSummary.module';

@Module({
    imports: [DalModule, forwardRef(() => CountryModule), forwardRef(() => UserSocialProfileModule), forwardRef(() => AllUserModule), forwardRef(() => ProvinceModule), forwardRef(() => ProjectDocusignMappingModule), forwardRef(() => InvestmentOrderModule), forwardRef(() => InvestmentTransactionModule), forwardRef(() => InvestmentWatchlistModule), forwardRef(() => ProjectAccountModule), forwardRef(() => ProjectBalanceAdjustmentModule), forwardRef(() => ProjectEntityModule), forwardRef(() => ProjectImageModule), forwardRef(() => ProjectKeybackerModule), forwardRef(() => ProjectPdfModule), forwardRef(() => ProjectStatusReportModule), forwardRef(() => ProjectTaxReportModule), forwardRef(() => ProjectTaxSummaryModule)],
    controllers: [ProjectApi],
    providers: [ProjectService],
    exports: [ProjectService]
})
export class ProjectModule {
    constructor() { }
}
