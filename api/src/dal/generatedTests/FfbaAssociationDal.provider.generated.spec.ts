import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { FfbaAssociationDal } from '../../dal/FfbaAssociation.provider';
import { FfbaAssociation } from '../../model/FfbaAssociation.entity.generated';
import { UserEntityDal } from '../../dal/UserEntity.provider';
import { AllUserDal } from '../../dal/AllUser.provider';
import { ProjectDal } from '../../dal/Project.provider';

describe('FfbaAssociationDal-generated', () => {
    let dal: FfbaAssociationDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<FfbaAssociationDal>(FfbaAssociationDal);
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
    it('Find one and entity to users_entity', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['entity'], null, 1, 10);
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

    it('Create one then update', async () => {
        let newObject = new FfbaAssociation();

        // assign value to each property
        // newObject.id = ?; // number
        // newObject.user_id = ?; // number
        // newObject.project_id = ?; // number
        // newObject.entity_id = ?; // number
        newObject.is_director = true; // boolean boolean
        newObject.is_executive_officer = true; // boolean boolean
        newObject.is_control_person = true; // boolean boolean
        newObject.is_founder = true; // boolean boolean
        newObject.is_family_member = true; // boolean boolean
        newObject.is_friend = true; // boolean boolean
        newObject.is_associate = true; // boolean boolean
        newObject.contact_first_name = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.contact_last_name = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.contact_position = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.contact_relationship = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.contact_years_known = -1; // number 
        newObject.contact_email = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string 
        newObject.contact_phone = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.is_deleted = true; // boolean boolean
        // newObject.last_changed_by_id = ?; // number
        // newObject.updatetime = ?; // Date
        // newObject.createtime = ?; // Date
        let dalUserEntity = await moduleFixture.resolve<UserEntityDal>(UserEntityDal);
        dalUserEntity.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkentity = await dalUserEntity.findAllByFilter('', undefined, undefined, undefined, 1, 1); // UserEntity 
        if (fkentity.length > 0)
            newObject.entity = fkentity[0] as any; // UserEntity 
        newObject.entity_id = (fkentity[0] as any).id;
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

        let newObjectId = await dal.create(newObject);
        let savedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect(savedObject.is_director).toBe(newObject.is_director);
        expect(savedObject.is_executive_officer).toBe(newObject.is_executive_officer);
        expect(savedObject.is_control_person).toBe(newObject.is_control_person);
        expect(savedObject.is_founder).toBe(newObject.is_founder);
        expect(savedObject.is_family_member).toBe(newObject.is_family_member);
        expect(savedObject.is_friend).toBe(newObject.is_friend);
        expect(savedObject.is_associate).toBe(newObject.is_associate);
        expect(savedObject.contact_first_name).toBe(newObject.contact_first_name);
        expect(savedObject.contact_last_name).toBe(newObject.contact_last_name);
        expect(savedObject.contact_position).toBe(newObject.contact_position);
        expect(savedObject.contact_relationship).toBe(newObject.contact_relationship);
        expect(savedObject.contact_years_known).toBe(newObject.contact_years_known);
        expect(savedObject.contact_email).toBe(newObject.contact_email);
        expect(savedObject.contact_phone).toBe(newObject.contact_phone);
        expect(savedObject.is_deleted).toBe(newObject.is_deleted);

        // update save and compare
        newObject.id = newObjectId as number;
        newObject.is_director = false; // boolean
        newObject.is_executive_officer = false; // boolean
        newObject.is_control_person = false; // boolean
        newObject.is_founder = false; // boolean
        newObject.is_family_member = false; // boolean
        newObject.is_friend = false; // boolean
        newObject.is_associate = false; // boolean
        newObject.contact_first_name = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.contact_last_name = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.contact_position = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.contact_relationship = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.contact_years_known = 1; // number
        newObject.contact_email = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcd'; // string
        newObject.contact_phone = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.is_deleted = false; // boolean

        await dal.save(newObject);
        let reloadedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect(reloadedObject.is_director).toBe(newObject.is_director);
        expect(reloadedObject.is_executive_officer).toBe(newObject.is_executive_officer);
        expect(reloadedObject.is_control_person).toBe(newObject.is_control_person);
        expect(reloadedObject.is_founder).toBe(newObject.is_founder);
        expect(reloadedObject.is_family_member).toBe(newObject.is_family_member);
        expect(reloadedObject.is_friend).toBe(newObject.is_friend);
        expect(reloadedObject.is_associate).toBe(newObject.is_associate);
        expect(reloadedObject.contact_first_name).toBe(newObject.contact_first_name);
        expect(reloadedObject.contact_last_name).toBe(newObject.contact_last_name);
        expect(reloadedObject.contact_position).toBe(newObject.contact_position);
        expect(reloadedObject.contact_relationship).toBe(newObject.contact_relationship);
        expect(reloadedObject.contact_years_known).toBe(newObject.contact_years_known);
        expect(reloadedObject.contact_email).toBe(newObject.contact_email);
        expect(reloadedObject.contact_phone).toBe(newObject.contact_phone);
        expect(reloadedObject.is_deleted).toBe(newObject.is_deleted);

        // delete and check that its gone
        await dal.removeOneById(newObjectId);
        let objectAfterDelete = await dal.findOneById(newObjectId);
        expect(objectAfterDelete).toBeNull();
    });
});
