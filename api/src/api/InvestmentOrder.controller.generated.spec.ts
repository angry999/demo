import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('InvestmentOrderApi', () => 
{
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

	it('Find First 2', async () => {
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
		expect(response.status).toBe(200);
		let results = response.body;
		expect(results.length).toBeGreaterThanOrEqual(0);
		expect(results.length).toBeLessThanOrEqual(2);
	});

	it('Find one by id', async () => 
	{        
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let results = response.body;
        expect(results.length).toBeGreaterThanOrEqual(1);
		let r1id = results[0].id;
        let r2 = await request(app.getHttpServer()).get(`/InvestmentOrder/${r1id}?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`).expect(200);
        let oneresult = r2.body;
        expect(oneresult.id).toBe(results[0].id);
	});

	it('Find one by filtered id', async () => 
	{		
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let workingResults = response.body;
		let response2 = await request(app.getHttpServer()).get(`/InvestmentOrder?filter=id eq ${workingResults[0].id}&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        let results = response2.body;
		expect(results.length).toBe(1);
		let oneResult = results[0];
		expect(oneResult.id).toBe(workingResults[0].id);
	});

	// now expand per property
	it('Find one and distributions_to to users_banking_details', async () => 
	{		
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let workingResults = response.body;
		let response2 = await request(app.getHttpServer()).get(`/InvestmentOrder?filter=id eq ${workingResults[0].id}&expand=distributions_to&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200);
		let results = response2.body;
		expect(results.length).toBe(1);
		let oneResult = results[0];
		expect(oneResult.id).toBe(workingResults[0].id);
	});	

	it('Find one and ffba to ffba_association', async () => 
	{		
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let workingResults = response.body;
		let response2 = await request(app.getHttpServer()).get(`/InvestmentOrder?filter=id eq ${workingResults[0].id}&expand=ffba&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200);
		let results = response2.body;
		expect(results.length).toBe(1);
		let oneResult = results[0];
		expect(oneResult.id).toBe(workingResults[0].id);
	});	

	it('Find one and investment_withdrawal to investment_withdrawal', async () => 
	{		
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let workingResults = response.body;
		let response2 = await request(app.getHttpServer()).get(`/InvestmentOrder?filter=id eq ${workingResults[0].id}&expand=investment_withdrawal&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200);
		let results = response2.body;
		expect(results.length).toBe(1);
		let oneResult = results[0];
		expect(oneResult.id).toBe(workingResults[0].id);
	});	

	it('Find one and issuer to users_social_profile', async () => 
	{		
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let workingResults = response.body;
		let response2 = await request(app.getHttpServer()).get(`/InvestmentOrder?filter=id eq ${workingResults[0].id}&expand=issuer&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200);
		let results = response2.body;
		expect(results.length).toBe(1);
		let oneResult = results[0];
		expect(oneResult.id).toBe(workingResults[0].id);
	});	

	it('Find one and joint_subscriber to all_users', async () => 
	{		
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let workingResults = response.body;
		let response2 = await request(app.getHttpServer()).get(`/InvestmentOrder?filter=id eq ${workingResults[0].id}&expand=joint_subscriber&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200);
		let results = response2.body;
		expect(results.length).toBe(1);
		let oneResult = results[0];
		expect(oneResult.id).toBe(workingResults[0].id);
	});	

	it('Find one and last_changed_by to all_users', async () => 
	{		
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let workingResults = response.body;
		let response2 = await request(app.getHttpServer()).get(`/InvestmentOrder?filter=id eq ${workingResults[0].id}&expand=last_changed_by&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200);
		let results = response2.body;
		expect(results.length).toBe(1);
		let oneResult = results[0];
		expect(oneResult.id).toBe(workingResults[0].id);
	});	

	it('Find one and payment_method to payment_methods', async () => 
	{		
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let workingResults = response.body;
		let response2 = await request(app.getHttpServer()).get(`/InvestmentOrder?filter=id eq ${workingResults[0].id}&expand=payment_method&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200);
		let results = response2.body;
		expect(results.length).toBe(1);
		let oneResult = results[0];
		expect(oneResult.id).toBe(workingResults[0].id);
	});	

	it('Find one and payments_from to users_banking_details', async () => 
	{		
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let workingResults = response.body;
		let response2 = await request(app.getHttpServer()).get(`/InvestmentOrder?filter=id eq ${workingResults[0].id}&expand=payments_from&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200);
		let results = response2.body;
		expect(results.length).toBe(1);
		let oneResult = results[0];
		expect(oneResult.id).toBe(workingResults[0].id);
	});	

	it('Find one and project to projects', async () => 
	{		
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let workingResults = response.body;
		let response2 = await request(app.getHttpServer()).get(`/InvestmentOrder?filter=id eq ${workingResults[0].id}&expand=project&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200);
		let results = response2.body;
		expect(results.length).toBe(1);
		let oneResult = results[0];
		expect(oneResult.id).toBe(workingResults[0].id);
	});	

	it('Find one and roed_schedule1 to roed_schedule1s', async () => 
	{		
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let workingResults = response.body;
		let response2 = await request(app.getHttpServer()).get(`/InvestmentOrder?filter=id eq ${workingResults[0].id}&expand=roed_schedule1&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200);
		let results = response2.body;
		expect(results.length).toBe(1);
		let oneResult = results[0];
		expect(oneResult.id).toBe(workingResults[0].id);
	});	

	it('Find one and transfer_old to investment_orders', async () => 
	{		
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let workingResults = response.body;
		let response2 = await request(app.getHttpServer()).get(`/InvestmentOrder?filter=id eq ${workingResults[0].id}&expand=transfer_old&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200);
		let results = response2.body;
		expect(results.length).toBe(1);
		let oneResult = results[0];
		expect(oneResult.id).toBe(workingResults[0].id);
	});	

	it('Find one and user_entity to users_entity', async () => 
	{		
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let workingResults = response.body;
		let response2 = await request(app.getHttpServer()).get(`/InvestmentOrder?filter=id eq ${workingResults[0].id}&expand=user_entity&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200);
		let results = response2.body;
		expect(results.length).toBe(1);
		let oneResult = results[0];
		expect(oneResult.id).toBe(workingResults[0].id);
	});	

	it('Find one and user to all_users', async () => 
	{		
		let response = await request(app.getHttpServer()).get('/InvestmentOrder?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let workingResults = response.body;
		let response2 = await request(app.getHttpServer()).get(`/InvestmentOrder?filter=id eq ${workingResults[0].id}&expand=user&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(response2.status).toBe(200);
		let results = response2.body;
		expect(results.length).toBe(1);
		let oneResult = results[0];
		expect(oneResult.id).toBe(workingResults[0].id);
	});	

	
});