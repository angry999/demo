import { Injectable, Inject, forwardRef, Dependencies, Logger, Scope } from '@nestjs/common';
import { Parser, Select } from 'node-sql-parser';
import { ConnectionPool, BigInt, TYPES, IResult } from 'mssql';
import { DataRequest } from './DataRequest';
import { Mapping } from './Mapping';
import { ModuleRef } from '@nestjs/core';
import { ParseException } from './ParseException';
import { UserIdentification } from '../security/UserIdentification';
import { QueryMutator } from './QueryMutator';
import { NoAccessQueryMutator } from './mutators/NoAccessQueryMutator';
import { UserTypeQueryMutator } from './mutators/UserTypeQueryMutator';
import { NoChangeQueryMutator } from './mutators/NoChangeQueryMutator';
import { issuerAdminQueryMutator } from './mutators/IssuerAdmin/IssuerAdminRoleQueryMutator';
import { FirstMatchQueryMutator } from './mutators/FirstMatchQueryMutator';
import { ClassMapping } from './ClassMapping';
import { UserType } from 'fundscraper-model-enums';

/**
 * used in getting the generic in the derivations of this
 */
interface NoParamConstructor<T> {
    new(): T;
}

/**
 * a base point of inheritence for dal's
 * first and foremost, why are we doing this rather than using a library??
 *      plain and simple: https://owasp.org/www-community/Broken_Access_Control
 * nothing does this at the data level. its best if done there
 * @param T the type of model object that the dal will manage
 */
@Injectable({ scope: Scope.TRANSIENT })
export abstract class AbstractDal<T>
{
    /**
     * the options we want to use by default when working with sql
     */
    static parserOptions = { database: 'transactsql' };

    /**
     * the objects that apply security to our queries
     */
    static accessControlMutator: QueryMutator = new FirstMatchQueryMutator([
        new UserTypeQueryMutator(UserType.invalid, new NoAccessQueryMutator())
        , new UserTypeQueryMutator(UserType.investor, new NoAccessQueryMutator())
        , new UserTypeQueryMutator(UserType.admin_user, new NoChangeQueryMutator())
        , issuerAdminQueryMutator],
        new NoAccessQueryMutator());

    /**
     * logging
     */
    private readonly logger = new Logger(AbstractDal.name);

    static next_id = 1;

    /**
     * an id to differentiate instances of dal's
     */
    private internal_id = AbstractDal.next_id++;

    /**
     * a constructor for entities that this dal will manage
     */
    private derivedConstructor: NoParamConstructor<T>;

    /**
     * properties that should be left alone on insert of update
     */
    private propertiesToNotMutate: Array<string> = ['id', 'createtime', 'updatetime'];

    /**
     * the mapping entry that specifies how object instances should be mapped to the table
     */
    private classMapping: ClassMapping;

    /**
     * the fully qualified name of the table
     */
    private table_name: string;

    /**
     * if this class is a base/parent class, what is the name of the column that holds the discriminator
     */
    private discriminatorColumn?: string;

    /**
     * a user to use for the very next request
     */
    private userForRequest: UserIdentification;

    /**
     * a map where the key is a discriminator and the value is the name of the class represented by that discriminator value
     */
    private discriminatorToClassMap: Map<string, string>;

    /**
     * if true, the next db call has the acl bypassed
     */
    private bypassACL: boolean;

    /**
     * construct a new instance
     */
    constructor(
        private moduleRef: ModuleRef
        , @Inject('DATABASE_CONNECTION_POOL') private connectionPool?: ConnectionPool) {
    }

    /**
     * set the type of entity that this instance will work with
     */
    protected setEntityType() {

    }

    protected log(text: string) {
        let user_type = this.userForRequest == null ? 0 : this.userForRequest.user_type;
        let id = this.userForRequest == null ? 0 : this.userForRequest.user_id;
        this.logger.log(`[${this.internal_id}-${user_type}-${id}] ${text}`);
    }

    protected debug(text: string) {
        let user_type = this.userForRequest == null ? 0 : this.userForRequest.user_type;
        let id = this.userForRequest == null ? 0 : this.userForRequest.user_id;
        this.logger.debug(`[${this.internal_id}-${user_type}-${id}] ${text}`);
    }

    protected error(text: string, problem: any) {
        let user_type = this.userForRequest == null ? 0 : this.userForRequest.user_type;
        let id = this.userForRequest == null ? 0 : this.userForRequest.user_id;
        this.logger.error(`[${this.internal_id}-${user_type}-${id}] ${text}`, problem.stack);
    }

    /**
     * set the type of entity that this dal instance will be working with
     * @param ctor - the type of object to work with
     */
    protected setEntityTypeByConstructor(ctor: NoParamConstructor<T>) {
        if (this.classMapping == undefined) {
            let forClassName = ctor.name;
            this.derivedConstructor = ctor;
            this.classMapping = Mapping.classes[forClassName];

            // now set the field if this is a parent class
            this.discriminatorToClassMap = new Map<string, string>();
            Object.keys(Mapping.classes).map((key) => {
                let element = Mapping.classes[key];
                let elementsParent = element.parentClass;
                if (forClassName === elementsParent) {
                    let dc = element.discriminator_column;
                    let dcVal = element.discriminator;
                    this.discriminatorColumn = dc;
                    this.discriminatorToClassMap.set(dcVal, element.class);
                }
            });
        }
    }

    /**
     * get the name of the table backing the object this dal supports
     * @returns the name of the table this dal supports
     */
    public getTableName(): string {
        if (this.table_name == null)
            this.table_name = this.classMapping.schema + '.' + this.classMapping.table;
        return this.table_name;
    }

    /**
     * adjust the contents of a given object so that each of its properties are case insensitive
     * @param columns the indexed values as a row
     */
    makeRowCaseInsentitive(columns: any[]) {
        Object.keys(columns).forEach(key => {
            let uCase = key.toUpperCase();
            columns[uCase] = columns[key];
        });
    }

