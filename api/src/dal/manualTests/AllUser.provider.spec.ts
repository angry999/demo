import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from './../DatabaseConnectionPool.provider';
import { AllUserDal } from './../AllUser.provider';
import { Investor } from '../../model/Investor.entity.generated';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';
import { InvestorDal } from './../Investor.provider';
import { UserSocialProfileDal } from './../UserSocialProfile.provider';
import { SponsorSocialProfileDal } from './../SponsorSocialProfile.provider';
import { IssuerAdmin } from '../../model/IssuerAdmin.entity.generated';
import { IssuerAdminDal } from './../IssuerAdmin.provider';
import { AdminUserDal } from '../AdminUser.provider';

describe('AllUser', () => {
    let dal: AllUserDal;

    beforeEach(async () => {
        try {
            const app: TestingModule = await Test.createTestingModule(
                {
                    imports: []
                    , providers: [...DatabaseConnectionPool, SponsorSocialProfileDal, UserSocialProfileDal, InvestorDal, AllUserDal, AdminUserDal, IssuerAdminDal]
                }).compile();

            dal = await app.resolve<AllUserDal>(AllUserDal);
            dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        }
        catch (problem) {
            expect(1).toBe(0);
        }
    });

    it('cobranded_client_of', async () => {
        try {
            let allResults = await dal.findAllByFilter(`id = 5`, null, ["cobranded_client_of"]);
            let oneResult = allResults[0] as Investor;
            expect(oneResult.cobranded_client_of).toBeDefined();
        }
        catch (problem) {
            expect(1).toBe(0);
        }
    });

    it('Find First investor', async () => {
        try {
            let results = await dal.findAllByFilter(`user_type = '${UserType.investor}'`, null, null, null, 1, 1);
            expect(results.length).toBeGreaterThanOrEqual(0);
            expect(results.length).toBeLessThanOrEqual(1);
            expect(results[0]).toBeInstanceOf(Investor);
        }
        catch (problem) {
            expect(1).toBe(0);
        }
    });

    it('Find First issuer admin', async () => {
        try {
            let results = await dal.findAllByFilter(`user_type = '${UserType.issuer_admin}'`, null, null, null, 1, 1);
            expect(results.length).toBeGreaterThanOrEqual(0);
            expect(results.length).toBeLessThanOrEqual(1);
            expect(results[0]).toBeInstanceOf(IssuerAdmin);
        }
        catch (problem) {
            expect(1).toBe(0);
        }
    });

    it('bug 4053', async () => {
        try {
            let results = await dal.findAllByFilter(`email = 'fundscraperautotest@gmail.com' and is_deleted = 0 and user_type in ('c', 'a')`, null, ['cobranded_client_of'], ['all_users.user_type desc'], 1, 1);
            expect(results).toBeDefined();
        }
        catch (problem) {
            expect(1).toBe(0);
        }
    });
});
