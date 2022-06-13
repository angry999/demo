import { Test, TestingModule } from '@nestjs/testing';
import { UserType } from 'fundscraper-model-enums';
import { DatabaseConnectionPool } from '../DatabaseConnectionPool.provider';
import { SettingDal } from '../../dal/Setting.provider';
import { UserIdentification } from '../../security/UserIdentification';

describe('SettingsDal', () => {
    let dal: SettingDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, SettingDal],
            }).compile();

        dal = await app.resolve<SettingDal>(SettingDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult.zip).toBe("M5V 1J9");
        expect(oneResult.info_email).toBe("fsinfo@email.ghostinspector.com");
        expect(oneResult.pinterest).toBe("");
        expect(oneResult.dev_company).toBe("");
        expect(oneResult.dev_fax).toBe("");
        expect(oneResult.province).toBe("Ontario");
        expect(oneResult.petoes).toBe("$7kJMld6oWcMw");
        expect(oneResult.linkedin).toBe("https://www.linkedin.com/company/fundscraper/");
        expect(oneResult.dev_address).toBe("");
        expect(oneResult.dev_email).toBe("");
        expect(oneResult.country).toBe("Canada");
        expect(oneResult.title).toBe("Simplified Real Estate Investing.");
        expect(oneResult.instagram).toBe("https://instagram.com/fundscraper");
        expect(oneResult.dev_address2).toBe("");
        expect(oneResult.dev_web).toBe("");
        expect(oneResult.site_name).toBe("Real estate investing, using the power of the crowd");
        expect(oneResult.keywords).toBe("Real estate, Investing, Get Funding, Raise Capital, Diversified assets, Accredited Investors, Mortgages, Loan Solutions, Alternative investing, Wealth, Marketplace");
        expect(oneResult.tumblr).toBe("");
        expect(oneResult.dev_city).toBe("");
        expect(oneResult.timezone).toBe("");
        expect(oneResult.company).toBe("Fundscraper Capital Inc.");
        expect(oneResult.site_domain).toBe("https://www.fundreacher.ca/demo/mipagescms");
        expect(oneResult.description).toBe("Fundscraper is a technology enabled platform for investing into real estate.  Our marketplace empowers individuals with the ability to co-invest alongside our institutional partners into great real estate investment opportunities.");
        expect(oneResult.youtube).toBe("");
        expect(oneResult.dev_zip).toBe("");
        expect(oneResult.address).toBe("805 - 370 King Street West");
        expect(oneResult.phone).toBe("");
        expect(oneResult.facebook).toBe("https://www.facebook.com/fundscraper");
        expect(oneResult.blog).toBe("");
        expect(oneResult.dev_province).toBe("");
        expect(oneResult.address2).toBe("");
        expect(oneResult.phone2).toBe("+1 (888) 281-2235");
        expect(oneResult.twitter).toBe("https://twitter.com/fundscraper");
        expect(oneResult.relationship_disclosure).toBe("Fundscraper-Relationship-Disclosure.pdf");
        expect(oneResult.dev_country).toBe("");
        expect(oneResult.city).toBe("Toronto");
        expect(oneResult.fax).toBe("");
        expect(oneResult.google).toBe("");
        expect(oneResult.dev_phone).toBe("");
        expect(oneResult.last_changed_by_id).toBe(7);
        expect(oneResult.id).toBe(1);
        expect(oneResult.updatetime.toISOString()).toBe("2019-11-11T14:45:38.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2019-02-10T20:11:43.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});
