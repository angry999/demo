import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { RegistrationQuestionService } from '../bll/RegistrationQuestion.service';
import { RegistrationQuestionApi } from '../api/RegistrationQuestion.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule)],
    controllers: [RegistrationQuestionApi],
    providers: [RegistrationQuestionService],
    exports: [RegistrationQuestionService]
})
export class RegistrationQuestionModule {
    constructor() { }
}
