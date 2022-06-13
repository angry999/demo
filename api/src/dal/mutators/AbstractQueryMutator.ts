import { Logger } from "@nestjs/common";
import { Select, From, Parser } from "node-sql-parser";
import { UserIdentification } from "../../security/UserIdentification";
import { AbstractDal } from "../AbstractDal";
import { ParseException } from "../ParseException";
import { QueryMutator } from "../QueryMutator";

/**
 * a query mutator that applies to only a single user type and uses an aggregated mutator to make the change
 */
export abstract class AbstractQueryMutator implements QueryMutator {
    private readonly logger = new Logger(AbstractQueryMutator.name);

    /**
     * the object to parse sql with
     */
    parser = new Parser();

    /**
     * take a given sql where clause fragment as text and turn it into the parser's ast
     * @param text the text to convert to ast
     * @returns a parser's ast representation of that text
     */
    astifyWhereFragment(text: string): any {
        let placeHolderSql = `select 1 from bogusTable where ${text}`;
        try {
            let additionalAst = this.parser.astify(placeHolderSql, AbstractDal.parserOptions) as Select;

            return additionalAst.where;
        }
        catch (problem) {
            throw new ParseException(placeHolderSql, `could not secure statement, parsing failed ${JSON.stringify(problem)}`);
        }
    }

    /**
     * convert an asr expression to text
     */
    stringfyExpressionAst(ast: any): string {
        let placeHolderSql = `select 1 from bogusTable where 1`;
        let placeholderAsAst = this.parser.astify(placeHolderSql, AbstractDal.parserOptions) as Select;
        placeholderAsAst.where = ast;
        let adjustedText = this.parser.sqlify(placeholderAsAst, AbstractDal.parserOptions);
        return adjustedText.substring(placeHolderSql.length).trim();
    }

    /**
     * take 2 ast where fragments and "and" then together
     * @param lhs the left hand side to and
     * @param rhs the right hand side to and
     * @returns 1 ast expression with the lhs and rhs and'ed
     */
    andAst(lhs: any, rhs: any): any {
        return { type: 'binary_expr', operator: 'and', left: lhs, right: rhs };
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
    abstract shouldAdjust(query: Select, schema: string, table: string, table_alias: string, user: UserIdentification): boolean;

    /**
     * should the mutator be used to adjust the given query/table?
     * @param query the query that is being affected
     * @param schema the database schema the table is in
     * @param table the name of the table in the query that the table should be adjusted for
     * @param table_alias the alias used for table
     * @param user the user that is attempting to invoke the given query
     * @returns additional text to add to the query
     */
    abstract adjustFor(query: Select, schema: string, table: string, table_alias: string, user: UserIdentification): any;

    /**
     * apply the defined changes to the given ast and return the modified ast
     * @param ast the ast to modify
     * @param user the user that is attempting to invoke the given query
     * @returns the modified ast
     */
    mutate(ast: Select, user: UserIdentification): Select {
        //this.logger.log(`mutate user ${JSON.stringify(user)} on query ${JSON.stringify(ast)}`);
        if (ast.from == null)
            return ast;

        let additionalWhere = null;

        let froms = ast.from;
        for (let index = 0; index < froms.length; index++) {
            let from = froms[index] as From;
            // as, db, table
            let alias = from.as;
            let schema = from.db;
            let table = from.table;
            if (alias == null)
                alias = `${table}`;
            //alias = `${schema}.${table}`;
            //console.log(`${JSON.stringify(from)}`);
            if (this.shouldAdjust(ast, schema, table, alias, user)) {
                let astForthis = this.adjustFor(ast, schema, table, alias, user);
                if (astForthis != null) {
                    if (additionalWhere == null)
                        additionalWhere = astForthis;
                    else
                        additionalWhere = this.andAst(additionalWhere, astForthis);

                }
            }
        }

        if (additionalWhere != null) {
            if (ast.where != null) {
                let newWhere = this.andAst(ast.where, additionalWhere);
                ast.where = newWhere;
            }
            else
                ast.where = additionalWhere;
        }

        return ast;
    }
}