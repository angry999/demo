
import { Injectable, CanActivate, ExecutionContext, Logger, Inject, Scope } from '@nestjs/common';
import { AdminAccountAvailability } from 'fundscraper-model-enums';
import { UserType } from 'fundscraper-model-enums';
import { AllUser } from '../model/AllUser.entity.generated';
import { AllUserService } from '../bll/AllUser.service';
import { UserIdentification } from './UserIdentification';

/**
 * a guard for working with access token passed in on the query to ensure authetication
 */
@Injectable({ scope: Scope.TRANSIENT })
export class AccessTokenAuthGuard implements CanActivate {
    private readonly logger = new Logger(AccessTokenAuthGuard.name);
    constructor(private readonly allUserService: AllUserService) {
    }

    /**
     * get the current request invoke the given context?
     * @param context the execution context to validate
     */
    async canActivate(context: ExecutionContext,): Promise<boolean> {
        //this.logger.debug(`canActivate`);
        let httpContext = context.switchToHttp();
        let request = httpContext.getRequest();
        let user;

        this.logger.debug(`checking request = ${JSON.stringify(request.query)}`);
        let token = (request.query.access_token != null) ? request.query.access_token : request.headers.authorization;
        // request.headers.authorization
        if (token != null) {
            this.logger.debug(`auth = ${token}`);
            // user the status field as well....
            this.allUserService.repository.byPassACLOnNextCall();
            let mathingUsers = await this.allUserService.findAllByFilter(`token = @prmToken and is_deleted = 0 and user_type in ('${UserType.admin_user}', '${UserType.issuer_admin}') and [status] = ${AdminAccountAvailability.active}`, { "prmToken": token });
            if (mathingUsers != null && mathingUsers.length > 0) {
                let authenticatedUser = mathingUsers[0] as AllUser;
                this.logger.debug(`auth = found user ${JSON.stringify(authenticatedUser)}`);
                user = new UserIdentification(authenticatedUser['id'], authenticatedUser['user_type']);
                this.logger.debug(`setting request user ${JSON.stringify(user)}`);
                request["user"] = user;

                return true;
            }
            else {
                this.logger.debug(`no user found`);
            }
        }
        else {
            this.logger.debug(`no token found`);
        }

        user = new UserIdentification(0, UserType.invalid);
        this.logger.debug(`setting request user ${JSON.stringify(user)}`);
        request["user"] = user;

        return false;
    }
}
