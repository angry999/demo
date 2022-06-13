import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { MenuService } from '../bll/Menu.service';
import { MenuApi } from '../api/Menu.controller';

/**
 * Nest.js module for REST API's in typescript for Menu
 * NOTE: Generated file, do not touch
 * one item in a menu including menus themselves
 */
@Module({
	imports: [DalModule ],
	controllers: [MenuApi],
	providers: [MenuService],
	exports: [MenuService]
})
export class MenuModule 
{
	constructor() {}
}		



