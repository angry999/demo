import { Injectable, Scope } from '@nestjs/common';
import { UserIdentification } from '../security/UserIdentification';
import { AbstractDal } from '../dal/AbstractDal';

/**
 * A service to support the operations on instances of AdminLog
 * NOTE: the base of these services essentially proxy dal methods
 */
@Injectable({ scope: Scope.TRANSIENT })
export abstract class AbstractService<T>
{
    constructor(public readonly repository: AbstractDal<T>) {
    }

    /**
     * set the user that is going to be making use of this service
     */
    setUserForRequest(user: UserIdentification) {
        this.repository.setUserForRequest(user);
    }

    /**
     * get all instances of the object
     * @param expandBy - the list of property path's that should be filled in
     * @param orderBy - the list of properties that should be used to order the results
     * @param page - the page number of the results to return
     * @param pageSize - the number of rows per page
     * @returns all instances of the object
     */
    async findAll(expandBy: string[] = null, orderBy: string[] = null, page: number = 1, pageSize: number = 100): Promise<T[]> {
        return this.repository.findAll(expandBy, orderBy, page, pageSize);
    }

    /**
     * find all objects based on the specified odata filter
     * @param filter - the odata filter that specifies the criteria that the object must match to be returned
     * @param parameters - the parameters that need to be bound into the sql
     * @param expandBy - the list of property path's that should be filled in
     * @param orderBy - the list of properties that should be used to order the results
     * @param page - the page number of the results to return
     * @param pageSize - the number of rows per page
     * @returns all objects that match what is specified in the filter
     */
    async findAllByFilter(filter: string, parameters?: { [key: string]: Object }, expandBy?: string[], orderBy?: string[], page?: number, pageSize?: number): Promise<T[]> {
        return await this.repository.findAllByFilter(filter, parameters, expandBy, orderBy, page, pageSize);
    }

    /**
     * find all objects based on the specified sql query
     * @param sql - the sql that specifies the query to use to find objects
     * @returns all objects that match what is specified in the query
     */
    async findAllBySQL(sql: string): Promise<T[]> {
        return await this.repository.findAllBySQL(sql);
    }

    /**
     * get the one object that has the specified id
     * @paramm id - the id of the object to get
     * @param expandBy - the list of property path's that should be filled in
     * @returns the object with the specified id, if no such object exists null will be returned
     */
    async findOneById(id: number | string, expandBy: string[] = null): Promise<T> {
        return await this.repository.findOneById(id, expandBy);
    }

    /**
     * perform a generic sql query and return the results
     * @param sql the sql to perform
     * @returns the results of the query a generic objects
     */
    async query(sql: string): Promise<any[]> {
        return await this.repository.query(sql);
    }

    /**
     * save an instance in the database of a given object (insert or update)
     * @param newValue - the object to save to the database
     * @returns the id of the object
     */
    async save(newValue: T): Promise<number | string> {
        const result = await this.repository.save(newValue);
        return result;
    }

    /**
     * save a set of properties to the database as an object. if an id is present, it is assumed to identify the
     * object to update otherwise it is assumed a new object must be created.
     * @param newValue - the properties and values to use in the object
     * @returns the id of the object
     */
    async savePartial(newValue: any): Promise<number | string> {
        const result = await this.repository.savePartial(newValue);
        return result;
    }

    /**
     * create a new instance in the database of a given object (insert)
     * @param newValue - the object to add to the database
     * @returns the id of the created object
     */
    async create(newValue: T): Promise<T> {
        const resultId = await this.repository.create(newValue);
        return await this.findOneById(resultId);
    }

    /**
     * create a new instance in the database of a given object (insert) with the specified properties
     * @param newValue - the properties and values to use in the new object
     * @returns the id of the created object
     */
    async createPartial(newValue: any): Promise<number | string> {
        const result = await this.repository.create(newValue);
        return result;
    }

    /**
     * update the specified object, push the values in 'newValue' to the database
     * @param newValue - the new version of the given object to save
     */
    async update(newValue: T): Promise<void> {
        await this.repository.update(newValue);
    }

    /**
     * update the given set of properties for the object with the specified id
     * @param newValue - the properties along with values to upate them to
     * @param id - the id of the object to update
     */
    async updatePartial(newValue: any, id: number | string): Promise<void> {
        await this.repository.updatePartial(newValue, id);
    }

    /**
     * remove all of the objects that match the specified filter
     * @param filter - the filter that specifies which objects must match
     */
    async removeAllByFilter(filter: string): Promise<void> {
        await this.repository.removeAllByFilter(filter);
    }

    /**
     * remove a single object with the specified id
     * @param id - the id of the object to remove
     */
    async removeOneById(id: number | string): Promise<void> {
        await this.repository.removeOneById(id);
    }
}