    /**
     * create a new instance of the dal backed type from the given row
     */
    protected async valuesFromRow(columns: any[], result: T) {
        if (this.derivedConstructor == null)
            this.setEntityType();

        let properties = this.classMapping.properties;

        for (let key in properties) {
            let property = properties[key];
            if (property.relationship == 'none') {
                if (property.dataType == 'boolean') {
                    let newValue = columns[property.columnName];
                    if (newValue == 0)
                        result[property.name] = false;
                    else if (newValue == 1)
                        result[property.name] = true;
                    else
                        result[property.name] = newValue;
                }
                else if (property.dataType == 'number') {
                    let value = columns[property.columnName];
                    if (typeof value == 'string')
                        result[property.name] = (new Number(value)).valueOf();
                    else {
                        if (Array.isArray(value)) {
                            // sort columns get duplicated and rolled into arrays on us
                            result[property.name] = value[0];
                        }
                        else
                            result[property.name] = value;
                    }
                }
                else if (property.dataType == 'string' || property.dataType == 'Date') {
                    let value = columns[property.columnName];
                    if (Array.isArray(value)) {
                        // sort columns get duplicated and rolled into arrays on us
                        result[property.name] = value[0];
                    }
                    else
                        result[property.name] = value;
                }
                else // enum or fk
                {
                    let columnValue = columns[property.columnName];
                    if (Array.isArray(columnValue)) {
                        // sort columns get duplicated and rolled into arrays on us
                        result[property.name] = columnValue[0];
                    }
                    else
                        result[property.name] = columnValue;
                }
            }
        }

        if (this.classMapping.parentClass != null) {
            let dalName = `${this.classMapping.parentClass.replace('[]', '')}Dal`;
            try {
                let dal = await this.moduleRef.resolve(dalName, undefined, { strict: false }) as AbstractDal<any>;
                dal.setUserForRequest(this.userForRequest);
                await dal.valuesFromRow(columns, result);
            }
            catch (problem) {
                throw problem;
            }
        }

        if (columns['total_result_set_rows'] != null)
            result['total_result_set_rows'] = columns['total_result_set_rows'];

        return result;
    }

    /**
     * create a new instance of the dal backed type from the given row
     */
    protected async fromRow(columns: any[]): Promise<T> {
        if (this.derivedConstructor == null)
            this.setEntityType();

        this.makeRowCaseInsentitive(columns);

        // is this a base class?
        if (this.discriminatorColumn != undefined) {
            let discriminatorValue = '' + (Array.isArray(columns[this.discriminatorColumn]) ? columns[this.discriminatorColumn][0] : columns[this.discriminatorColumn]);
            let rowClassName = this.discriminatorToClassMap.get(discriminatorValue);
            let dalName = `${rowClassName.replace('[]', '')}Dal`;
            try {
                let dal = await this.moduleRef.resolve(dalName, undefined, { strict: false }) as AbstractDal<any>;
                dal.setUserForRequest(this.userForRequest);
                return dal.fromRow(columns) as Promise<T>;
            }
            catch (problem) {
                throw problem;
            }
        }

        let result = new this.derivedConstructor();
        await this.valuesFromRow(columns, result);

        return result;
    }

    /**
     * perform a data request against the database
     * @param dataRequest - the request to perform
     * @returns all objects that match the specified request
     */
    private async queryByRequest(dataRequest: DataRequest): Promise<IResult<any>> {
        let lastError = null;
        let retries = 2;
        while (retries > 0) {
            try {
                const connection = await this.connectionPool.connect();
                const serverRequest = connection.request();

                // bind parameters
                let paramText = '';
                for (let parameterName in dataRequest.parameters) {
                    let parameterValue = dataRequest.parameters[parameterName];
                    //serverRequest.input(parameterName, BigInt, parameterValue);
                    //this.debug(`queryByRequest binding (${parameterName} : ${parameterValue})`);

                    if (typeof parameterValue == 'string')
                        serverRequest.input(parameterName, TYPES.NVarChar, parameterValue);
                    else if (typeof parameterValue == 'boolean')
                        serverRequest.input(parameterName, TYPES.TinyInt, parameterValue);
                    else if (typeof parameterValue == 'number')
                        serverRequest.input(parameterName, TYPES.Numeric, parameterValue);
                    else if (parameterValue instanceof Date)
                        serverRequest.input(parameterName, TYPES.DateTime2, parameterValue);
                    else
                        serverRequest.input(parameterName, TYPES.NVarChar, parameterValue);
                    if (paramText != '')
                        paramText == ',';
                    paramText += `${parameterName}=${parameterValue}`;
                }

                this.debug(`exec queryByRequest(${dataRequest.securedSqlText}) parms(${paramText})`);
                let results = await serverRequest.query(dataRequest.securedSqlText);
                //connection.close();
                return results;
            }
            catch (e) {
                lastError = e;
                retries--;
            }
        }
        if (lastError != null) {
            this.error(`queryByRequest(${JSON.stringify(dataRequest)}) - ${lastError}`, lastError);
            throw lastError;
        }
    }

    /**
     * perform a data request against the database, then decode and return the results
     * @param dataRequest - the request to perform
     * @returns all objects that match the specified request
     */
    private async findAnyBySecuredRequest(dataRequest: DataRequest): Promise<any[]> {
        try {
            let results = await this.queryByRequest(dataRequest);
            let callResults = new Array<any>();
            if (results.recordset !== null && results.recordset !== undefined) {
                results.recordset.forEach((row) => {
                    callResults.push(row);
                });
            }
            return callResults;
        }
        catch (e) {
            this.error(`findAnyBySecuredRequest(${JSON.stringify(dataRequest)}) - ${e}`, e);
            throw e;
        }
    }

    /**
     * perform a data request against the database, then decode and return the results
     * @param dataRequest - the request to perform
     * @returns all objects that match the specified request
     */
    private async findAllBySecuredRequest(dataRequest: DataRequest): Promise<T[]> {
        try {
            let results = await this.queryByRequest(dataRequest);
            let callResults = new Array<T>();

            await Promise.all(results.recordset.map(async (row) => {
                try {
                    //this.debug(`findAllBySecuredRequest.fromRow(${JSON.stringify(row)})`);
                    var result = await this.fromRow(row);
                    callResults.push(result);
                }
                catch (e) {
                    this.error(`findAllBySecuredRequest.fromRow(${JSON.stringify(row)}) - ${e}`, e);
                    throw e;
                }
            }));

            return callResults;
        }
        catch (e2) {
            this.error(`findAllBySecuredRequest(${JSON.stringify(dataRequest)}) - ${e2}`, e2);
            throw e2;
        }
    }

