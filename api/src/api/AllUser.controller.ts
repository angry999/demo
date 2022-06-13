import { Inject, Get, Query, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ApiOperation, ApiQuery, ApiOkResponse, ApiForbiddenResponse, ApiParam, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { AllUserService } from '../bll/AllUser.service';
import { AllUser } from '../model/AllUser.entity.generated';
import { Preference } from '../model/Preference.entity';
import { AllUserApi_generated } from './api.generated';

/**
 * REST API classes for model in typescript (nest.js) for AllUser
 * NOTE: EDIT AT WILL, this is intially generated and then left alone. Your changes will not be affected by subsequent code generation runs
 * one person, identified by an email address, who uses the system
 */

/**
 * AllUser
 * one person, identified by an email address, who uses the system
 */
export class AllUserApi extends AllUserApi_generated {
    /**
     * place your custom code here
     */
    @Get(':id/preference/:preference')
    @ApiOperation({ summary: 'Get a preference setting for a specific user' })
    @ApiParam({ name: 'id', type: Number, description: 'The id of the user to get the preference of' })
    @ApiParam({ name: 'preference', type: String, description: 'The name of the preference to get the value of' })
    @ApiOkResponse({
        description: 'Get a single value representing the preference',
        type: () => Preference
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async getPreference(@Param('id') id: number | string, @Param('preference') preference?: string): Promise<Preference> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        let idNumber = (typeof id === 'number') ? id : parseInt(id);
        return await this.service.getPreference(idNumber, preference);
    }

    @Put(':id/preference')
    @ApiOperation({ summary: 'Set a single preference for a given user' })
    @ApiParam({ name: 'id', type: Number, description: 'The id of the user to set the preference for' })
    @ApiBody({ type: () => Preference })
    @ApiOkResponse({
        description: 'None'
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async setPreference(@Param('id') id: number | string, @Body() preference?: Preference) {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        let idNumber = (typeof id === 'number') ? id : parseInt(id);
        if (preference != null && preference['preference'] != null)
            preference = preference['preference'];
        await this.service.updatePreference(idNumber, preference);
    }
}


