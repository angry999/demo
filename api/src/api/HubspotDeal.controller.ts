import { Controller, Post, Param, Inject, Scope, Injectable, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiOperation, ApiOkResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { HubspotDealService } from '../bll/HubspotDeal.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InvestmentOrder } from '../model/InvestmentOrder.entity.generated';


@ApiBearerAuth()
@Controller('HubspotDeal')
@Injectable({ scope: Scope.REQUEST })
export class HubspotDealController {
    constructor(@Inject(REQUEST) private readonly request: Request, private readonly service: HubspotDealService) {
    }

    @Post('/new/:dealId')
    @ApiOperation({ summary: 'Create a new order based on the details of a deal whoose id is provided' })
    @ApiCreatedResponse({
        description: 'A instance of order synced to the specified deal',
        type: () => InvestmentOrder
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async create(@Param('dealId') dealId: string): Promise<InvestmentOrder> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        return await this.service.createOrderFromDeal(dealId);
    }

    @Post('checkOrders')
    @ApiOperation({ summary: 'Cross check all cms orders with hubspot deal' })
    @ApiOkResponse({
        description: 'The instances where the two are not properly connected'
    })
    async checkOrders(): Promise<Array<string>> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        let errors = await this.service.checkAllOrders();
        return errors;
    }

    @Post('checkDeals')
    @ApiOperation({ summary: 'Cross check all cms orders with hubspot deal' })
    @ApiOkResponse({
        description: 'The instances where the two are not properly connected'
    })
    async checkAllDeals(): Promise<Array<string>> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        let errors = await this.service.checkAllDeals();
        return errors;
    }

    @Post('syncOrder/:id')
    @ApiOperation({ summary: 'Synchronize a single cms order with a corresponding hubspot deal' })
    @ApiParam({ name: 'id', type: Number, description: 'The id of the order to sync' })
    @ApiOkResponse({
        description: 'The set of errors that were encountered during the synchronization process'
    })
    async syncOrder(@Param('id') id: number): Promise<Array<string>> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        let errors = await this.service.syncOrderById(id);
        return errors;
    }
}
