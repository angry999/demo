import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { ProjectImageDal } from '../../dal/ProjectImage.provider';
import { ProjectImage } from '../../model/ProjectImage.entity.generated';
import { AllUserDal } from '../../dal/AllUser.provider';
import { ProjectEntityDal } from '../../dal/ProjectEntity.provider';
import { ProjectDal } from '../../dal/Project.provider';

describe('ProjectImageDal-generated', () => {
    let dal: ProjectImageDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<ProjectImageDal>(ProjectImageDal);
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

    it('Find one and project_entity to project_entity', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['project_entity'], null, 1, 10);
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
        let newObject = new ProjectImage();

        // assign value to each property
        // newObject.id = ?; // number
        // newObject.project_id = ?; // number
        // newObject.project_entity_id = ?; // number
        newObject.title = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01'; // string 
        newObject.image = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklm'; // string 
        newObject.sort_order = -1; // number 
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
        let dalProjectEntity = await moduleFixture.resolve<ProjectEntityDal>(ProjectEntityDal);
        dalProjectEntity.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkproject_entity = await dalProjectEntity.findAllByFilter('', undefined, undefined, undefined, 1, 1); // ProjectEntity 
        if (fkproject_entity.length > 0)
            newObject.project_entity = fkproject_entity[0] as any; // ProjectEntity 
        newObject.project_entity_id = (fkproject_entity[0] as any).id;
        let dalProject = await moduleFixture.resolve<ProjectDal>(ProjectDal);
        dalProject.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkproject = await dalProject.findAllByFilter('', undefined, undefined, undefined, 1, 1); // Project 
        if (fkproject.length > 0)
            newObject.project = fkproject[0] as any; // Project 
        newObject.project_id = (fkproject[0] as any).id;

        let newObjectId = await dal.create(newObject);
        let savedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect(savedObject.title).toBe(newObject.title);
        expect(savedObject.image).toBe(newObject.image);
        expect(savedObject.sort_order).toBe(newObject.sort_order);
        expect(savedObject.is_deleted).toBe(newObject.is_deleted);

        // update save and compare
        newObject.id = newObjectId as number;
        newObject.title = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopq'; // string
        newObject.image = '01234567890abcdefghijklmnopqrstuvwxyz01234567890ab'; // string
        newObject.sort_order = 1; // number
        newObject.is_deleted = false; // boolean

        await dal.save(newObject);
        let reloadedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect(reloadedObject.title).toBe(newObject.title);
        expect(reloadedObject.image).toBe(newObject.image);
        expect(reloadedObject.sort_order).toBe(newObject.sort_order);
        expect(reloadedObject.is_deleted).toBe(newObject.is_deleted);

        // delete and check that its gone
        await dal.removeOneById(newObjectId);
        let objectAfterDelete = await dal.findOneById(newObjectId);
        expect(objectAfterDelete).toBeNull();
    });
});
