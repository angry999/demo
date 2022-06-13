import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { BackgroundProcessDal } from '../../dal/BackgroundProcess.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('BackgroundProcessDal', () => {
    let dal: BackgroundProcessDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, BackgroundProcessDal],
            }).compile();

        dal = await app.resolve<BackgroundProcessDal>(BackgroundProcessDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    describe('BackgroundProcessDal', () => {
        it('Read predefined and check values', async () => {
            let oneResult = await dal.findOneById(31);
            expect(oneResult.id).toBe(31);
            expect(oneResult.cmd_line).toBe('inc/FsMailSend.php 1915');
            expect(oneResult.started_at.toISOString()).toBe("2020-07-22T13:49:58.000Z");
            expect(oneResult.finished_at.toISOString()).toBe("2020-07-22T13:49:59.000Z");
            expect(oneResult.succeeded).toBe(true);
            expect(oneResult.last_changed_by_id).toBe(2);
            expect(oneResult.updatetime.toISOString()).toBe("2020-07-22T13:50:00.000Z");
            expect(oneResult.createtime.toISOString()).toBe("2020-07-22T13:49:58.000Z");
            expect(oneResult.is_deleted).toBe(false);
        });
    });
});
