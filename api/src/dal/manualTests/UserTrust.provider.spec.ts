import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { UserTrustDal } from '../../dal/UserTrust.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';
import { UserEntityDal } from '../UserEntity.provider';

describe('UserTrustDal', () => {
    let dal: UserTrustDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, UserTrustDal, UserEntityDal],
            }).compile();

        dal = await app.resolve<UserTrustDal>(UserTrustDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(42);
        expect(oneResult.id).toBe(42);
        expect(oneResult.type).toBe(2);
        expect(oneResult.user_id).toBe(5);
        expect(oneResult.client_number).toBe("CAONE350004");
        expect(oneResult.name).toBe("Trustworthy Trust");
        expect(oneResult.registration_date).toBe("2017-01-01");
        expect(oneResult.address).toBe("Bleh St.");
        expect(oneResult.address2).toBe("");
        expect(oneResult.apt_number).toBe(null);
        expect(oneResult.country_id).toBe(39);
        expect(oneResult.province_id).toBe(60);
        expect(oneResult.zip).toBe("A1B 2C3");
        expect(oneResult.city).toBe("Toronto");
        expect(oneResult.email).toBe("funscraperfake@email.ghostinspector.com");
        expect(oneResult.phone).toBe("123-456-7890");
        expect(oneResult.phone_ext).toBe("");
        expect(oneResult.pdf_file).toBe("");
        expect(oneResult.trustee_first_name).toBe("Trustee first name");
        expect(oneResult.trustee_last_name).toBe("trustee last name");
        expect(oneResult.trustee_title).toBe("Settlor");
        expect(oneResult.status).toBe(1);
        expect(oneResult.updatetime.toISOString()).toBe("2019-08-02T16:35:48.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2019-05-10T20:41:20.000Z");
        expect(oneResult.is_deleted).toBe(false);
        expect(oneResult.last_changed_by_id).toBe(843);
    });
});
