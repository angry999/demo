import { HttpException, HttpStatus } from "@nestjs/common";
import { Guid } from "../util/Guid";

/**
 * an exception describing a parse error 
 */
export class ParseException extends HttpException {
    constructor(query: string, description: string) {
        super(`Could not understand request. Correlation id:${Guid.newGuid()} Query:${query} Description:${description}`, HttpStatus.BAD_REQUEST);
      }
}