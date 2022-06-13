import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { ImportedContactService } from '../bll/ImportedContact.service';
import { ImportedContactApi } from '../api/ImportedContact.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule)],
    controllers: [ImportedContactApi],
    providers: [ImportedContactService],
    exports: [ImportedContactService]
})
export class ImportedContactModule {
    constructor() { }
}
