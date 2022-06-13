import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('AllUserAnswerApi', () => 
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
		let response = await request(app.getHttpServer()).get('/AllUserAnswer?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
		expect(response.status).toBe(200);
		let results = response.body;
		expect(results.length).toBeGreaterThanOrEqual(0);
		expect(results.length).toBeLessThanOrEqual(2);
	});

	it('Find one by id', async () => 
	{        
		let response = await request(app.getHttpServer()).get('/AllUserAnswer?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let results = response.body;
        expect(results.length).toBeGreaterThanOrEqual(1);
		let r1id = results[0].id;
        let r2 = await request(app.getHttpServer()).get(`/AllUserAnswer/${r1id}?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`).expect(200);
        let oneresult = r2.body;
        expect(oneresult.id).toBe(results[0].id);
	});

	it('Find one by filtered id', async () => 
	{		
		let response = await request(app.getHttpServer()).get('/AllUserAnswer?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let workingResults = response.body;
		let response2 = await request(app.getHttpServer()).get(`/AllUserAnswer?filter=id eq '${workingResults[0].id}'&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        let results = response2.body;
		expect(results.length).toBe(1);
		let oneResult = results[0];
		expect(oneResult.id).toBe(workingResults[0].id);
	});

	// now expand per property
	
});
