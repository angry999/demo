import { Test, TestingModule } from '@nestjs/testing';
import { Parser, Select } from 'node-sql-parser';
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from '../../security/UserIdentification';
import { AbstractDal } from './../AbstractDal';
import { issuerAdminQueryMutator } from './../mutators/IssuerAdmin/IssuerAdminRoleQueryMutator';

describe('AbstractDal-access control', () => {

    it('admin_users', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.admin_users where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[admin_users] WHERE [something] = 12 and 1 = 0');
    });

    it('all_users', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.all_users where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[all_users] WHERE [something] = 12 and ([all_users].[id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [all_users].[id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('all_users_answers', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.all_users_answers where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[all_users_answers] WHERE [something] = 12 and [all_users_answers].[user_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('background_process', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.background_process where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[background_process] WHERE [something] = 12 and 1 = 0');
    });

    it('countries', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.countries where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[countries] WHERE [something] = 12');
    });

    it('events', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.events where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[events] WHERE [something] = 12 and [events].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");
    });

    it('ffba_association', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.ffba_association where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[ffba_association] WHERE [something] = 12 and [ffba_association].[user_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('imported_contacts', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.imported_contacts where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[imported_contacts] WHERE [something] = 12 and [imported_contacts].[user_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('investment_orders', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.investment_orders where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[investment_orders] WHERE [something] = 12 and [investment_orders].[issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0");
    });

    it('investment_transaction', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.investment_transaction where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[investment_transaction] WHERE [something] = 12 and [investment_transaction].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");

    });

    it('investment_watchlist', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.investment_watchlist where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[investment_watchlist] WHERE [something] = 12 and [investment_watchlist].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");
    });

    it('investor_ack_orders', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.investor_ack_orders where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[investor_ack_orders] WHERE [something] = 12 and [investor_ack_orders].[order_id] IN (SELECT [id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0)");
    });

    it('investor_acknowledgements', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.investor_acknowledgements where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[investor_acknowledgements] WHERE [something] = 12');
    });

    it('investor_earnings', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.investor_earnings where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[investor_earnings] WHERE [something] = 12 and [investor_earnings].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");
    });

    it('investor_intended_trades', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.investor_intended_trades where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[investor_intended_trades] WHERE [something] = 12 and [investor_intended_trades].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");
    });

    it('investor_social_profile', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.investor_social_profile where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[investor_social_profile] WHERE [something] = 12');
    });

    it('investors', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.investors where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[investors] WHERE [something] = 12 and ([investors].[id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [investors].[id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('issuer_admin', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.issuer_admin where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[issuer_admin] WHERE [something] = 12 and [issuer_admin].[id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[is_deleted] = 0 AND [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('mails', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.mails where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[mails] WHERE [something] = 12 and ([mails].[from_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0)) OR [mails].[to_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0)))");
    });

    it('menu', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.menu where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[menu] WHERE [something] = 12 and 1 = 0');
    });

    it('module_access', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.module_access where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[module_access] WHERE [something] = 12 and 1 = 0');
    });

    it('modules', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.modules where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[modules] WHERE [something] = 12 and 1 = 0');
    });

    it('notable_investor_profile', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.notable_investor_profile where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[notable_investor_profile] WHERE [something] = 12');
    });

    it('payment_methods', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.payment_methods where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[payment_methods] WHERE [something] = 12 and [payment_methods].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");
    });

    it('profile_background', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.profile_background where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[profile_background] WHERE [something] = 12');
    });

    it('project_docusign_mappings', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.project_docusign_mappings where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[project_docusign_mappings] WHERE [something] = 12 and [project_docusign_mappings].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");
    });

    it('project_earnings', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.project_earnings where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[project_earnings] WHERE [something] = 12 and [project_earnings].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");
    });

    it('project_entity', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.project_entity where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[project_entity] WHERE [something] = 12 and [project_entity].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");
    });

    it('project_entity_details', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.project_entity_details where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[project_entity_details] WHERE [something] = 12 and [project_entity_details].[project_entity_id] IN (SELECT [id] FROM [fs4].[project_entity] WHERE [project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0) AND [project_entity_details].[is_deleted] = 0)");
    });

    it('project_images', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.project_images where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[project_images] WHERE [something] = 12 and [project_images].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");
    });

    it('project_keybackers', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.project_keybackers where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[project_keybackers] WHERE [something] = 12 and [project_keybackers].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");
    });

    it('project_pdfs', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.project_pdfs where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[project_pdfs] WHERE [something] = 12 and [project_pdfs].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");
    });

    it('project_roed', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.project_roed where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        // this table is badly named. its NOT related/tied to a project
        expect(newSql).toBe('SELECT * FROM [fs4].[project_roed] WHERE [something] = 12');
    });

    it('project_status_reports', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.project_status_reports where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[project_status_reports] WHERE [something] = 12 and [project_status_reports].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");
    });

    it('project_tax_reports', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.project_tax_reports where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[project_tax_reports] WHERE [something] = 12 and [project_tax_reports].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");
    });

    it('project_tax_summaries', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.project_tax_summaries where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[project_tax_summaries] WHERE [something] = 12 and [project_tax_summaries].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");
    });

    it('projects', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.projects where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[projects] WHERE [something] = 12 and [projects].[issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0");
    });

    it('property_interest', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.property_interest where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[property_interest] WHERE [something] = 12 and [property_interest].[interest_in_id] IN (SELECT [id] FROM [fs4].[property_social_profile] WHERE [project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)) AND [property_social_profile].[is_deleted] = 0");
    });

    it('property_social_profile', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.property_social_profile where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[property_social_profile] WHERE [something] = 12 and [property_social_profile].[project_id] IN (SELECT [id] FROM [fs4].[projects] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [projects].[is_deleted] = 0)");
    });

    it('provinces', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.provinces where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[provinces] WHERE [something] = 12');
    });

    it('registration_questionary', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.registration_questionary where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[registration_questionary] WHERE [something] = 12');
    });

    it('settings', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.settings where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[settings] WHERE [something] = 12 and 1 = 0');
    });

    it('sponsor_social_profile', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.sponsor_social_profile where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[sponsor_social_profile] WHERE [something] = 12');
    });

    it('support_engineers', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.support_engineers where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[support_engineers] WHERE [something] = 12');
    });

    it('user_basic', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.user_basic where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[user_basic] WHERE [something] = 12 and ([user_basic].[id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [user_basic].[id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('user_issuer_associations', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.user_issuer_associations where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[user_issuer_associations] WHERE [something] = 12 and [user_issuer_associations].[issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0");
    });

    it('user_relationship', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.user_relationship where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[user_relationship] WHERE [something] = 12 and [user_relationship].[user_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('users_banking_details', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.users_banking_details where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[users_banking_details] WHERE [something] = 12 and [users_banking_details].[user_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('users_beneficiary', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.users_beneficiary where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[users_beneficiary] WHERE [something] = 12 and [users_beneficiary].[user_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('users_corporation', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.users_corporation where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[users_corporation] WHERE [something] = 12 and [users_corporation].[user_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('users_employment', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.users_employment where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[users_employment] WHERE [something] = 12 and [users_employment].[user_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('users_entity', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.users_entity where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[users_entity] WHERE [something] = 12 and [users_entity].[user_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('users_invitee', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.users_invitee where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[users_invitee] WHERE [something] = 12 and [users_invitee].[user_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('users_pdf', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.users_pdf where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[users_pdf] WHERE [something] = 12 and ([users_pdf].[order_id] IN (SELECT [id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR ([users_pdf].[user_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0)) AND [users_pdf].[order_id] IS NULL))");
    });

    it('users_questionary', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.users_questionary where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[users_questionary] WHERE [something] = 12 and [users_questionary].[user_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('users_request', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.users_request where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[users_request] WHERE [something] = 12 and [users_request].[user_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('users_social_linkup', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.users_social_linkup where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[users_social_linkup] WHERE [something] = 12');
    });

    it('users_social_post', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.users_social_post where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[users_social_post] WHERE [something] = 12');
    });

    it('users_social_profile', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.users_social_profile where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[users_social_profile] WHERE [something] = 12');
    });

    it('users_subscribe', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.users_subscribe where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe("SELECT * FROM [fs4].[users_subscribe] WHERE [something] = 12 and [users_subscribe].[user_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))");
    });

    it('users_trust', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.users_trust where something = 12', AbstractDal.parserOptions);

        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[users_trust] WHERE [something] = 12 and [users_trust].[user_id] IN (SELECT [id] FROM [fs4].[investors] WHERE [id] IN (SELECT [user_id] FROM [fs4].[investment_orders] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [investment_orders].[is_deleted] = 0) OR [id] IN (SELECT [user_id] FROM [fs4].[user_issuer_associations] WHERE [issuer_id] IN (SELECT [issuer_id] FROM [fs4].[user_issuer_associations] WHERE [user_issuer_associations].[user_id] = 6 AND [user_issuer_associations].[is_deleted] = 0) AND [user_issuer_associations].[is_deleted] = 0))');
    });

    it('web_hooks', async () => {
        const parser = new Parser();
        const user = new UserIdentification(6, UserType.issuer_admin);
        const ast = parser.astify('select * from fs4.web_hooks where something = 12', AbstractDal.parserOptions);
        let mutator = issuerAdminQueryMutator;
        let newAst = mutator.mutate(ast as Select, user);
        let newSql = parser.sqlify(newAst, AbstractDal.parserOptions);

        expect(newSql).toBe('SELECT * FROM [fs4].[web_hooks] WHERE [something] = 12 and 1 = 0');
    });

});
