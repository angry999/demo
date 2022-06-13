import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { UserPdfDal } from '../../dal/UserPdf.provider';
import { InvestmentOrderDal } from '../../dal/InvestmentOrder.provider';
import { AllUserDal } from '../../dal/AllUser.provider';
import { InvestorDal } from '../../dal/Investor.provider';
import { ProjectDal } from '../../dal/Project.provider';
import { UserSocialProfileDal } from '../../dal/UserSocialProfile.provider';
import { SponsorSocialProfileDal } from '../../dal/SponsorSocialProfile.provider';

import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';
import { InvestmentOrder } from 'src/model/InvestmentOrder.entity.generated';
import { Project } from 'src/model/Project.entity.generated';
import { Investor } from 'src/model/Investor.entity.generated';
import { UserPdf } from 'src/model/UserPdf.entity.generated';

const FILTER_CASE = [
    {
        query: "users_pdf.is_deleted = 0 and users_pdf.pdf_type in ('pre-order-pdf') and users_pdf.pdf_name like '%t%'"
    },
    {
        query: "users_pdf.is_deleted = 0 and user.first_name like '%ACC%' and users_pdf.pdf_type in ('pre-order-pdf','risk-acknowledgements') and users_pdf.pdf_name like '%Trade%'"
    },
    {
        query: "users_pdf.is_deleted = 0 and user.client_number like '%CAONA350284%' and order.order_no = 'MU-101-101-00121' and order.project.issuer.name like '%Clifton%'"
    },
    {
        query: "users_pdf.is_deleted = 0 and order.project_id in (1) and user.first_name like '%Bob%' and order.trade_date >= '2/27/2015' and order.trade_date <= '5/3/2021'"
    },
    {
        query: "users_pdf.is_deleted = 0 and order.project_id in (1) and users_pdf.pdf_type in ('pre-order-pdf') and users_pdf.pdf_name like '%Trade%' and users_pdf.createtime >= '2/1/2016' and users_pdf.createtime <= '5/3/2021'"
    },
    {
        query: "users_pdf.is_deleted = 0 and order.project_id in (1) and user.client_number like '%CAONA350284%' and user.first_name like '%AT%' and order.order_no = 'MU-101-101-00121' and users_pdf.pdf_type in ('order-pdf') and users_pdf.pdf_name like '%Trade - PURCHASE-STATEMENT-MU-101-101-00121.pdf%' and order.project.issuer.name like '%Clifton%'"
    }
];

