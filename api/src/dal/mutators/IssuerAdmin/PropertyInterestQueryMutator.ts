
import { Select } from "node-sql-parser";
import { UserIdentification } from "../../../security/UserIdentification";
import { AffectAllQueryMutator } from "../AffectAllQueryMutator";
import { ProjectQueryMutator } from "./ProjectQueryMutator";
import { UserIssuerAssociationQueryMutator } from "./UserIssuerAssociationQueryMutator";

/**
 * a query mutator that applied to property interest
 */
export class PropertyInterestQueryMutator extends AffectAllQueryMutator {

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
        let text = `${table_alias}.interest_in_id in (select id from fs4.property_social_profile where project_id in (${ProjectQueryMutator.visibleProjectIds(schema, table, table_alias, user)})) and property_social_profile.is_deleted=0`;
        let additionalAst = this.astifyWhereFragment(text);
        return additionalAst;
    }
}


