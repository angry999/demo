import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { OrderAcknowledgementQuestionService } from '../bll/OrderAcknowledgementQuestion.service';
import { OrderAcknowledgementQuestionApi } from '../api/OrderAcknowledgementQuestion.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule)],
    controllers: [OrderAcknowledgementQuestionApi],
    providers: [OrderAcknowledgementQuestionService],
    exports: [OrderAcknowledgementQuestionService]
})
export class OrderAcknowledgementQuestionModule {
    constructor() { }
}
