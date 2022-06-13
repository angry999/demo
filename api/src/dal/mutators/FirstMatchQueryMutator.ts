import { Select } from "node-sql-parser";
import { UserIdentification } from "../../security/UserIdentification";
import { QueryMutator } from "../QueryMutator";
import { AbstratAggregateQueryMutator } from "./AbstrcatAggregateQueryMutator";

/**
 * an aggregate query mutator that uses the first capable mutator and then exits
 */
export class FirstMatchQueryMutator extends AbstratAggregateQueryMutator {

    /**
     * the mutator to apply if none of the aggregated ones will
     */
    defaultMutator: QueryMutator;

    /**
     * create the new mutator to aggregate the specified mutators
     * @param inmutators the mutators to aggregate
     * @param indefaultMutator the mutator to apply if none of the aggregated ones will
     */
    constructor(inmutators: QueryMutator[], indefaultMutator: QueryMutator) {
        super(inmutators);
        this.defaultMutator = indefaultMutator;
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
        for (let index = 0; index < this.mutators.length; index++) {
            let mutator = this.mutators[index];
            if (mutator.shouldAdjust(query, schema, table, table_alias, user))
                return true;
        }

        return this.defaultMutator != null;
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
        for (let index = 0; index < this.mutators.length; index++) {
            let mutator = this.mutators[index];
            if (mutator.shouldAdjust(query, schema, table, table_alias, user))
                return mutator.adjustFor(query, schema, table, table_alias, user);
        }
        if (this.defaultMutator != null)
            return this.defaultMutator.adjustFor(query, schema, table, table_alias, user);

        return null;
    }
}