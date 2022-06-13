import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { UserSocialProfileDal } from '../../dal/UserSocialProfile.provider';
import { NotableInvestorProfileDal } from '../../dal/NotableInvestorProfile.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('UserSocialProfileDal', () => {
    let dal: UserSocialProfileDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, UserSocialProfileDal, NotableInvestorProfileDal],
            }).compile();

        dal = await app.resolve<UserSocialProfileDal>(UserSocialProfileDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult).toBeDefined();
    });
});
