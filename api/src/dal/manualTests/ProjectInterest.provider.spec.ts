import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPool } from '../../dal/DatabaseConnectionPool.provider';
import { ProjectInterestDal } from '../../dal/ProjectInterest.provider';
import { UserIdentification } from '../../security/UserIdentification';
import { UserType } from 'fundscraper-model-enums';

describe('ProjectInterestDal', () => {
    let dal: ProjectInterestDal;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(
            {
                providers: [...DatabaseConnectionPool, ProjectInterestDal],
            }).compile();

        dal = await app.resolve<ProjectInterestDal>(ProjectInterestDal);
        dal.setUserForRequest(new UserIdentification(2, UserType.admin_user));
    });

    it('Read predefined and check values', async () => {
        let oneResult = await dal.findOneById(2);
        expect(oneResult.interest_by_id).toBe(1);
        expect(oneResult.interest_in_id).toBe(1);
        expect(oneResult.amount_to_invest).toBe(0.00);
        expect(oneResult.time_until_investment).toBe("Q9Vr9IJWSSkoGVBAJyVkVAMnJc6B2gQdAEOOHMUmo0Fv0kDN8QoNoNQfnzIWB8TB26O16NSXEAXVUhmoAjtcT3QMOzr84XLe64tUxCGkXq9OQUk5cjngFHIYf1cxmKTGPIPQOsRYD7etU1WTdmWKBuzpmu");
        expect(oneResult.remarks).toBe("wp9ZdxtZ75vgLspEytf4d4jiZO85m8qvkNmAu80Vr2ONJ4ahbP1W6qqr4QZqpoEZG0WX6P9qsjEbgwAUDQTw7toUoVvE8Bx2pP6J8cbnFCvMMe9yf4Myv7SdC1AbjwgQNBMsqQMqFwQvXC89LWo3OYyhWT77DZ38kFZasI8qimTYgngZSrqn8d1O3vvwJFNFtH9iDYH3OYKs5z0AD7eczG07Da6XcCGEzdwAdXnUJnzatzJvuVTBqA6MH1FsSJQbh6TR2rmFKjtc6PF3rBthI4dZ7KSbhU2ZwoTnGRt3zeQ56TFSnC1ggztcSUKiyanQhu");
        expect(oneResult.status).toBe(0);
        expect(oneResult.updatetime.toISOString()).toBe("2019-06-04T08:44:16.000Z");
        expect(oneResult.last_changed_by_id).toBe(1);
        expect(oneResult.id).toBe(2);
        expect(oneResult.createtime.toISOString()).toBe("2019-06-04T08:44:16.000Z");
        expect(oneResult.is_deleted).toBe(false);
    });
});
