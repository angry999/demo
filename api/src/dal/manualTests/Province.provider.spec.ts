import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { ProvinceDal } from '../../dal/Province.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('ProvinceDal', () => {
    let dal: ProvinceDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, ProvinceDal],
            }).compile();

        dal = await app.resolve<ProvinceDal>(ProvinceDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult.name).toBe("Djelfa");
        expect(oneResult.code).toBe("DJE");
        expect(oneResult.latitude).toBe(34.67);
        expect(oneResult.longitude).toBe(3.25);
        expect(oneResult.timezone).toBe("Africa/Algiers");
        expect(oneResult.country_id).toBe(4);
        expect(oneResult.is_deleted).toBe(false);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.id).toBe(1);
        expect(oneResult.updatetime.toISOString()).toBe("2019-02-07T10:23:55.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2019-02-07T10:23:55.000Z");
        expect(oneResult.visible).toBe(false);
    });

});
