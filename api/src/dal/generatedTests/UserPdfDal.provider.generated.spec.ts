import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { UserPdfDal } from '../../dal/UserPdf.provider';
import { UserPdf } from '../../model/UserPdf.entity.generated';
import { UserPdfType } from 'fundscraper-model-enums';
import { AllUserDal } from '../../dal/AllUser.provider';
import { InvestmentOrderDal } from '../../dal/InvestmentOrder.provider';

describe('UserPdfDal-generated', () => {
    let dal: UserPdfDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<UserPdfDal>(UserPdfDal);
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

    it('Find one and order to investment_orders', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['order'], null, 1, 10);
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
        let newObject = new UserPdf();

        // assign value to each property
        // newObject.id = ?; // number
        // newObject.user_id = ?; // number
        // newObject.order_id = ?; // number
        newObject.pdf_type = 1 as unknown as UserPdfType // enum; // UserPdfType UserPdfType
        newObject.pdf_name = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string 
        newObject.exel_name = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string 
        newObject.relevant_month = -1; // number 
        newObject.relevant_year = -1; // number 
        newObject.remarks = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrs'; // string 
        newObject.effective_date = new Date(); // Date
        newObject.effective_date.setMilliseconds(0); // rounding for db
        newObject.is_deleted = true; // boolean boolean
        // newObject.last_changed_by_id = ?; // number
        // newObject.createtime = ?; // Date
        // newObject.updatetime = ?; // Date
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
        let fkuser = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fkuser.length > 0)
            newObject.user = fkuser[0] as any; // AllUser 
        newObject.user_id = (fkuser[0] as any).id;

        let newObjectId = await dal.create(newObject);
        let savedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof savedObject.pdf_type == 'string') ? parseInt(savedObject.pdf_type) : savedObject.pdf_type).toBe(newObject.pdf_type);
        expect(savedObject.pdf_name).toBe(newObject.pdf_name);
        expect(savedObject.exel_name).toBe(newObject.exel_name);
        expect(savedObject.relevant_month).toBe(newObject.relevant_month);
        expect(savedObject.relevant_year).toBe(newObject.relevant_year);
        expect(savedObject.remarks).toBe(newObject.remarks);
        expect(savedObject.effective_date.getTime()).toBe(newObject.effective_date.getTime());
        expect(savedObject.is_deleted).toBe(newObject.is_deleted);

        // update save and compare
        newObject.id = newObjectId as number;
        newObject.pdf_type = 2 as unknown as UserPdfType // enum; // UserPdfType
        newObject.pdf_name = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcd'; // string
        newObject.exel_name = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcd'; // string
        newObject.relevant_month = 1; // number
        newObject.relevant_year = 1; // number
        newObject.remarks = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefgh'; // string
        newObject.effective_date = new Date('1999/01/01'); // Date		
        newObject.effective_date.setMilliseconds(0); // rounding for db
        newObject.is_deleted = false; // boolean

        await dal.save(newObject);
        let reloadedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof reloadedObject.pdf_type == 'string') ? parseInt(reloadedObject.pdf_type) : reloadedObject.pdf_type).toBe(newObject.pdf_type);
        expect(reloadedObject.pdf_name).toBe(newObject.pdf_name);
        expect(reloadedObject.exel_name).toBe(newObject.exel_name);
        expect(reloadedObject.relevant_month).toBe(newObject.relevant_month);
        expect(reloadedObject.relevant_year).toBe(newObject.relevant_year);
        expect(reloadedObject.remarks).toBe(newObject.remarks);
        expect(reloadedObject.effective_date.getTime()).toBe(newObject.effective_date.getTime());
        expect(reloadedObject.is_deleted).toBe(newObject.is_deleted);

        // delete and check that its gone
        await dal.removeOneById(newObjectId);
        let objectAfterDelete = await dal.findOneById(newObjectId);
        expect(objectAfterDelete).toBeNull();
    });
});
