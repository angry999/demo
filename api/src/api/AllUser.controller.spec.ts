import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('AllUserApi', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Find First 2', async () => {
        let response = await request(app.getHttpServer()).get('/AllUser?page=1&pageSize=2&access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9');
        expect(response.status).toBe(200);
        let results = response.body;
        expect(results.length).toBeGreaterThanOrEqual(0);
        expect(results.length).toBeLessThanOrEqual(2);
    });

    it('Preferences - get set string', async () => {
        let prefname = 'prefcont1';
        let prefValue = 'first string';
        let putResponse = await request(app.getHttpServer()).put(`/AllUser/5/preference?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`)
            .send({ name: prefname, value: prefValue });
        expect(putResponse.status).toBe(200);
        let getResponse = await request(app.getHttpServer()).get(`/AllUser/5/preference/${prefname}?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(getResponse.status).toBe(200);
        let results = getResponse.body;
        expect(results.value).toBe(prefValue);
    });

    it('Preferences - get set int number', async () => {
        let prefname = 'prefcont2';
        let prefValue = 5;
        let putResponse = await request(app.getHttpServer()).put(`/AllUser/5/preference?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`)
            .send({ name: prefname, value: prefValue });
        expect(putResponse.status).toBe(200);
        let getResponse = await request(app.getHttpServer()).get(`/AllUser/5/preference/${prefname}?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(getResponse.status).toBe(200);
        let results = parseInt(getResponse.body.value);
        expect(results).toBe(prefValue);
    });

    it('Preferences - get set float number', async () => {
        let prefname = 'prefcont21';
        let prefValue = 53.67;
        let putResponse = await request(app.getHttpServer()).put(`/AllUser/5/preference?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`)
            .send({ name: prefname, value: prefValue });
        expect(putResponse.status).toBe(200);
        let getResponse = await request(app.getHttpServer()).get(`/AllUser/5/preference/${prefname}?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(getResponse.status).toBe(200);
        let results = parseFloat(getResponse.body.value);
        expect(results).toBe(prefValue);
    });

    it('Preferences - get set boolean', async () => {
        let prefname = 'prefcont3';
        let prefValue = true;
        let putResponse = await request(app.getHttpServer()).put(`/AllUser/5/preference?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`)
            .send({ name: prefname, value: prefValue });
        expect(putResponse.status).toBe(200);
        let getResponse = await request(app.getHttpServer()).get(`/AllUser/5/preference/${prefname}?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(getResponse.status).toBe(200);
        let results = (/true/i).test(getResponse.body.value);
        expect(results).toBe(prefValue);
    });
});
