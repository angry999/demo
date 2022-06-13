import { Select } from "node-sql-parser";
import { UserIdentification } from "../../security/UserIdentification";
import { AbstractQueryMutator } from "./AbstractQueryMutator";

/**
 * a query mutator that won't change anything
 */
export class NoChangeQueryMutator extends AbstractQueryMutator {
    /**
     * should the mutator be used to adjust the given query/table?
     * @param query the query that is being affected
     * @param schema the database schema the table is in
     * @param table the name of the table in the query that the table should be adjusted for
     * @param table_alias the alias used for table
     * @param user the user that is attempting to invoke the given query
     * @returns true if the mutator will change the query
     */
    shouldAdjust(query: Select, schema: string, table: string, table_alias: string, user: UserIdentification): boolean {
        return true;
    }

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
        return null;
    }
}