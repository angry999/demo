import { Put, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiBody, ApiOkResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { RoedSchedule1 } from '../model/RoedSchedule1.entity.generated';
import { RoedSchedule1Api_generated } from './api.generated';

/**
 * REST API classes for model in typescript (nest.js) for RoedSchedule1
 * NOTE: EDIT AT WILL, this is intially generated and then left alone. Your changes will not be affected by subsequent code generation runs
 * 
 */

/**
 * RoedSchedule1
 * 
 */
export class RoedSchedule1Api extends RoedSchedule1Api_generated {
    /**
     * place your custom code here
     */
    @Put(':id/reconcile/:date')
    @ApiOperation({ summary: 'Confirm escrow and trade dates for orders on a roed' })
    @ApiParam({ name: 'id', type: Number, description: 'The id of the roed to confirm' })
    @ApiParam({ name: 'date', type: String, description: 'The date to fill escrow and trade dates if they are empty' })
    @ApiBody({ type: RoedSchedule1 })
    @ApiOkResponse({
        description: 'None'
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async confirmReconciliation(@Param('id') id: number, @Param('date') date: string, @Body() schedule1: RoedSchedule1) {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        await this.service.confirmReconciliatedOrders(schedule1, date);
    }
}


