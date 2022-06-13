import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { ProjectBalanceAdjustmentDal } from '../../dal/ProjectBalanceAdjustment.provider';
import { ProjectBalanceAdjustment } from '../../model/ProjectBalanceAdjustment.entity.generated';
import { ProjectAdjustmentType } from 'fundscraper-model-enums';
import { InvestmentActivity } from 'fundscraper-model-enums';
import { AllUserDal } from '../../dal/AllUser.provider';
import { ProjectDal } from '../../dal/Project.provider';

describe('ProjectBalanceAdjustmentDal-generated', () => {
    let dal: ProjectBalanceAdjustmentDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<ProjectBalanceAdjustmentDal>(ProjectBalanceAdjustmentDal);
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

    it('Find one and project to projects', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['project'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Create one then update', async () => {
        let newObject = new ProjectBalanceAdjustment();

        // assign value to each property
        // newObject.id = ?; // number
        // newObject.project_id = ?; // number
        newObject.adjustment_type = 1 as unknown as ProjectAdjustmentType // enum; // ProjectAdjustmentType ProjectAdjustmentType
        newObject.category = 1 as unknown as InvestmentActivity // enum; // InvestmentActivity InvestmentActivity
        newObject.description = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01'; // string 
        newObject.amount = -1; // number 
        newObject.transaction_date = new Date(); // Date
        newObject.transaction_date.setMilliseconds(0); // rounding for db
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
        let dalProject = await moduleFixture.resolve<ProjectDal>(ProjectDal);
        dalProject.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkproject = await dalProject.findAllByFilter('', undefined, undefined, undefined, 1, 1); // Project 
        if (fkproject.length > 0)
            newObject.project = fkproject[0] as any; // Project 
        newObject.project_id = (fkproject[0] as any).id;

        let newObjectId = await dal.create(newObject);
        let savedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof savedObject.adjustment_type == 'string') ? parseInt(savedObject.adjustment_type) : savedObject.adjustment_type).toBe(newObject.adjustment_type);
        expect((typeof savedObject.category == 'string') ? parseInt(savedObject.category) : savedObject.category).toBe(newObject.category);
        expect(savedObject.description).toBe(newObject.description);
        expect(savedObject.amount).toBe(newObject.amount);
        expect(savedObject.transaction_date.getTime()).toBe(newObject.transaction_date.getTime());
        expect(savedObject.is_deleted).toBe(newObject.is_deleted);

        // update save and compare
        newObject.id = newObjectId as number;
        newObject.adjustment_type = 2 as unknown as ProjectAdjustmentType // enum; // ProjectAdjustmentType
        newObject.category = 2 as unknown as InvestmentActivity // enum; // InvestmentActivity
        newObject.description = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopq'; // string
        newObject.amount = 1; // number
        newObject.transaction_date = new Date('1999/01/01'); // Date		
        newObject.transaction_date.setMilliseconds(0); // rounding for db
        newObject.is_deleted = false; // boolean

        await dal.save(newObject);
        let reloadedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof reloadedObject.adjustment_type == 'string') ? parseInt(reloadedObject.adjustment_type) : reloadedObject.adjustment_type).toBe(newObject.adjustment_type);
        expect((typeof reloadedObject.category == 'string') ? parseInt(reloadedObject.category) : reloadedObject.category).toBe(newObject.category);
        expect(reloadedObject.description).toBe(newObject.description);
        expect(reloadedObject.amount).toBe(newObject.amount);
        expect(reloadedObject.transaction_date.getTime()).toBe(newObject.transaction_date.getTime());
        expect(reloadedObject.is_deleted).toBe(newObject.is_deleted);

        // delete and check that its gone
        await dal.removeOneById(newObjectId);
        let objectAfterDelete = await dal.findOneById(newObjectId);
        expect(objectAfterDelete).toBeNull();
    });
});
