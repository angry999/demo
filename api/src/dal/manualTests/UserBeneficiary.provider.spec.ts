import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { UserBeneficiaryDal } from '../../dal/UserBeneficiary.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';
import { UserEntityDal } from '../UserEntity.provider';

describe('UserBeneficiaryDal', () => {
    let dal: UserBeneficiaryDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, UserBeneficiaryDal, UserEntityDal],
            }).compile();

        dal = await app.resolve<UserBeneficiaryDal>(UserBeneficiaryDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(72);
        expect(oneResult.beneficiary_first_name).toBe("Tyler");
        expect(oneResult.beneficiary_last_name).toBe("Chen");
        expect(oneResult.beneficiary_relationship).toBe("Brother");
        expect(oneResult.beneficiary_share).toBe("100");
        expect(oneResult.comments).toBe("");
        expect(oneResult.type).toBe(3);
        expect(oneResult.client_number).toBe("CAOND350016");
        expect(oneResult.name).toBe("TC Managed Account");
        expect(oneResult.address).toBe("789 Sesame Street");
        expect(oneResult.address2).toBe("");
        expect(oneResult.city).toBe("Toronto");
        expect(oneResult.province_id).toBe(60);
        expect(oneResult.country_id).toBe(39);
        expect(oneResult.zip).toBe("n5n 8g8");
        expect(oneResult.pdf_file).toBe("");
        expect(oneResult.status).toBe(0);
        expect(oneResult.user_id).toBe(49);
        expect(oneResult.updatetime.toISOString()).toBe("2019-08-02T16:35:48.000Z");
        expect(oneResult.last_changed_by_id).toBe(843);
        expect(oneResult.id).toBe(72);
        expect(oneResult.createtime.toISOString()).toBe("2019-05-10T20:41:20.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});
