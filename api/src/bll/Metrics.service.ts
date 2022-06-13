import { Injectable, Inject, Scope, Logger } from '@nestjs/common';
import { MetricDataType } from 'fundscraper-model-enums';
import { UserIdentification } from '../security/UserIdentification';
import { MetricsDal } from '../dal/Metrics.provider';
import { MetricsRequest } from '../model/MetricsRequest';
import { AllUserService } from './AllUser.service';

/**
 * A service to support the operations of getting various metrics
 */
@Injectable({ scope: Scope.TRANSIENT })
export class MetricsService {
    private readonly logger = new Logger(MetricsService.name);
    user_id: number;
    constructor(private readonly metricsDal: MetricsDal, private readonly allUserService: AllUserService) {

    }

    public setUserForRequest(user: UserIdentification) {
        this.user_id = user.user_id;
        this.metricsDal.setUserForRequest(user);
        this.allUserService.setUserForRequest(user);
    }

    async findOneById(request: MetricsRequest): Promise<any> {
        return this.metricsDal.findOneById(request);
    }

    /**
     * get a given metric based on a request saved in the current users preferences
     * @param preference the preference that holds the metric request (as json)
     * @returns the metrics results
     */
    async findOneByPreference(preference: string): Promise<any> {
        let preferenceAsString = await this.allUserService.getPreference(this.user_id, preference);
        let request = JSON.parse(preferenceAsString.value);
        return this.metricsDal.findOneById(request);
    }

    /**
     * save a given request as a preference and then get the metrics for that request
     * @param preference the preference that holds the metric request (as json)
     * @param request the details of the metrics to retrieve
     * @returns the request and the metrics results
     */
    async findOneByPreferenceRequest(preference: string, request: MetricsRequest): Promise<any> {
        let requestToUse;
        this.logger.debug(`findOneByPreferenceRequest${preference}, ?`);

        if (request == null || Object.keys(request).length === 0) {
            this.logger.debug(`findOneByPreferenceRequest${preference}, null`);
            let preferenceObject = await this.allUserService.getPreference(this.user_id, preference);

            let jsonToParse = preferenceObject.value;
            if (jsonToParse == null) {
                //dashboard.chart-2-1
                switch (preference) {
                    // row 1, investors
                    case 'dashboard.chart-1-1':
                        jsonToParse = `{"dataType":${MetricDataType.investor_signups},"groupByDay":true, "viewAs":"bar"}`;
                        break;
                    case 'dashboard.chart-1-2':
                        jsonToParse = `{"dataType":${MetricDataType.investors_signup_status},"groupByDay":false, "viewAs":"bar"}`;
                        break;
                    // row 2, orders
                    case 'dashboard.chart-2-1':
                        jsonToParse = `{"dataType":${MetricDataType.orders_placed},"groupByDay":true, "viewAs":"bar"}`;
                        break;
                    case 'dashboard.chart-2-2':
                        jsonToParse = `{"dataType":${MetricDataType.orders_status},"groupByDay":false, "viewAs":"bar"}`;
                        break;
                    case 'dashboard.chart-3-1':
                        jsonToParse = `{"dataType":${MetricDataType.orders_amount},"groupByDay":false, "viewAs":"bar"}`;
                        break;
                    case 'dashboard.chart-3-2':
                        jsonToParse = `{"dataType":${MetricDataType.investors_accreditation_level},"groupByDay":false, "viewAs":"pie"}`;
                        break; 
                    default:
                        jsonToParse = `{"dataType":${MetricDataType.investors_age_range},"groupByDay":false, "viewAs":"pie"}`;
                }
            }

            requestToUse = JSON.parse(jsonToParse);
        }
        else {
            this.logger.debug(`findOneByPreferenceRequest(${preference}, ${JSON.stringify(request)})`);
            let preferenceAsString = JSON.stringify(request);
            await this.allUserService.updatePreference(this.user_id, { name: preference, value: preferenceAsString });
            requestToUse = request;
        }

        this.logger.debug(`findOneByPreferenceRequest(${preference}, actual=${JSON.stringify(requestToUse)})`);
        return { request: requestToUse, values: await this.metricsDal.findOneById(requestToUse) };
    }
}
