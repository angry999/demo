
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { UserSocialPostDal } from '../../dal/UserSocialPost.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('UserSocialPostDal', () => {
    let dal: UserSocialPostDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, UserSocialPostDal],
            }).compile();

        dal = await app.resolve<UserSocialPostDal>(UserSocialPostDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult.profile_id).toBe(1);
        expect(oneResult.post_type).toBe("join");
        expect(oneResult.related_profile_id).toBe(1);
        expect(oneResult.related_post_id).toBe(null);
        expect(oneResult.status).toBe(0);
        expect(oneResult.image).toBe("");
        expect(oneResult.post).toBe("");
        expect(oneResult.link).toBe("");
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.id).toBe(1);
        expect(oneResult.updatetime.toISOString()).toBe("2019-05-14T23:36:46.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2038-01-19T03:14:07.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});
