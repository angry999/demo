import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { ComputedAccountTotalIncomeDal } from '../../dal/ComputedAccountTotalIncome.provider';
import { ComputedAccountTotalIncome } from '../../model/ComputedAccountTotalIncome.entity.generated';

describe('ComputedAccountTotalIncomeDal-generated', () => {
    let dal: ComputedAccountTotalIncomeDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<ComputedAccountTotalIncomeDal>(ComputedAccountTotalIncomeDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Find First 2', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 2);
        expect(workingResults.length).toBeGreaterThanOrEqual(0);
        expect(workingResults.length).toBeLessThanOrEqual(2);
    });

});
