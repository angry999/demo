import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { InvestorDal } from '../../dal/Investor.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';
import { InvestmentOrderDal } from '../../dal/InvestmentOrder.provider';
import { UserBasicDal } from '../../dal/UserBasic.provider';
import { AllUserDal } from '../AllUser.provider';
import { AdminUserDal } from '../AdminUser.provider';

describe('InvestorDal', () => {
    let dal: InvestorDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, InvestorDal, InvestmentOrderDal, UserBasicDal, AllUserDal, AdminUserDal],
            }).compile();

        dal = await app.resolve<InvestorDal>(InvestorDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(5);
        expect(oneResult.id).toBe(5);
        expect(oneResult.user_type).toBe("i");
        expect(oneResult.first_name).toBe("Luan");
        expect(oneResult.last_name).toBe("Ha");
        expect(oneResult.email).toBe("luan.ha.gmail.com@email.ghostinspector.com");
        expect(oneResult.status).toBe(1);
        expect(oneResult.last_login.toISOString()).toBe("2019-04-19T16:11:55.000Z");
        expect(oneResult.email_verified_status).toBe(true);
        expect(oneResult.linkedin).toBe("");
        expect(oneResult.facebook).toBe("");
        expect(oneResult.google_address).toBe(null);
        expect(oneResult.apt_number).toBe(null);
        expect(oneResult.actual_investment_level).toBe(2);
        expect(oneResult.user_proposed_investment_level).toBe(2);
        expect(oneResult.exemption).toBe(false);
        expect(oneResult.eligible_exemption).toBe(false);
        expect(oneResult.statements_flag).toBe(true);
        expect(oneResult.kyc_confirmed).toBe(false);
        expect(oneResult.equifax_confirmed).toBe(false);
        expect(oneResult.identity_confirmed).toBe(false);
        expect(oneResult.citizen).toBe("Yes");
        expect(oneResult.resident).toBe("Yes");
        expect(oneResult.address).toBe("21 Fern Avenue");
        expect(oneResult.zip).toBe("L4B 3R6");
        expect(oneResult.city).toBe("Richmond Hill");
        expect(oneResult.province_id).toBe(60);
        expect(oneResult.mailing_address).toBe("21 Fern Avenue");
        expect(oneResult.mailing_zip).toBe("L4B 3R6");
        expect(oneResult.mailing_city).toBe("Richmond Hill");
        expect(oneResult.mailing_apt_number).toBe(null);
        expect(oneResult.sin).toBe("");
        expect(oneResult.phone).toBe("647-924-4313");
        expect(oneResult.workphone).toBe("");
        expect(oneResult.homephone).toBe("");
        expect(oneResult.fax).toBe("");
        expect(oneResult.workemail).toBe("");
        expect(oneResult.dob).toBe("1984-08-31");
        expect(oneResult.notes).toBe("");
        expect(oneResult.section_23).toBe("D");
        expect(oneResult.section_29).toBe("F");
        expect(oneResult.is_registrant).toBe("Yes");
        expect(oneResult.is_insider).toBe("No");
        expect(oneResult.legal_person).toBe("");
        expect(oneResult.client_number).toBe("CAONA350004");
        expect(oneResult.utm_source).toBe(null);
        expect(oneResult.utm_medium).toBe(null);
        expect(oneResult.utm_campaign).toBe(null);
        expect(oneResult.utm_content).toBe(null);
        expect(oneResult.utm_term).toBe(null);
        expect(oneResult.suspend_request).toBe(false);
        expect(oneResult.country_id).toBe(39);
        expect(oneResult.mailing_country_id).toBe(39);
        expect(oneResult.mailing_province_id).toBe(60);
        expect(oneResult.cobranded_client_of_id).toBe(31);
        expect(oneResult.referral_link).toBe(null);
        expect(oneResult.identity_provider).toBe(null);
        expect(oneResult.user_principle_name).toBe(null);
        expect(oneResult.last_edit.toISOString()).toBe("2018-01-11T14:12:36.000Z");
        expect(oneResult.signup_date.toISOString()).toBe("2017-01-20T20:19:36.000Z");
        expect(oneResult.is_deleted).toBe(false);
        expect(oneResult.createtime.toISOString()).toBe("2019-05-10T14:09:21.000Z");
    });

    it('findAllByFilter predefined, expand and check values', async () => {
        try {
            let allResults = await dal.findAllByFilter(`id in (5, 65)`, null, ['orders', 'last_changed_by']);
            expect(allResults.length).toBe(2);
            let oneResult = allResults[0];
            let twoResults = allResults[1];
            expect(oneResult.id).toBe(5);
            expect(oneResult.user_type).toBe("i");
            expect(oneResult.first_name).toBe("Luan");
            expect(oneResult.last_name).toBe("Ha");
        }
        catch (problem) {
            expect(1).toBe(0);
        }
    });
});
