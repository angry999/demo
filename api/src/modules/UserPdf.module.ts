import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserPdfService } from '../bll/UserPdf.service';
import { UserPdfApi } from '../api/UserPdf.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { InvestmentOrderModule } from '../modules/InvestmentOrder.module';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => InvestmentOrderModule)],
    controllers: [UserPdfApi],
    providers: [UserPdfService],
    exports: [UserPdfService]
})
export class UserPdfModule {
    constructor() { }
}