    /**
     * indicate that the next call needs to bypass acl 
     */
    public byPassACLOnNextCall() {
        this.bypassACL = true;
    }

    /**
     * set the user to use for the next request (and no others)
     * @param user the user to use for access control
     */
    public async setUserForRequest(user: UserIdentification) {
        //let logText = user == null ? 'setUserForRequest no user' : `setUserForRequest ${user.user_type}-${user.user_id}`;
        //this.debug(logText);
        this.userForRequest = user;
    }

    /**
     * take a given request for data expressed as a SQL ast and adjust it to ensure that only approved data is returned
     * @param ast - the sql ast that needs to be secured
     * @returns sql ast that has been adjusted to reflect the appropriate access control
     */
    private secureAst(ast: Select): Select {

        if (this.bypassACL)
            return ast;
        this.bypassACL = false;
        let user;
        if (this.userForRequest != null) {
            user = this.userForRequest;
        }
        else {
            this.debug(`no user specified to secure query by`);
            user = new UserIdentification(0, UserType.invalid);
        }

        this.debug(`secureAst for ${JSON.stringify(user)}`);
        let securedAst = AbstractDal.accessControlMutator.mutate(ast, user);

        return securedAst;
    }

    /**
     * take the given where clause fragment and convert its properties to columns
     * @param where the where clause to alter
     * @param defaultTable the table to assume if none is specified
     */
    private mapWhereClauseToColumns(where: any, defaultTable: string) {
        if (where.type == 'binary_expr') {
            this.mapWhereClauseToColumns(where.left, defaultTable);
            this.mapWhereClauseToColumns(where.right, defaultTable);
        }
        else if (where.type == 'column_ref') {
            let table = (where.table == null) ? defaultTable : where.table;
            let propertyName = where.column;

            for (let key in this.classMapping.properties) {
                let property = this.classMapping.properties[key];
                if (property.name == propertyName)
                    where.column = property.columnName;
            }
        }
    }

    /**
     * take the given order by and switch property names for column names in the select list
     * @param ast the ast to alter
     */
    private mapOrderByToColumns(ast: Select) {
        let orderBys = ast.orderby;
        for (let index = 0; index < orderBys.length; index++) {
            let col = orderBys[index].expr;
            if (col.type == 'column_ref') {
                for (let key in this.classMapping.properties) {
                    let property = this.classMapping.properties[key];
                    if (property.name == col.column)
                        col.column = property.columnName;
                }
            }
        }
    }

    /**
     * take the given ast and switch column names for property names
     * @param ast the ast to alter
     */
    private mapPropertiesToColumns(ast: Select) {
        if (ast != null && ast.from != null) {
            let firstFrom = ast.from[0];
            if (ast.where != null)
                this.mapWhereClauseToColumns(ast.where, firstFrom['table']);
            if (ast.orderby != null)
                this.mapOrderByToColumns(ast);
        }
    }

    /**
     * convert a sql ast into sql text
     * @param ast - the sql ast that needs to be adjusted
     * @return raw sql text that can implement the specified ast
     */
    private sqlAstToSqlText(ast: Select): string {
        const parser = new Parser();
        this.mapPropertiesToColumns(ast);
        const sqlText = parser.sqlify(ast, AbstractDal.parserOptions);
        return sqlText;
    }

    /**
     * convert some given sql text into sql ast
     * @param text - the sql text that needs to be converted to sql ast
     * @return sql ast that can be exected in findAllByRawSQL
     */
    private sqlTextToSqlAst(text: string): Select {
        const parser = new Parser();
        try {
            //this.debug(`parsing sql(${text})`);
            const ast = parser.astify(text, AbstractDal.parserOptions);
            if (ast as Select)
                return ast as Select;
        }
        catch (e) {
            this.error(`sqlTextToSqlAst(${text}) - ${e}`, e);
            throw new ParseException(text, e.message);
        }
        return null;
    }

    /**
     * create a join for a single property navigation
     * @param request the data request the join is occuring in
     * @param fromClassMapping the table mapping or the class to navigate from
     * @param fromAlias ann alias to use for the from class
     * @param property the property that is being traversed
     * @param joinPrefix a prefix to use on the join. join names should represent the full path
     * @param startingText - the text that the join was implied from
     * @param textPortionToReplace - the portion of startingText to replace
     * @returns an object with the newly adjusted text and the join that was created
     */
    private createJoin(request: DataRequest, fromClassMapping: any, fromAlias: string, property: string, joinPrefix = null, startingText: string, textPortionToReplace: string): any {
        // its a property in the base
        let fromClassName = fromClassMapping.class;
        let joinedProperty = fromClassMapping.properties[property];

        // is there already a join?
        // later
        let fromTableName = (joinPrefix) ? joinPrefix : `j_${fromClassMapping.table}`;
        let alias = `${fromTableName}_${property}`;

        // create the join
        let targetClassMapping = Mapping.classes[joinedProperty.dataType.replace('[]', '')];
        let toTableName = targetClassMapping.table;
        let toClassName = targetClassMapping.class;
        let joinExpr = (joinedProperty.relationship == 'out') ?
            `${fromAlias}.${joinedProperty.columnName} = ${alias}.id`
            : `${alias}.${joinedProperty.columnName} = ${fromAlias}.id`;
        let join = {
            alias: alias
            , fromSchemaName: fromClassMapping.schema
            , fromTableName: fromTableName
            , fromClassName: fromClassName
            , toSchemaName: targetClassMapping.schema
            , toTableName: toTableName
            , toClassName: toClassName
            , joinExpr: joinExpr
        };
        request.joinsById[property] = join;
        request.joinsByAlias[alias] = join;

        const regex = new RegExp(`([^_]|^)${textPortionToReplace}[\.]`);
        let adjustedText = startingText.replace(regex, `$1${alias}.`);
        return { adjustedText: adjustedText, join: join };
    }

