import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { EventDal } from '../../dal/Event.provider';
import { Event } from '../../model/Event.entity.generated';
import { EventType } from 'fundscraper-model-enums';
import { InvestmentOrderDal } from '../../dal/InvestmentOrder.provider';
import { InvestmentTransactionDal } from '../../dal/InvestmentTransaction.provider';
import { InvestmentWithdrawalDal } from '../../dal/InvestmentWithdrawal.provider';
import { InvestorEarningDal } from '../../dal/InvestorEarning.provider';
import { UserSocialProfileDal } from '../../dal/UserSocialProfile.provider';
import { AllUserDal } from '../../dal/AllUser.provider';
import { ProjectDal } from '../../dal/Project.provider';
import { UserPdfDal } from '../../dal/UserPdf.provider';

describe('EventDal-generated', () => {
    let dal: EventDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<EventDal>(EventDal);
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
    it('Find one and investment_order to investment_orders', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['investment_order'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and investment_transaction to investment_transaction', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['investment_transaction'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and investment_withdrawel to investment_withdrawal', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['investment_withdrawel'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and investor_earning to investor_earnings', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['investor_earning'], null, 1, 10);
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

    it('Find one and project to projects', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['project'], null, 1, 10);
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

    it('Find one and user_pdf to users_pdf', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['user_pdf'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Create one then update', async () => {
        let newObject = new Event();

        // assign value to each property
        // newObject.id = ?; // number
        newObject.type = 1 as unknown as EventType // enum; // EventType EventType
        // newObject.user_id = ?; // number
        // newObject.issuer_id = ?; // number
        // newObject.project_id = ?; // number
        // newObject.investment_transaction_id = ?; // number
        // newObject.investment_order_id = ?; // number
        // newObject.investment_withdrawel_id = ?; // number
        // newObject.investor_earning_id = ?; // number
        // newObject.user_pdf_id = ?; // number
        newObject.additional = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890'; // string 
        newObject.webhooks_fired = true; // boolean boolean
        newObject.is_deleted = true; // boolean boolean
        // newObject.last_changed_by_id = ?; // number
        // newObject.updatetime = ?; // Date
        // newObject.createtime = ?; // Date
        let dalInvestmentOrder = await moduleFixture.resolve<InvestmentOrderDal>(InvestmentOrderDal);
        dalInvestmentOrder.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkinvestment_order = await dalInvestmentOrder.findAllByFilter('', undefined, undefined, undefined, 1, 1); // InvestmentOrder 
        if (fkinvestment_order.length > 0)
            newObject.investment_order = fkinvestment_order[0] as any; // InvestmentOrder 
        newObject.investment_order_id = (fkinvestment_order[0] as any).id;
        let dalInvestmentTransaction = await moduleFixture.resolve<InvestmentTransactionDal>(InvestmentTransactionDal);
        dalInvestmentTransaction.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkinvestment_transaction = await dalInvestmentTransaction.findAllByFilter('', undefined, undefined, undefined, 1, 1); // InvestmentTransaction 
        if (fkinvestment_transaction.length > 0)
            newObject.investment_transaction = fkinvestment_transaction[0] as any; // InvestmentTransaction 
        newObject.investment_transaction_id = (fkinvestment_transaction[0] as any).id;
        let dalInvestmentWithdrawal = await moduleFixture.resolve<InvestmentWithdrawalDal>(InvestmentWithdrawalDal);
        dalInvestmentWithdrawal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkinvestment_withdrawel = await dalInvestmentWithdrawal.findAllByFilter('', undefined, undefined, undefined, 1, 1); // InvestmentWithdrawal 
        if (fkinvestment_withdrawel.length > 0)
            newObject.investment_withdrawel = fkinvestment_withdrawel[0] as any; // InvestmentWithdrawal 
        newObject.investment_withdrawel_id = (fkinvestment_withdrawel[0] as any).id;
        let dalInvestorEarning = await moduleFixture.resolve<InvestorEarningDal>(InvestorEarningDal);
        dalInvestorEarning.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkinvestor_earning = await dalInvestorEarning.findAllByFilter('', undefined, undefined, undefined, 1, 1); // InvestorEarning 
        if (fkinvestor_earning.length > 0)
            newObject.investor_earning = fkinvestor_earning[0] as any; // InvestorEarning 
        newObject.investor_earning_id = (fkinvestor_earning[0] as any).id;
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
        let dalProject = await moduleFixture.resolve<ProjectDal>(ProjectDal);
        dalProject.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkproject = await dalProject.findAllByFilter('', undefined, undefined, undefined, 1, 1); // Project 
        if (fkproject.length > 0)
            newObject.project = fkproject[0] as any; // Project 
        newObject.project_id = (fkproject[0] as any).id;
        let fkuser = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fkuser.length > 0)
            newObject.user = fkuser[0] as any; // AllUser 
        newObject.user_id = (fkuser[0] as any).id;
        let dalUserPdf = await moduleFixture.resolve<UserPdfDal>(UserPdfDal);
        dalUserPdf.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkuser_pdf = await dalUserPdf.findAllByFilter('', undefined, undefined, undefined, 1, 1); // UserPdf 
        if (fkuser_pdf.length > 0)
            newObject.user_pdf = fkuser_pdf[0] as any; // UserPdf 
        newObject.user_pdf_id = (fkuser_pdf[0] as any).id;

        let newObjectId = await dal.create(newObject);
        let savedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof savedObject.type == 'string') ? parseInt(savedObject.type) : savedObject.type).toBe(newObject.type);
        expect(savedObject.additional).toBe(newObject.additional);
        expect(savedObject.webhooks_fired).toBe(newObject.webhooks_fired);
        expect(savedObject.is_deleted).toBe(newObject.is_deleted);

        // update save and compare
        newObject.id = newObjectId as number;
        newObject.type = 2 as unknown as EventType // enum; // EventType
        newObject.additional = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string
        newObject.webhooks_fired = false; // boolean
        newObject.is_deleted = false; // boolean

        await dal.save(newObject);
        let reloadedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof reloadedObject.type == 'string') ? parseInt(reloadedObject.type) : reloadedObject.type).toBe(newObject.type);
        expect(reloadedObject.additional).toBe(newObject.additional);
        expect(reloadedObject.webhooks_fired).toBe(newObject.webhooks_fired);
        expect(reloadedObject.is_deleted).toBe(newObject.is_deleted);

        // delete and check that its gone
        await dal.removeOneById(newObjectId);
        let objectAfterDelete = await dal.findOneById(newObjectId);
        expect(objectAfterDelete).toBeNull();
    });
});
