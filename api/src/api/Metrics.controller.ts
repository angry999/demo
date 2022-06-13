import { AbstractController } from './AbstractController';
import { Controller, Post, Body, Inject, Injectable, Scope, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiOkResponse, ApiForbiddenResponse, ApiParam } from '@nestjs/swagger';
import { MetricsService } from '../bll/Metrics.service';
import { MetricsRequest } from '../model/MetricsRequest';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { MetricResult } from './MetricResult';

@ApiBearerAuth()
@Controller('Metrics')
@Injectable({ scope: Scope.REQUEST })
export class MetricsApi extends AbstractController<any>
{
    constructor(@Inject(REQUEST) private readonly request: Request, private readonly service: MetricsService) {
        super();
    }

    /**
     * filter = type + prop's.
     * ?filter=order_purchased_date&from='12-12-12'&to='34/34/34'
     */
    @Post()
    @ApiOperation({ summary: 'Get the data associated with the specified metric' })
    @ApiBody({ type: MetricsRequest })
    @ApiOkResponse({
        description: 'Get all data associated with a given metric',
        isArray: true,
        type: () => MetricResult
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async findOneById(@Body() request: MetricsRequest): Promise<MetricResult> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        return await this.service.findOneById(request);
    }

    @Get('preference/:preference')
    @ApiOperation({ summary: 'Get a metrics based on a request saved in the current users specified preference' })
    @ApiParam({ name: 'preference', type: String, description: 'The name of the preference to get the request from' })
    @ApiOkResponse({
        description: 'Get the metric values as specified in the saved request',
        type: () => String
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async findByPreference(@Param('preference') preference?: string): Promise<string> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        return await this.service.findOneByPreference(preference);
    }

    @Post('preference/:preference')
    @ApiOperation({ summary: 'Save the given request as a preference and then get the mtrics' })
    @ApiBody({ type: MetricsRequest })
    @ApiOkResponse({
        description: 'Get all data associated with a given metric',
        isArray: true,
        type: () => MetricResult
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async savePreferenceAnGet(@Param('preference') preference: string, @Body() request?: MetricsRequest): Promise<MetricResult> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        return await this.service.findOneByPreferenceRequest(preference, request);
    }
}	
