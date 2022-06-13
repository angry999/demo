import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { UserEntityDal } from '../../dal/UserEntity.provider';
import { UserCorporationDal } from '../../dal/UserCorporation.provider';
import { UserCorporation } from '../../model/UserCorporation.entity.generated';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('UserEntityDal', () => {
    let dal: UserEntityDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, UserEntityDal, UserCorporationDal],
            }).compile();

        dal = await app.resolve<UserEntityDal>(UserEntityDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let aResult = await dal.findOneById(1);
        let oneResult = aResult as UserCorporation;
        expect(oneResult.company_province_id).toBe(-1);
        expect(oneResult.reg_no).toBe("P-CORP-785623785");
        expect(oneResult.reg_domicile).toBe("Ontario-Canada");
        expect(oneResult.business_nature).toBe("Investment Firm");
        expect(oneResult.shareholder).toBe("No");
        expect(oneResult.shareholder_first_name).toBe("Significant - 1^Significant - 2");
        expect(oneResult.shareholder_last_name).toBe("shareholders^shareholders");
        expect(oneResult.shareholder_address).toBe("New Line Cross Roads^New Line Cross Roads");
        expect(oneResult.shareholder_canadian).toBe("Yes^Yes");
        expect(oneResult.signing_officer_first_name).toBe("Paresh");
        expect(oneResult.signing_officer_last_name).toBe("Patel");
        expect(oneResult.signing_officer_title).toBe("Chair Person");
        expect(oneResult.director_first_name).toBe("Mr Patel^Mr Patel");
        expect(oneResult.director_last_name).toBe("First^Second");
        expect(oneResult.director_address).toBe("first@fs.com^second@fs.com");
        expect(oneResult.director_canadian).toBe("Yes^Yes");
        expect(oneResult.type).toBe(1);
        expect(oneResult.user_id).toBe(1);
        expect(oneResult.client_number).toBe("CAONB350001");
        expect(oneResult.name).toBe("Patel Corporation");
        expect(oneResult.address).toBe("701 Evans Avenue");
        expect(oneResult.address2).toBe("Suite 308");
        expect(oneResult.city).toBe("Toronto");
        expect(oneResult.province_id).toBe(60);
        expect(oneResult.country_id).toBe(39);
        expect(oneResult.zip).toBe("L4Z 1H8");
        expect(oneResult.email).toBe("hparesh.patel@gmail.com");
        expect(oneResult.phone).toBe("+9-978-900-110");
        expect(oneResult.phone_ext).toBe("");
        expect(oneResult.registration_date).toBe("2015-04-01");
        expect(oneResult.pdf_file).toBe("");
        expect(oneResult.status).toBe(1);
        expect(oneResult.last_changed_by_id).toBe(843);
        expect(oneResult.id).toBe(1);
        expect(oneResult.updatetime.toISOString()).toBe("2019-08-02T16:35:48.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2019-05-10T20:41:20.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });

});
