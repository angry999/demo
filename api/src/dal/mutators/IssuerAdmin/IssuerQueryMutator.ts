import { Select } from "node-sql-parser";
import { UserIdentification } from "../../../security/UserIdentification";
import { AffectAllQueryMutator } from "../AffectAllQueryMutator";
import { UserIssuerAssociationQueryMutator } from "./UserIssuerAssociationQueryMutator";

/**
 * a query mutator that applied to issuers
 */
export class IssuerQueryMutator extends AffectAllQueryMutator {
    /**
     * should the mutator be used to adjust the given query/table?
     * @param query the query that is being affected
     * @param schema the database schema the table is in
     * @param table the name of the table in the query that the table should be adjusted for
     * @param table_alias the alias used for table
     * @param user the user that is attempting to invoke the given query
     * @returns additional text to add to the query
     */
    adjustFor(query: Select, schema: string, table: string, table_alias: string, user: UserIdentification): any {
        let text = `${table_alias}.issuer_id in (${UserIssuerAssociationQueryMutator.visibleIssuerIds(schema, table, table_alias, user)}) and ${table_alias}.is_deleted=0`;
        let additionalAst = this.astifyWhereFragment(text);
        return additionalAst;
    }
}