describe('UserPdfDal', () => {
    let dal: UserPdfDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, UserPdfDal, InvestmentOrderDal, AllUserDal, InvestorDal, ProjectDal, UserSocialProfileDal, SponsorSocialProfileDal],
            }).compile();

        dal = await app.resolve<UserPdfDal>(UserPdfDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
        //dal.setUserForRequest(new UserIdentification(936, UserType.issuer_admin));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(1);
        expect(oneResult.pdf_name).toBe("CAONA350001-c570f90babe2242aa3a0ae09b0a85e1c68bcf0bf.pdf");
        expect(oneResult.relevant_month).toBe(0);
        expect(oneResult.relevant_year).toBe(0);
        expect(oneResult.remarks).toBe("");
        expect(oneResult.pdf_type).toBe("sin-profile");
        expect(oneResult.exel_name).toBe("");
        expect(oneResult.user_id).toBe(1);
        expect(oneResult.last_changed_by_id).toBe(null);
        expect(oneResult.id).toBe(1);
        expect(oneResult.updatetime.toISOString()).toBe("2017-01-18T13:29:05.000Z");
        expect(oneResult.createtime.toISOString()).toBe("2016-01-01T01:01:00.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });

    it('Extends to user, order, order.project, order.project.issuer', async () => {
        let allResults = await dal.findAllByFilter(``, undefined, ['user', 'order.project.issuer'], ['users_pdf.createtime desc'], 1, 10);
        expect(allResults.length).toBeGreaterThanOrEqual(1);
    });

    it('Single filter by users_pdf.pdf_name', async () => {
        let pdfName = 'Trade - PURCHASE-STATEMENT-MU-101-101-00121';
        let allResults = await dal.findAllByFilter(`users_pdf.pdf_name like '%${pdfName}%'`, undefined, ['user', 'order.project.issuer'], ['users_pdf.createtime desc'], 1, 10);
        expect(allResults.length).toBeGreaterThanOrEqual(1);
        let oneResult = allResults[0];
        expect(oneResult.pdf_name).toContain(pdfName);
    });

    it('Single filter by user.client_number', async () => {
        let clientNumber = 'CAONA350376';
        let allResults = await dal.findAllByFilter(`user.client_number = '${clientNumber}'`, undefined, ['user', 'order.project.issuer'], ['users_pdf.createtime desc'], 1, 10);
        expect(allResults.length).toBeGreaterThanOrEqual(1);
        let resultUser = allResults[0].user as unknown as Investor;
        expect(resultUser.client_number).toBe(clientNumber);
    });

    it('Single filter by order.project.issuer.name', async () => {
        let issuerName = 'A';
        let allResults = await dal.findAllByFilter(`order.project.issuer.name like '%${issuerName}%'`, undefined, ['user', 'order.project.issuer'], ['users_pdf.createtime desc'], 1, 10);
        expect(allResults.length).toBeGreaterThanOrEqual(1);

        let resultOrder = allResults[0].order as unknown as InvestmentOrder;
        let resultProject = resultOrder.project as unknown as Project;
        expect(resultProject.issuer.name).toContain(issuerName);
    });

    it('Multi filter by investor name, client_number, document name', async () => {
        let investorName = 'A';
        let clientNumber = 'CAONA350284';
        let pdfName = 'Trade';
        let allResults = await dal.findAllByFilter(`user.client_number like '%${clientNumber}%' and user.first_name like '%${investorName}%' and users_pdf.pdf_name like '%${pdfName}%'`, undefined, ['user', 'order.project.issuer'], ['users_pdf.createtime desc'], 1, 10);
        expect(allResults.length).toBeGreaterThanOrEqual(1);

        let resultUserPdf = allResults[0] as UserPdf;
        let resultUser = allResults[0].user as unknown as Investor;
        expect(resultUser.client_number).toBe(clientNumber);
        expect(resultUser.first_name).toContain(investorName);
        expect(resultUserPdf.pdf_name).toContain(pdfName);
    });

    it('Multi filter by investor name, dovument type, document name', async () => {
        let investorName = 'A';
        let documentType = "('pre-order-pdf','risk-acknowledgements','additional-acknowledgements')";
        let pdfName = 'Trade';
        let allResults = await dal.findAllByFilter(`user.first_name like '%${investorName}%' and users_pdf.pdf_type in ${documentType} and users_pdf.pdf_name like '%${pdfName}%'`, undefined, ['user', 'order.project.issuer'], ['users_pdf.createtime desc'], 1, 10);
        expect(allResults.length).toBeGreaterThanOrEqual(1);

        let resultUserPdf = allResults[0] as UserPdf;
        let resultUser = allResults[0].user as unknown as Investor;
        expect(resultUser.first_name).toContain(investorName);
        expect(resultUserPdf.pdf_name).toContain(pdfName);
    });

    it('Multi filter by investor name, document type, document name', async () => {
        let allResults = await dal.findAllByFilter("users_pdf.is_deleted = 0 and user.client_number like '%CAONA350284%'", undefined, ["user", "order.project.issuer"], undefined, 1, 100);
        expect(allResults.length).toBeGreaterThanOrEqual(12);
    });

    // new tests
    it('Filter by users_pdf.pdf_type and users_pdf.pdf_name', async () => {
        let query = FILTER_CASE[0].query
        let allResults = await dal.findAllByFilter(FILTER_CASE[0].query, undefined, ["user", "order.project.issuer"], undefined, 1, 100);
        expect(allResults.length).toBeGreaterThanOrEqual(1);

        let resultUserPdf = allResults[0] as UserPdf;
        expect(resultUserPdf.pdf_type).toEqual('pre-order-pdf');
    });

    it('Filter by Invester name, Document type, Document name', async () => {
        let allResults = await dal.findAllByFilter(FILTER_CASE[1].query, undefined, ["user", "order.project.issuer"], undefined, 1, 100);
        expect(allResults.length).toBeGreaterThanOrEqual(1);

        let resultUserPdf = allResults[0] as UserPdf;
        let resultUser = allResults[0].user as unknown as Investor;
        expect(resultUser.first_name).toContain("ACC");
        expect(resultUserPdf.pdf_name).toContain("Trade");
    });

    it('Filter by Client number, Order number, Issuer name', async () => {
        let allResults = await dal.findAllByFilter(FILTER_CASE[2].query, undefined, ["user", "order.project.issuer"], undefined, 1, 100);
        expect(allResults.length).toBeGreaterThanOrEqual(1);

        let resultUser = allResults[0].user as unknown as Investor;
        let resultOrder = allResults[0].order as unknown as InvestmentOrder;
        let resultProject = resultOrder.project as unknown as Project;

        expect(resultUser.client_number).toContain("CAONA350284");
        expect(resultOrder.order_no).toEqual("MU-101-101-00121");
        expect(resultProject.issuer.name).toContain("Clifton");
    });

    it('Filter by Project name, Trade date, Invester name', async () => {
        let allResults = await dal.findAllByFilter(FILTER_CASE[3].query, undefined, ["user", "order.project.issuer"], undefined, 1, -1);
        expect(allResults.length).toBeLessThanOrEqual(1);
    });

    it('Filter by Project name, Create date, Document type, Document name', async () => {
        let allResults = await dal.findAllByFilter(FILTER_CASE[4].query, undefined, ["user", "order.project.issuer"], undefined, 1, -1);
        expect(allResults.length).toBeGreaterThanOrEqual(1);

        let resultOrder = allResults[0].order as unknown as InvestmentOrder;

        expect(resultOrder.project_id).toEqual(1);
        expect(allResults[0].pdf_name).toContain("Trade");
    });

    it('Filter by Project name, Client number, Document name, Document type, Order no, Issuer name', async () => {
        let allResults = await dal.findAllByFilter(FILTER_CASE[5].query, undefined, ["user", "order.project.issuer"], undefined, 1, -1);
        expect(allResults.length).toEqual(1);

        let resultUser = allResults[0].user as unknown as Investor;
        let resultOrder = allResults[0].order as unknown as InvestmentOrder;
        let resultProject = resultOrder.project as unknown as Project;

        expect(resultOrder.project_id).toEqual(1);
        expect(resultUser.client_number).toContain("CAONA350284");
        expect(resultUser.first_name).toContain("AT");
        expect(resultOrder.order_no).toEqual("MU-101-101-00121");
        expect(allResults[0].pdf_type).toEqual("order-pdf");
        expect(allResults[0].pdf_name).toEqual("Trade - PURCHASE-STATEMENT-MU-101-101-00121.pdf");
        expect(resultProject.issuer.name).toContain("Clifton");
    });

});