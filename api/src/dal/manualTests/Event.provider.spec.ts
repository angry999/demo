import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { EventDal } from '../../dal/Event.provider';
import { EventType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('EventDal', () => {
    let dal: EventDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, EventDal],
            }).compile();

        dal = await app.resolve<EventDal>(EventDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Find First 2', async () => {
        let results = await dal.findAllByFilter(null, null, null, null, 1, 2);
        expect(results.length).toBeGreaterThanOrEqual(0);
        expect(results.length).toBeLessThanOrEqual(2);
    });


    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(8);
        expect(oneResult.id).toBe(8);
        expect(oneResult.type).toBe(EventType.reg_q_comp);
        expect(oneResult.user_id).toBe(934);
        expect(oneResult.issuer_id).toBe(null);
        expect(oneResult.project_id).toBe(null);
        expect(oneResult.investment_transaction_id).toBe(null);
        expect(oneResult.investment_order_id).toBe(null);
        expect(oneResult.investment_withdrawel_id).toBe(null);
        expect(oneResult.investor_earning_id).toBe(null);
        expect(oneResult.user_pdf_id).toBe(null);
        expect(oneResult.additional).toBe(null);
        expect(oneResult.webhooks_fired).toBe(false);
        expect(oneResult.last_changed_by_id).toBe(934);
        expect(oneResult.updatetime.toISOString()).toBe("2020-02-04T06:19:59.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2020-02-04T06:19:59.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});
