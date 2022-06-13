import { Logger } from '@nestjs/common';
import { Select } from "node-sql-parser";
import { UserIdentification } from "../../security/UserIdentification";
import { QueryMutator } from "../QueryMutator";
import { AbstractQueryMutator } from "./AbstractQueryMutator";

/**
 * a query mutator that applies to only a single user type and uses an aggregated mutator to make the change
 */
export class TableSpecificQueryMutator extends AbstractQueryMutator {
    private readonly tableMutatorLogger = new Logger(TableSpecificQueryMutator.name);

    /**
     * the table this applies to
     */
    for_table: string;

    /**
     * the mutator to use for the matching user type
     */
    mutator: QueryMutator;

    /**
     * create a new mutator for the given table and aggregated mutator
     * @param infor_table the table to apply this to
     * @param inmutator the mutator to apply to table infor_table
     */
    constructor(infor_table: string, inmutator: QueryMutator) {
        super();
        this.for_table = infor_table.toLocaleLowerCase();
        this.mutator = inmutator;
    }

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
        //this.tableMutatorLogger.debug(`checking for ${table.toLocaleLowerCase()}-${this.for_table}`);
        return table.toLocaleLowerCase() == this.for_table;
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
        if (table.toLocaleLowerCase() == this.for_table) {
            return this.mutator.adjustFor(query, schema, table.toLocaleLowerCase(), table_alias, user);
        }
        //this.tableMutatorLogger.debug(`skipping for ${table}-${this.for_table}`);
        return null;
    }
}