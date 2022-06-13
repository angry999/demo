import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ProjectImageService } from '../bll/ProjectImage.service';
import { ProjectImageApi } from '../api/ProjectImage.controller';

/**
 * Nest.js module for REST API's in typescript for ProjectImage
 * NOTE: Generated file, do not touch
 * one image for one project or project entity. if project entity is filled in it for that entity otherwise its for the project
 */
@Module({
	imports: [DalModule ],
	controllers: [ProjectImageApi],
	providers: [ProjectImageService],
	exports: [ProjectImageService]
})
export class ProjectImageModule 
{
	constructor() {}
}		



