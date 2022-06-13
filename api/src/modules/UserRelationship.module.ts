import { Module, forwardRef } from '@nestjs/common';
import { DalModule } from '../dal/Dal.module';
import { UserRelationshipService } from '../bll/UserRelationship.service';
import { UserRelationshipApi } from '../api/UserRelationship.controller';
import { AllUserModule } from '../modules/AllUser.module.generated';

@Module({
    imports: [DalModule, forwardRef(() => AllUserModule)],
    controllers: [UserRelationshipApi],
    providers: [UserRelationshipService],
    exports: [UserRelationshipService]
})
export class UserRelationshipModule {
    constructor() { }
}
