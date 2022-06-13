import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserAnswerService } from '../bll/UserAnswer.service';
import { UserAnswerApi } from '../api/UserAnswer.controller';
import { UserEntityModule } from '../modules/UserEntity.module.generated';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { RegistrationQuestionModule } from '../modules/RegistrationQuestion.module';

@Module({
    imports: [DalModule, forwardRef(() => UserEntityModule), forwardRef(() => AllUserModule), forwardRef(() => RegistrationQuestionModule)],
    controllers: [UserAnswerApi],
    providers: [UserAnswerService],
    exports: [UserAnswerService]
})
export class UserAnswerModule {
    constructor() { }
}
