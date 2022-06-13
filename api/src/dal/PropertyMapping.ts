

/**
 * a class that defines how 1 property in 1 class relates to 1 column in 1 table
 */
export class PropertyMapping {
    name: string;
    relationship: "in" | "out" | "none";
    columnName: string;
    dataType: string
    length: number;
}