import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { UserRelationshipDal } from '../../dal/UserRelationship.provider';
import { UserRelationship } from '../../model/UserRelationship.entity.generated';
import { UserRelationshipType } from 'fundscraper-model-enums';
import { AllUserDal } from '../../dal/AllUser.provider';

describe('UserRelationshipDal-generated', () => {
    let dal: UserRelationshipDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<UserRelationshipDal>(UserRelationshipDal);
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

    it('Find one and user_1 to all_users', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['user_1'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and user_2 to all_users', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['user_2'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Create one then update', async () => {
        let newObject = new UserRelationship();

        // assign value to each property
        // newObject.id = ?; // number
        // newObject.user_1_id = ?; // number
        // newObject.user_2_id = ?; // number
        newObject.relationship_type = 1 as unknown as UserRelationshipType // enum; // UserRelationshipType UserRelationshipType
        newObject.is_deleted = true; // boolean boolean
        // newObject.last_changed_by_id = ?; // number
        // newObject.updatetime = ?; // Date
        // newObject.createtime = ?; // Date
        let dalAllUser = await moduleFixture.resolve<AllUserDal>(AllUserDal);
        dalAllUser.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fklast_changed_by = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fklast_changed_by.length > 0)
            newObject.last_changed_by = fklast_changed_by[0] as any; // AllUser 
        newObject.last_changed_by_id = (fklast_changed_by[0] as any).id;
        let fkuser_1 = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fkuser_1.length > 0)
            newObject.user_1 = fkuser_1[0] as any; // AllUser 
        newObject.user_1_id = (fkuser_1[0] as any).id;
        let fkuser_2 = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fkuser_2.length > 0)
            newObject.user_2 = fkuser_2[0] as any; // AllUser 
        newObject.user_2_id = (fkuser_2[0] as any).id;

        let newObjectId = await dal.create(newObject);
        let savedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof savedObject.relationship_type == 'string') ? parseInt(savedObject.relationship_type) : savedObject.relationship_type).toBe(newObject.relationship_type);
        expect(savedObject.is_deleted).toBe(newObject.is_deleted);

        // update save and compare
        newObject.id = newObjectId as number;
        newObject.relationship_type = 2 as unknown as UserRelationshipType // enum; // UserRelationshipType
        newObject.is_deleted = false; // boolean

        await dal.save(newObject);
        let reloadedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof reloadedObject.relationship_type == 'string') ? parseInt(reloadedObject.relationship_type) : reloadedObject.relationship_type).toBe(newObject.relationship_type);
        expect(reloadedObject.is_deleted).toBe(newObject.is_deleted);

        // delete and check that its gone
        await dal.removeOneById(newObjectId);
        let objectAfterDelete = await dal.findOneById(newObjectId);
        expect(objectAfterDelete).toBeNull();
    });
});
