import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { SocialProfileFollowingDal } from '../../dal/SocialProfileFollowing.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('SocialProfileFollowingDal', () => {
    let dal: SocialProfileFollowingDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, SocialProfileFollowingDal],
            }).compile();

        dal = await app.resolve<SocialProfileFollowingDal>(SocialProfileFollowingDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        try {
            let oneResult = await dal.findOneById(1);
            expect(oneResult.follower_id).toBe(null);
            expect(oneResult.following_id).toBe(1);
            expect(oneResult.status).toBe(1);
            expect(oneResult.last_changed_by_id).toBe(null);
            expect(oneResult.id).toBe(1);
            expect(oneResult.updatetime.toISOString()).toBe("2019-05-14T23:36:46.000Z");
            expect(oneResult.createtime.toISOString()).toBe("2038-01-19T03:14:07.000Z");
            expect(oneResult.is_deleted).toBe(false);
        }
        catch (problem) {
            expect(1).toBe(0);
        }
    });
});