    /**
     * take a given data request and extract implied joins from the given text
     * @param request - the request to translate the text from
     * @param text - the text to extract the implied joins from
     * @returns the text adjusted to properly reference the implied joins
     */
    private translateImpliedTextJoins(request: DataRequest, text: string): string {
        let adjustedText = text;
        if (text == null)
            return null;

        //this.logger.debug(`translateImpliedTextJoins enter ${adjustedText}`);
        let identifierRegex = /([A-Za-z0-9][A-Za-z0-9_]*\.){1,}[A-Za-z0-9][A-Za-z0-9_]*/g;
        let identifiers = adjustedText.match(identifierRegex);
        //this.logger.debug(`translateImpliedTextJoins identifiers are ${JSON.stringify(identifiers)}`);
        if (identifiers === null)
            return text;
        for (let identifierIndex = 0; identifierIndex < identifiers.length; identifierIndex++) {

            // find and replace all multi part references. the parser cannot handle a.b.c, only a.b
            let identifier = identifiers[identifierIndex].trim().replace(',', '');
            let keepGoing = true
            //this.logger.debug(`translateImpliedTextJoins adjusting identifier ${identifier}`);

            while (keepGoing) {
                // identify and substitute the identifier
                let pieces = identifier.split('.');
                let basePropertyOrAlias = pieces[0].trim();
                let joinProperty = pieces[1].trim();
                //this.logger.debug(`translateImpliedTextJoins identifier pieces are ${basePropertyOrAlias}.${joinProperty}`);

                // identify the class we are going from and the property in it that is references
                let fromClassMapping = null;
                let fromAlias = null;
                let traversingPropertyName = null;
                let traversingProperty = null;
                let joinPrefix = null;
                let textPortionToReplace = '';

                if (this.classMapping.table === basePropertyOrAlias) {
                    // skip, this is just referencing the original base table
                }
                else if (this.classMapping.properties.hasOwnProperty(basePropertyOrAlias)) {
                    fromClassMapping = this.classMapping;
                    fromAlias = fromClassMapping.table;
                    traversingPropertyName = basePropertyOrAlias;
                    textPortionToReplace = traversingPropertyName;
                    //this.logger.debug(`translateImpliedTextJoins matched ${basePropertyOrAlias}.${joinProperty} to ${fromAlias}.${traversingPropertyName}`);
                }
                else if (request.joinsByAlias.hasOwnProperty(basePropertyOrAlias)) {
                    // get the base table of the join
                    let join = request.joinsByAlias[basePropertyOrAlias];
                    let baseClassMapping = Mapping.classes[join.toClassName];
                    if (baseClassMapping.properties.hasOwnProperty(joinProperty)) {
                        fromClassMapping = baseClassMapping;
                        fromAlias = basePropertyOrAlias;
                        traversingPropertyName = joinProperty;
                        joinPrefix = basePropertyOrAlias;
                        textPortionToReplace = `${fromAlias}.${traversingPropertyName}`;
                        //this.logger.debug(`translateImpliedTextJoins multi part identifier ${joinIdentifier} matched to ${fromAlias}.${traversingPropertyName}`);
                    }
                }
                else {
                    //this.logger.debug(`translateImpliedTextJoins multi part identifier ${joinIdentifier} ignored`);
                }

                // does a property match and is it a primitive?            
                if (fromClassMapping != null && fromClassMapping.properties.hasOwnProperty(traversingPropertyName)) {
                    traversingProperty = fromClassMapping.properties[traversingPropertyName];
                    let mappedProperty = Mapping.classes[traversingProperty.dataType.replace('[]', '')];
                    if (mappedProperty != null) {
                        let result = this.createJoin(request, fromClassMapping, fromAlias, traversingPropertyName, joinPrefix, adjustedText, textPortionToReplace);

                        adjustedText = result.adjustedText;
                        const regex = new RegExp(`([^_]|^)${textPortionToReplace}\.`);
                        identifier = identifier.replace(regex, `$1${result.join.alias}.`);
                    }
                    else {
                        // is the property named something different?
                        //request.textFilter = request.textFilter.replace(filterPortionToReplace, alias);  
                        keepGoing = false;
                    }
                }
                else
                    keepGoing = false;

                //this.logger.debug(`translateImpliedTextJoins adjusted, identifier=${identifier} adjusted text=${adjustedText}`);
            }
        }

        return adjustedText;
    }

    /**
     * take a given data request and extract implied joins from the where clause
     * @param request - the request to translate the where clauses from
     */
    private extractImpliedWhereJoins(request: DataRequest) {
        if (request.textFilter == null)
            return;
        let newFilter = this.translateImpliedTextJoins(request, request.textFilter);
        request.textFilter = newFilter;
    }

    /**
     * take a given data request and extract implied joins from the order by statements
     * @param request - the request to translate the order by's for
     */
    private extractImpliedOrderJoins(request: DataRequest): string {
        if (request.orderBy === null || request.orderBy === undefined || request.orderBy.length == 0)
            return `${this.classMapping.table}.${this.classMapping.defaultOrderBy}`;

        let orderBy = '';
        // goes through each
        request.orderBy.forEach((entry) => {
            // doesn't support property path's yet
            let currentOrder = entry;
            if (orderBy !== '')
                orderBy += ',';
            orderBy += currentOrder;
        });

        if (orderBy === null || orderBy.length == 0)
            return `${this.classMapping.table}.${this.classMapping.defaultOrderBy}`;

        let newOrderBy = this.translateImpliedTextJoins(request, orderBy);

        return newOrderBy;
    }

    /**
     * get text that represents the joins in the given request
     * @param request the request to get the join text for
     */
    private getJoinsText(request: DataRequest) {
        let sql = '';
        Object.keys(request.joinsByAlias).forEach((key) => {
            let join = request.joinsByAlias[key];
            sql += `INNER JOIN ${join.toSchemaName}.${join.toTableName} AS ${join.alias} ON ${join.joinExpr} `;
        });

        return sql;
    }

