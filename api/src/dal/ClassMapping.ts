import { PropertyMapping } from "./PropertyMapping";

/**
 * a class that defines how 1 class relates to 1 table in a database
 */
export class ClassMapping {
    /**
     * the name of the class
     */
    class: string;

    /**
     * the name of the database schema the table the class instances are saved in
     */
    schema: string;

    /**
     * the name of the table instances of the class are saved in
     */
    table: string;

    /**
     * the name of the column that is used for ordering queries by default
     */
    defaultOrderBy: string;

    /**
     * the table that the base class has its instances saved in
     */
    parentTable: string;

    /**
     * the class that the mapped class derives from
     */
    parentClass: string;

    /**
     * if the mapped class is dervied, the name of the column that is used to determine which child type a row represents. this is used along
     * with discriminator to determine the type
     */
    discriminator_column: string;

    /**
     * if the mapped class is derived, the value of the discriminator column (discriminator_column) that identifies a row as an instance of this
     */
    discriminator: string;

    /**
     * an indexed array of the mapping of the properties in the mapped class. the index is the name of the property and the value is the mapping
     */
    properties: { [key: string]: PropertyMapping };
}