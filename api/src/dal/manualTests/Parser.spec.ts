import { Parser } from 'node-sql-parser';

describe('Parser', () => {
    it('reserved words problem', async () => {
        try {
            const parser = new Parser();
            // status is a reserved word, use brackets
            // SELECT DISTINCT all_users.* FROM fs4.all_users AS all_users WHERE email = @prmEmail and is_deleted = 0 and user_type in ('a', 'c') and status = 1 ORDER BY all_users.createtime
            const ast = parser.astify(`SELECT * FROM all_users WHERE 1=[status]`, { database: 'transactsql' });
            expect(1).toBe(1);
        }
        catch (problem) {
            expect(1).toBe(2);
        }
    });
    
    it('or problem', async () => {
        try {
            const parser = new Parser();
            // extra brackets are a problem
            // SELECT * FROM all_users WHERE ( id in (1) ) or ( id in (2) )
            const ast = parser.astify(`SELECT * FROM all_users WHERE id in (1) or ( id in (2) )`, { database: 'transactsql' });
            expect(1).toBe(1);
        }
        catch (problem) {
            expect(1).toBe(2);
        }
    });
});
