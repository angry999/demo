import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('ComputedAccountApi', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Find First 2', async () => {
        let response = await request(app.getHttpServer()).get('/ComputedAccount?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let results = response.body;
        expect(results.length).toBeGreaterThanOrEqual(0);
        expect(results.length).toBeLessThanOrEqual(2);
    });

    // now expand per property

});
