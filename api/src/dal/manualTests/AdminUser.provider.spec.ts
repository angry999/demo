import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { AdminUserDal } from '../../dal/AdminUser.provider';
import { AdminUserRole } from 'fundscraper-model-enums';
import { AdminAccountAvailability } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';
import { AllUserDal } from '../AllUser.provider';

describe('AdminUserDal', () => {
    let dal: AdminUserDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, AdminUserDal, AllUserDal],
            }).compile();

        dal = await app.resolve<AdminUserDal>(AdminUserDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(2);
        expect(oneResult.email).toBe("fundscraperautotest@gmail.com");
        expect(oneResult.user_type).toBe(UserType.admin_user);
        expect(oneResult.first_name).toBe("admin2");
        expect(oneResult.last_name).toBe("test2");
        expect(oneResult.identity_provider).toBe(null);
        expect(oneResult.user_principle_name).toBe(null);
        expect(oneResult.location).toBe("Canada");
        expect(oneResult.timezone).toBe("America/New_York");
        expect(oneResult.availability).toBe(AdminAccountAvailability.active);
        expect(oneResult.token).toBe("");
        expect(oneResult.token_update.toISOString()).toBe("2019-05-30T11:02:41.000Z");
        expect(oneResult.flag).toBe("ca.png");
        expect(oneResult.role).toBe("Administrator");
        expect(oneResult.admin_role).toBe(AdminUserRole.superUser);
        expect(oneResult.avatar_image_file_name).toBe("avatar.jpg");
        expect(oneResult.username).toBe("admin2");
        expect(oneResult.last_changed_by_id).toBe(2);
        expect(oneResult.id).toBe(2);
        expect(oneResult.is_deleted).toBe(false);
    });
});
