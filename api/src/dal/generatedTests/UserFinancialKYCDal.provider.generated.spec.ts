import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { UserFinancialKycDal } from '../UserFinancialKyc.provider';
import { UserFinancialKyc } from '../../model/UserFinancialKyc.entity.generated';
import { FinancialRange } from 'fundscraper-model-enums';
import { AllUserDal } from '../AllUser.provider';

describe('UserFinancialKYCDal-generated', () => {
    let dal: UserFinancialKycDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<UserFinancialKycDal>(UserFinancialKycDal);
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
    it('Find one and last_changed_by to all_users', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['last_changed_by'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and user to all_users', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['user'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Create one then update', async () => {
        let newObject = new UserFinancialKyc();

        // assign value to each property
        // newObject.id = ?; // number
        // newObject.user_id = ?; // number
        newObject.employment_status = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklm'; // string 
        newObject.employer = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrs'; // string 
        newObject.industry = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrs'; // string 
        newObject.position = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.years = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.income_includes_partner = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklm'; // string 
        newObject.year_entered = -1; // number 
        newObject.income_current_year = 1 as unknown as FinancialRange // enum; // FinancialRange FinancialRange
        newObject.income_previous_year = 1 as unknown as FinancialRange // enum; // FinancialRange FinancialRange
        newObject.income_two_years_ago = 1 as unknown as FinancialRange // enum; // FinancialRange FinancialRange
        newObject.net_financial_assest_range = 1 as unknown as FinancialRange // enum; // FinancialRange FinancialRange
        newObject.advisor_dealer = 'abc'; // string 
        newObject.represents_advisor_dealer = 'abc'; // string 
        newObject.acting_on_account_for_advisor_dealer = 'abc'; // string 
        newObject.net_assets_range = 1 as unknown as FinancialRange // enum; // FinancialRange FinancialRange
        newObject.income_curr_new = -1; // number 
        newObject.income_curr1_new = -1; // number 
        newObject.income_curr2_new = -1; // number 
        newObject.income_net_new = -1; // number 
        newObject.assets_net_new = -1; // number 
        // newObject.last_changed_by_id = ?; // number
        newObject.is_deleted = true; // boolean boolean
        // newObject.createtime = ?; // Date
        // newObject.updatetime = ?; // Date
        let dalAllUser = await moduleFixture.resolve<AllUserDal>(AllUserDal);
        dalAllUser.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fklast_changed_by = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fklast_changed_by.length > 0)
            newObject.last_changed_by = fklast_changed_by[0] as any; // AllUser 
        newObject.last_changed_by_id = (fklast_changed_by[0] as any).id;
        let fkuser = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fkuser.length > 0)
            newObject.user = fkuser[0] as any; // AllUser 
        newObject.user_id = (fkuser[0] as any).id;

        let newObjectId = await dal.create(newObject);
        let savedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect(savedObject.employment_status).toBe(newObject.employment_status);
        expect(savedObject.employer).toBe(newObject.employer);
        expect(savedObject.industry).toBe(newObject.industry);
        expect(savedObject.position).toBe(newObject.position);
        expect(savedObject.years).toBe(newObject.years);
        expect(savedObject.income_includes_partner).toBe(newObject.income_includes_partner);
        expect(savedObject.year_entered).toBe(newObject.year_entered);
        expect((typeof savedObject.income_current_year == 'string') ? parseInt(savedObject.income_current_year) : savedObject.income_current_year).toBe(newObject.income_current_year);
        expect((typeof savedObject.income_previous_year == 'string') ? parseInt(savedObject.income_previous_year) : savedObject.income_previous_year).toBe(newObject.income_previous_year);
        expect((typeof savedObject.income_two_years_ago == 'string') ? parseInt(savedObject.income_two_years_ago) : savedObject.income_two_years_ago).toBe(newObject.income_two_years_ago);
        expect((typeof savedObject.net_financial_assest_range == 'string') ? parseInt(savedObject.net_financial_assest_range) : savedObject.net_financial_assest_range).toBe(newObject.net_financial_assest_range);
        expect(savedObject.advisor_dealer).toBe(newObject.advisor_dealer);
        expect(savedObject.represents_advisor_dealer).toBe(newObject.represents_advisor_dealer);
        expect(savedObject.acting_on_account_for_advisor_dealer).toBe(newObject.acting_on_account_for_advisor_dealer);
        expect((typeof savedObject.net_assets_range == 'string') ? parseInt(savedObject.net_assets_range) : savedObject.net_assets_range).toBe(newObject.net_assets_range);
        expect(savedObject.income_curr_new).toBe(newObject.income_curr_new);
        expect(savedObject.income_curr1_new).toBe(newObject.income_curr1_new);
        expect(savedObject.income_curr2_new).toBe(newObject.income_curr2_new);
        expect(savedObject.income_net_new).toBe(newObject.income_net_new);
        expect(savedObject.assets_net_new).toBe(newObject.assets_net_new);
        expect(savedObject.is_deleted).toBe(newObject.is_deleted);

        // update save and compare
        newObject.id = newObjectId as number;
        newObject.employment_status = '01234567890abcdefghijklmnopqrstuvwxyz01234567890ab'; // string
        newObject.employer = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefgh'; // string
        newObject.industry = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefgh'; // string
        newObject.position = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.years = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.income_includes_partner = '01234567890abcdefghijklmnopqrstuvwxyz01234567890ab'; // string
        newObject.year_entered = 1; // number
        newObject.income_current_year = 2 as unknown as FinancialRange // enum; // FinancialRange
        newObject.income_previous_year = 2 as unknown as FinancialRange // enum; // FinancialRange
        newObject.income_two_years_ago = 2 as unknown as FinancialRange // enum; // FinancialRange
        newObject.net_financial_assest_range = 2 as unknown as FinancialRange // enum; // FinancialRange
        newObject.advisor_dealer = '012'; // string
        newObject.represents_advisor_dealer = '012'; // string
        newObject.acting_on_account_for_advisor_dealer = '012'; // string
        newObject.net_assets_range = 2 as unknown as FinancialRange // enum; // FinancialRange
        newObject.income_curr_new = 1; // number
        newObject.income_curr1_new = 1; // number
        newObject.income_curr2_new = 1; // number
        newObject.income_net_new = 1; // number
        newObject.assets_net_new = 1; // number
        newObject.is_deleted = false; // boolean

        await dal.save(newObject);
        let reloadedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect(reloadedObject.employment_status).toBe(newObject.employment_status);
        expect(reloadedObject.employer).toBe(newObject.employer);
        expect(reloadedObject.industry).toBe(newObject.industry);
        expect(reloadedObject.position).toBe(newObject.position);
        expect(reloadedObject.years).toBe(newObject.years);
        expect(reloadedObject.income_includes_partner).toBe(newObject.income_includes_partner);
        expect(reloadedObject.year_entered).toBe(newObject.year_entered);
        expect((typeof reloadedObject.income_current_year == 'string') ? parseInt(reloadedObject.income_current_year) : reloadedObject.income_current_year).toBe(newObject.income_current_year);
        expect((typeof reloadedObject.income_previous_year == 'string') ? parseInt(reloadedObject.income_previous_year) : reloadedObject.income_previous_year).toBe(newObject.income_previous_year);
        expect((typeof reloadedObject.income_two_years_ago == 'string') ? parseInt(reloadedObject.income_two_years_ago) : reloadedObject.income_two_years_ago).toBe(newObject.income_two_years_ago);
        expect((typeof reloadedObject.net_financial_assest_range == 'string') ? parseInt(reloadedObject.net_financial_assest_range) : reloadedObject.net_financial_assest_range).toBe(newObject.net_financial_assest_range);
        expect(reloadedObject.advisor_dealer).toBe(newObject.advisor_dealer);
        expect(reloadedObject.represents_advisor_dealer).toBe(newObject.represents_advisor_dealer);
        expect(reloadedObject.acting_on_account_for_advisor_dealer).toBe(newObject.acting_on_account_for_advisor_dealer);
        expect((typeof reloadedObject.net_assets_range == 'string') ? parseInt(reloadedObject.net_assets_range) : reloadedObject.net_assets_range).toBe(newObject.net_assets_range);
        expect(reloadedObject.income_curr_new).toBe(newObject.income_curr_new);
        expect(reloadedObject.income_curr1_new).toBe(newObject.income_curr1_new);
        expect(reloadedObject.income_curr2_new).toBe(newObject.income_curr2_new);
        expect(reloadedObject.income_net_new).toBe(newObject.income_net_new);
        expect(reloadedObject.assets_net_new).toBe(newObject.assets_net_new);
        expect(reloadedObject.is_deleted).toBe(newObject.is_deleted);

        // delete and check that its gone
        await dal.removeOneById(newObjectId);
        let objectAfterDelete = await dal.findOneById(newObjectId);
        expect(objectAfterDelete).toBeNull();
    });
});
