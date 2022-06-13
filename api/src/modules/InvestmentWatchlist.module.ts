import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestmentWatchlistService } from '../bll/InvestmentWatchlist.service';
import { InvestmentWatchlistApi } from '../api/InvestmentWatchlist.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectModule } from '../modules/Project.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => ProjectModule)],
    controllers: [InvestmentWatchlistApi],
    providers: [InvestmentWatchlistService],
    exports: [InvestmentWatchlistService]
})
export class InvestmentWatchlistModule {
    constructor() { }
}
