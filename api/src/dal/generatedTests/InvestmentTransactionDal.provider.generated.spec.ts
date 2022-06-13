import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { InvestmentTransactionDal } from '../../dal/InvestmentTransaction.provider';
import { InvestmentTransaction } from '../../model/InvestmentTransaction.entity.generated';
import { EntityType } from 'fundscraper-model-enums';
import { InvestmentActivity } from 'fundscraper-model-enums';
import { InvestorEarningDal } from '../../dal/InvestorEarning.provider';
import { AllUserDal } from '../../dal/AllUser.provider';
import { InvestmentOrderDal } from '../../dal/InvestmentOrder.provider';
import { ProjectDal } from '../../dal/Project.provider';
import { UserEntityDal } from '../../dal/UserEntity.provider';

describe('InvestmentTransactionDal-generated', () => {
    let dal: InvestmentTransactionDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<InvestmentTransactionDal>(InvestmentTransactionDal);
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
    it('Find one and investor_earning to investor_earnings', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['investor_earning'], null, 1, 10);
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

    it('Find one and order to investment_orders', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['order'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and project to projects', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['project'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and user_entity to users_entity', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['user_entity'], null, 1, 10);
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
        let newObject = new InvestmentTransaction();

        // assign value to each property
        // newObject.id = ?; // number
        newObject.entity_type = 1 as unknown as EntityType // enum; // EntityType EntityType
        // newObject.entity_id = ?; // string
        // newObject.user_entity_id = ?; // number
        newObject.order_no = 'abcdefghijklmnopqrst'; // string 
        // newObject.order_id = ?; // number
        newObject.activity = 1 as unknown as InvestmentActivity // enum; // InvestmentActivity InvestmentActivity
        newObject.activity_desc = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01'; // string 
        newObject.number_of_shares = -1; // number 
        newObject.amount_per_share = -1; // number 
        newObject.credit = -1; // number 
        newObject.debit = -1; // number 
        newObject.is_cancelled = true; // boolean boolean
        // newObject.user_id = ?; // number
        // newObject.project_id = ?; // number
        newObject.transaction_date = new Date(); // Date
        newObject.transaction_date.setMilliseconds(0); // rounding for db
        newObject.eft_file = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        // newObject.investor_earning_id = ?; // number
        newObject.is_deleted = true; // boolean boolean
        // newObject.last_changed_by_id = ?; // number
        // newObject.createtime = ?; // Date
        // newObject.updatetime = ?; // Date
        let dalInvestorEarning = await moduleFixture.resolve<InvestorEarningDal>(InvestorEarningDal);
        dalInvestorEarning.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkinvestor_earning = await dalInvestorEarning.findAllByFilter('', undefined, undefined, undefined, 1, 1); // InvestorEarning 
        if (fkinvestor_earning.length > 0)
            newObject.investor_earning = fkinvestor_earning[0] as any; // InvestorEarning 
        newObject.investor_earning_id = (fkinvestor_earning[0] as any).id;
        let dalAllUser = await moduleFixture.resolve<AllUserDal>(AllUserDal);
        dalAllUser.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fklast_changed_by = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fklast_changed_by.length > 0)
            newObject.last_changed_by = fklast_changed_by[0] as any; // AllUser 
        newObject.last_changed_by_id = (fklast_changed_by[0] as any).id;
        let dalInvestmentOrder = await moduleFixture.resolve<InvestmentOrderDal>(InvestmentOrderDal);
        dalInvestmentOrder.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkorder = await dalInvestmentOrder.findAllByFilter('', undefined, undefined, undefined, 1, 1); // InvestmentOrder 
        if (fkorder.length > 0)
            newObject.order = fkorder[0] as any; // InvestmentOrder 
        newObject.order_id = (fkorder[0] as any).id;
        let dalProject = await moduleFixture.resolve<ProjectDal>(ProjectDal);
        dalProject.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkproject = await dalProject.findAllByFilter('', undefined, undefined, undefined, 1, 1); // Project 
        if (fkproject.length > 0)
            newObject.project = fkproject[0] as any; // Project 
        newObject.project_id = (fkproject[0] as any).id;
        let dalUserEntity = await moduleFixture.resolve<UserEntityDal>(UserEntityDal);
        dalUserEntity.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkuser_entity = await dalUserEntity.findAllByFilter('', undefined, undefined, undefined, 1, 1); // UserEntity 
        if (fkuser_entity.length > 0)
            newObject.user_entity = fkuser_entity[0] as any; // UserEntity 
        newObject.user_entity_id = (fkuser_entity[0] as any).id;
        let fkuser = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fkuser.length > 0)
            newObject.user = fkuser[0] as any; // AllUser 
        newObject.user_id = (fkuser[0] as any).id;

        let newObjectId = await dal.create(newObject);
        let savedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof savedObject.entity_type == 'string') ? parseInt(savedObject.entity_type) : savedObject.entity_type).toBe(newObject.entity_type);
        expect(savedObject.order_no).toBe(newObject.order_no);
        expect((typeof savedObject.activity == 'string') ? parseInt(savedObject.activity) : savedObject.activity).toBe(newObject.activity);
        expect(savedObject.activity_desc).toBe(newObject.activity_desc);
        expect(savedObject.number_of_shares).toBe(newObject.number_of_shares);
        expect(savedObject.amount_per_share).toBe(newObject.amount_per_share);
        expect(savedObject.credit).toBe(newObject.credit);
        expect(savedObject.debit).toBe(newObject.debit);
        expect(savedObject.is_cancelled).toBe(newObject.is_cancelled);
        expect(savedObject.transaction_date.getTime()).toBe(newObject.transaction_date.getTime());
        expect(savedObject.eft_file).toBe(newObject.eft_file);
        expect(savedObject.is_deleted).toBe(newObject.is_deleted);

        // update save and compare
        newObject.id = newObjectId as number;
        newObject.entity_type = 2 as unknown as EntityType // enum; // EntityType
        newObject.order_no = '01234567890abcdefghi'; // string
        newObject.activity = 2 as unknown as InvestmentActivity // enum; // InvestmentActivity
        newObject.activity_desc = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopq'; // string
        newObject.number_of_shares = 1; // number
        newObject.amount_per_share = 1; // number
        newObject.credit = 1; // number
        newObject.debit = 1; // number
        newObject.is_cancelled = false; // boolean
        newObject.transaction_date = new Date('1999/01/01'); // Date		
        newObject.transaction_date.setMilliseconds(0); // rounding for db
        newObject.eft_file = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.is_deleted = false; // boolean

        await dal.save(newObject);
        let reloadedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof reloadedObject.entity_type == 'string') ? parseInt(reloadedObject.entity_type) : reloadedObject.entity_type).toBe(newObject.entity_type);
        expect(reloadedObject.order_no).toBe(newObject.order_no);
        expect((typeof reloadedObject.activity == 'string') ? parseInt(reloadedObject.activity) : reloadedObject.activity).toBe(newObject.activity);
        expect(reloadedObject.activity_desc).toBe(newObject.activity_desc);
        expect(reloadedObject.number_of_shares).toBe(newObject.number_of_shares);
        expect(reloadedObject.amount_per_share).toBe(newObject.amount_per_share);
        expect(reloadedObject.credit).toBe(newObject.credit);
        expect(reloadedObject.debit).toBe(newObject.debit);
        expect(reloadedObject.is_cancelled).toBe(newObject.is_cancelled);
        expect(reloadedObject.transaction_date.getTime()).toBe(newObject.transaction_date.getTime());
        expect(reloadedObject.eft_file).toBe(newObject.eft_file);
        expect(reloadedObject.is_deleted).toBe(newObject.is_deleted);

        // delete and check that its gone
        await dal.removeOneById(newObjectId);
        let objectAfterDelete = await dal.findOneById(newObjectId);
        expect(objectAfterDelete).toBeNull();
    });
});
