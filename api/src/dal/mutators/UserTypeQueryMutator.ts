import { Select } from "node-sql-parser";
import { UserType } from 'fundscraper-model-enums';
import { UserIdentification } from "../../security/UserIdentification";
import { QueryMutator } from "../QueryMutator";
import { AbstractQueryMutator } from "./AbstractQueryMutator";

/**
 * a query mutator that applies to only a single user type and uses an aggregated mutator to make the change
 */
export class UserTypeQueryMutator extends AbstractQueryMutator {
    /**
     * the user type this applies to
     */
    for_type: UserType;

    /**
     * the mutator to use for the matching user type
     */
    mutator: QueryMutator;

    /**
     * create a new mutator for the given type and aggregated mutator
     * @param infor_type the type of user to apply this to
     * @param inmutator the mutator to apply to user of type infor_type
     */
    constructor(infor_type: UserType, inmutator: QueryMutator) {
        super();
        this.for_type = infor_type;
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
        return user.user_type == this.for_type;
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
        if (user.user_type == this.for_type)
            return this.mutator.adjustFor(query, schema, table, table_alias, user);
        return null;
    }
}