    /**
     * take a given data request and translate its properties into the sql text property of the request
     * @param request - the request to create the sql for
     */
    private createSqlTextForDataRequest(request: DataRequest) {
        // extract joins from where clause
        // each x.y we find results in a join being created or accessed. the join is defined by the property
        // path. we then rewrite the where clause to reference the join rather than the path
        this.extractImpliedWhereJoins(request);

        let orderColumns = this.extractImpliedOrderJoins(request);
        let orderByClause;
        let additionalResultColumns = '';
        if (orderColumns != null && orderColumns.length > 0) {
            orderByClause = `ORDER BY ${orderColumns}`;

            // ensure the joined columns are in the select list
            let pieces = orderColumns.split(',');
            pieces.forEach(piece => {
                let subPieces = piece.trim().split(' ');
                additionalResultColumns += `,${subPieces[0]}`;
                //this.logger.debug(`order adjustment piece=${piece} front piece=${subPieces[0]} additional=${additionalResultColumns}`);
            });
        }
        else
            orderByClause = '';

        let whereClause = (request.textFilter == null || request.textFilter.trim().length == 0) ? '' : `WHERE ${request.textFilter}`;
        let joinClause = ` ${this.getJoinsText(request)}`;
        if (joinClause.length == 1)
            joinClause = '';
        let fromClause = `FROM ${this.getTableName()} AS ${this.classMapping.table}${joinClause}`;

        let sql = `SELECT DISTINCT ${this.classMapping.table}.*${additionalResultColumns} ${fromClause} ${whereClause} ${orderByClause}`;
        request.sqlText = sql.replace(/[\t\r\n]/g, ' ').replace(/[ ]{2,}/g, ' ');
    }

    /**
     * take the given requests query (in sqlText) and add the appropriate access control filters with the result
     * being placed in securedSqlText
     * @param request - the request to adjust
     */
    private secureRequest(request: DataRequest) {
        request.statement = this.sqlTextToSqlAst(request.sqlText);
        let securedAst = this.secureAst(request.statement);
        let securedSqlText = this.sqlAstToSqlText(securedAst);
        request.securedSqlText = securedSqlText;
    }

    /**
     * take a given data request and apply all adjustments to get it into its final form. that is
     * create a sql statement that is secured, filtered, ordered and paged.
     * It will NOT be expanded, those require separate requests spawnedd from them
     * @param request - the request to adjust
     */
    private convertRequestToFinalForm(request: DataRequest) {
        if (this.derivedConstructor == null)
            this.setEntityType();

        // note: the parser does not recognize the required form of row_number() over
        // NOTE: the parser does not recognize OFFSET 0 ROWS FETCH NEXT 7 ROWS ONLY
        this.createSqlTextForDataRequest(request);
        this.secureRequest(request);

        if ((request.pageSize > 0)) {
            let securedSqlText = request.securedSqlText;
            let offset = Math.max((request.page - 1) * request.pageSize, 0);
            let fetchDirective = (offset == 0) ? 'FIRST' : 'NEXT';
            request.securedSqlText = `${securedSqlText} OFFSET ${offset} ROWS FETCH ${fetchDirective} ${request.pageSize} ROWS ONLY`;
            request.securedSqlText = request.securedSqlText.replace(/ FROM/, ',total_result_set_rows=COUNT(*) OVER() FROM');
            //this.debug(`built paging sql: ${request.securedSqlText}`);
        }
        else {
            //this.debug(`built non paging sql: ${securedSqlText}`);
        }

        //this.debug(`convertRequestToFinalForm(${JSON.stringify(request)})`);
    }

    /**
     * get a list of id's from the source objects
     * @param sourceObjects the objects to get the id's from
     * @param propertyName the name of the column that holds the id to turn into a list
     * @returns a csv string list of the properties
     */
    private getIdList(sourceObjects: T[], propertyName: string): string {
        let idList = '';
        let idArray = new Array();
        if (sourceObjects !== null && sourceObjects !== undefined) {
            sourceObjects.forEach((source) => {
                let propertyValue = source[propertyName];
                if (!idArray.includes(propertyValue)) {
                    idArray.push(propertyValue);
                    if (propertyValue != undefined && propertyValue != null) {
                        if (idList != '')
                            idList += ',';
                        idList += propertyValue;
                    }
                }
            });
        }

        return idList;
    }

    /**
     * deep load an incoming (one to many) property relationship. stated another way many objects refer to our source objects and
     * our source objects hold collections of those
     * @param sourceObjects - the object that hold the relationship
     * @returns the objects that were loaded
     */
    private async deepLoadPropertyOneToMany(sourceObjects: any[], property: { name: string, relationship: string, columnName: string, dataType: string }): Promise<any[]> {
        this.debug(`deepLoadPropertyOneToMany(${JSON.stringify(property)})`);
        // get the id's of the source objects
        let idList = this.getIdList(sourceObjects, 'id');

        // get the dal and do a find by
        if (idList.length > 0) {
            let dalName = `${property.dataType.replace('[]', '')}Dal`;
            try {
                let dal = await this.moduleRef.resolve(dalName, undefined, { strict: false }) as AbstractDal<any>;
                dal.setUserForRequest(this.userForRequest);
                let deepObjects = await dal.findAllByFilter(`${property.columnName} in (${idList})`, null, null, null, 1, -1);
                let deepObjectMap = new Map<number | string, any>();
                if (deepObjects !== null && deepObjects !== undefined) {
                    deepObjects.forEach((deepObject) => {
                        let id = deepObject[property.columnName];
                        var arrayForId;
                        if (!deepObjectMap.has(id)) {
                            arrayForId = new Array();
                            deepObjectMap.set(id, arrayForId);
                        }
                        else
                            arrayForId = deepObjectMap.get(id);
                        arrayForId.push(deepObject);
                    });
                }

                // stitch the values in
                if (sourceObjects !== null && sourceObjects !== undefined) {
                    sourceObjects.forEach((source) => {
                        let sourceReferralId = source['id'];
                        source[property.name] = deepObjectMap.get(sourceReferralId);
                    });
                }

                return deepObjects;
            }
            catch (problem) {
                this.error(`deepLoadPropertyOneToMany(${JSON.stringify(property)}) - ${problem}`, problem);
                throw problem;
            }
        }
        else {
            this.debug(`deepLoadPropertyOneToMany - no objects to load, skipping`);
        }

        return [];
    }

