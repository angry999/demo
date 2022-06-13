import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { UserInvitationDal } from '../../dal/UserInvitation.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('UserInvitationDal', () => {
    let dal: UserInvitationDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, UserInvitationDal],
            }).compile();

        dal = await app.resolve<UserInvitationDal>(UserInvitationDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(6);
        expect(oneResult.id).toBe(6);
        expect(oneResult.first_name).toBe("my-first");
        expect(oneResult.last_name).toBe("my-last");
        expect(oneResult.email).toBe("fred16@email.ghostinspector.com");
        expect(oneResult.message).toBe("");
        expect(oneResult.status).toBe(0);
        expect(oneResult.user_id).toBe(59);
        expect(oneResult.last_changed_by_id).toBe(59);
        expect(oneResult.updatetime.toISOString()).toBe("2019-12-10T10:31:39.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2019-12-10T10:31:39.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});
