import { Injectable, HttpService, Logger, Scope } from '@nestjs/common';
import { AbstractHubspotService } from './AbstractHubspot.service';
import { EmailService } from '../util/Email';
import { SponsorSocialProfileService } from './SponsorSocialProfile.service';
import { SponsorSocialProfile } from '../model/SponsorSocialProfile.entity.generated';
import { UserIdentification } from '../security/UserIdentification';

/**
 * 
 * NOTE: makes use of the hubspot api client at https://www.npmjs.com/package/@hubspot/api-client
 */
@Injectable({ scope: Scope.TRANSIENT })
export class HubspotContactCobrandersService extends AbstractHubspotService {
    private readonly logger = new Logger(HubspotContactCobrandersService.name);

    /**
     * create the new checker
     */
    constructor(readonly inEmailServce: EmailService, private readonly sponsorService: SponsorSocialProfileService, private readonly httpService: HttpService) {
        super(inEmailServce);
    }

    /**
     * set the user that is going to be making use of this service
     */
    setUserForRequest(user: UserIdentification) {
        super.setUserForRequest(user);
        this.sponsorService.setUserForRequest(user);
    }

    /**
     * save the property for the sponsors (cobranded organization)
     * @param properties The properties of the custom property to save
     */
    async saveCobranderProperty(properties: any) {
        try {
            let propertiesText = JSON.stringify(properties);
            this.logger.log(`saveCobranderProperty(${propertiesText})`);

            let httpCall = this.httpService.patch(`https://api.hubapi.com/crm/v3/properties/contacts/cobranded_organizations`, properties,
                {
                    headers: { 'content-type': 'application/json' }
                    , params: { hapikey: this.hapikey }
                });

            const createResponse = await httpCall.toPromise();
            this.logger.log(`saveCobranderProperty finished http call`);
            if (createResponse.status == 200) {
                this.logger.log(`saveCobranderProperty result 200`);
                //await this.projService.updatePartial({hubspot_id: newPipelineResult.body.id}, project.id);
                this.error(`saveCobranderProperty saved with result data (${JSON.stringify(createResponse.data)})`);
            }
            else {
                this.logger.log(`saveCobranderProperty result ${createResponse.status}-${createResponse.statusText}`);
                this.error(`saveCobranderProperty failed to save with result ${createResponse.status}-${createResponse.statusText}`);
            }
        }
        catch (problem2) {
            this.logger.log(`saveCobranderProperty failed with ${problem2}`);
            this.error(`saveCobranderProperty due to ${problem2}`);
        }
    }

    /**
     * create the json object for the sponsor property
     * @param sponsors the sponsors to turn into a property
     * @return a json object with the necessary properties
     */
    createProperty(sponsors: SponsorSocialProfile[]): any {
        let sponsorsJson = [];
        sponsors.forEach((sponsorProfile) => {
            let sponsorPiece = {
                "label": `${sponsorProfile.name} - ${sponsorProfile.id}`
                , "description": sponsorProfile.name
                , "value": sponsorProfile.id
                , "hidden": false
            };
            sponsorsJson.push(sponsorPiece);
        });
        let properties = { "options": sponsorsJson };

        return properties;
    }

    /**
     * go through the sponsors one by one and make sure the data in the cms matches hubspot
     * @returns an array of errors that were encountered
     */
    async checkCobranders(): Promise<Array<string>> {
        this.logger.log(`checkCobranders enter`);
        this.errorsEncountered = new Array<string>();
        try {
            let allSponsors = await this.sponsorService.findAllByFilter('is_deleted = 0', null, null, ['name'], 0, -1);
            let properties = this.createProperty(allSponsors);
            this.logger.log(`saveCobranderProperty(${JSON.stringify(properties)})`);
            await this.saveCobranderProperty(properties);
        }
        catch (error) {
            this.logger.log(`checkCobranders failure ${error}`);
            console.error(error);
        }

        this.logger.log(`checkCobranders exit`);
        return this.errorsEncountered;
    }
}