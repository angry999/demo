import { AbstractController } from './AbstractController';
import { Controller, Get, Post, Put, Delete, Body, Param, Query, Injectable, Scope, Inject, UploadedFile, UseInterceptors, Res, Header } from '@nestjs/common';
import { UserPdf } from '../model/UserPdf.entity.generated';
import { UserPdfService } from '../bll/UserPdf.service';
import { ApiBearerAuth, ApiQuery, ApiParam, ApiBody, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { REQUEST } from '@nestjs/core';
import { Request, Express, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const pdfStorage = diskStorage({
    // Specify where to save the file
    destination: (req, file, cb) => {
        cb(null, process.env.GEN_ROOT + '\\external\\pdfs\\');
    },
    // Specify the file name
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

@ApiBearerAuth()
@Controller('UserPdf')
@Injectable({ scope: Scope.REQUEST })
export class UserPdfApi extends AbstractController<UserPdf>
{
    constructor(@Inject(REQUEST) private readonly request: Request, private readonly service: UserPdfService) {
        super();
    }

    @Get()
    @ApiOperation({ summary: 'Find all UserPdf of AdminLog that match the given filter. If none are found, an empty result is returned' })
    @ApiQuery({ name: 'filter', required: false, description: 'the odata like filter expression use to match which instances are returned' })
    @ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
    @ApiQuery({ name: 'orderBy', required: false, description: 'a comma separated list of order by directives used to determine the order in which the objects are returned. Each directive is a single property name optionally followed by desc if descending is required. For example [first_name, last_name desc]' })
    @ApiQuery({ name: 'page', required: false, description: 'if the results are paged (pageSize is specified), this is the page number to return. The first page is 1' })
    @ApiQuery({ name: 'pageSize', required: false, description: 'if specified, the results are paged and this is the size of each of those pages' })
    @ApiOkResponse({
        description: 'All instances of UserPdf that match the filter',
        isArray: true,
        type: () => UserPdf
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async findAllByFilter(@Query('filter') filter?: string
        , @Query('expand') expandBy?: string
        , @Query('orderBy') orderBy?: string
        , @Query('page') page?: number
        , @Query('pageSize') pageSize?: number
    ): Promise<UserPdf[]> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        return await this.service.findAllByFilter(this.translateFilter(filter), null, this.csvParamToArray(expandBy), this.csvParamToArray(orderBy), page, pageSize);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find all UserPdf of AdminLog that match the given filter. If none are found, an empty result is returned' })
    @ApiParam({ name: 'id', type: Number, description: 'The id of the instance to retrieve' })
    @ApiQuery({ name: 'expand', required: false, description: 'a comma separated list of property path\'s that specfiy which additional objects will be filled in the object (deep load). If nothing is specified only the object itself will be loaded, not of its relations will be included' })
    @ApiOkResponse({
        description: 'Get a single instance of UserPdf with the specified id',
        type: () => UserPdf
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async findOneById(@Param('id') id: number | string, @Query('expand') expandBy?: string[]): Promise<UserPdf> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        return await this.service.findOneById(id, expandBy);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new instance of UserPdf base on the value passed in. If the id is filled in, it will fail to create the new instance, otherwise it returns the id of the newly created object' })
    @ApiBody({ type: UserPdf })
    @UseInterceptors(FileInterceptor("file", { storage: pdfStorage }))
    @ApiCreatedResponse({
        description: 'A instance of UserPdf has been created, returns that newly created instance',
        type: () => UserPdf
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async create(@Body() newValue: UserPdf, @UploadedFile() file: Express.Multer.File): Promise<UserPdf> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        return await this.service.create(newValue);
    }

    @Put()
    @ApiOperation({ summary: 'Update the values for the instance of UserPdf that is provided' })
    @ApiBody({ type: UserPdf })
    @ApiOkResponse({
        description: 'The instance of UserPdf has been updated',
        type: () => UserPdf
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async update(@Body() newValue: UserPdf) {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        await this.service.update(newValue);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove the single instance of UserPdf with the specified id' })
    @ApiParam({ name: 'id', type: Number, description: 'The id of the instance to remove' })
    @ApiOkResponse({
        description: 'The instance of UserPdf has been removed',
        type: () => UserPdf
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async remove(@Param('id') id: number | string) {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        await this.service.removeOneById(id);
    }

    @Get(':id/download')
    @ApiOperation({ summary: 'Download the file' })
    @ApiParam({ name: 'id', type: Number, description: 'The id of the pdf to download' })
    @ApiOkResponse({
        description: 'Get a single instance of UserPdf with the specified id',
        type: () => UserPdf
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async download(@Param('id') id: number | string, @Res() res: Response): Promise<void> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);
        let idNumber = (typeof id === 'number') ? id : parseInt(id);
        let pdfPath = await this.service.getFilePath(idNumber);
        res.download(pdfPath);
    }

    @Get('download/bundle')
    @ApiOperation({ summary: 'Find all UserPdf of AdminLog that match the given filter, and structure the associated pdf files and download zipped bundle file' })
    @ApiQuery({ name: 'filter', required: true, description: 'the odata like filter expression use to match which instances are returned. pdf_type, pdf_name, fullName(user.first_name + user.last_name) are mandatory' })
    @ApiQuery({ name: 'pattern', required: true, description: 'a comma separated list of naming pattern that specfiy how the pdf files are structured and named. There are three naming patterns. First and second patterns are for directory and third naming pattern is for pdf file name. If pattern is "order.project.name,user.client_number,pdf_name", you would create a root directory from the property users_pdf.order.project.name, inside of that create a directory from the property users_pdf.user.client_number and in that create a file name users_pdf.pdf_name with a ".pdf" suffix.' })
    @ApiOkResponse({
        description: 'Zipped bundle file of all instances of UserPdf that match the filter',
        type: () => UserPdf
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async downloadBundle(@Query('filter') filter: string
        , @Query('pattern') pattern: string,
        @Res() res: Response
    ): Promise<void> {
        if (this.request['user'] != null)
            this.service.setUserForRequest(this.request['user']);

        let expandBy = 'user, order.project.issuer';
        let bundleFilePath = await this.service.getBundleFilePath(this.translateFilter(filter), this.csvParamToArray(expandBy), pattern);

        res.download(bundleFilePath);
    }
}