import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { UserSubscriptionDal } from '../../dal/UserSubscription.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('UserSubscriptionDal', () => {
    let dal: UserSubscriptionDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, UserSubscriptionDal],
            }).compile();

        dal = await app.resolve<UserSubscriptionDal>(UserSubscriptionDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult.email).toBe("hparesh.patel@gmail.com");
        expect(oneResult.flag).toBe("marketing");
        expect(oneResult.status).toBe(0);
        expect(oneResult.user_id).toBe(1);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.id).toBe(1);
        expect(oneResult.updatetime.toISOString()).toBe("2019-05-14T23:36:45.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2038-01-19T03:14:07.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});
