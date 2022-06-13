import { Injectable, Logger, Scope } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';
import { AllUserService } from '../bll/AllUser.service';
import { AdminAccountAvailability } from 'fundscraper-model-enums';
import { UserType } from 'fundscraper-model-enums';
import { AllUser } from '../model/AllUser.entity.generated';
import { UserIdentification } from './UserIdentification';

export const strategyName = 'azure-ad';
const clientID = process.env.oauth_issuer_clientID ? process.env.oauth_issuer_clientID : '0fcc593e-696e-4ef7-ac75-bff3916e1df9';
const tenant = process.env.oauth_tenant ? process.env.oauth_tenant : 'fundscraperdev';
const discovery = ".well-known/openid-configuration";
const version = "v2.0";
const signInPolicyName = process.env.oauth_api_signin_policy ? process.env.oauth_api_signin_policy : 'B2C_1_signin_issuer';

/**
 * Extracts ID token from header and validates it.
 */
@Injectable()
export class AzureADStrategy extends PassportStrategy(BearerStrategy, strategyName,) {
    private readonly logger = new Logger(AzureADStrategy.name);
    private allUserService: AllUserService;
    constructor(private moduleRef: ModuleRef /*private readonly allUserService: AllUserService*/) {
        super({
            //identityMetadata: `https://login.microsoftonline.com/${tenantID}/v2.0/.well-known/openid-configuration`,
            identityMetadata: `https://${tenant}.b2clogin.com/${tenant}.onmicrosoft.com/${signInPolicyName}/${version}/${discovery}`
            , clientID
            ,
        });
    }

    async validate(data) {
        this.logger.debug(`validate=${JSON.stringify(data)}`);
        // NOTE: yes, this would normally be injected but that would make it request scoped and the passport wrapper canno accomodate that. it causes
        // the strategy to not be registered with password
        try {
            if (this.allUserService == null)
                this.allUserService = await this.moduleRef.resolve(AllUserService, undefined, { strict: false });

            //this.logger.log(`validate = "${JSON.stringify(data)}"`);
            let matchingUsers;
            if (data.emails != null && data.emails.length > 0) {
                let email = data.emails[0];
                this.logger.debug(`email = "${email}"`);
                this.allUserService.repository.byPassACLOnNextCall();
                matchingUsers = await this.allUserService.findAllByFilter(`email = @prmEmail and is_deleted = 0 and user_type in ('${UserType.admin_user}', '${UserType.issuer_admin}') and [status] = ${AdminAccountAvailability.active}`, { "prmEmail": email });
                let authenticatedUser = null;
                if (matchingUsers != null && matchingUsers.length > 0) {
                    for (var i = 0; i < matchingUsers.length; i++) {
                        if (matchingUsers[i]['user_type'] == UserType.issuer_admin) {
                            authenticatedUser = matchingUsers[i] as AllUser;
                        } else if (authenticatedUser == null && matchingUsers[i]['user_type'] == UserType.admin_user) {
                            authenticatedUser = matchingUsers[i] as AllUser;
                        }
                    }
                }
                if (authenticatedUser != null) {
                    let user = new UserIdentification(authenticatedUser['id'], authenticatedUser['user_type']);
                    this.logger.debug(`user = "${JSON.stringify(user)}"`);

                    return user;
                }
                this.logger.debug(`no accounts with email = "${email}"`);
            }
            else
                this.logger.debug(`no email with user`);
            return new UserIdentification(0, UserType.invalid);
        }
        catch (problem) {
            this.logger.error(`failed to validate AzureAD token`, problem.stack);
        }
        return false;
    }
}
export const AzureADGuard = AuthGuard('azure-ad');