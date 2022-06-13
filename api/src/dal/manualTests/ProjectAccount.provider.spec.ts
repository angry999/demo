import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { ProjectAccountDal } from '../../dal/ProjectAccount.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('ProjectAccountDal', () => {
    let dal: ProjectAccountDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, ProjectAccountDal],
            }).compile();

        dal = await app.resolve<ProjectAccountDal>(ProjectAccountDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(2);
        expect(oneResult.institution_number).toBe(null);
        expect(oneResult.swift_code).toBe(null);
        expect(oneResult.branch_mailing_address).toBe("14 Fern Ave.  Richmond Hill ON L4K 59E.");
        expect(oneResult.branch_number).toBe(null);
        expect(oneResult.trust_name).toBe("Zeisman &amp; Zeisman LLP.");
        expect(oneResult.trust_contact).toBe(null);
        expect(oneResult.trust_address).toBe("abcdef@fundscraper.com");
        expect(oneResult.bank_account_number).toBe(null);
        expect(oneResult.sort_order).toBe(0);
        expect(oneResult.project_id).toBe(4);
        expect(oneResult.updatetime.toISOString()).toBe("2019-11-05T13:56:09.000Z");
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.id).toBe(2);
        expect(oneResult.createtime.toISOString()).toBe("2019-02-06T02:12:05.000Z");
        expect(oneResult.is_deleted).toBe(false);
        expect(oneResult.is_active).toBe(true);
    });
});

