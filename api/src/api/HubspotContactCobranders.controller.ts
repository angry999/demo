import { Controller, Inject, Injectable, Post, Scope } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { HubspotContactCobrandersService } from '../bll/HubspotContactCobranders.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';


@ApiBearerAuth()
@Controller('HubspotContactCobranders')
@Injectable({ scope: Scope.REQUEST })
export class HubspotContactCobrandersController {
    constructor(@Inject(REQUEST) private readonly request: Request, private readonly service: HubspotContactCobrandersService) {
    }

    @Post('checkCobranders')
    @ApiOperation({ summary: 'Cross check all cms cobranders with hubspot properties' })
    @ApiOkResponse({
        description: 'The instances where the two are not properly connected'
    })
    async checkCobranders(): Promise<Array<string>> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        let errors = await this.service.checkCobranders();
        return errors;
    }
}	
