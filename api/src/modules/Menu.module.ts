import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { MenuService } from '../bll/Menu.service';
import { MenuApi } from '../api/Menu.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule)],
    controllers: [MenuApi],
    providers: [MenuService],
    exports: [MenuService]
})
export class MenuModule {
    constructor() { }
}
