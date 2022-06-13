import { Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiOkResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { InvestmentOrder } from '../model/InvestmentOrder.entity.generated';
import { InvestorApi_generated } from './api.generated';

/**
 * REST API classes for model in typescript (nest.js) for Investor
 * NOTE: EDIT AT WILL, this is intially generated and then left alone. Your changes will not be affected by subsequent code generation runs
 * A user that invests
 */

/**
 * Investor
 * A user that invests
 */
export class InvestorApi extends InvestorApi_generated {
    /**
     * place your custom code here
     */

    @Get(':id/allNonDeletedOrders')
    @ApiOperation({ summary: 'Get all non-deleted orders for a specific investor' })
    @ApiParam({ name: 'id', type: Number, description: 'The id of the investor to get all non-deleted orders for' })
    @ApiOkResponse({
        description: 'All orders for the given investor that are not deleted',
        isArray: true,
        type: () => InvestmentOrder
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async getAllNonDeletedOrders(@Param('id') id: number | string): Promise<InvestmentOrder[]> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        let idNumber = (typeof id === 'number') ? id : parseInt(id);
        return await this.service.getAllNonDeletedOrders(idNumber);
    }

    @Get(':id/oldestNonDeletedOrderLastYear')
    @ApiOperation({ summary: 'get the oldest non-deleted order in the last year for a given investor' })
    @ApiParam({ name: 'id', type: Number, description: 'the id of the investor to get the oldest non-deleted order in the last year for' })
    @ApiOkResponse({
        description: 'the oldest non-deleted order in the last year for the given investor',
        type: () => InvestmentOrder
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async getOldestNonDeletedOrderLastYear(@Param('id') id: number | string): Promise<InvestmentOrder> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        let idNumber = (typeof id === 'number') ? id : parseInt(id);
        return await this.service.getOldestNonDeletedOrderInLastYear(idNumber);
    }

    @Get(':id/totalAmountInvestedInLastYear')
    @ApiOperation({ summary: 'get the total amount of all orders in the last year for a given investor' })
    @ApiParam({ name: 'id', type: Number, description: 'the id of the investor to get the total amount of all orders in the last year for' })
    @ApiOkResponse({
        description: 'the total amount of all orders in the last year for the given investor',
        type: () => Number
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async getTotalAmountInvestedInLastYear(@Param('id') id: number | string): Promise<number> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        let idNumber = (typeof id === 'number') ? id : parseInt(id);
        return await this.service.getTotalAmountInvestedInLastYear(idNumber);
    }

    @Get(':id/annualInvestmentLimits')
    @ApiOperation({ summary: 'Get the annual investment limits for the given investor' })
    @ApiParam({ name: 'id', type: Number, description: 'The id of the investor to get the annual investment limits for' })
    @ApiOkResponse({
        description: 'the annual investment limits for the given investor, or -1 if they have none',
        type: () => Number
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async getAnnualInvestmentLimits(@Param('id') id: number | string): Promise<number> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        let idNumber = (typeof id === 'number') ? id : parseInt(id);
        return await this.service.getAnnualInvestmentLimits(idNumber);
    }

}


