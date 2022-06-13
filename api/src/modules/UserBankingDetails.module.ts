import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserBankingDetailsService } from '../bll/UserBankingDetails.service';
import { UserBankingDetailsApi } from '../api/UserBankingDetails.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { UserEntityModule } from '../modules/UserEntity.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule), forwardRef(() => UserEntityModule)],
    controllers: [UserBankingDetailsApi],
    providers: [UserBankingDetailsService],
    exports: [UserBankingDetailsService]
})
export class UserBankingDetailsModule {
    constructor() { }
}
