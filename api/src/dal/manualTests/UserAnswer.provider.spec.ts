import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { UserAnswerDal } from '../../dal/UserAnswer.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('UserAnswerDal', () => {
    let dal: UserAnswerDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, UserAnswerDal],
            }).compile();

        dal = await app.resolve<UserAnswerDal>(UserAnswerDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(86);
        expect(oneResult.entity_id).toBe(null);
        expect(oneResult.question_id).toBe(12);
        expect(oneResult.question_text).toBe("What is your expected investment time horizon?");
        expect(oneResult.answer_text).toBe("3-5 years");
        expect(oneResult.category).toBe(1);
        expect(oneResult.answer_type).toBe(2);
        expect(oneResult.user_id).toBe(13);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.id).toBe(86);
        expect(oneResult.updatetime.toISOString()).toBe("2017-02-06T18:08:52.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2019-05-10T14:09:18.000Z");
        expect(oneResult.is_deleted).toBe(false);
        expect(oneResult.status).toBe(0);
    });
});
