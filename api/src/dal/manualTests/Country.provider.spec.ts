import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { CountryDal } from '../../dal/Country.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('CountryDal', () => {
    let dal: CountryDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, CountryDal],
            }).compile();

        dal = await app.resolve<CountryDal>(CountryDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult.id).toBe(1);
        expect(oneResult.name).toBe("Afghanistan");
        expect(oneResult.isocode2).toBe("AF");
        expect(oneResult.isocode3).toBe("AFG");
        expect(oneResult.telephone_prefix).toBe("+93");
        expect(oneResult.region_id).toBe(3);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.createtime.toISOString()).toBe("2019-02-07T10:23:55.000Z");
        expect(oneResult.updatetime.toISOString()).toBe("2019-02-07T10:23:55.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });

    it('Read predefined by single filter', async () => {
        let allResults = await dal.findAllByFilter(`name = 'Afghanistan'`);
        let oneResult = allResults[0];
        expect(oneResult.id).toBe(1);
        expect(oneResult.name).toBe("Afghanistan");
        expect(oneResult.isocode2).toBe("AF");
        expect(oneResult.isocode3).toBe("AFG");
        expect(oneResult.telephone_prefix).toBe("+93");
        expect(oneResult.region_id).toBe(3);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.createtime.toISOString()).toBe("2019-02-07T10:23:55.000Z");
        expect(oneResult.updatetime.toISOString()).toBe("2019-02-07T10:23:55.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });

    it('Read predefined by compound filter', async () => {
        let allResults = await dal.findAllByFilter(`name = 'Andorra' and isocode2 = 'AD'`);
        let oneResult = allResults[0];
        expect(oneResult.id).toBe(6);
        expect(oneResult.name).toBe("Andorra");
        expect(oneResult.isocode2).toBe("AD");
        expect(oneResult.isocode3).toBe("AND");
        expect(oneResult.telephone_prefix).toBe("+376");
        expect(oneResult.region_id).toBe(4);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.createtime.toISOString()).toBe("2019-02-07T10:23:55.000Z");
        expect(oneResult.updatetime.toISOString()).toBe("2019-02-07T10:23:55.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});