    /**
     * deep load an outgoing (many to one) property relationship. stated another way, our source objects each
     * have a single reference to another object.
     * @param sourceObjects - the object that hold the relationship
     */
    private async deepLoadPropertyManyToOne(sourceObjects: any[], property: { name: string, relationship: string, columnName: string, dataType: string }): Promise<any[]> {
        this.debug(`deepLoadPropertyManyToOne(${JSON.stringify(property)})`);
        let idList = this.getIdList(sourceObjects, property.columnName);

        // get the dal and do a find by
        if (idList.length > 0) {
            let dalName = `${property.dataType.replace('[]', '')}Dal`;
            try {
                let dal = await this.moduleRef.resolve(dalName, undefined, { strict: false }) as AbstractDal<any>;
                dal.setUserForRequest(this.userForRequest);
                let deepObjects = await dal.findAllByFilter(`id in (${idList})`, null, null, null, 1, -1);
                let deepObjectMap = new Map();
                if (deepObjects !== null && deepObjects !== undefined) {
                    deepObjects.forEach((deepObject) => {
                        let id = deepObject['id'];
                        deepObjectMap.set(id, deepObject);
                    });
                }

                // stitch the values in
                if (sourceObjects !== null && sourceObjects !== undefined) {
                    sourceObjects.forEach((source) => {
                        let sourceReferralId = source[property.columnName];
                        source[property.name] = deepObjectMap.get(sourceReferralId);
                    });
                }

                return deepObjects;
            }
            catch (problem) {
                this.error(`deepLoadPropertyManyToOne(${JSON.stringify(property)}) - ${problem}`, problem);
                throw problem;
            }
        }

        return [];
    }

    /**
     * get a class mapping and all mappings of class derivations
     * @param classMapping the mapping to get it and derivations of
     * @returns classMapping plus any derivations it has in an array
     */
    private getClassMappingAndDerivations(classMapping: ClassMapping): ClassMapping[] {
        let result = new Array<any>();
        result.push(classMapping);
        Object.keys(Mapping.classes).map((key: string) => {
            let element = Mapping.classes[key] as ClassMapping;
            if (element.parentClass == classMapping.class || element.class == classMapping.parentClass) {
                result.push(element);
                this.debug(`getClassMappingAndDerivations derivation of ${classMapping.class} is ${element.class}`);
            }
        });
        return result;
    }

    /**
     * for a given collection of objects expand one property path
     * @param sourceObjects - the objects that are too have their property expanded by
     * @param propertyPathToExpand - the path to expand
     */
    private async expand(sourceObjects: T[], sourceClassName: string, propertyPathToExpand: string) {
        // does the path exist?
        let steps = propertyPathToExpand.split('.');

        let step = steps[0].trim();
        this.debug(`expand ${propertyPathToExpand} step "${step}"`);
        let sourceSpecificMapping = Mapping.classes[sourceClassName];
        let mappingsToCheck = this.getClassMappingAndDerivations(sourceSpecificMapping);
        let found = false;
        let index = 0;
        let loadedObjects;
        let targetClassName;
        while (index < mappingsToCheck.length && !found) {
            let classMappingToCheck = mappingsToCheck[index];

            if (step in classMappingToCheck.properties) {
                let property = classMappingToCheck.properties[step];
                targetClassName = property.dataType.replace('[]', '');
                if (property.relationship == 'out') {
                    loadedObjects = await this.deepLoadPropertyManyToOne(sourceObjects, property);
                    found = true;
                }
                else if (property.relationship == 'in') {
                    loadedObjects = await this.deepLoadPropertyOneToMany(sourceObjects, property);
                    found = true;
                }
            }

            index++;
        }

        if (!found) {
            this.debug(`expand "${propertyPathToExpand}" step ${step} invalid`);
            throw new Error(`Property path "${propertyPathToExpand}" is invalid for ${sourceSpecificMapping.class}`);
        }

        // next step
        if (steps.length > 1) {
            if (loadedObjects.length > 0) {
                let remainingSteps = propertyPathToExpand.replace(`${step}.`, '');
                this.debug(`expand ${propertyPathToExpand} recurse with  "${remainingSteps}"`);
                await this.expand(loadedObjects, targetClassName, remainingSteps);
            }
            else
                this.debug(`expand ${propertyPathToExpand} no objects loaded, skipping rest of path`);
        }
        else {
            this.debug(`expand ${propertyPathToExpand} no more steps ${steps.length}`);
        }
    }

    /**
     * read from the database all matching rows with raw sql
     * @param sql - the raw sql text to execute
     * @returns all objects that match the specified sql and are in the given page. if there are no matches, the
     * array is empty
     */
    private async findAllByDataRequest(request: DataRequest): Promise<T[]> {
        this.convertRequestToFinalForm(request);
        const result = await this.findAllBySecuredRequest(request);

        // now the expand by's
        if (request.expandBy != null) {
            if (result.length > 0) {
                this.debug(`expanding ${request.expandBy}`);
                await Promise.all(request.expandBy.map(async (oneExpandRaw) => {
                    let oneExpand = oneExpandRaw.trim();
                    await this.log(`findAllByDataRequest expanding ${oneExpand} of ${request.expandBy}`);
                    await this.expand(result, this.classMapping.class, oneExpand);
                }));
            }
            else
                this.debug(`no objects loaded, skipping expand`);
        }

        return result;
    }

    /**
     * read from the database all matching rows with raw sql
     * @param filter - the text of a filter to use to reduce the data that gets returned
     * @param parameters - the parameters that need to be bound into the sql
     * @param expandBy - the list of property path's that should be filled in
     * @param orderBy - the list of properties that should be used to order the results
     * @param page - the page number of the results to return
     * @param pageSize - the number of rows per page
     * @returns all objects that match the specified sql and are in the given page. if there are no matches, the
     * array is empty
     */
    async findAllByFilter(filter: string, parameters: { [key: string]: Object } = null, expandBy: string[] = null, orderBy: string[] = null, page: number = 1, pageSize: number = 100): Promise<T[]> {
        try {
            let request = new DataRequest();
            request.textFilter = filter;
            request.parameters = parameters;
            request.expandBy = expandBy;
            request.orderBy = orderBy;
            request.page = page;
            request.pageSize = pageSize;
            const results = await this.findAllByDataRequest(request);

            return results;
        }
        catch (problem) {
            this.error(`findAllByFilter failed`, problem);
            throw problem;
        }
    }

    /**
     * find all objects that match the given sql text
     * @param sqlText - the sql statement to execute to get the results
     * @param parameters - the parameters that need to be bound into the sql
     * @returns an array containing all objects that match the filter and are in the given page. if there are no
     * matches the array is empty
     */
    async findAllBySQL(sqlText: string, parameters: { [key: string]: Object } = null): Promise<T[]> {
        try {
            let request = new DataRequest();
            request.sqlText = sqlText;
            request.parameters = parameters;
            request.pageSize = 0; // ensure no pagination is added
            let results = this.findAllByDataRequest(request);
            return results;
        }
        catch (problem) {
            this.error(`findAllBySQL failed`, problem);
            throw problem;
        }
    }

