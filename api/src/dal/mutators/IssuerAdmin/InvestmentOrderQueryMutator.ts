import { UserIdentification } from "../../../security/UserIdentification";
import { IssuerQueryMutator } from "./IssuerQueryMutator";
import { UserIssuerAssociationQueryMutator } from "./UserIssuerAssociationQueryMutator";

/**
 * a query mutator that applied to orders
 */
export class InvestmentOrderQueryMutator extends IssuerQueryMutator {
    /**
     * get query text to constraint to visible orders
     * @param schema the database schema the table is in
     * @param table the name of the table in the query that the table should be adjusted for
     * @param table_alias the alias used for table
     * @param user the user that is attempting to invoke the given query
     * @returns additional text to add to the query
     */
    static visibleOrderIds(schema: string, table: string, table_alias: string, user: UserIdentification): string {
        return `select id from fs4.investment_orders where issuer_id in (${UserIssuerAssociationQueryMutator.visibleIssuerIds(schema, table, table_alias, user)}) and investment_orders.is_deleted=0`;
    }

    /**
     * get query text to constraint to visible orders
     * @param schema the database schema the table is in
     * @param table the name of the table in the query that the table should be adjusted for
     * @param table_alias the alias used for table
     * @param user the user that is attempting to invoke the given query
     * @returns additional text to add to the query
     */
    static visibleInvestorIds(schema: string, table: string, table_alias: string, user: UserIdentification): string {
        return `select user_id from fs4.investment_orders where issuer_id in (${UserIssuerAssociationQueryMutator.visibleIssuerIds(schema, table, table_alias, user)}) and investment_orders.is_deleted=0`;
    }
}

