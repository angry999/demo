import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor() { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        let className = context.getClass().name;
        let methodName = context.getHandler().name;
        let logger = new Logger(className);
        let httpContext = context.switchToHttp();
        let request = httpContext.getRequest();

        logger.log(`${methodName}(${JSON.stringify(request.query)})`);

        return next.handle();
    }
}