    /**
     * find all objects 
     * @param expandBy - the list of property path's that should be filled in
     * @param orderBy - the list of properties that should be used to order the results
     * @param page - the page number of the results to return
     * @param pageSize - the number of rows per page
     * @returns an array containing all objects of the given type with default paging
     */
    async findAll(expandBy: string[] = null, orderBy: string[] = null, page: number = 1, pageSize: number = 100): Promise<T[]> {
        try {
            let results = await this.findAllByFilter(null, null, expandBy, orderBy, page, pageSize);
            return results;
        }
        catch (problem) {
            this.error(`findAll failed`, problem);
            throw problem;
        }
    }

    /**
     * get the one object with the specified id
     * @param id - the identity of the object to retrieve
     * @param expandBy - the list of property path's that should be filled in
     * @returns the results of the query
     */
    async findOneById(id: number | string, expandBy: string[] = null): Promise<T> {
        try {
            let results = await this.findAllByFilter('id = @id', { 'id': id }, expandBy, null, 0, 0);
            if (results.length > 0) {
                this.logger.debug(`findOneById(${JSON.stringify(results[0])})`);
                return results[0];
            }
            return null;
        }
        catch (problem) {
            this.error(`findOneById failed`, problem);
            throw problem;
        }
    }

    /**
     * perform a generic sql query and return the results
     * @param sql the sql to perform
     * @returns the results of the query a generic objects
     */
    async query(sql: string): Promise<any[]> {
        try {
            let request = new DataRequest();
            request.sqlText = sql.replace(/[\t\r\n]/g, ' ').replace(/[ ]{2,}/g, ' ');
            this.logger.log(`query(${request.sqlText})`);
            this.secureRequest(request);
            return await this.findAnyBySecuredRequest(request);
        }
        catch (problem) {
            this.error(`query failed`, problem);
            throw problem;
        }
    }

    /**
     * perform a generic sql query and return the results
     * NOTE: CAUTION no security/access control is applied to this query, use carefully
     * @param sql the sql to perform
     * @returns the results of the query a generic objects
     */
    async queryRaw(sql: string): Promise<any[]> {
        try {
            let request = new DataRequest();
            request.securedSqlText = sql.replace(/[\t\r\n]/g, ' ').replace(/[ ]{2,}/g, ' ');
            return await this.findAnyBySecuredRequest(request);
        }
        catch (problem) {
            this.error(`queryRaw failed`, problem);
            throw problem;
        }
    }

    /**
     * save an object in the database. this will insert or update as needed
     * @param newValue the object, that should be inserted or updated the database
     * @returns a promise of the id of the object
     */
    async save(newValue: T): Promise<number | string> {
        try {
            if (newValue['id'] != null && newValue['id'] != undefined) {
                await this.updatePartial(newValue, newValue['id']);
                return newValue['id'];
            }
            return await this.createPartial(newValue);
        }
        catch (problem) {
            this.error(`save failed`, problem);
            throw problem;
        }
    }

    /**
     * save an object in the database. this will insert or update as needed
     * @param newValue the set of object properties that should be saved in the database
     * @returns a promise of the id of the object
     */
    async savePartial(values: any): Promise<number | string> {
        if (values['id'] != null && values['id'] != undefined) {
            await this.updatePartial(values, values['id']);
            return values['id'];
        }
        return await this.createPartial(values);
    }

    /**
     * create a new object in the database
     * @param newValue the object, that needs to be new (id == null), that should be created in the database
     * @returns a promise of the id of the newly created object
     */
    async create(newValue: T): Promise<number | string> {
        try {
            if (newValue['id'] != null && newValue['id'] != undefined)
                throw new Error(`Trying to insert object in db that already has an id ${newValue['id']}`);
            return this.createPartial(newValue);
        }
        catch (problem) {
            this.error(`create failed`, problem);
            throw problem;
        }
    }

    /**
     * is the specified property a primitive?
     * @param property the property to check
     * @return true if it is a primitive
     */
    isPrimitiveProperty(property: any): boolean {
        if (property == null)
            return false;
        if (property.relationship === 'none')
            return true;
        return false;
    }

    /**
     * get the database know who the current user is for the connection session that is open
     * @param connection - the connection/session that is open
     */
    async indicateCurrentUserToDb(connection: ConnectionPool) {
        let performedByUserId = this.userForRequest == null ? 0 : this.userForRequest.user_id;
        this.debug(`indicateCurrentUserToDb(${performedByUserId}) enter`);
        let sqlText = '';
        try {
            const contextServerRequest = await connection.request();
            let sqlContextText = `exec fs4.set_current_user_id @user_id=${performedByUserId}`;
            this.debug(sqlContextText);
            await contextServerRequest.query(sqlContextText);
        }
        catch (error) {
            this.logger.error(`indicateCurrentUserToDb(${performedByUserId}) - ${error} sql - ${sqlText}`, error);
            throw error;
        }
    }

    /**
     * create a new object in the database
     * @param newValue the set of object properties, that needs to be new (id == null), that should be created in the database
     * @returns a promise of the id of the newly created object
     */
    async createPartial(values: any): Promise<number | string> {
        if (this.derivedConstructor == null)
            this.setEntityType();

        try {
            const connection = await this.connectionPool.connect();
            await this.indicateCurrentUserToDb(connection);
            const serverRequest = await connection.request();

            let columnsText = '';
            let paramText = '';
            let propertiesWritten = [];
            Object.keys(values).forEach((key) => {
                if (key.toUpperCase() != 'ID') {
                    if (!this.propertiesToNotMutate.includes(key)) {
                        let property = this.classMapping.properties[key];
                        this.logger.debug(`saving prop ${JSON.stringify(property)}`);
                        if (property != null && !propertiesWritten.includes(property) && this.isPrimitiveProperty(property)) {
                            let columnName = property.columnName;

                            let parameterName = `param${key}`;
                            if (columnsText != '') {
                                columnsText += ',';
                                paramText += ',';
                            }
                            columnsText += `${columnName}`;
                            paramText += `@${parameterName}`;
                            let parameterValue = values[key];
                            if (typeof parameterValue === 'string')
                                serverRequest.input(parameterName, TYPES.NVarChar, parameterValue);
                            else if (typeof parameterValue === 'boolean')
                                serverRequest.input(parameterName, TYPES.TinyInt, parameterValue);
                            else if (typeof parameterValue === 'number')
                                serverRequest.input(parameterName, TYPES.Numeric, parameterValue);
                            else if (parameterValue instanceof Date)
                                serverRequest.input(parameterName, TYPES.DateTime2, parameterValue);
                            else if (!Array.isArray(parameterValue))
                                serverRequest.input(parameterName, TYPES.NVarChar, parameterValue);
                            propertiesWritten.push(property);
                        }
                    }
                }
            })
            let sqlText = `insert into ${this.getTableName()} (${columnsText}) values (${paramText}); 
            SELECT SCOPE_IDENTITY();`;
            this.logger.debug(`createPartial(${sqlText})`);
            this.log(`createPartial(${JSON.stringify(values)})`);

            let results = await serverRequest.query(sqlText);
            let firstRecordSet = results.recordsets[0];
            let asTable = firstRecordSet.toTable();
            let firstRow = asTable.rows[0];
            let callResult = firstRow[0] as number;

            await connection.close();
            return callResult;
        }
        catch (e) {
            this.error(`createPartial(${JSON.stringify(values)}) - ${e}`, e);
            throw e;
        }
    }

