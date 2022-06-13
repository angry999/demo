import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { SupportEngineerDal } from '../../dal/SupportEngineer.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('SupportEngineerDal', () => {
    let dal: SupportEngineerDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, SupportEngineerDal],
            }).compile();

        dal = await app.resolve<SupportEngineerDal>(SupportEngineerDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult.user_id).toBe(10);
        expect(oneResult.first_name).toBe("Mr. Gregory");
        expect(oneResult.last_name).toBe("Colford");
        expect(oneResult.title).toBe("Concierge Desk Rep.");
        expect(oneResult.phone).toBe("416-315-7141");
        expect(oneResult.email).toBe("gregory.colford@fundscraper.com");
        expect(oneResult.image).toBe("engg_1.jpg");
        expect(oneResult.content).toBe("");
        expect(oneResult.profile_cap).toBe(50);
        expect(oneResult.sort_order).toBe(1);
        expect(oneResult.updatetime).toBe(null);
        expect(oneResult.last_changed_by_id).toBe(8);
        expect(oneResult.id).toBe(1);
        expect(oneResult.createtime.toISOString()).toBe("2019-05-10T14:09:26.000Z");
        expect(oneResult.visible).toBe(false);
        expect(oneResult.is_deleted).toBe(false);
    });
});
