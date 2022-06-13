import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { ProjectKeybackerDal } from '../../dal/ProjectKeybacker.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('ProjectKeybackerDal', () => {
    let dal: ProjectKeybackerDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, ProjectKeybackerDal],
            }).compile();

        dal = await app.resolve<ProjectKeybackerDal>(ProjectKeybackerDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(0);
        //Then The pages JSON result should be empty
    });
});
