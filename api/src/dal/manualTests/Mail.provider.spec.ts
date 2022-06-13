import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { MailDal } from '../../dal/Mail.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('MailDal', () => {
    let dal: MailDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, MailDal],
            }).compile();

        dal = await app.resolve<MailDal>(MailDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(75);
        expect(oneResult.to_id).toBe(5);
        expect(oneResult.id).toBe(75);
        expect(oneResult.from_id).toBe(7);
        expect(oneResult.address_sent_to).toBe("luan.ha@gmail.com");
        expect(oneResult.subject).toBe("Fundscraper Order Confirmation # ST-101-103-00056");
        //expect(oneResult.raw_body).toBe(null);
        expect(oneResult.attachment).toBe("");
        expect(oneResult.status).toBe(0);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.createtime.toISOString()).toBe("2019-02-07T10:23:56.000Z");
        expect(oneResult.updatetime.toISOString()).toBe("2017-01-23T04:19:23.000Z");
        expect(oneResult.flag).toBe(false);
        expect(oneResult.stared).toBe(false);
        expect(oneResult.is_deleted).toBe(false);
        expect(oneResult.sent_ok).toBe(true);
    });
});

