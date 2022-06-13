import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { InvestmentOrderDal } from '../../dal/InvestmentOrder.provider';
import { InvestmentOrder } from '../../model/InvestmentOrder.entity.generated';
import { EntityType } from 'fundscraper-model-enums';
import { PaymentStatus } from 'fundscraper-model-enums';
import { PaymentMethodType } from 'fundscraper-model-enums';
import { InvestmentOrderStatus } from 'fundscraper-model-enums';
import { UserBankingDetailsDal } from '../../dal/UserBankingDetails.provider';
import { FfbaAssociationDal } from '../../dal/FfbaAssociation.provider';
import { InvestmentWithdrawalDal } from '../../dal/InvestmentWithdrawal.provider';
import { UserSocialProfileDal } from '../../dal/UserSocialProfile.provider';
import { AllUserDal } from '../../dal/AllUser.provider';
import { ProjectAccountDal } from '../../dal/ProjectAccount.provider';
import { ProjectDal } from '../../dal/Project.provider';
import { RoedSchedule1Dal } from '../../dal/RoedSchedule1.provider';
import { UserEntityDal } from '../../dal/UserEntity.provider';

describe('InvestmentOrderDal-generated', () => {
    let dal: InvestmentOrderDal;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        dal = await moduleFixture.resolve<InvestmentOrderDal>(InvestmentOrderDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Find First 2', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 2);
        expect(workingResults.length).toBeGreaterThanOrEqual(0);
        expect(workingResults.length).toBeLessThanOrEqual(2);
    });

    it('Find one by id', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let oneResult = await dal.findOneById(workingResults[0].id);
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one by filtered id', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, null, null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    // now expand per property
    it('Find one and distributions_to to users_banking_details', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['distributions_to'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and ffba to ffba_association', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['ffba'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and investment_withdrawal to investment_withdrawal', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['investment_withdrawal'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and issuer to users_social_profile', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['issuer'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and joint_subscriber to all_users', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['joint_subscriber'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and last_changed_by to all_users', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['last_changed_by'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and payment_method to payment_methods', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['payment_method'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and payments_from to users_banking_details', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['payments_from'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and project to projects', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['project'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and roed_schedule1 to roed_schedule1s', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['roed_schedule1'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and transfer_old to investment_orders', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['transfer_old'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and user_entity to users_entity', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['user_entity'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Find one and user to all_users', async () => {
        let workingResults = await dal.findAllByFilter(null, null, null, null, 1, 10);
        let results = await dal.findAllByFilter(`id = ${workingResults[0].id}`, null, ['user'], null, 1, 10);
        expect(results.length).toBe(1);
        let oneResult = results[0];
        expect(oneResult.id).toBe(workingResults[0].id);
    });

    it('Create one then update', async () => {
        let newObject = new InvestmentOrder();

        // assign value to each property
        // newObject.id = ?; // number
        newObject.entity_type = 1 as unknown as EntityType // enum; // EntityType EntityType
        // newObject.entity_id = ?; // string
        // newObject.user_entity_id = ?; // number
        newObject.order_no = 'abcdefghijklmnopqrst'; // string 
        newObject.share_price = -1; // number 
        newObject.number_of_shares = -1; // number 
        newObject.total_amount = -1; // number 
        newObject.acknowledgements = true; // boolean boolean
        newObject.docusign = true; // boolean boolean
        newObject.document_name = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01'; // string 
        newObject.docusign_guid = 'abcdefghijklmnopqrstuvwxyz01234567890abc'; // string 
        newObject.docusign_merge_hash = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz0'; // string 
        newObject.payment = 1 as unknown as PaymentStatus // enum; // PaymentStatus PaymentStatus
        newObject.roed_at_initiation = -1; // number 
        newObject.payment_mode = 1 as unknown as PaymentMethodType // enum; // PaymentMethodType PaymentMethodType
        // newObject.payment_method_id = ?; // number
        // newObject.investment_withdrawal_id = ?; // number
        // newObject.distributions_to_id = ?; // number
        // newObject.payments_from_id = ?; // number
        // newObject.roed_schedule1_id = ?; // number
        newObject.order_confirm = true; // boolean boolean
        newObject.drip_registered = true; // boolean boolean
        newObject.acquiring_with_assets = true; // boolean boolean
        newObject.total_assets_150_k = true; // boolean boolean
        newObject.transferring_assets = true; // boolean boolean
        newObject.transfer_whole_or_part = true; // boolean boolean
        newObject.hubspot_creation = -1; // number 
        newObject.hubspot_dealid = 'abcdefghijklmnopqrstuvwxyz01234567890abc'; // string 
        newObject.escrow_no = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.escrow_settled_no = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.refund_no = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.refund_settled_no = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.transfer_no = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz'; // string 
        newObject.trust_company_name = 'abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string 
        newObject.trust_company_account_no = 'abcdefghijklmnopqrstuvwxyz01234567890abc'; // string 
        newObject.sale_price = -1; // number 
        newObject.agent_comm = -1; // number 
        newObject.status = 1 as unknown as InvestmentOrderStatus // enum; // InvestmentOrderStatus InvestmentOrderStatus
        // newObject.project_id = ?; // number
        // newObject.issuer_id = ?; // number
        // newObject.user_id = ?; // number
        // newObject.ffba_id = ?; // number
        // newObject.joint_subscriber_id = ?; // number
        newObject.filed_roed_row_match = -1; // number 
        newObject.order_date = new Date(); // Date
        newObject.order_date.setMilliseconds(0); // rounding for db
        newObject.docusign_date = new Date(); // Date
        newObject.docusign_date.setMilliseconds(0); // rounding for db
        newObject.escrow_date = new Date(); // Date
        newObject.escrow_date.setMilliseconds(0); // rounding for db
        newObject.transfer_date = new Date(); // Date
        newObject.transfer_date.setMilliseconds(0); // rounding for db
        newObject.transfer_settled_date = new Date(); // Date
        newObject.transfer_settled_date.setMilliseconds(0); // rounding for db
        newObject.escrow_settled_date = new Date(); // Date
        newObject.escrow_settled_date.setMilliseconds(0); // rounding for db
        newObject.refund_settled_date = new Date(); // Date
        newObject.refund_settled_date.setMilliseconds(0); // rounding for db
        newObject.refund_date = new Date(); // Date
        newObject.refund_date.setMilliseconds(0); // rounding for db
        newObject.sell_date = new Date(); // Date
        newObject.sell_date.setMilliseconds(0); // rounding for db
        newObject.trade_date = new Date(); // Date
        newObject.trade_date.setMilliseconds(0); // rounding for db
        newObject.estimated_trade_date = new Date(); // Date
        newObject.estimated_trade_date.setMilliseconds(0); // rounding for db
        // newObject.transfer_old_id = ?; // number
        newObject.is_deleted = true; // boolean boolean
        // newObject.last_changed_by_id = ?; // number
        // newObject.createtime = ?; // Date
        // newObject.updatetime = ?; // Date
        let dalUserBankingDetails = await moduleFixture.resolve<UserBankingDetailsDal>(UserBankingDetailsDal);
        dalUserBankingDetails.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkdistributions_to = await dalUserBankingDetails.findAllByFilter('', undefined, undefined, undefined, 1, 1); // UserBankingDetails 
        if (fkdistributions_to.length > 0)
            newObject.distributions_to = fkdistributions_to[0] as any; // UserBankingDetails 
        newObject.distributions_to_id = (fkdistributions_to[0] as any).id;
        let dalFfbaAssociation = await moduleFixture.resolve<FfbaAssociationDal>(FfbaAssociationDal);
        dalFfbaAssociation.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkffba = await dalFfbaAssociation.findAllByFilter('', undefined, undefined, undefined, 1, 1); // FfbaAssociation 
        if (fkffba.length > 0)
            newObject.ffba = fkffba[0] as any; // FfbaAssociation 
        newObject.ffba_id = (fkffba[0] as any).id;
        let dalInvestmentWithdrawal = await moduleFixture.resolve<InvestmentWithdrawalDal>(InvestmentWithdrawalDal);
        dalInvestmentWithdrawal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkinvestment_withdrawal = await dalInvestmentWithdrawal.findAllByFilter('', undefined, undefined, undefined, 1, 1); // InvestmentWithdrawal 
        if (fkinvestment_withdrawal.length > 0)
            newObject.investment_withdrawal = fkinvestment_withdrawal[0] as any; // InvestmentWithdrawal 
        newObject.investment_withdrawal_id = (fkinvestment_withdrawal[0] as any).id;
        let dalUserSocialProfile = await moduleFixture.resolve<UserSocialProfileDal>(UserSocialProfileDal);
        dalUserSocialProfile.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkissuer = await dalUserSocialProfile.findAllByFilter('', undefined, undefined, undefined, 1, 1); // UserSocialProfile 
        if (fkissuer.length > 0)
            newObject.issuer = fkissuer[0] as any; // UserSocialProfile 
        newObject.issuer_id = (fkissuer[0] as any).id;
        let dalAllUser = await moduleFixture.resolve<AllUserDal>(AllUserDal);
        dalAllUser.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkjoint_subscriber = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fkjoint_subscriber.length > 0)
            newObject.joint_subscriber = fkjoint_subscriber[0] as any; // AllUser 
        newObject.joint_subscriber_id = (fkjoint_subscriber[0] as any).id;
        let fklast_changed_by = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fklast_changed_by.length > 0)
            newObject.last_changed_by = fklast_changed_by[0] as any; // AllUser 
        newObject.last_changed_by_id = (fklast_changed_by[0] as any).id;
        let dalProjectAccount = await moduleFixture.resolve<ProjectAccountDal>(ProjectAccountDal);
        dalProjectAccount.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkpayment_method = await dalProjectAccount.findAllByFilter('', undefined, undefined, undefined, 1, 1); // ProjectAccount 
        if (fkpayment_method.length > 0)
            newObject.payment_method = fkpayment_method[0] as any; // ProjectAccount 
        newObject.payment_method_id = (fkpayment_method[0] as any).id;
        let fkpayments_from = await dalUserBankingDetails.findAllByFilter('', undefined, undefined, undefined, 1, 1); // UserBankingDetails 
        if (fkpayments_from.length > 0)
            newObject.payments_from = fkpayments_from[0] as any; // UserBankingDetails 
        newObject.payments_from_id = (fkpayments_from[0] as any).id;
        let dalProject = await moduleFixture.resolve<ProjectDal>(ProjectDal);
        dalProject.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkproject = await dalProject.findAllByFilter('', undefined, undefined, undefined, 1, 1); // Project 
        if (fkproject.length > 0)
            newObject.project = fkproject[0] as any; // Project 
        newObject.project_id = (fkproject[0] as any).id;
        let dalRoedSchedule1 = await moduleFixture.resolve<RoedSchedule1Dal>(RoedSchedule1Dal);
        dalRoedSchedule1.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkroed_schedule1 = await dalRoedSchedule1.findAllByFilter('', undefined, undefined, undefined, 1, 1); // RoedSchedule1 
        if (fkroed_schedule1.length > 0)
            newObject.roed_schedule1 = fkroed_schedule1[0] as any; // RoedSchedule1 
        newObject.roed_schedule1_id = (fkroed_schedule1[0] as any).id;
        let dalInvestmentOrder = await moduleFixture.resolve<InvestmentOrderDal>(InvestmentOrderDal);
        dalInvestmentOrder.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fktransfer_old = await dalInvestmentOrder.findAllByFilter('', undefined, undefined, undefined, 1, 1); // InvestmentOrder 
        if (fktransfer_old.length > 0)
            newObject.transfer_old = fktransfer_old[0] as any; // InvestmentOrder 
        newObject.transfer_old_id = (fktransfer_old[0] as any).id;
        let dalUserEntity = await moduleFixture.resolve<UserEntityDal>(UserEntityDal);
        dalUserEntity.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        let fkuser_entity = await dalUserEntity.findAllByFilter('', undefined, undefined, undefined, 1, 1); // UserEntity 
        if (fkuser_entity.length > 0)
            newObject.user_entity = fkuser_entity[0] as any; // UserEntity 
        newObject.user_entity_id = (fkuser_entity[0] as any).id;
        let fkuser = await dalAllUser.findAllByFilter('', undefined, undefined, undefined, 1, 1); // AllUser 
        if (fkuser.length > 0)
            newObject.user = fkuser[0] as any; // AllUser 
        newObject.user_id = (fkuser[0] as any).id;

        let newObjectId = await dal.create(newObject);
        let savedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof savedObject.entity_type == 'string') ? parseInt(savedObject.entity_type) : savedObject.entity_type).toBe(newObject.entity_type);
        expect(savedObject.order_no).toBe(newObject.order_no);
        expect(savedObject.share_price).toBe(newObject.share_price);
        expect(savedObject.number_of_shares).toBe(newObject.number_of_shares);
        expect(savedObject.total_amount).toBe(newObject.total_amount);
        expect(savedObject.acknowledgements).toBe(newObject.acknowledgements);
        expect(savedObject.docusign).toBe(newObject.docusign);
        expect(savedObject.document_name).toBe(newObject.document_name);
        expect(savedObject.docusign_guid).toBe(newObject.docusign_guid);
        expect(savedObject.docusign_merge_hash).toBe(newObject.docusign_merge_hash);
        expect((typeof savedObject.payment == 'string') ? parseInt(savedObject.payment) : savedObject.payment).toBe(newObject.payment);
        expect(savedObject.roed_at_initiation).toBe(newObject.roed_at_initiation);
        expect((typeof savedObject.payment_mode == 'string') ? parseInt(savedObject.payment_mode) : savedObject.payment_mode).toBe(newObject.payment_mode);
        expect(savedObject.order_confirm).toBe(newObject.order_confirm);
        expect(savedObject.drip_registered).toBe(newObject.drip_registered);
        expect(savedObject.acquiring_with_assets).toBe(newObject.acquiring_with_assets);
        expect(savedObject.total_assets_150_k).toBe(newObject.total_assets_150_k);
        expect(savedObject.transferring_assets).toBe(newObject.transferring_assets);
        expect(savedObject.transfer_whole_or_part).toBe(newObject.transfer_whole_or_part);
        expect(savedObject.hubspot_creation).toBe(newObject.hubspot_creation);
        expect(savedObject.hubspot_dealid).toBe(newObject.hubspot_dealid);
        expect(savedObject.escrow_no).toBe(newObject.escrow_no);
        expect(savedObject.escrow_settled_no).toBe(newObject.escrow_settled_no);
        expect(savedObject.refund_no).toBe(newObject.refund_no);
        expect(savedObject.refund_settled_no).toBe(newObject.refund_settled_no);
        expect(savedObject.transfer_no).toBe(newObject.transfer_no);
        expect(savedObject.trust_company_name).toBe(newObject.trust_company_name);
        expect(savedObject.trust_company_account_no).toBe(newObject.trust_company_account_no);
        expect(savedObject.sale_price).toBe(newObject.sale_price);
        expect(savedObject.agent_comm).toBe(newObject.agent_comm);
        expect((typeof savedObject.status == 'string') ? parseInt(savedObject.status) : savedObject.status).toBe(newObject.status);
        expect(savedObject.filed_roed_row_match).toBe(newObject.filed_roed_row_match);
        expect(savedObject.order_date.getTime()).toBe(newObject.order_date.getTime());
        expect(savedObject.docusign_date.getTime()).toBe(newObject.docusign_date.getTime());
        expect(savedObject.escrow_date.getTime()).toBe(newObject.escrow_date.getTime());
        expect(savedObject.transfer_date.getTime()).toBe(newObject.transfer_date.getTime());
        expect(savedObject.transfer_settled_date.getTime()).toBe(newObject.transfer_settled_date.getTime());
        expect(savedObject.escrow_settled_date.getTime()).toBe(newObject.escrow_settled_date.getTime());
        expect(savedObject.refund_settled_date.getTime()).toBe(newObject.refund_settled_date.getTime());
        expect(savedObject.refund_date.getTime()).toBe(newObject.refund_date.getTime());
        expect(savedObject.sell_date.getTime()).toBe(newObject.sell_date.getTime());
        expect(savedObject.trade_date.getTime()).toBe(newObject.trade_date.getTime());
        expect(savedObject.estimated_trade_date.getTime()).toBe(newObject.estimated_trade_date.getTime());
        expect(savedObject.is_deleted).toBe(newObject.is_deleted);

        // update save and compare
        newObject.id = newObjectId as number;
        newObject.entity_type = 2 as unknown as EntityType // enum; // EntityType
        newObject.order_no = '01234567890abcdefghi'; // string
        newObject.share_price = 1; // number
        newObject.number_of_shares = 1; // number
        newObject.total_amount = 1; // number
        newObject.acknowledgements = false; // boolean
        newObject.docusign = false; // boolean
        newObject.document_name = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopq'; // string
        newObject.docusign_guid = '01234567890abcdefghijklmnopqrstuvwxyz012'; // string
        newObject.docusign_merge_hash = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnop'; // string
        newObject.payment = 2 as unknown as PaymentStatus // enum; // PaymentStatus
        newObject.roed_at_initiation = 1; // number
        newObject.payment_mode = 2 as unknown as PaymentMethodType // enum; // PaymentMethodType
        newObject.order_confirm = false; // boolean
        newObject.drip_registered = false; // boolean
        newObject.acquiring_with_assets = false; // boolean
        newObject.total_assets_150_k = false; // boolean
        newObject.transferring_assets = false; // boolean
        newObject.transfer_whole_or_part = false; // boolean
        newObject.hubspot_creation = 1; // number
        newObject.hubspot_dealid = '01234567890abcdefghijklmnopqrstuvwxyz012'; // string
        newObject.escrow_no = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.escrow_settled_no = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.refund_no = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.refund_settled_no = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.transfer_no = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmno'; // string
        newObject.trust_company_name = '01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcd'; // string
        newObject.trust_company_account_no = '01234567890abcdefghijklmnopqrstuvwxyz012'; // string
        newObject.sale_price = 1; // number
        newObject.agent_comm = 1; // number
        newObject.status = 2 as unknown as InvestmentOrderStatus // enum; // InvestmentOrderStatus
        newObject.filed_roed_row_match = 1; // number
        newObject.order_date = new Date('1999/01/01'); // Date		
        newObject.order_date.setMilliseconds(0); // rounding for db
        newObject.docusign_date = new Date('1999/01/01'); // Date		
        newObject.docusign_date.setMilliseconds(0); // rounding for db
        newObject.escrow_date = new Date('1999/01/01'); // Date		
        newObject.escrow_date.setMilliseconds(0); // rounding for db
        newObject.transfer_date = new Date('1999/01/01'); // Date		
        newObject.transfer_date.setMilliseconds(0); // rounding for db
        newObject.transfer_settled_date = new Date('1999/01/01'); // Date		
        newObject.transfer_settled_date.setMilliseconds(0); // rounding for db
        newObject.escrow_settled_date = new Date('1999/01/01'); // Date		
        newObject.escrow_settled_date.setMilliseconds(0); // rounding for db
        newObject.refund_settled_date = new Date('1999/01/01'); // Date		
        newObject.refund_settled_date.setMilliseconds(0); // rounding for db
        newObject.refund_date = new Date('1999/01/01'); // Date		
        newObject.refund_date.setMilliseconds(0); // rounding for db
        newObject.sell_date = new Date('1999/01/01'); // Date		
        newObject.sell_date.setMilliseconds(0); // rounding for db
        newObject.trade_date = new Date('1999/01/01'); // Date		
        newObject.trade_date.setMilliseconds(0); // rounding for db
        newObject.estimated_trade_date = new Date('1999/01/01'); // Date		
        newObject.estimated_trade_date.setMilliseconds(0); // rounding for db
        newObject.is_deleted = false; // boolean

        await dal.save(newObject);
        let reloadedObject = await dal.findOneById(newObjectId);

        // compare the two objects
        expect((typeof reloadedObject.entity_type == 'string') ? parseInt(reloadedObject.entity_type) : reloadedObject.entity_type).toBe(newObject.entity_type);
        expect(reloadedObject.order_no).toBe(newObject.order_no);
        expect(reloadedObject.share_price).toBe(newObject.share_price);
        expect(reloadedObject.number_of_shares).toBe(newObject.number_of_shares);
        expect(reloadedObject.total_amount).toBe(newObject.total_amount);
        expect(reloadedObject.acknowledgements).toBe(newObject.acknowledgements);
        expect(reloadedObject.docusign).toBe(newObject.docusign);
        expect(reloadedObject.document_name).toBe(newObject.document_name);
        expect(reloadedObject.docusign_guid).toBe(newObject.docusign_guid);
        expect(reloadedObject.docusign_merge_hash).toBe(newObject.docusign_merge_hash);
        expect((typeof reloadedObject.payment == 'string') ? parseInt(reloadedObject.payment) : reloadedObject.payment).toBe(newObject.payment);
        expect(reloadedObject.roed_at_initiation).toBe(newObject.roed_at_initiation);
        expect((typeof reloadedObject.payment_mode == 'string') ? parseInt(reloadedObject.payment_mode) : reloadedObject.payment_mode).toBe(newObject.payment_mode);
        expect(reloadedObject.order_confirm).toBe(newObject.order_confirm);
        expect(reloadedObject.drip_registered).toBe(newObject.drip_registered);
        expect(reloadedObject.acquiring_with_assets).toBe(newObject.acquiring_with_assets);
        expect(reloadedObject.total_assets_150_k).toBe(newObject.total_assets_150_k);
        expect(reloadedObject.transferring_assets).toBe(newObject.transferring_assets);
        expect(reloadedObject.transfer_whole_or_part).toBe(newObject.transfer_whole_or_part);
        expect(reloadedObject.hubspot_creation).toBe(newObject.hubspot_creation);
        expect(reloadedObject.hubspot_dealid).toBe(newObject.hubspot_dealid);
        expect(reloadedObject.escrow_no).toBe(newObject.escrow_no);
        expect(reloadedObject.escrow_settled_no).toBe(newObject.escrow_settled_no);
        expect(reloadedObject.refund_no).toBe(newObject.refund_no);
        expect(reloadedObject.refund_settled_no).toBe(newObject.refund_settled_no);
        expect(reloadedObject.transfer_no).toBe(newObject.transfer_no);
        expect(reloadedObject.trust_company_name).toBe(newObject.trust_company_name);
        expect(reloadedObject.trust_company_account_no).toBe(newObject.trust_company_account_no);
        expect(reloadedObject.sale_price).toBe(newObject.sale_price);
        expect(reloadedObject.agent_comm).toBe(newObject.agent_comm);
        expect((typeof reloadedObject.status == 'string') ? parseInt(reloadedObject.status) : reloadedObject.status).toBe(newObject.status);
        expect(reloadedObject.filed_roed_row_match).toBe(newObject.filed_roed_row_match);
        expect(reloadedObject.order_date.getTime()).toBe(newObject.order_date.getTime());
        expect(reloadedObject.docusign_date.getTime()).toBe(newObject.docusign_date.getTime());
        expect(reloadedObject.escrow_date.getTime()).toBe(newObject.escrow_date.getTime());
        expect(reloadedObject.transfer_date.getTime()).toBe(newObject.transfer_date.getTime());
        expect(reloadedObject.transfer_settled_date.getTime()).toBe(newObject.transfer_settled_date.getTime());
        expect(reloadedObject.escrow_settled_date.getTime()).toBe(newObject.escrow_settled_date.getTime());
        expect(reloadedObject.refund_settled_date.getTime()).toBe(newObject.refund_settled_date.getTime());
        expect(reloadedObject.refund_date.getTime()).toBe(newObject.refund_date.getTime());
        expect(reloadedObject.sell_date.getTime()).toBe(newObject.sell_date.getTime());
        expect(reloadedObject.trade_date.getTime()).toBe(newObject.trade_date.getTime());
        expect(reloadedObject.estimated_trade_date.getTime()).toBe(newObject.estimated_trade_date.getTime());
        expect(reloadedObject.is_deleted).toBe(newObject.is_deleted);

        // delete and check that its gone
        await dal.removeOneById(newObjectId);
        let objectAfterDelete = await dal.findOneById(newObjectId);
        expect(objectAfterDelete).toBeNull();
    });
});
