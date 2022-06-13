import { Controller, Post, Param, Scope, Injectable, Inject } from '@nestjs/common';
import { HubspotContactService } from '../bll/HubspotContact.service';
import { ApiBearerAuth, ApiParam, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@ApiBearerAuth()
@Controller('HubspotContact')
@Injectable({ scope: Scope.REQUEST })
export class HubspotContactController {
    constructor(@Inject(REQUEST) private readonly request: Request, private readonly service: HubspotContactService) {
    }

    @Post('checkInvestors')
    @ApiOperation({ summary: 'Cross check all cms investors with hubspot contacts' })
    @ApiOkResponse({
        description: 'The instances where the two are not properly connected'
    })
    async checkInvestors(): Promise<Array<string>> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        let errors = await this.service.checkAllInvestors();
        return errors;
    }

    @Post('syncInvestor/:id')
    @ApiOperation({ summary: 'Synchronize a single cms investor with a corresponding hubspot contact' })
    @ApiParam({ name: 'id', type: Number, description: 'The id of the investor to sync' })
    @ApiOkResponse({
        description: 'The set of errors that were encountered during the synchronization process'
    })
    async syncInvestor(@Param('id') id: number): Promise<Array<string>> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        let errors = await this.service.syncInvestorById(id);
        return errors;
    }
}	
