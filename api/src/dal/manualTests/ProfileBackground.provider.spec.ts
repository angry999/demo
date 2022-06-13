import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { ProfileBackgroundDal } from '../../dal/ProfileBackground.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('ProfileBackgroundDal', () => {
    let dal: ProfileBackgroundDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, ProfileBackgroundDal],
            }).compile();

        dal = await app.resolve<ProfileBackgroundDal>(ProfileBackgroundDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult.image).toBe("social-profile-1.jpg");
        expect(oneResult.sort_order).toBe(1);
        expect(oneResult.updatetime.toISOString()).toBe("2019-05-11T02:30:42.000Z");
        expect(oneResult.last_changed_by_id).toBe(2);
        expect(oneResult.id).toBe(1);
        expect(oneResult.createtime.toISOString()).toBe("2019-02-06T02:12:05.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});

