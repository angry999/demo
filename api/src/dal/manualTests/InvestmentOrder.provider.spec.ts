import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { InvestmentOrderDal } from '../../dal/InvestmentOrder.provider';
import { AllUserDal } from '../../dal/AllUser.provider';
import { UserEntityDal } from '../../dal/UserEntity.provider';
import { InvestorDal } from '../../dal/Investor.provider';
import { UserCorporationDal } from '../../dal/UserCorporation.provider';
import { UserCorporation } from '../../model/UserCorporation.entity.generated';
import { Investor } from '../../model/Investor.entity.generated';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';
import { UserTrustDal } from './../UserTrust.provider';
import { ProjectDal } from './../Project.provider';
import { UserPdfDal } from './../UserPdf.provider';
import { RoedSchedule1Dal } from '../RoedSchedule1.provider';

describe('InvestmentOrderDal', () => {
    let dal: InvestmentOrderDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, UserCorporationDal, InvestmentOrderDal, AllUserDal, UserEntityDal, InvestorDal, UserTrustDal, UserPdfDal, ProjectDal, RoedSchedule1Dal],
            }).compile();

        dal = await app.resolve<InvestmentOrderDal>(InvestmentOrderDal);
        dal.setUserForRequest(new UserIdentification(936, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult.entity_type).toBe(0);
        expect(oneResult.entity_id).toBe("");
        expect(oneResult.order_no).toBe("MU-101-101-00051R");
        expect(oneResult.status).toBe(3);
        expect(oneResult.number_of_shares).toBe(5);
        expect(oneResult.total_amount).toBe(5000.00);
        expect(oneResult.share_price).toBe(1000.00);
        expect(oneResult.sale_price).toBe(0.00);
        expect(oneResult.order_date.toISOString()).toBe("2017-03-06T23:58:29.000Z");
        expect(oneResult.sell_date.toISOString()).toBe("1970-01-01T00:00:00.000Z");
        expect(oneResult.acknowledgements).toBe(true);
        expect(oneResult.docusign).toBe(true);
        expect(oneResult.docusign_date.toISOString()).toBe("1970-01-01T00:00:00.000Z");
        expect(oneResult.payment_mode).toBe("Wire Transfer");
        expect(oneResult.order_confirm).toBe(true);
        expect(oneResult.agent_comm).toBe(125.00);
        expect(oneResult.transfer_no).toBe("");
        expect(oneResult.transfer_old_id).toBe(null);
        expect(oneResult.transfer_date.toISOString()).toBe("1970-01-01T00:00:00.000Z");
        expect(oneResult.transfer_settled_date.toISOString()).toBe("1970-01-01T00:00:00.000Z");
        expect(oneResult.refund_no).toBe("");
        expect(oneResult.refund_settled_no).toBe("123");
        expect(oneResult.refund_date.toISOString()).toBe("2017-09-17T21:38:27.000Z");
        expect(oneResult.refund_settled_date.toISOString()).toBe("2017-09-17T04:00:00.000Z");
        expect(oneResult.escrow_no).toBe("123");
        expect(oneResult.escrow_date.toISOString()).toBe("2017-03-06T05:00:00.000Z");
        expect(oneResult.escrow_settled_no).toBe("");
        expect(oneResult.escrow_settled_date.toISOString()).toBe("2017-03-06T05:00:00.000Z");
        expect(oneResult.document_name).toBe("");
        expect(oneResult.user_id).toBe(1);
        expect(oneResult.is_deleted).toBe(false);
        expect(oneResult.last_changed_by_id).toBe(2);
        expect(oneResult.id).toBe(1);
        expect(oneResult.createtime.toISOString()).toBe("2019-05-10T14:28:07.000Z");
        expect(oneResult.issuer_id).toBe(31);
        expect(oneResult.project_id).toBe(1);
    });

    it('findAllByFilter predefined, expand and check values', async () => {
        //let oneResult = await dal.findOneById(8, ['user', 'user_entity']); 
        let oneResult = await dal.findAllByFilter(null, null, ['user', 'user_entity'], null, 1, 1000);
        let x = oneResult.length;
        /*
        expect(oneResult.entity_type).toBe(1);
        expect(oneResult.user).not.toBeNull();
        expect(oneResult.user).toBeInstanceOf(Investor);
        expect(((oneResult.user as unknown) as Investor).id).toBe(5);
        expect(oneResult.entity_id).toBe("c81e728d9d4c2f636f067f89cc14862c");
        expect(oneResult.user_entity).toBeInstanceOf(UserCorporation);
        */
    });

    it('Find one by id predefined, expand and check values', async () => {
        //let oneResult = await dal.findOneById(8, ['user', 'user_entity']); 
        let oneResult = await dal.findOneById(8, ['user', 'user_entity']);
        expect(oneResult.entity_type).toBe(1);
        expect(oneResult.user).not.toBeNull();
        expect(oneResult.user).toBeInstanceOf(Investor);
        expect(((oneResult.user as unknown) as Investor).id).toBe(5);
        expect(oneResult.entity_id).toBe("c81e728d9d4c2f636f067f89cc14862c");
        expect(oneResult.user_entity).toBeInstanceOf(UserCorporation);
    });

    it('Extends to project.name', async () => {
        let projectName = 'Test Project 123';
        let allResults = await dal.findAllByFilter(`investment_orders.is_deleted = 0 and project.name = '${projectName}'`, undefined, ['user.pdfs', 'project', 'user_entity', 'roed_schedule1'], ['investment_orders.order_date desc'], 1, 10);
        expect(allResults.length).toBeGreaterThanOrEqual(1);
        let oneResult = allResults[0];
        expect(oneResult.project.name).toBe(projectName);
    });

});

