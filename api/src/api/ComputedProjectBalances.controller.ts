import { AbstractController } from './AbstractController';
import { Controller, Get, Post, Put, Delete, Body, Param, Query, Injectable, Scope, Inject } from '@nestjs/common';
import { ComputedProjectBalances } from '../model/ComputedProjectBalances.entity';
import { ComputedProjectBalancesService } from '../bll/ComputedProjectBalances.service';
import { ApiBearerAuth, ApiQuery, ApiParam, ApiBody, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@ApiBearerAuth()
@Controller('ComputedProjectBalances')
@Injectable({ scope: Scope.REQUEST })
export class ComputedProjectBalancesApi extends AbstractController<ComputedProjectBalances>
{
	constructor(@Inject(REQUEST) private readonly request: Request, private readonly service: ComputedProjectBalancesService) {
		super();
	}

	@Get()	
	@ApiOperation({ summary: 'Find all ComputedProjectBalances of AdminLog that match the given filter. If none are found, an empty result is returned' })
	@ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
	@ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
	@ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
	@ApiOkResponse({
		description: 'All instances of ComputedProjectBalances that match the filter',
		isArray: true,
		type: () => ComputedProjectBalances
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findAllByFilter(@Query('filter') filter?: string
		, @Query('expand') expandBy?: string
		, @Query('orderBy') orderBy?: string
		, @Query('page') page?: number
		, @Query('pageSize') pageSize?: number
	): Promise<ComputedProjectBalances[]> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Find all ComputedProjectBalances of AdminLog that match the given filter. If none are found, an empty result is returned' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve'})
	@ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
	@ApiOkResponse({
		description: 'Get a single instance of ComputedProjectBalances with the specified id',
		type: () => ComputedProjectBalances
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<ComputedProjectBalances> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.findOneById(id, expandBy);
	}

	@Post()
	@ApiOperation({ summary: 'Create a new instance of ComputedProjectBalances base on the value passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the id of the newly created object' })
	@ApiBody({ type: ComputedProjectBalances })
	@ApiCreatedResponse({
		description: 'A instance of ComputedProjectBalances has been created, returns that newly created instance',
		type: () => ComputedProjectBalances
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async create(@Body() newValue: ComputedProjectBalances): Promise<ComputedProjectBalances> {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		return await this.service.create(newValue);
	}
	
	@Put()
	@ApiOperation({ summary: 'Update the values for the instance of ComputedProjectBalances that is provided' })
	@ApiBody({ type: ComputedProjectBalances })
	@ApiOkResponse({
		description: 'The instance of ComputedProjectBalances has been updated',
		type: () => ComputedProjectBalances
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async update(@Body() newValue: ComputedProjectBalances) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.update(newValue);
	}
  
	@Delete(':id')
	@ApiOperation({ summary: 'Remove the single instance of ComputedProjectBalances with the specified id' })
	@ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove'})
	@ApiOkResponse({
		description: 'The instance of ComputedProjectBalances has been removed',
		type: () => ComputedProjectBalances
	})
	@ApiForbiddenResponse({ description: 'Forbidden.' })
	async remove(@Param('id') id: number | string) {
		if (this.request['user'] != null)
			this.service.setUserForRequest(this.request['user']);
		await this.service.removeOneById(id);
	}
}	
