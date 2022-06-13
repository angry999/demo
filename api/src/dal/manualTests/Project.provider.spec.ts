import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { ProjectDal } from '../../dal/Project.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('ProjectDal', () => {
    let dal: ProjectDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, ProjectDal],
            }).compile();

        dal = await app.resolve<ProjectDal>(ProjectDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(10);
        expect(oneResult.id).toBe(10);
        expect(oneResult.project_no).toBe(110);
        expect(oneResult.name).toBe("Test Project ABC (Test for Debt Market Value / Unit)");
        expect(oneResult.legal_name).toBe("Test Project ABC (Test for Debt Market Value / Unit)");
        expect(oneResult.seoname).toBe(null);
        expect(oneResult.contents).toBe("This project is set up to test the ability to adjust the market value / unit on a debt project.");
        expect(oneResult.sponsor_label).toBe(false);
        expect(oneResult.issuer_id).toBe(31);
        expect(oneResult.project_stage).toBe(4);
        expect(oneResult.capital_type).toBe(3);
        expect(oneResult.asset_type).toBe(5);
        expect(oneResult.development_type).toBe(4);
        expect(oneResult.offering_amount).toBe(1000000);
        expect(oneResult.annual_irr).toBe("");
        expect(oneResult.loan_to_value_ratio).toBe(null);
        expect(oneResult.matrix_id).toBe(0);
        expect(oneResult.matrix_input).toBe(null);
        expect(oneResult.currency_label).toBe(0);
        expect(oneResult.share_price).toBe(10);
        expect(oneResult.market_price).toBe(12.5);
        expect(oneResult.sale_price).toBe(0);
        expect(oneResult.default_share).toBe(0);
        expect(oneResult.min_share).toBe(10000);
        expect(oneResult.max_share).toBe(100000);
        expect(oneResult.interest_rate).toBe("8.5%");
        expect(oneResult.investment_term).toBe("3-5 Years");
        expect(oneResult.minimum_duration_units).toBe(null);
        expect(oneResult.maximum_duration_units).toBe(null);
        expect(oneResult.minimum_duration_type).toBe(null);
        expect(oneResult.maximum_duration_type).toBe(null);
        expect(oneResult.funded_flag).toBe(false);
        expect(oneResult.dividend_desc).toBe("Dividend Description");
        expect(oneResult.debt_seniority).toBe("1");
        expect(oneResult.redeem_ability).toBe("Yes");
        expect(oneResult.investment_eligibility).toBe("Non-registered,RSP,TFSA");
        expect(oneResult.redemption_info).toBe("Info on Redemption");
        expect(oneResult.address).toBe("123 Debt Avenue");
        expect(oneResult.zip).toBe("A3C 3B5");
        expect(oneResult.city).toBe("Toronto");
        expect(oneResult.province_id).toBe(60);
        expect(oneResult.country_id).toBe(null);
        expect(oneResult.image).toBe("project-10.jpg");
        expect(oneResult.credit_guarantee).toBe("Credit Guarantee Description");
        expect(oneResult.issuer_business).toBe("Mortgages");
        expect(oneResult.agent_name).toBe("Fundscraper Capital Inc.");
        expect(oneResult.agent_commission).toBe(1);
        expect(oneResult.registrant_contact).toBe("123 Debt Avenue, (416) 123-4567, 123debt@123debt.com");
        expect(oneResult.use_of_proceeds).toBe("Mortgages");
        expect(oneResult.additional_desc).toBe("");
        expect(oneResult.acknowledgements).toBe("Investment Acknowledgement 1^Investment Acknowledgement 2^Investment Acknowledgement 3");
        expect(oneResult.long_desc).toBe("Mortgages Long Description");
        expect(oneResult.disclaimer_note).toBe("Mortgages Disclaimer Note");
        expect(oneResult.properties).toBe("");
        expect(oneResult.tabs).toBe("");
        expect(oneResult.is_private).toBe(false);
        expect(oneResult.private_ids).toBe("");
        expect(oneResult.auto_invite).toBe(false);
        expect(oneResult.allow_ineligible).toBe(false);
        expect(oneResult.system_status).toBe(0);
        expect(oneResult.drip_available).toBe(false);
        expect(oneResult.use_system_om).toBe(false);
        expect(oneResult.show_on_home).toBe(true);
        expect(oneResult.over_subscriptions).toBe(true);
        expect(oneResult.exempt_option_id).toBe(16);
        expect(oneResult.roed_exemption).toBe(false);
        expect(oneResult.roed_exemption_list).toBe("0");
        expect(oneResult.view_counts).toBe(0);
        expect(oneResult.sort_order).toBe(9);
        expect(oneResult.docusign_template_dev_test).toBe("");
        expect(oneResult.docusign_template_production).toBe("");
        expect(oneResult.docusign_template_merge_rules).toBe("");
        expect(oneResult.docusign_additional_recipients_sending_order).toBe(null);
        expect(oneResult.docusign_additional_recipients_role_name).toBe(null);
        expect(oneResult.docusign_additional_recipients_person_name).toBe(null);
        expect(oneResult.docusign_additional_recipients_person_email).toBe(null);
        expect(oneResult.trust_company_names).toBe(null);
        expect(oneResult.total_share).toBe(100000);
        expect(oneResult.funding_start.toISOString()).toBe("2017-11-12T05:00:00.000Z");
        expect(oneResult.funding_expiry.toISOString()).toBe("2017-11-30T05:00:00.000Z");
        expect(oneResult.maturity_date.toISOString()).toBe("2018-11-12T05:00:00.000Z");
        expect(oneResult.last_changed_by_id).toBe(2);
        expect(oneResult.createtime.toISOString()).toBe("2019-05-11T02:21:13.000Z");
        expect(oneResult.updatetime.toISOString()).toBe("2020-10-09T17:29:16.000Z");
        expect(oneResult.is_deleted).toBe(false);
        expect(oneResult.notification).toBe(false);
        expect(oneResult.daysleft_flag).toBe(false);
        expect(oneResult.commission_type).toBe(0);
    });
});

