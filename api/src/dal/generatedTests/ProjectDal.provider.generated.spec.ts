import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { ProjectDal } from '../../dal/Project.provider';
import { Project } from '../../model/Project.entity.generated';
import { ProjectStage } from 'fundscraper-model-enums';
import { ProjectCapitalType } from 'fundscraper-model-enums';
import { ProjectAssetType } from 'fundscraper-model-enums';
import { ProjectDevelopmentType } from 'fundscraper-model-enums';
import { CurrencyCode } from 'fundscraper-model-enums';
import { DurationType } from 'fundscraper-model-enums';
import { DebtSeniorityType } from 'fundscraper-model-enums';
import { CommisionType } from 'fundscraper-model-enums';
import { ProjectUseStatus } from 'fundscraper-model-enums';
import { CountryDal } from '../../dal/Country.provider';
import { UserSocialProfileDal } from '../../dal/UserSocialProfile.provider';
import { AllUserDal } from '../../dal/AllUser.provider';
import { ProvinceDal } from '../../dal/Province.provider';

describe('ProjectDal-generated', () => {
    let dal: ProjectDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<ProjectDal>(ProjectDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Find First 2', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 2);
        expect(workingResults.length).toBeGreaterThanOrEqual(0);
        expect(workingResults.length).toBeLessThanOrEqual(2);
    });

    it('Find one by id', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let oneResult = await dal.findOneById(workingResults[0].id);
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one by filtered id', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, null, null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    // now expand per property
    it('Find one and country to countries', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['country'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and issuer to users_social_profile', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['issuer'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and last_changed_by to all_users', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['last_changed_by'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and province to provinces', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['province'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Create one then update', async () => {
        let newObject = new Project();

        // assign value to each property
        // newObject.id = ?; // number
        newObject.project_no = -1; // number 
        newObject.name = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01'; // string 
        newObject.legal_name = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string 
        newObject.short_name = 'abcdefghijklmnopqrstuvwxyz0123'; // string 
        newObject.unit_class = 'abcd'; // string 
        newObject.unit_series = 'abcd'; // string 
        newObject.seoname = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.contents = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890'; // string 
        newObject.sponsor_label = true; // boolean boolean
        // newObject.issuer_id = ?; // number
        newObject.project_stage = 1 as unknown as ProjectStage // enum; // ProjectStage ProjectStage
        newObject.notification = true; // boolean boolean
        newObject.capital_type = 1 as unknown as ProjectCapitalType // enum; // ProjectCapitalType ProjectCapitalType
        newObject.asset_type = 1 as unknown as ProjectAssetType // enum; // ProjectAssetType ProjectAssetType
        newObject.development_type = 1 as unknown as ProjectDevelopmentType // enum; // ProjectDevelopmentType ProjectDevelopmentType
        newObject.sync_to_hubspot = -1; // number 
        newObject.offering_amount = -1; // number 
        newObject.annual_irr = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.loan_to_value_ratio = 'abcdefghijklmnopqrst'; // string 
        // newObject.matrix_id = ?; // number
        newObject.matrix_input = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string 
        newObject.currency_label = 1 as unknown as CurrencyCode // enum; // CurrencyCode CurrencyCode
        newObject.total_share = -1; // number 
        newObject.share_price = -1; // number 
        newObject.market_price = -1; // number 
        newObject.sale_price = -1; // number 
        newObject.default_share = -1; // number 
        newObject.min_share = -1; // number 
        newObject.max_share = -1; // number 
        newObject.interest_rate = 'abcdefghijklmnopqrstuvwxy'; // string 
        newObject.investment_term = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string 
        newObject.minimum_duration_units = -1; // number 
        newObject.maximum_duration_units = -1; // number 
        newObject.minimum_duration_type = 1 as unknown as DurationType // enum; // DurationType DurationType
        newObject.maximum_duration_type = 1 as unknown as DurationType // enum; // DurationType DurationType
        newObject.daysleft_flag = true; // boolean boolean
        newObject.funded_flag = true; // boolean boolean
        newObject.dividend_desc = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890'; // string 
        newObject.debt_seniority = 1 as unknown as DebtSeniorityType // enum; // DebtSeniorityType DebtSeniorityType
        newObject.redeem_ability = 'abcde'; // string 
        newObject.investment_eligibility = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.redemption_info = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890'; // string 
        newObject.address = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890'; // string 
        newObject.zip = 'abcdefghij'; // string 
        newObject.city = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        // newObject.province_id = ?; // number
        // newObject.country_id = ?; // number
        newObject.image = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890a'; // string 
        newObject.credit_guarantee = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890'; // string 
        newObject.issuer_business = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string 
        newObject.agent_name = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string 
        newObject.commission_type = 1 as unknown as CommisionType // enum; // CommisionType CommisionType
        newObject.agent_commission = -1; // number 
        newObject.registrant_contact = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890'; // string 
        newObject.use_of_proceeds = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890'; // string 
        newObject.additional_desc = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz0123456789'; // string 
        newObject.acknowledgements = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz0123456789'; // string 
        newObject.long_desc = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz0123456789'; // string 
        newObject.disclaimer_note = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz0123456789'; // string 
        newObject.properties = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz0123456789'; // string 
        newObject.tabs = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcd'; // string 
        newObject.is_private = true; // boolean boolean
        newObject.private_ids = ''; // string
        newObject.auto_invite = true; // boolean boolean
        newObject.allow_ineligible = true; // boolean boolean
        newObject.system_status = 1 as unknown as ProjectUseStatus // enum; // ProjectUseStatus ProjectUseStatus
        newObject.drip_available = true; // boolean boolean
        newObject.use_system_om = true; // boolean boolean
        newObject.calc_months_remaining = true; // boolean boolean
        newObject.allow_joint_subscription = true; // boolean boolean
        newObject.investments_locked = true; // boolean boolean
        newObject.hide_est_complete_date = true; // boolean boolean
        newObject.continuous_offering = true; // boolean boolean
        newObject.show_on_home = true; // boolean boolean
        newObject.over_subscriptions = true; // boolean boolean
        // newObject.exempt_option_id = ?; // number
        newObject.roed_exemption = true; // boolean boolean
        newObject.roed_exemption_list = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.view_counts = -1; // number 
        newObject.sort_order = -1; // number 
        newObject.docusign_template_dev_test = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefgh'; // string 
        newObject.docusign_template_production = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefgh'; // string 
        newObject.docusign_template_merge_rules = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz0123456789'; // string 
        newObject.docusign_additional_recipients_sending_order = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.docusign_additional_recipients_role_name = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890'; // string 
        newObject.docusign_additional_recipients_person_name = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890'; // string 
        newObject.docusign_additional_recipients_person_email = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890'; // string 
        newObject.trust_company_names = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890'; // string 
        newObject.funding_start = new Date(); // Date
        newObject.funding_start.setMilliseconds(0); // rounding for db
        newObject.funding_expiry = new Date(); // Date
        newObject.funding_expiry.setMilliseconds(0); // rounding for db
        newObject.maturity_date = new Date(); // Date
        newObject.maturity_date.setMilliseconds(0); // rounding for db
        // newObject.hubspot_id = ?; // string
        newObject.is_deleted = true; // boolean boolean
        // newObject.last_changed_by_id = ?; // number
        // newObject.createtime = ?; // Date
        // newObject.updatetime = ?; // Date
        let dalCountry = await moduleFixture.resolve<CountryDal>(CountryDal);
        dalCountry.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkcountry = await dalCountry.findAllByFilter('', undefined, undefined, undefined, 1, 1); // Country 
        if (fkcountry.length > 0)
            newObject.country = fkcountry[0] as any; // Country 
        newObject.country_id = (fkcountry[0] as any).id;
        let dalUserSocialProfile = await moduleFixture.resolve<UserSocialProfileDal>(UserSocialProfileDal);
        dalUserSocialProfile.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkissuer = await dalUserSocialProfile.findAllByFilter('', undefined, undefined, undefined, 1, 1); // UserSocialProfile 
        if (fkissuer.length > 0)
            newObject.issuer = fkissuer[0] as any; // UserSocialProfile 
        newObject.issuer_id = (fkissuer[0] as any).id;
        let dalAllUser = await moduleFixture.resolve<AllUserDal>(AllUserDal);
        dalAllUser.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fklast_changed_by = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fklast_changed_by.length > 0)
            newObject.last_changed_by = fklast_changed_by[0] as any; // AllUser 
        newObject.last_changed_by_id = (fklast_changed_by[0] as any).id;
        let dalProvince = await moduleFixture.resolve<ProvinceDal>(ProvinceDal);
        dalProvince.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkprovince = await dalProvince.findAllByFilter('', undefined, undefined, undefined, 1, 1); // Province 
        if (fkprovince.length > 0)
            newObject.province = fkprovince[0] as any; // Province 
        newObject.province_id = (fkprovince[0] as any).id;

        let newObjectId = await dal.create(newObject);
        let savedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect(savedObject.project_no).toBe(newObject.project_no);
        expect(savedObject.name).toBe(newObject.name);
        expect(savedObject.legal_name).toBe(newObject.legal_name);
        expect(savedObject.short_name).toBe(newObject.short_name);
        expect(savedObject.unit_class).toBe(newObject.unit_class);
        expect(savedObject.unit_series).toBe(newObject.unit_series);
        expect(savedObject.seoname).toBe(newObject.seoname);
        expect(savedObject.contents).toBe(newObject.contents);
        expect(savedObject.sponsor_label).toBe(newObject.sponsor_label);
        expect((typeof savedObject.project_stage == 'string') ? parseInt(savedObject.project_stage) : savedObject.project_stage).toBe(newObject.project_stage);
        expect(savedObject.notification).toBe(newObject.notification);
        expect((typeof savedObject.capital_type == 'string') ? parseInt(savedObject.capital_type) : savedObject.capital_type).toBe(newObject.capital_type);
        expect((typeof savedObject.asset_type == 'string') ? parseInt(savedObject.asset_type) : savedObject.asset_type).toBe(newObject.asset_type);
        expect((typeof savedObject.development_type == 'string') ? parseInt(savedObject.development_type) : savedObject.development_type).toBe(newObject.development_type);
        expect(savedObject.sync_to_hubspot).toBe(newObject.sync_to_hubspot);
        expect(savedObject.offering_amount).toBe(newObject.offering_amount);
        expect(savedObject.annual_irr).toBe(newObject.annual_irr);
        expect(savedObject.loan_to_value_ratio).toBe(newObject.loan_to_value_ratio);
        expect(savedObject.matrix_input).toBe(newObject.matrix_input);
        expect((typeof savedObject.currency_label == 'string') ? parseInt(savedObject.currency_label) : savedObject.currency_label).toBe(newObject.currency_label);
        expect(savedObject.total_share).toBe(newObject.total_share);
        expect(savedObject.share_price).toBe(newObject.share_price);
        expect(savedObject.market_price).toBe(newObject.market_price);
        expect(savedObject.sale_price).toBe(newObject.sale_price);
        expect(savedObject.default_share).toBe(newObject.default_share);
        expect(savedObject.min_share).toBe(newObject.min_share);
        expect(savedObject.max_share).toBe(newObject.max_share);
        expect(savedObject.interest_rate).toBe(newObject.interest_rate);
        expect(savedObject.investment_term).toBe(newObject.investment_term);
        expect(savedObject.minimum_duration_units).toBe(newObject.minimum_duration_units);
        expect(savedObject.maximum_duration_units).toBe(newObject.maximum_duration_units);
        expect((typeof savedObject.minimum_duration_type == 'string') ? parseInt(savedObject.minimum_duration_type) : savedObject.minimum_duration_type).toBe(newObject.minimum_duration_type);
        expect((typeof savedObject.maximum_duration_type == 'string') ? parseInt(savedObject.maximum_duration_type) : savedObject.maximum_duration_type).toBe(newObject.maximum_duration_type);
        expect(savedObject.daysleft_flag).toBe(newObject.daysleft_flag);
        expect(savedObject.funded_flag).toBe(newObject.funded_flag);
        expect(savedObject.dividend_desc).toBe(newObject.dividend_desc);
        expect((typeof savedObject.debt_seniority == 'string') ? parseInt(savedObject.debt_seniority) : savedObject.debt_seniority).toBe(newObject.debt_seniority);
        expect(savedObject.redeem_ability).toBe(newObject.redeem_ability);
        expect(savedObject.investment_eligibility).toBe(newObject.investment_eligibility);
        expect(savedObject.redemption_info).toBe(newObject.redemption_info);
        expect(savedObject.address).toBe(newObject.address);
        expect(savedObject.zip).toBe(newObject.zip);
        expect(savedObject.city).toBe(newObject.city);
        expect(savedObject.image).toBe(newObject.image);
        expect(savedObject.credit_guarantee).toBe(newObject.credit_guarantee);
        expect(savedObject.issuer_business).toBe(newObject.issuer_business);
        expect(savedObject.agent_name).toBe(newObject.agent_name);
        expect((typeof savedObject.commission_type == 'string') ? parseInt(savedObject.commission_type) : savedObject.commission_type).toBe(newObject.commission_type);
        expect(savedObject.agent_commission).toBe(newObject.agent_commission);
        expect(savedObject.registrant_contact).toBe(newObject.registrant_contact);
        expect(savedObject.use_of_proceeds).toBe(newObject.use_of_proceeds);
        expect(savedObject.additional_desc).toBe(newObject.additional_desc);
        expect(savedObject.acknowledgements).toBe(newObject.acknowledgements);
        expect(savedObject.long_desc).toBe(newObject.long_desc);
        expect(savedObject.disclaimer_note).toBe(newObject.disclaimer_note);
        expect(savedObject.properties).toBe(newObject.properties);
        expect(savedObject.tabs).toBe(newObject.tabs);
        expect(savedObject.is_private).toBe(newObject.is_private);
        expect(savedObject.auto_invite).toBe(newObject.auto_invite);
        expect(savedObject.allow_ineligible).toBe(newObject.allow_ineligible);
        expect((typeof savedObject.system_status == 'string') ? parseInt(savedObject.system_status) : savedObject.system_status).toBe(newObject.system_status);
        expect(savedObject.drip_available).toBe(newObject.drip_available);
        expect(savedObject.use_system_om).toBe(newObject.use_system_om);
        expect(savedObject.calc_months_remaining).toBe(newObject.calc_months_remaining);
        expect(savedObject.allow_joint_subscription).toBe(newObject.allow_joint_subscription);
        expect(savedObject.investments_locked).toBe(newObject.investments_locked);
        expect(savedObject.hide_est_complete_date).toBe(newObject.hide_est_complete_date);
        expect(savedObject.continuous_offering).toBe(newObject.continuous_offering);
        expect(savedObject.show_on_home).toBe(newObject.show_on_home);
        expect(savedObject.over_subscriptions).toBe(newObject.over_subscriptions);
        expect(savedObject.roed_exemption).toBe(newObject.roed_exemption);
        expect(savedObject.roed_exemption_list).toBe(newObject.roed_exemption_list);
        expect(savedObject.view_counts).toBe(newObject.view_counts);
        expect(savedObject.sort_order).toBe(newObject.sort_order);
        expect(savedObject.docusign_template_dev_test).toBe(newObject.docusign_template_dev_test);
        expect(savedObject.docusign_template_production).toBe(newObject.docusign_template_production);
        expect(savedObject.docusign_template_merge_rules).toBe(newObject.docusign_template_merge_rules);
        expect(savedObject.docusign_additional_recipients_sending_order).toBe(newObject.docusign_additional_recipients_sending_order);
        expect(savedObject.docusign_additional_recipients_role_name).toBe(newObject.docusign_additional_recipients_role_name);
        expect(savedObject.docusign_additional_recipients_person_name).toBe(newObject.docusign_additional_recipients_person_name);
        expect(savedObject.docusign_additional_recipients_person_email).toBe(newObject.docusign_additional_recipients_person_email);
        expect(savedObject.trust_company_names).toBe(newObject.trust_company_names);
        expect(savedObject.funding_start.getTime()).toBe(newObject.funding_start.getTime());
        expect(savedObject.funding_expiry.getTime()).toBe(newObject.funding_expiry.getTime());
        expect(savedObject.maturity_date.getTime()).toBe(newObject.maturity_date.getTime());
        expect(savedObject.is_deleted).toBe(newObject.is_deleted);

        // update save and compare
        newObject.id = newObjectId as number;
        newObject.project_no = 1; // number
        newObject.name = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopq'; // string
        newObject.legal_name = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcd'; // string
        newObject.short_name = '01234567890abcdefghijklmnopqrs'; // string
        newObject.unit_class = '0123'; // string
        newObject.unit_series = '0123'; // string
        newObject.seoname = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.contents = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string
        newObject.sponsor_label = false; // boolean
        newObject.project_stage = 2 as unknown as ProjectStage // enum; // ProjectStage
        newObject.notification = false; // boolean
        newObject.capital_type = 2 as unknown as ProjectCapitalType // enum; // ProjectCapitalType
        newObject.asset_type = 2 as unknown as ProjectAssetType // enum; // ProjectAssetType
        newObject.development_type = 2 as unknown as ProjectDevelopmentType // enum; // ProjectDevelopmentType
        newObject.sync_to_hubspot = 1; // number
        newObject.offering_amount = 1; // number
        newObject.annual_irr = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.loan_to_value_ratio = '01234567890abcdefghi'; // string
        newObject.matrix_input = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcd'; // string
        newObject.currency_label = 2 as unknown as CurrencyCode // enum; // CurrencyCode
        newObject.total_share = 1; // number
        newObject.share_price = 1; // number
        newObject.market_price = 1; // number
        newObject.sale_price = 1; // number
        newObject.default_share = 1; // number
        newObject.min_share = 1; // number
        newObject.max_share = 1; // number
        newObject.interest_rate = '01234567890abcdefghijklmn'; // string
        newObject.investment_term = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcd'; // string
        newObject.minimum_duration_units = 1; // number
        newObject.maximum_duration_units = 1; // number
        newObject.minimum_duration_type = 2 as unknown as DurationType // enum; // DurationType
        newObject.maximum_duration_type = 2 as unknown as DurationType // enum; // DurationType
        newObject.daysleft_flag = false; // boolean
        newObject.funded_flag = false; // boolean
        newObject.dividend_desc = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string
        newObject.debt_seniority = 2 as unknown as DebtSeniorityType // enum; // DebtSeniorityType
        newObject.redeem_ability = '01234'; // string
        newObject.investment_eligibility = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.redemption_info = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string
        newObject.address = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string
        newObject.zip = '0123456789'; // string
        newObject.city = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.image = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz0'; // string
        newObject.credit_guarantee = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string
        newObject.issuer_business = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcd'; // string
        newObject.agent_name = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcd'; // string
        newObject.commission_type = 2 as unknown as CommisionType // enum; // CommisionType
        newObject.agent_commission = 1; // number
        newObject.registrant_contact = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string
        newObject.use_of_proceeds = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string
        newObject.additional_desc = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxy'; // string
        newObject.acknowledgements = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxy'; // string
        newObject.long_desc = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxy'; // string
        newObject.disclaimer_note = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxy'; // string
        newObject.properties = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxy'; // string
        newObject.tabs = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz0123'; // string
        newObject.is_private = false; // boolean
        newObject.auto_invite = false; // boolean
        newObject.allow_ineligible = false; // boolean
        newObject.system_status = 2 as unknown as ProjectUseStatus // enum; // ProjectUseStatus
        newObject.drip_available = false; // boolean
        newObject.use_system_om = false; // boolean
        newObject.calc_months_remaining = false; // boolean
        newObject.allow_joint_subscription = false; // boolean
        newObject.investments_locked = false; // boolean
        newObject.hide_est_complete_date = false; // boolean
        newObject.continuous_offering = false; // boolean
        newObject.show_on_home = false; // boolean
        newObject.over_subscriptions = false; // boolean
        newObject.roed_exemption = false; // boolean
        newObject.roed_exemption_list = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.view_counts = 1; // number
        newObject.sort_order = 1; // number
        newObject.docusign_template_dev_test = '01234567890abcdefghijklmnopqrstuvwxyz01234567'; // string
        newObject.docusign_template_production = '01234567890abcdefghijklmnopqrstuvwxyz01234567'; // string
        newObject.docusign_template_merge_rules = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxy'; // string
        newObject.docusign_additional_recipients_sending_order = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.docusign_additional_recipients_role_name = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string
        newObject.docusign_additional_recipients_person_name = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string
        newObject.docusign_additional_recipients_person_email = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string
        newObject.trust_company_names = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string
        newObject.funding_start = new Date('1999/01/01'); // Date		
        newObject.funding_start.setMilliseconds(0); // rounding for db
        newObject.funding_expiry = new Date('1999/01/01'); // Date		
        newObject.funding_expiry.setMilliseconds(0); // rounding for db
        newObject.maturity_date = new Date('1999/01/01'); // Date		
        newObject.maturity_date.setMilliseconds(0); // rounding for db
        newObject.is_deleted = false; // boolean

        await dal.save(newObject);
        let reloadedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect(reloadedObject.project_no).toBe(newObject.project_no);
        expect(reloadedObject.name).toBe(newObject.name);
        expect(reloadedObject.legal_name).toBe(newObject.legal_name);
        expect(reloadedObject.short_name).toBe(newObject.short_name);
        expect(reloadedObject.unit_class).toBe(newObject.unit_class);
        expect(reloadedObject.unit_series).toBe(newObject.unit_series);
        expect(reloadedObject.seoname).toBe(newObject.seoname);
        expect(reloadedObject.contents).toBe(newObject.contents);
        expect(reloadedObject.sponsor_label).toBe(newObject.sponsor_label);
        expect((typeof reloadedObject.project_stage == 'string') ? parseInt(reloadedObject.project_stage) : reloadedObject.project_stage).toBe(newObject.project_stage);
        expect(reloadedObject.notification).toBe(newObject.notification);
        expect((typeof reloadedObject.capital_type == 'string') ? parseInt(reloadedObject.capital_type) : reloadedObject.capital_type).toBe(newObject.capital_type);
        expect((typeof reloadedObject.asset_type == 'string') ? parseInt(reloadedObject.asset_type) : reloadedObject.asset_type).toBe(newObject.asset_type);
        expect((typeof reloadedObject.development_type == 'string') ? parseInt(reloadedObject.development_type) : reloadedObject.development_type).toBe(newObject.development_type);
        expect(reloadedObject.sync_to_hubspot).toBe(newObject.sync_to_hubspot);
        expect(reloadedObject.offering_amount).toBe(newObject.offering_amount);
        expect(reloadedObject.annual_irr).toBe(newObject.annual_irr);
        expect(reloadedObject.loan_to_value_ratio).toBe(newObject.loan_to_value_ratio);
        expect(reloadedObject.matrix_input).toBe(newObject.matrix_input);
        expect((typeof reloadedObject.currency_label == 'string') ? parseInt(reloadedObject.currency_label) : reloadedObject.currency_label).toBe(newObject.currency_label);
        expect(reloadedObject.total_share).toBe(newObject.total_share);
        expect(reloadedObject.share_price).toBe(newObject.share_price);
        expect(reloadedObject.market_price).toBe(newObject.market_price);
        expect(reloadedObject.sale_price).toBe(newObject.sale_price);
        expect(reloadedObject.default_share).toBe(newObject.default_share);
        expect(reloadedObject.min_share).toBe(newObject.min_share);
        expect(reloadedObject.max_share).toBe(newObject.max_share);
        expect(reloadedObject.interest_rate).toBe(newObject.interest_rate);
        expect(reloadedObject.investment_term).toBe(newObject.investment_term);
        expect(reloadedObject.minimum_duration_units).toBe(newObject.minimum_duration_units);
        expect(reloadedObject.maximum_duration_units).toBe(newObject.maximum_duration_units);
        expect((typeof reloadedObject.minimum_duration_type == 'string') ? parseInt(reloadedObject.minimum_duration_type) : reloadedObject.minimum_duration_type).toBe(newObject.minimum_duration_type);
        expect((typeof reloadedObject.maximum_duration_type == 'string') ? parseInt(reloadedObject.maximum_duration_type) : reloadedObject.maximum_duration_type).toBe(newObject.maximum_duration_type);
        expect(reloadedObject.daysleft_flag).toBe(newObject.daysleft_flag);
        expect(reloadedObject.funded_flag).toBe(newObject.funded_flag);
        expect(reloadedObject.dividend_desc).toBe(newObject.dividend_desc);
        expect((typeof reloadedObject.debt_seniority == 'string') ? parseInt(reloadedObject.debt_seniority) : reloadedObject.debt_seniority).toBe(newObject.debt_seniority);
        expect(reloadedObject.redeem_ability).toBe(newObject.redeem_ability);
        expect(reloadedObject.investment_eligibility).toBe(newObject.investment_eligibility);
        expect(reloadedObject.redemption_info).toBe(newObject.redemption_info);
        expect(reloadedObject.address).toBe(newObject.address);
        expect(reloadedObject.zip).toBe(newObject.zip);
        expect(reloadedObject.city).toBe(newObject.city);
        expect(reloadedObject.image).toBe(newObject.image);
        expect(reloadedObject.credit_guarantee).toBe(newObject.credit_guarantee);
        expect(reloadedObject.issuer_business).toBe(newObject.issuer_business);
        expect(reloadedObject.agent_name).toBe(newObject.agent_name);
        expect((typeof reloadedObject.commission_type == 'string') ? parseInt(reloadedObject.commission_type) : reloadedObject.commission_type).toBe(newObject.commission_type);
        expect(reloadedObject.agent_commission).toBe(newObject.agent_commission);
        expect(reloadedObject.registrant_contact).toBe(newObject.registrant_contact);
        expect(reloadedObject.use_of_proceeds).toBe(newObject.use_of_proceeds);
        expect(reloadedObject.additional_desc).toBe(newObject.additional_desc);
        expect(reloadedObject.acknowledgements).toBe(newObject.acknowledgements);
        expect(reloadedObject.long_desc).toBe(newObject.long_desc);
        expect(reloadedObject.disclaimer_note).toBe(newObject.disclaimer_note);
        expect(reloadedObject.properties).toBe(newObject.properties);
        expect(reloadedObject.tabs).toBe(newObject.tabs);
        expect(reloadedObject.is_private).toBe(newObject.is_private);
        expect(reloadedObject.auto_invite).toBe(newObject.auto_invite);
        expect(reloadedObject.allow_ineligible).toBe(newObject.allow_ineligible);
        expect((typeof reloadedObject.system_status == 'string') ? parseInt(reloadedObject.system_status) : reloadedObject.system_status).toBe(newObject.system_status);
        expect(reloadedObject.drip_available).toBe(newObject.drip_available);
        expect(reloadedObject.use_system_om).toBe(newObject.use_system_om);
        expect(reloadedObject.calc_months_remaining).toBe(newObject.calc_months_remaining);
        expect(reloadedObject.allow_joint_subscription).toBe(newObject.allow_joint_subscription);
        expect(reloadedObject.investments_locked).toBe(newObject.investments_locked);
        expect(reloadedObject.hide_est_complete_date).toBe(newObject.hide_est_complete_date);
        expect(reloadedObject.continuous_offering).toBe(newObject.continuous_offering);
        expect(reloadedObject.show_on_home).toBe(newObject.show_on_home);
        expect(reloadedObject.over_subscriptions).toBe(newObject.over_subscriptions);
        expect(reloadedObject.roed_exemption).toBe(newObject.roed_exemption);
        expect(reloadedObject.roed_exemption_list).toBe(newObject.roed_exemption_list);
        expect(reloadedObject.view_counts).toBe(newObject.view_counts);
        expect(reloadedObject.sort_order).toBe(newObject.sort_order);
        expect(reloadedObject.docusign_template_dev_test).toBe(newObject.docusign_template_dev_test);
        expect(reloadedObject.docusign_template_production).toBe(newObject.docusign_template_production);
        expect(reloadedObject.docusign_template_merge_rules).toBe(newObject.docusign_template_merge_rules);
        expect(reloadedObject.docusign_additional_recipients_sending_order).toBe(newObject.docusign_additional_recipients_sending_order);
        expect(reloadedObject.docusign_additional_recipients_role_name).toBe(newObject.docusign_additional_recipients_role_name);
        expect(reloadedObject.docusign_additional_recipients_person_name).toBe(newObject.docusign_additional_recipients_person_name);
        expect(reloadedObject.docusign_additional_recipients_person_email).toBe(newObject.docusign_additional_recipients_person_email);
        expect(reloadedObject.trust_company_names).toBe(newObject.trust_company_names);
        expect(reloadedObject.funding_start.getTime()).toBe(newObject.funding_start.getTime());
        expect(reloadedObject.funding_expiry.getTime()).toBe(newObject.funding_expiry.getTime());
        expect(reloadedObject.maturity_date.getTime()).toBe(newObject.maturity_date.getTime());
        expect(reloadedObject.is_deleted).toBe(newObject.is_deleted);

        // delete and check that its gone
        await dal.removeOneById(newObjectId);
        let objectAfterDelete = await dal.findOneById(newObjectId);
        expect(objectAfterDelete).toBeNull();
    });
});
