import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { UserSocialPostDal } from '../../dal/UserSocialPost.provider';
import { UserSocialPost } from '../../model/UserSocialPost.entity.generated';
import { UserSocialPostType } from 'fundscraper-model-enums';
import { SocialProfilePostState } from 'fundscraper-model-enums';
import { AllUserDal } from '../../dal/AllUser.provider';
import { UserSocialProfileDal } from '../../dal/UserSocialProfile.provider';

describe('UserSocialPostDal-generated', () => {
    let dal: UserSocialPostDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<UserSocialPostDal>(UserSocialPostDal);
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

    it('Find one and related_profile to users_social_profile', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['related_profile'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and profile to users_social_profile', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['profile'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and related_post to users_social_post', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['related_post'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Create one then update', async () => {
        let newObject = new UserSocialPost();

        // assign value to each property
        // newObject.id = ?; // number
        newObject.post_type = 1 as unknown as UserSocialPostType // enum; // UserSocialPostType UserSocialPostType
        // newObject.profile_id = ?; // number
        // newObject.related_profile_id = ?; // number
        // newObject.related_post_id = ?; // number
        newObject.status = 1 as unknown as SocialProfilePostState // enum; // SocialProfilePostState SocialProfilePostState
        newObject.post = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz0123456789'; // string 
        newObject.image = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklm'; // string 
        newObject.link = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrs'; // string 
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
        let dalUserSocialProfile = await moduleFixture.resolve<UserSocialProfileDal>(UserSocialProfileDal);
        dalUserSocialProfile.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkrelated_profile = await dalUserSocialProfile.findAllByFilter('', undefined, undefined, undefined, 1, 1); // UserSocialProfile 
        if (fkrelated_profile.length > 0)
            newObject.related_profile = fkrelated_profile[0] as any; // UserSocialProfile 
        newObject.related_profile_id = (fkrelated_profile[0] as any).id;
        let fkprofile = await dalUserSocialProfile.findAllByFilter('', undefined, undefined, undefined, 1, 1); // UserSocialProfile 
        if (fkprofile.length > 0)
            newObject.profile = fkprofile[0] as any; // UserSocialProfile 
        newObject.profile_id = (fkprofile[0] as any).id;
        let dalUserSocialPost = await moduleFixture.resolve<UserSocialPostDal>(UserSocialPostDal);
        dalUserSocialPost.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkrelated_post = await dalUserSocialPost.findAllByFilter('', undefined, undefined, undefined, 1, 1); // UserSocialPost 
        if (fkrelated_post.length > 0)
            newObject.related_post = fkrelated_post[0] as any; // UserSocialPost 
        newObject.related_post_id = (fkrelated_post[0] as any).id;

        let newObjectId = await dal.create(newObject);
        let savedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof savedObject.post_type == 'string') ? parseInt(savedObject.post_type) : savedObject.post_type).toBe(newObject.post_type);
        expect((typeof savedObject.status == 'string') ? parseInt(savedObject.status) : savedObject.status).toBe(newObject.status);
        expect(savedObject.post).toBe(newObject.post);
        expect(savedObject.image).toBe(newObject.image);
        expect(savedObject.link).toBe(newObject.link);
        expect(savedObject.is_deleted).toBe(newObject.is_deleted);

        // update save and compare
        newObject.id = newObjectId as number;
        newObject.post_type = 2 as unknown as UserSocialPostType // enum; // UserSocialPostType
        newObject.status = 2 as unknown as SocialProfilePostState // enum; // SocialProfilePostState
        newObject.post = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxy'; // string
        newObject.image = '01234567890abcdefghijklmnopqrstuvwxyz01234567890ab'; // string
        newObject.link = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefgh'; // string
        newObject.is_deleted = false; // boolean

        await dal.save(newObject);
        let reloadedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof reloadedObject.post_type == 'string') ? parseInt(reloadedObject.post_type) : reloadedObject.post_type).toBe(newObject.post_type);
        expect((typeof reloadedObject.status == 'string') ? parseInt(reloadedObject.status) : reloadedObject.status).toBe(newObject.status);
        expect(reloadedObject.post).toBe(newObject.post);
        expect(reloadedObject.image).toBe(newObject.image);
        expect(reloadedObject.link).toBe(newObject.link);
        expect(reloadedObject.is_deleted).toBe(newObject.is_deleted);

        // delete and check that its gone
        await dal.removeOneById(newObjectId);
        let objectAfterDelete = await dal.findOneById(newObjectId);
        expect(objectAfterDelete).toBeNull();
    });
});
