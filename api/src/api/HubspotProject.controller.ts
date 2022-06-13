import { Controller, Inject, Injectable, Param, Post, Scope } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { HubspotProjectService } from '../bll/HubspotProject.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@ApiBearerAuth()
@Controller('HubspotProject')
@Injectable({ scope: Scope.REQUEST })
export class HubspotProjectController {
    constructor(@Inject(REQUEST) private readonly request: Request, private readonly service: HubspotProjectService) {
    }

    @Post('checkProjects')
    @ApiOperation({ summary: 'Cross check all cms projects with hubspot properties' })
    @ApiOkResponse({
        description: 'The instances where the two are not properly connected'
    })
    async checkProjects(): Promise<Array<string>> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        let errors = await this.service.checkAllProjects();
        return errors;
    }

    @Post('syncProject/:id')
    @ApiOperation({ summary: 'Ensure a single project is reflected in hubspot custom objects correctly' })
    @ApiParam({ name: 'id', type: Number, description: 'The id of the project to sync' })
    @ApiOkResponse({
        description: 'Any errors or notes encountered while performing the activity'
    })
    async checkProject(@Param('id') id: number): Promise<Array<string>> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        let errors = await this.service.syncProject(id);
        return errors;
    }
}
