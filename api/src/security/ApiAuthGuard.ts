
import { Injectable, CanActivate, ExecutionContext, Logger, Inject, Scope } from '@nestjs/common';
import { AccessTokenAuthGuard } from './AccessTokenAuthGuard';
import { AzureADAuthGuard } from './AzureADAuthGuard';

/**
 * a guard for working with different forms of authentication
 */
@Injectable({ scope: Scope.TRANSIENT })
export class ApiAuthGuard implements CanActivate {
    private readonly logger = new Logger(ApiAuthGuard.name);
    //private adGuard = new AzureADGuard();
    constructor(private readonly accessTokenGuard: AccessTokenAuthGuard) {
    }

    /**
     * get the current request invoke the given context?
     * @param context the execution context to validate
     */
    async canActivate(context: ExecutionContext,): Promise<boolean> {
        let httpContext = context.switchToHttp();
        let request = httpContext.getRequest();
        this.logger.debug(`checking request = ${request.url}`);
        try {
            let adGuard = new AzureADAuthGuard();
            this.logger.debug(`trying azuread canActivate`);
            if (await adGuard.canActivate(context)) {
                return true;
            }
        }
        catch (problem) {
            this.logger.debug(`AzureAD access check failed ${problem}`);
        }
        try {
            if (await this.accessTokenGuard.canActivate(context)) {
                return true;
            }
        }
        catch (problem) {
            this.logger.error(`failed to check access token access`, problem.stack);
        }
        return false;
    }
}