    /**
     * update the given object
     * @param newValue the object to update
     * @returns true if exactly one row was updated
     */
    async update(newValue: T): Promise<boolean> {
        try {
            return this.updatePartial(newValue, newValue['id']);
        }
        catch (problem) {
            this.error(`update failed`, problem);
            throw problem;
        }
    }

    /**
     * update the object specified by id with the value values (key value pairs of properties and new values)
     * @param values the property key value pairs to update
     * @param id the id of the object
     * @returns true if exactly one row was updated
     */
    async updatePartial(values: any, id: number | string): Promise<boolean> {
        if (this.derivedConstructor == null)
            this.setEntityType();
        this.debug(`updatePartial id ${id} values ${JSON.stringify(values)}`);
        if (values == null || Object.keys(values).length == 0) {
            this.debug(`updatePartial id ${id} no values to save, exiting ${JSON.stringify(values)}`);
            return true;
        }

        let sqlText = '';
        try {
            const connection = await this.connectionPool.connect();
            await this.indicateCurrentUserToDb(connection);
            const serverRequest = await connection.request();

            let setText = '';
            let propertiesWritten = [];
            let baseClass = Object.keys(this.classMapping.properties).length == 0;
            Object.keys(values).forEach((key) => {
                //this.debug(`updatePartial examining property ${key}`);
                if (key.toUpperCase() != 'ID') {
                    let property = this.classMapping.properties[key];
                    // TODO: hack - for empty base classes lets assume they are all there. this shoud not be done for create, the callers should
                    // create from the proper derivations
                    if (baseClass) {
                        property = { name: key, columnName: key, length: 0, dataType: null, relationship: 'none' };
                        //this.debug(`updatePartial creating fake property`);
                    }
                    else {
                        //this.debug(`updatePartial not base class`);
                    }

                    if (!this.propertiesToNotMutate.includes(key) && !propertiesWritten.includes(property) && this.isPrimitiveProperty(property)) {
                        let columnName = property == null ? key : property.columnName;
                        //this.debug(`binding key ${key} columnName ${columnName}`);

                        let parameterName = `param${key}`;
                        if (setText != '')
                            setText += ',';
                        setText += `${columnName} = @${parameterName}`;
                        let parameterValue = values[key];
                        if (typeof parameterValue === 'string') {
                            //this.debug(`binding ${parameterName} with string ${parameterValue}`);
                            serverRequest.input(parameterName, TYPES.NVarChar, parameterValue);
                        }
                        else if (typeof parameterValue === 'boolean') {
                            //this.debug(`binding ${parameterName} with tinyint ${parameterValue}`);
                            serverRequest.input(parameterName, TYPES.TinyInt, parameterValue);
                        }
                        else if (typeof parameterValue === 'number') {
                            //this.debug(`binding ${parameterName} with numeric ${parameterValue}`);
                            serverRequest.input(parameterName, TYPES.Numeric, parameterValue);
                        }
                        else if (parameterValue instanceof Date) {
                            //this.debug(`binding ${parameterName} with datetime ${parameterValue}`);
                            serverRequest.input(parameterName, TYPES.DateTime2, parameterValue);
                        }
                        else if (!Array.isArray(parameterValue)) {
                            //this.debug(`binding ${parameterName} with string ${parameterValue}`);
                            serverRequest.input(parameterName, TYPES.NVarChar, parameterValue);
                        }
                        else {
                            this.debug(`not binding ${parameterName} with string ${parameterValue}`);
                        }
                        propertiesWritten.push(property);
                    }
                    else {
                        this.debug(`ignoring property ${key}`);
                    }
                }
            })
            sqlText = `update ${this.getTableName()} set ${setText} where id = ${id}`;

            //this.logger.debug(`updatePartial(${JSON.stringify(values)}`);
            this.debug(`updatePartial(sql=${sqlText}) trying sql`);
            let results = await serverRequest.query(sqlText);
            this.logger.debug(`updatePartial() results=${JSON.stringify(results)}`);
            await connection.close();
            return results.rowsAffected[0] == 1;
        }
        catch (error) {
            this.logger.error(`updatePartial(${JSON.stringify(values)}, ${id}) - ${error} sql - ${sqlText}`, error);
            throw error;
        }
    }

    /**
     * remove one object from the database based on its id
     * @param id - the id of the object to remove
     */
    async removeOneById(id: number | string): Promise<void> {
        if (this.derivedConstructor == null)
            this.setEntityType();
        this.debug(`removeOneById(${id}) enter`);

        let sqlText = '';
        try {
            const connection = await this.connectionPool.connect();
            await this.indicateCurrentUserToDb(connection);
            const serverRequest = await connection.request();
            let sqlText = `delete from ${this.getTableName()} where id=${id};`;
            this.logger.debug(`removeOneById(${id}-${sqlText})`);
            await serverRequest.query(sqlText);
        }
        catch (error) {
            this.logger.error(`removeOneById(${id}) - ${error} sql - ${sqlText}`, error);
            throw error;
        }
    }

    async removeAllByFilter(filter: string): Promise<void> {
        // await delete(id);
    }
}