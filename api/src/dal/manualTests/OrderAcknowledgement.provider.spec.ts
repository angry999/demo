import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { OrderAcknowledgementDal } from '../../dal/OrderAcknowledgement.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('OrderAcknowledgementDal', () => {
    let dal: OrderAcknowledgementDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, OrderAcknowledgementDal],
            }).compile();

        dal = await app.resolve<OrderAcknowledgementDal>(OrderAcknowledgementDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(15);
        expect(oneResult.order_id).toBe(21);
        expect(oneResult.question_text).toBe("Are you a Politically Exposed Person (PEP) as defined below?");
        expect(oneResult.acknowledgement_order).toBe(1);
        expect(oneResult.answer).toBe("no");
        expect(oneResult.answer_text).toBe("");
        expect(oneResult.user_id).toBe(5);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.id).toBe(15);
        expect(oneResult.updatetime.toISOString()).toBe("2017-08-07T14:34:25.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2019-02-07T10:23:55.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});

