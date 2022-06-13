import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { OrderAcknowledgementQuestionDal } from '../../dal/OrderAcknowledgementQuestion.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('OrderAcknowledgementQuestionDal', () => {
    let dal: OrderAcknowledgementQuestionDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, OrderAcknowledgementQuestionDal],
            }).compile();

        dal = await app.resolve<OrderAcknowledgementQuestionDal>(OrderAcknowledgementQuestionDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult.sort_order).toBe(1);
        expect(oneResult.question).toBe("Are you a Politically Exposed Person (PEP) as defined below?");
        expect(oneResult.answer_type).toBe(0);
        expect(oneResult.last_changed_by_id).toBe(842);
        expect(oneResult.id).toBe(1);
        expect(oneResult.createtime.toISOString()).toBe("2019-02-06T02:12:05.000Z");
        expect(oneResult.updatetime.toISOString()).toBe("2019-09-24T09:13:28.000Z");
        expect(oneResult.visible).toBe(false);
        expect(oneResult.is_deleted).toBe(false);
    });
});

