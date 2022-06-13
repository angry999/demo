import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';

import { InvestmentOrder } from 'src/model/InvestmentOrder.entity.generated';
import { Project } from 'src/model/Project.entity.generated';
import { Investor } from 'src/model/Investor.entity.generated';
import { UserPdf } from 'src/model/UserPdf.entity.generated';

const FILTER_CASE = [
    {
        requestQuery: "users_pdf.is_deleted%20%3D%200%20and%20user.first_name%20like%20%27%25t%25%27%20and%20users_pdf.pdf_type%20in%20(%27pre-order-pdf%27)"
    },
    {
        requestQuery: "users_pdf.is_deleted%20%3D%200%20and%20user.first_name%20like%20%27%25ACC%25%27%20and%20users_pdf.pdf_type%20in%20(%27pre-order-pdf%27%2C%27risk-acknowledgements%27)%20and%20users_pdf.pdf_name%20like%20%27%25Trade%25%27"
    },
    {
        requestQuery: "users_pdf.is_deleted%20%3D%200%20and%20user.client_number%20like%20%27%25CAONA350284%25%27%20and%20order.order_no%20%3D%20%27MU-101-101-00121%27%20and%20order.project.issuer.name%20like%20%27%25Clifton%25%27"
    },
    {
        requestQuery: "users_pdf.is_deleted%20%3D%200%20and%20order.project_id%20in%20(1)%20and%20user.first_name%20like%20%27%25Bob%25%27%20and%20order.trade_date%20ge%20%272%2F27%2F2015%27%20and%20order.trade_date%20le%20%275%2F3%2F2021%27"
    },
    {
        requestQuery: "users_pdf.is_deleted%20%3D%200%20and%20order.project_id%20in%20(1)%20and%20users_pdf.pdf_type%20in%20(%27pre-order-pdf%27)%20and%20users_pdf.pdf_name%20like%20%27%25Trade%25%27%20and%20users_pdf.createtime%20ge%20%271%2F31%2F2016%27%20and%20users_pdf.createtime%20le%20%275%2F2%2F2021%27"
    },
    {
        requestQuery: "users_pdf.is_deleted%20%3D%200%20and%20order.project_id%20in%20(1)%20and%20user.client_number%20like%20%27%25CAONA350284%25%27%20and%20user.first_name%20like%20%27%25AT%25%27%20and%20order.order_no%20%3D%20%27MU-101-101-00121%27%20and%20users_pdf.pdf_type%20in%20(%27order-pdf%27)%20and%20users_pdf.pdf_name%20like%20%27%25Trade%20-%20PURCHASE-STATEMENT-MU-101-101-00121.pdf%25%27%20and%20order.project.issuer.name%20like%20%27%25Clifton%25%27"
    }
];

describe('UserPdfApi', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    }); 

    it('Filter by user.client_number', async () => {
		let response2 = await request(app.getHttpServer()).get(`/UserPdf?filter=user.client_number%20eq%20%27CAONA350376%27&expand=user%2C%20order.project.issuer&orderBy=users_pdf.createtime%20desc&page=1&pageSize=10&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200);
		let results = response2.body;
		expect(results.length).toBeGreaterThanOrEqual(1); 
	});	

    it('Filter by user.client_number and order.project.issuer.name', async () => {
		let response2 = await request(app.getHttpServer()).get(`/UserPdf?filter=user.client_number%20eq%20%27CAONA350376%27%20and%20order.project.issuer.name%20like%20%27%25%25%27&expand=user%2C%20order.project.issuer&orderBy=users_pdf.createtime%20desc&page=1&pageSize=10&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200);
		let results = response2.body;
		expect(results.length).toBeGreaterThanOrEqual(1); 
	});	 

    it('Filter by document type', async () => {
		let response2 = await request(app.getHttpServer()).get(`/UserPdf?filter=users_pdf.pdf_type in ('pre-order-pdf','risk-acknowledgements')&expand=user,order.project.issuer&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200); 
	});	  
});

describe('UserPdfApi Filter test', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });  

    it('Filter by users_pdf.pdf_type and users_pdf.pdf_name', async () => {
        let response = await request(app.getHttpServer()).get(`/UserPdf?filter=${FILTER_CASE[0].requestQuery}&expand=user,order.project.issuer&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response.status).toBe(200); 

        let allResults = response.body;
		expect(allResults.length).toBeGreaterThanOrEqual(1); 

        let resultUserPdf = allResults[0] as UserPdf;
        expect(resultUserPdf.pdf_type).toEqual('pre-order-pdf'); 
    });

    it('Filter by Invester name, Document type, Document name', async () => {
        let response = await request(app.getHttpServer()).get(`/UserPdf?filter=${FILTER_CASE[1].requestQuery}&expand=user,order.project.issuer&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response.status).toBe(200); 

        let allResults = response.body;
        expect(allResults.length).toBeGreaterThanOrEqual(1);

        let resultUserPdf = allResults[0] as UserPdf;
        let resultUser = allResults[0].user as unknown as Investor;
        expect(resultUser.first_name).toContain("ACC");
        expect(resultUserPdf.pdf_name).toContain("Trade");
    });

    it('Filter by Client number, Order number, Issuer name', async () => {
        let response = await request(app.getHttpServer()).get(`/UserPdf?filter=${FILTER_CASE[2].requestQuery}&expand=user,order.project.issuer&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response.status).toBe(200); 

        let allResults = response.body;
        expect(allResults.length).toBeGreaterThanOrEqual(1);
        
        let resultUser = allResults[0].user as unknown as Investor;
        let resultOrder = allResults[0].order as unknown as InvestmentOrder;
        let resultProject = resultOrder.project as unknown as Project;

        expect(resultUser.client_number).toContain("CAONA350284");
        expect(resultOrder.order_no).toEqual("MU-101-101-00121");
        expect(resultProject.issuer.name).toContain("Clifton");
    });

    it('Filter by Project name, Trade date, Invester name', async () => {
        let response = await request(app.getHttpServer()).get(`/UserPdf?filter=${FILTER_CASE[3].requestQuery}&expand=user,order.project.issuer&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response.status).toBe(200); 

        let allResults = response.body;
        expect(allResults.length).toBeLessThanOrEqual(1); 
    });

    it('Filter by Project name, Create date, Document type, Document name', async () => {
        let response = await request(app.getHttpServer()).get(`/UserPdf?filter=${FILTER_CASE[4].requestQuery}&expand=user,order.project.issuer&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response.status).toBe(200); 

        let allResults = response.body;
        expect(allResults.length).toBe(12);

        let resultOrder = allResults[0].order as unknown as InvestmentOrder;

        expect(resultOrder.project_id).toEqual(1);
        expect(allResults[0].pdf_name).toContain("Trade");
    });

    it('Filter by Project name, Client number, Document name, Document type, Order no, Issuer name', async () => {
        let response = await request(app.getHttpServer()).get(`/UserPdf?filter=${FILTER_CASE[5].requestQuery}&expand=user,order.project.issuer&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response.status).toBe(200); 

        let allResults = response.body;
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

describe('UserPdfApi download bundle test', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });   

    it('should download zip file', async () => {

        let patterns = 'order.project.name,user.client_number,pdf_name';
        let response = await request(app.getHttpServer()).get(`/UserPdf/download/bundle?filter=${FILTER_CASE[5].requestQuery}&pattern=${patterns}&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response.status).toBe(200); 
    });

});