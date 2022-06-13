import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { FfbaAssociationService } from '../bll/FfbaAssociation.service';
import { FfbaAssociationApi } from '../api/FfbaAssociation.controller';
import { UserEntityModule } from '../modules/UserEntity.module.generated';
import { AllUserModule } from '../modules/AllUser.module.generated';
import { ProjectModule } from '../modules/Project.module';

@Module({
    imports: [DalModule, forwardRef(() => UserEntityModule), forwardRef(() => AllUserModule), forwardRef(() => ProjectModule)],
    controllers: [FfbaAssociationApi],
    providers: [FfbaAssociationService],
    exports: [FfbaAssociationService]
})
export class FfbaAssociationModule {
    constructor() { }
}
