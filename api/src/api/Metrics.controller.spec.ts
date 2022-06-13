import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MetricDataType } from 'fundscraper-model-enums';
import { MetricsRequest } from '../model/MetricsRequest';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('MetricsApi', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Save request as preference and get', async () => {
        let prefname = 'metrics-controller-save-get-1';
        let testValue = new MetricsRequest();
        testValue.dataType = MetricDataType.investor_signups;
        let prefValue = JSON.stringify(testValue);

        let putResponse = await request(app.getHttpServer()).put(`/AllUser/9/preference?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`)
            .send({ name: prefname, value: prefValue });
        expect(putResponse.status).toBe(200);

        let getResponse = await request(app.getHttpServer()).get(`/Metrics/preference/${prefname}?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(getResponse.status).toBe(200);
        let results = getResponse.body;
        expect(results.length).toBeGreaterThanOrEqual(0);
        expect(results.length).toBeLessThanOrEqual(2);
    });

    it('Save request and get as one', async () => {
        let prefname = 'metrics-controller-save-get-2';
        let testValue = new MetricsRequest();
        testValue.dataType = MetricDataType.investor_signups;
        let prefValue = JSON.stringify(testValue);

        let putResponse = await request(app.getHttpServer()).post(`/Metrics/preference/${prefname}?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`)
            .send(testValue);
        expect(putResponse.status).toBe(201);
        let results = putResponse.body;
        expect(results.values.length).toBeGreaterThanOrEqual(0);
        expect(results.values.length).toBeLessThanOrEqual(2);
        expect(results.request.dataType).toBeLessThanOrEqual(testValue.dataType);

        let getResponse = await request(app.getHttpServer()).get(`/AllUser/9/preference/${prefname}?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(getResponse.status).toBe(200);
        let getResults = getResponse.body;
        let metricsRequest = JSON.parse(getResults.value);
        expect(metricsRequest.dataType).toBeLessThanOrEqual(testValue.dataType);
    });

    it('Save request and get as one', async () => {
        let prefname = 'metrics-controller-save-get-2';
        let testValue = new MetricsRequest();
        testValue.dataType = MetricDataType.investor_signups;
        let prefValue = JSON.stringify(testValue);

        let putResponse = await request(app.getHttpServer()).post(`/Metrics/preference/${prefname}?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`)
            .send(null);
        expect(putResponse.status).toBe(201);
        let results = putResponse.body;
        expect(results.values.length).toBeGreaterThanOrEqual(0);
        expect(results.values.length).toBeLessThanOrEqual(2);
        expect(results.request.dataType).toBeLessThanOrEqual(testValue.dataType);

        let getResponse = await request(app.getHttpServer()).get(`/AllUser/9/preference/${prefname}?access_token=3418cf9b2db51f160ba0d78cd37e5ed4ab1a9bd9`);
        expect(getResponse.status).toBe(200);
        let getResults = getResponse.body;
        let metricsRequest = JSON.parse(getResults.value);
        expect(metricsRequest.dataType).toBeLessThanOrEqual(testValue.dataType);
    });
});
