import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { CountryDal } from '../../dal/Country.provider';
import { Country } from '../../model/Country.entity.generated';
import { AllUserDal } from '../../dal/AllUser.provider';

describe('CountryDal-generated', () => {
    let dal: CountryDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<CountryDal>(CountryDal);
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

    it('Create one then update', async () => {
        let newObject = new Country();

        // assign value to each property
        // newObject.id = ?; // number
        newObject.name = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklm'; // string 
        newObject.isocode2 = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklm'; // string 
        newObject.isocode3 = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklm'; // string 
        newObject.telephone_prefix = 'abcdefghij'; // string 
        // newObject.region_id = ?; // number
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

        let newObjectId = await dal.create(newObject);
        let savedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect(savedObject.name).toBe(newObject.name);
        expect(savedObject.isocode2).toBe(newObject.isocode2);
        expect(savedObject.isocode3).toBe(newObject.isocode3);
        expect(savedObject.telephone_prefix).toBe(newObject.telephone_prefix);
        expect(savedObject.is_deleted).toBe(newObject.is_deleted);

        // update save and compare
        newObject.id = newObjectId as number;
        newObject.name = '01234567890abcdefghijklmnopqrstuvwxyz01234567890ab'; // string
        newObject.isocode2 = '01234567890abcdefghijklmnopqrstuvwxyz01234567890ab'; // string
        newObject.isocode3 = '01234567890abcdefghijklmnopqrstuvwxyz01234567890ab'; // string
        newObject.telephone_prefix = '0123456789'; // string
        newObject.is_deleted = false; // boolean

        await dal.save(newObject);
        let reloadedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect(reloadedObject.name).toBe(newObject.name);
        expect(reloadedObject.isocode2).toBe(newObject.isocode2);
        expect(reloadedObject.isocode3).toBe(newObject.isocode3);
        expect(reloadedObject.telephone_prefix).toBe(newObject.telephone_prefix);
        expect(reloadedObject.is_deleted).toBe(newObject.is_deleted);

        // delete and check that its gone
        await dal.removeOneById(newObjectId);
        let objectAfterDelete = await dal.findOneById(newObjectId);
        expect(objectAfterDelete).toBeNull();
    });
});
