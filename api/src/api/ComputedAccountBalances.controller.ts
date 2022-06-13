import { AbstractController } from './AbstractController';
import { Controller, Get, Post, Put, Delete, Body, Param, Query, Injectable, Scope, Inject } from '@nestjs/common';
import { ComputedAccountBalances } from '../model/ComputedAccountBalances.entity';
import { ComputedAccountBalancesService } from '../bll/ComputedAccountBalances.service';
import { ApiBearerAuth, ApiQuery, ApiParam, ApiBody, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@ApiBearerAuth()
@Controller('ComputedAccountBalances')
@Injectable({ scope: Scope.REQUEST })
export class ComputedAccountBalancesApi extends AbstractController<ComputedAccountBalances>
{
	constructor(@Inject(REQUEST) private readonly request: Request, private readonly service: ComputedAccountBalancesService) {
		super();
	}

	@Get()	
	@ApiOperation({ summary: 'Find all ComputedAccountBalances of AdminLog that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ComputedAccountBalances that match the filter',
		isArray: true,
		type: () => ComputedAccountBalances
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ComputedAccountBalances[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Find all ComputedAccountBalances of AdminLog that match the given filter. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ComputedAccountBalances with the specified id',
		type: () => ComputedAccountBalances
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ComputedAccountBalances> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findOneById(id, expandBy);
	}

	@Post()
	@ApiOperation({ summary: 'Create a new instance of ComputedAccountBalances base on the value passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the id of the newly created object' })
	@ApiBody({ type: ComputedAccountBalances })
	@ApiCreatedResponse({
		description: 'A instance of ComputedAccountBalances has been created, returns that newly created instance',
		type: () => ComputedAccountBalances
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValue: ComputedAccountBalances): Promise<ComputedAccountBalances> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.create(newValue);
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instance of ComputedAccountBalances that is provided' })
	@ApiBody({ type: ComputedAccountBalances })
	@ApiOkResponse({
		description: 'The instance of ComputedAccountBalances has been updated',
		type: () => ComputedAccountBalances
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValue: ComputedAccountBalances) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.update(newValue);
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ComputedAccountBalances with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ComputedAccountBalances has been removed',
		type: () => ComputedAccountBalances
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	
