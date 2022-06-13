import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { UserIssuerAssociationDal } from '../UserIssuerAssociation.provider';
import { UserIssuerAssociationType } from 'fundscraper-model-enums';
import { UserSocialProfileDal } from '../UserSocialProfile.provider';
import { UserBasicDal } from '../UserBasic.provider';
import { AllUserDal } from '../AllUser.provider';
import { UserIssuerAssociation } from '../../model/UserIssuerAssociation.entity.generated';

describe('UserIssuerAssociationsDal-generated', () => {
    let dal: UserIssuerAssociationDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<UserIssuerAssociationDal>(UserIssuerAssociationDal);
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

    it('Find one and user to all_users', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['user'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Create one then update', async () => {
        let newObject = new UserIssuerAssociation();

        // assign value to each property
        // newObject.id = ?; // number
        // newObject.user_id = ?; // number
        // newObject.issuer_id = ?; // number
        newObject.association_type = 1 as unknown as UserIssuerAssociationType // enum; // UserIssuerAssociationType UserIssuerAssociationType
        newObject.is_deleted = true; // boolean boolean
        // newObject.last_changed_by_id = ?; // number
        // newObject.createtime = ?; // Date
        // newObject.updatetime = ?; // Date
        let dalUserSocialProfile = await moduleFixture.resolve<UserSocialProfileDal>(UserSocialProfileDal);
        dalUserSocialProfile.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkissuer = await dalUserSocialProfile.findAllByFilter('', undefined, undefined, undefined, 1, 1); // UserSocialProfile 
        if (fkissuer.length > 0)
            newObject.issuer = fkissuer[0] as any; // UserSocialProfile 
        newObject.issuer_id = (fkissuer[0] as any).id;
        let dalUserBasic = await moduleFixture.resolve<UserBasicDal>(UserBasicDal);
        dalUserBasic.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fklast_changed_by = await dalUserBasic.findAllByFilter('', undefined, undefined, undefined, 1, 1); // UserBasic 
        if (fklast_changed_by.length > 0)
            newObject.last_changed_by = fklast_changed_by[0] as any; // UserBasic 
        newObject.last_changed_by_id = (fklast_changed_by[0] as any).id;
        let dalAllUser = await moduleFixture.resolve<AllUserDal>(AllUserDal);
        dalAllUser.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkuser = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fkuser.length > 0)
            newObject.user = fkuser[0] as any; // AllUser 
        newObject.user_id = (fkuser[0] as any).id;

        let newObjectId = await dal.create(newObject);
        let savedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof savedObject.association_type == 'string') ? parseInt(savedObject.association_type) : savedObject.association_type).toBe(newObject.association_type);
        expect(savedObject.is_deleted).toBe(newObject.is_deleted);

        // update save and compare
        newObject.id = newObjectId as number;
        newObject.association_type = 2 as unknown as UserIssuerAssociationType // enum; // UserIssuerAssociationType
        newObject.is_deleted = false; // boolean

        await dal.save(newObject);
        let reloadedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof reloadedObject.association_type == 'string') ? parseInt(reloadedObject.association_type) : reloadedObject.association_type).toBe(newObject.association_type);
        expect(reloadedObject.is_deleted).toBe(newObject.is_deleted);

        // delete and check that its gone
        await dal.removeOneById(newObjectId);
        let objectAfterDelete = await dal.findOneById(newObjectId);
        expect(objectAfterDelete).toBeNull();
    });
});
