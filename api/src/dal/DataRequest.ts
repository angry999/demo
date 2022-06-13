import { Select } from 'node-sql-parser';

export class Join {
    alias: string;
    fromSchemaName: string;
    fromTableName: string;
    fromClassName: string;
    toSchemaName: string;
    toTableName: string;
    toClassName: string;
    joinExpr: string;
}

/**
 * all the details needed for a single request of data
 */
export class DataRequest
{
    /**
     * the name of the class that should be returned
     */
    resultantClass = null;

    /**
     * the key value pairs to bind into the execution of the statement. The key is the name of the parameter and the
     * value is the value that is to be substituted
     */
    parameters: {[key: string]: Object} = null;

    /**
     * the joins in the query
     */
    joinsById: {[key: string]: Join} = {};
    joinsByAlias: {[key: string]: Join} = {};

    /**
     * the raw sql of the request with all pieces applied to it. it is secured, paged, ordered and filtered
     */
    securedSqlText: string;

    /**
     * the parsed sql of the request. this includes filters, order by's and paging. it does not include access control filters
     */
    statement: Select = null;

    /**
     * the un parsed sql of the request. this includes filters, order by's and paging. it does not include access control filters
     */
    sqlText: string = null;
    
    /**
     * the textual filter of the request. this will get translated into a where clause
     */
    textFilter: string = null;

    /**
     * a collection of order by directives. each directive is a string containing a reult column names optionally
     * with a 'desc' after it. eg, 'name desc'
     */
    orderBy: string[] = null;

    /**
     * the additional relationships/fields that should be retrieved
     */
    expandBy: string[] = null;

    /**
     * the specific page, in paged results to return
     */
    page: number = 1;

    /**
     * the number of rows per page in the results
     */
    pageSize: number = 100;
}