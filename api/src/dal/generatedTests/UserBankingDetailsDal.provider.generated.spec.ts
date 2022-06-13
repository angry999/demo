import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { UserBankingDetailsDal } from '../../dal/UserBankingDetails.provider';
import { UserBankingDetails } from '../../model/UserBankingDetails.entity.generated';
import { AllUserDal } from '../../dal/AllUser.provider';
import { UserEntityDal } from '../../dal/UserEntity.provider';

describe('UserBankingDetailsDal-generated', () => {
    let dal: UserBankingDetailsDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<UserBankingDetailsDal>(UserBankingDetailsDal);
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
    it('Find one and joint_subscriber to all_users', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['joint_subscriber'], null, 1, 10);
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
        let newObject = new UserBankingDetails();

        // assign value to each property
        // newObject.id = ?; // number
        // newObject.user_id = ?; // number
        // newObject.user_entity_id = ?; // number
        // newObject.joint_subscriber_id = ?; // number
        newObject.beneficiary_name = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string 
        newObject.encrypted_data = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890'; // string 
        newObject.stored_offline = true; // boolean boolean
        // newObject.last_changed_by_id = ?; // number
        // newObject.updatetime = ?; // Date
        // newObject.createtime = ?; // Date
        let dalAllUser = await moduleFixture.resolve<AllUserDal>(AllUserDal);
        dalAllUser.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkjoint_subscriber = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fkjoint_subscriber.length > 0)
            newObject.joint_subscriber = fkjoint_subscriber[0] as any; // AllUser 
        newObject.joint_subscriber_id = (fkjoint_subscriber[0] as any).id;
        let fklast_changed_by = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fklast_changed_by.length > 0)
            newObject.last_changed_by = fklast_changed_by[0] as any; // AllUser 
        newObject.last_changed_by_id = (fklast_changed_by[0] as any).id;
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
        expect(savedObject.beneficiary_name).toBe(newObject.beneficiary_name);
        expect(savedObject.encrypted_data).toBe(newObject.encrypted_data);
        expect(savedObject.stored_offline).toBe(newObject.stored_offline);

        // update save and compare
        newObject.id = newObjectId as number;
        newObject.beneficiary_name = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcd'; // string
        newObject.encrypted_data = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string
        newObject.stored_offline = false; // boolean

        await dal.save(newObject);
        let reloadedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect(reloadedObject.beneficiary_name).toBe(newObject.beneficiary_name);
        expect(reloadedObject.encrypted_data).toBe(newObject.encrypted_data);
        expect(reloadedObject.stored_offline).toBe(newObject.stored_offline);

        // delete and check that its gone
        await dal.removeOneById(newObjectId);
        let objectAfterDelete = await dal.findOneById(newObjectId);
        expect(objectAfterDelete).toBeNull();
    });
});
