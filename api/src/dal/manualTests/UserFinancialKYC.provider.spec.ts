import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { UserFinancialKycDal } from '../UserFinancialKyc.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('UserFinancialKYCDal', () => {
    let dal: UserFinancialKycDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, UserFinancialKycDal],
            }).compile();

        dal = await app.resolve<UserFinancialKycDal>(UserFinancialKycDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult.employment_status).toBe("Self Employed");
        expect(oneResult.employer).toBe("PHP Web India");
        expect(oneResult.industry).toBe("Technology");
        expect(oneResult.position).toBe("Sr Software Engineer");
        expect(oneResult.years).toBe("12 Years");
        expect(oneResult.income_includes_partner).toBe("Combined with spouse");
        expect(oneResult.income_current_year).toBe(5);
        expect(oneResult.income_previous_year).toBe(5);
        expect(oneResult.income_two_years_ago).toBe(5);
        expect(oneResult.year_entered).toBe(2017);
        expect(oneResult.net_financial_assest_range).toBe(10);
        expect(oneResult.net_assets_range).toBe(7);
        expect(oneResult.advisor_dealer).toBe("No");
        expect(oneResult.represents_advisor_dealer).toBe("No");
        expect(oneResult.acting_on_account_for_advisor_dealer).toBe("No");
        expect(oneResult.user_id).toBe(1);
        expect(oneResult.last_changed_by_id).toBe(843);
        expect(oneResult.id).toBe(1);
        expect(oneResult.updatetime.toISOString()).toBe("2019-08-02T16:35:48.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2019-02-07T10:23:56.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});
