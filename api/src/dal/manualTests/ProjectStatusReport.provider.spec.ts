import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { ProjectStatusReportDal } from '../../dal/ProjectStatusReport.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('ProjectStatusReportDal', () => {
    let dal: ProjectStatusReportDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, ProjectStatusReportDal],
            }).compile();

        dal = await app.resolve<ProjectStatusReportDal>(ProjectStatusReportDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(2);
        expect(oneResult.contents).toBe("TeGtpTQRPyLi7szG06CXP9yrTNYGHc1kV1OotH0zoroDmSZvWJjcLfMKGezCUa9Cwqn5Dbci62ApLV51NtKXTPAGf3He8oEcgM6VvURLw16IFnZL9xPsrcIHPGQAuY9Ion7ZP9xTBZrRIR0S4W5BzcM43p5O3hgyRpkif0VZ0WQsLRYYGYwxTz8bB2Vq4IPjITZjxIC305ADmjjbq785MJFif9Ic4wVi6xJSRErXmsxNYwPgJJZWzKxYdH4o0qZvahxPAskMGaKkcRjKjstmwYJn0LEaA3XVs1CHYZGhpdfp0bMnnj3yWEZcy9PPO9bDcOSafDLkLbWhIknOYhOfZpYO2q8PaQuf1DbbjB6JzJNKHHudN1RwkVDNP38QuW9VIHf58auoa4HgCe7mVV28ZXU5ZonfsgfDzR20ro5CxumfenbBWNUzT1WLM96KOdVUP4IKb7UxQrCvCERCcLjFmHJyVhdghkNizrraErpPToItpr87iux3Ufz7kaOUTDfvDiWadGYMmvMYYf8v86YNNKpiSiPuCvWf8cQ6uYTCwLHquB951jMMFsITUDiVRu9RyxPLq209cmh12YPh9KsiJ9AGvWbQGYL2CQRWLoFZiCzj9GRVO0L61R8pW9guQaudAfqc7SxL4s06AgwO5f2FdF0LIt0B6b987mJUgFOVt01AQ1OGDtoA7O0VeFvFSVFTiSZeyBxqs7bdDrUGEjYENz0ikNGCa82yk8gY2z81VY70CNiOLO0zW05JRGUKVVfi4ESu9VE4bXIPs0GyvRQm8uBj3y7mFp50IOVYVOEQ9VnZifhQZne35TaB2yrCNhqNRI7D5ICHd0cc6B1Nghni91VODjVnn22SwA7B8ELgKyQ4HYusxDkwV6DQNiZLNejaXkGxurFCx5zCaQ6FQuQKHxWqWhNPFZuveF7niWY5YJZPy1FXbkViozuqogBbDPXxB3nvIKmTwLMYy7RUDQEj4b6FbHZ2mMt8MsduE9esY1NDNwRgpHyMbDsqXIj0LjyJhDb6ToftCbm3ouRGQJDFdHX8ZNxWQdHEu3majLn0r59Zhp2tRDa2GSvAG365RjDpvHzk7Gm4mDd8xXRAL34c2FYByLvgEg97sLuAPHmah5G3Fn3IbwkNeqmQJYMnb5q4t5GMugL3IUVXYUVbIN48WmT2qERRVYYbGBBzGheULg5jvpSP2BFp0h86cEmQqU8JVJgnjnvqzanFg");
        expect(oneResult.document).toBe("x1L2OjjAaosun2VpuR8npL7vvG6e");
        expect(oneResult.project_id).toBe(1);
        expect(oneResult.last_changed_by_id).toBe(1);
        expect(oneResult.id).toBe(2);
        expect(oneResult.createtime.toISOString()).toBe("2019-06-04T08:44:16.000Z");
        expect(oneResult.report_date.toISOString()).toBe("0001-01-01T00:00:00.000Z");
        expect(oneResult.updatetime.toISOString()).toBe("2019-06-04T08:44:16.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});
