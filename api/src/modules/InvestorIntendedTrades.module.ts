import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { InvestorIntendedTradesService } from '../bll/InvestorIntendedTrades.service';
import { InvestorIntendedTradesApi } from '../api/InvestorIntendedTrades.controller';
import { UserSocialProfileModule } from '../modules/UserSocialProfile.module.generated';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => UserSocialProfileModule), forwardRef(() => AllUserModule)],
    controllers: [InvestorIntendedTradesApi],
    providers: [InvestorIntendedTradesService],
    exports: [InvestorIntendedTradesService]
})
export class InvestorIntendedTradesModule {
    constructor() { }
}
