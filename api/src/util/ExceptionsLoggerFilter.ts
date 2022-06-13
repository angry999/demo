import { Catch, ArgumentsHost, Logger, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

/**
 * exception filter for deailing with exceptions
 */
@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
    async catch(exception: unknown, host: ArgumentsHost) {
        
        if (exception instanceof HttpException) {
            const ctx = host.switchToHttp();
            const request = ctx.getRequest();
            let path = (request.route == null) ? 'NestApplication' : request.route.path;
            let logger = new Logger(path);
            await logger.error(`(${JSON.stringify(request.query)}) - ${exception}`, exception.stack);
        }        

        super.catch(exception, host);
    }
}