import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { ComputedProjectTotalIncomeDal } from '../../dal/ComputedProjectTotalIncome.provider';
import { ComputedProjectTotalIncome } from '../../model/ComputedProjectTotalIncome.entity.generated';

describe('ComputedProjectTotalIncomeDal-generated', () => {
    let dal: ComputedProjectTotalIncomeDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<ComputedProjectTotalIncomeDal>(ComputedProjectTotalIncomeDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Find First 2', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 2);
        expect(workingResults.length).toBeGreaterThanOrEqual(0);
        expect(workingResults.length).toBeLessThanOrEqual(2);
    });

});
