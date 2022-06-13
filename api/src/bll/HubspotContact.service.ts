import { Injectable, HttpService, Logger, Scope } from '@nestjs/common';
import * as hubspot from '@hubspot/api-client';
import { Investor } from '../model/Investor.entity.generated';
import { InvestorService } from './Investor.service';
import { AbstractHubspotService } from './AbstractHubspot.service';
var md5 = require("nodejs-md5");
import { decode } from 'html-entities';
import { EmailService } from '../util/Email';
import { Province } from '../model/Province.entity.generated';
import { ProvinceService } from './Province.service';
import { UserIdentification } from '../security/UserIdentification';

/**
 * 
 * NOTE: makes use of the hubspot api client at https://www.npmjs.com/package/@hubspot/api-client
 */
@Injectable({ scope: Scope.TRANSIENT })
export class HubspotContactService extends AbstractHubspotService {
    private readonly logger = new Logger(HubspotContactService.name);

    /**
     * all provinces that contacts could be in
     */
    private provinces: Province[];

    /**
     * create the new checker
     */
    constructor(readonly inEmailServce: EmailService, private readonly investorService: InvestorService, private readonly provinceService: ProvinceService, private readonly httpService: HttpService) {
        super(inEmailServce);
    }

    /**
     * set the user that is going to be making use of this service
     */
    setUserForRequest(user: UserIdentification) {
        super.setUserForRequest(user);
        this.investorService.setUserForRequest(user);
        this.provinceService.setUserForRequest(user);
    }

    /**
     * ensure that we have all provinces loaded
     */
    async ensureProvinces() {
        if (this.provinces == null || this.provinces == undefined) {
            this.provinces = await this.provinceService.findAll();
        }
    }

    /**
     * get the name of a province from its id
     * @param provinceId the id of the province
     * @returns the name of the province
     */
    provinceNameFromId(provinceId: number): string {
        for (let index = 0; index < this.provinces.length; index++) {
            let province = this.provinces[index];
            //this.logger.debug(`provinceNameFromId(${provinceId}) compare ${JSON.stringify(province)}`);
            if (province.id == provinceId)
                return province.name;
        }
        return null;
    }

    /**
     * try to update the specified property values in a contact
     * @param dealId The hubspot id of the deal
     * @param modifiedProperties the set of properties and their new value to assign into the orders deal
     */
    async updateContact(contactId: string, modifiedProperties: any) {
        try {
            let objectUpdate = { 'properties': modifiedProperties };
            let propertiesText = JSON.stringify(objectUpdate);

            let updateUrl = `https://api.hubapi.com/contacts/v1/contact/vid/${contactId}/profile`;
            this.logger.debug(`updateContact(${contactId}) attempting updating at ${updateUrl} with ${propertiesText}`);
            let httpCall = this.httpService.post(updateUrl, objectUpdate,
                {
                    headers: { 'content-type': 'application/json' }
                    , params: { hapikey: this.hapikey }
                });

            const updateResponse = await httpCall.toPromise();
            this.logger.debug(`updateContact(${contactId}) update response = ${updateResponse.status}:${updateResponse.statusText}` /* :${JSON.stringify(updateResponse.data)} */);
        }
        catch (problem2) {
            this.exception(`updateContact(${contactId}) could not update due to ${problem2}`);
            this.logger.error(`updateContact( ${contactId}) could not update due to ${problem2}`);
        }
    }

    /**
     * try to save the specified property values in the contact for the investor. if the investor does not have a related
     * contact yet, create a new one
     * @param investor The investor that the contact is for
     * @param modifiedProperties the set of properties and their new value to assign into the investors contact
     */
    async createContact(investor: Investor, modifiedProperties: any) {
        try {
            let objectUpdate = { 'properties': modifiedProperties };
            let propertiesText = JSON.stringify(objectUpdate);

            // create new url: https://api.hubapi.com/contacts/v1/contact
            // update url: https://api.hubapi.com/contacts/v1/contact/vid/${investor.hubspot_vid}/profile
            let updateUrl = `https://api.hubapi.com/contacts/v1/contact`;
            //modifiedProperties['email'] = investor.email;

            this.logger.log(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) attempting creation with ${propertiesText} at url ${updateUrl}`);

            const httpCall = this.httpService.post(updateUrl, objectUpdate,
                {
                    headers: { 'content-type': 'application/json' }
                    , params: { hapikey: this.hapikey }
                });
            const updateResponse = await httpCall.toPromise();
            this.logger.log(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) created ${investor.hubspot_vid} response = ${updateResponse.status}:${updateResponse.statusText} ${JSON.stringify(updateResponse.data)}`);
            this.investorService.updatePartial({ 'hubspot_vid': updateResponse.data.vid }, investor.id);
        }
        catch (problem2) {
            this.exception(`createContact(${investor.client_number}) could not create due to ${problem2}`);
            this.logger.error(`createContact(${investor.client_number}) could not create due to ${problem2}`);
        }
    }

    /**
     * try to save the specified property values in the contact. if the investor does not have a related
     * contact yet, create a new one
     * @param investor The investor that the contact is for
     * @param modifiedProperties the set of properties and their new value to assign into the contact
     */
    async saveContact(investor: Investor, modifiedProperties: any) {
        //this.logger.debug(`saveContact enter(${investor.id})`);
        if (investor.hubspot_vid == null)
            this.createContact(investor, modifiedProperties);
        else
            this.updateContact(investor.hubspot_vid, modifiedProperties);
        //this.logger.debug(`saveContact exit(${investor.id})`);
    }

    /**
     * compare the values for a given investor to the related contact. if there are any differences update the contact
     * to match the investor
     * @param investorId the id of the investor that is supposed to be synched with the contact
     * @returns a list of problems encountered
     */
    async syncInvestorById(investorId: number): Promise<Array<string>> {
        try {
            this.emailCount = 0;
            this.errorsEncountered = new Array<string>();
            let investor = await this.investorService.findOneById(investorId, ['financial_kyc', 'province']);
            if (investor == null) {
                this.logger.error(`syncInvestorById(${investorId}) could not find investor`);
            }
            else {
                await this.ensureProvinces();
                await this.checkInvestorBasicProperties(investor);
            }
            return this.errorsEncountered;
        }
        catch (problem) {
            this.exception(`syncInvestorById(${investorId}) could not create due to ${problem}`);
            this.logger.error(`syncInvestorById(${investorId}) could not create due to ${problem}`);
        }
    }

    /**
     * compare the core values for a given investor to the related contact. if there are any differences update the contact
     * to match the investor
     * @param investor the investor that is supposed to be synched with the contact
     * @param contact the contact in hubspot that is supposed to match the investor
     * @param modifiedProperties the properties in the contact that need to be modified along with the new values
     */
    async syncContactCoreProperties(investor: Investor, contact: hubspot.contactsModels.SimplePublicObject = null, modifiedProperties: any) {
        //this.logger.log(`syncContactCoreProperties ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) enter`);
        let contactUserId = (contact == null) ? null : contact.properties['user_id'];
        if (('' + investor.id) != contactUserId) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) user_id mismatch ${investor.id}-${contactUserId}`);
            modifiedProperties.push({ 'property': 'user_id', 'value': investor.id });
        }

        let contactEmail = (contact == null) ? null : contact.properties['email'];
        if (!this.emailsEqual(investor.email, contactEmail)) {
            // you can't just update email addresses, it takes a bit more work than that
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last email mismatch ${investor.email}-${contactEmail}`);

            // only try to set it when the contact is new
            //console.log(JSON.stringify(contact));
            if (contact == null || contact.id == null)
                modifiedProperties.push({ 'property': 'email', 'value': decode(investor.email) });
        }

        let contactAppUser = (contact == null) ? null : contact.properties['app_user'];
        if (!contactAppUser) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) app_user mismatch Yes-${contactAppUser}`);
            modifiedProperties.push({ 'property': 'app_user', 'value': 'true' });
        }

        let contactFirstName = (contact == null) ? null : contact.properties['firstname'];
        if (!this.stringsEqual(decode(investor.first_name), contactFirstName)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) first name mismatch ${investor.first_name}-${contactFirstName}`);
            modifiedProperties.push({ 'property': 'firstname', 'value': decode(investor.first_name) });
        }

        let contactLastName = (contact == null) ? null : contact.properties['lastname'];
        if (!this.stringsEqual(decode(investor.last_name), contactLastName)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last name mismatch ${investor.last_name}-${contactLastName}`);
            modifiedProperties.push({ 'property': 'lastname', 'value': decode(investor.last_name) });
        }

        let md5Id = '';
        md5.string.quiet('' + investor.id, function (err, md5) { md5Id = md5; });
        let cms_link = `https://cms.fundscraper.com/user-profiles?ViewUser&id=${md5Id}&tag=profile&tab=overview`;
        let contactLink = (contact == null) ? null : contact.properties['cms_link'];
        if (!this.stringsEqual(cms_link, contactLink)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) cms_profile name mismatch ${cms_link}-${contactLink}`);
            modifiedProperties.push({ 'property': 'cms_link', 'value': cms_link });
        }

        let contactPhone = (contact == null) ? null : contact.properties['phone'];
        if (!this.phonesEqual(investor.phone, contactPhone)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last telephone mismatch ${investor.phone}-${contactPhone}`);
            let adjustedPhone = (investor.phone == null) ? '' : investor.phone.replace(/(-| |(|))/g, '');
            modifiedProperties.push({ 'property': 'phone', 'value': adjustedPhone });
        }

        let contactAddress = (contact == null) ? null : contact.properties['address'];
        if (!this.stringsEqual(decode(investor.address), contactAddress)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last address mismatch ${investor.address}-${contactAddress}`);
            modifiedProperties.push({ 'property': 'address', 'value': decode(investor.address) });
        }

        let contactCity = (contact == null) ? null : contact.properties['city'];
        if (!this.stringsEqual(decode(investor.city), contactCity)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last city mismatch ${investor.city}-${contactCity}`);
            modifiedProperties.push({ 'property': 'city', 'value': decode(investor.city) });
        }

        let curProvName = (investor.province == null) ? '' : investor.province.name;
        let contactProvince = (contact == null) ? null : contact.properties['province'];
        if (!this.stringsEqual(decode(curProvName), contactProvince)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last province mismatch ${curProvName}-${contactProvince}`);
            modifiedProperties.push({ 'property': 'province', 'value': decode(curProvName) });
        }

        let contactState = (contact == null) ? null : contact.properties['state'];
        let investorProvince = this.provinceNameFromId(investor.province_id);
        if (!this.stringsEqual(decode(investorProvince), contactState)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last state mismatch ${investorProvince}-${contactState}`);
            modifiedProperties.push({ 'property': 'state', 'value': decode(investorProvince) });
        }

        let contactZip = (contact == null) ? null : contact.properties['zip'];
        if (!this.stringsEqual(investor.zip, contactZip)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last zip mismatch ${investor.zip}-${contactZip}`);
            modifiedProperties.push({ 'property': 'zip', 'value': investor.zip });
        }

        let kyc_confirmed = (contact == null) ? false : contact.properties['kyc_confirmed'] == 'true';
        if (investor.kyc_confirmed != kyc_confirmed) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last kyc_confirmed mismatch ${investor.kyc_confirmed}-${contact.properties['kyc_confirmed']}`);
            modifiedProperties.push({ 'property': 'kyc_confirmed', 'value': (investor.kyc_confirmed) ? 'true' : 'false' });
        }

        if (investor.signup_date != null) {
            investor.signup_date.setUTCHours(0, 0, 0, 0);
            let signupAsString = investor.signup_date.toISOString().substr(0, 10);
            let contactSignup = (contact == null) ? null : contact.properties['signup_date'];
            if (signupAsString != contactSignup) {
                this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last signup date mismatch ${signupAsString}-${contactSignup}`);
                let signupTimestamp = '' + investor.signup_date.getTime();
                modifiedProperties.push({ 'property': 'signup_date', 'value': signupTimestamp });
            }
        }

        let contactAccreditation = (contact == null) ? null : parseInt(contact.properties['investor_type']);
        if (investor.actual_investment_level != null &&
            investor.actual_investment_level.valueOf() != contactAccreditation) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last investor_type mismatch ${investor.actual_investment_level.valueOf()}-${contactAccreditation}`);
            modifiedProperties.push({ 'property': 'investor_type', 'value': '' + investor.actual_investment_level.valueOf() });
        }

        let contactStatus = (contact == null) ? null : parseInt(contact.properties['user_status']);
        if (investor.status != null &&
            investor.status.valueOf() != contactStatus
        ) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last status mismatch ${investor.status.valueOf()}-${contactStatus}`);
            modifiedProperties.push({ 'property': 'user_status', 'value': '' + investor.status.valueOf() });
        }

        let investor_cobranded = investor.cobranded_client_of_id != null;
        let contactCobranded = (contact == null) ? null : contact.properties['co_branded'] == 'true';
        if (investor_cobranded != contactCobranded) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last co_branded mismatch ${investor_cobranded}-${contactCobranded}`);
            modifiedProperties.push({ 'property': 'co_branded', 'value': investor_cobranded });
        }

        // cobranded_client_of =  single line of text with the name of the primary cobrander
        let cobrandersResults = await this.investorService.query(`select * from [fs4].[investor_cobrandings] where user_id = ${investor.id}`);
        let cobranderDetails = (cobrandersResults == null) ? null : cobrandersResults[0];

        let contactPrimaryCobrander = (contact == null) ? null : contact.properties['cobranded_client_of'];
        if (!this.stringsEqual(cobranderDetails.primary_cobrander_name, contactPrimaryCobrander)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last cobranded_client_of mismatch ${cobranderDetails.primary_cobrander_name}-${contactPrimaryCobrander}`);
            modifiedProperties.push({ 'property': 'cobranded_client_of', 'value': cobranderDetails.primary_cobrander_name });
        }

        // cobranded_organizations = multiple checks for each org that this contact is cobranded to
        let contactCobranders = (contact == null) ? null : contact.properties['cobranded_organizations'];
        if (!this.stringsEqual(cobranderDetails.cobrander_ids, contactCobranders)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last contactCobranders mismatch ${cobranderDetails.cobrander_ids}-${contactCobranders}`);
            modifiedProperties.push({ 'property': 'cobranded_organizations', 'value': cobranderDetails.cobrander_ids });
        }

        //this.logger.log(`syncContactCoreProperties ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) exit`);
    }

    /**
     * compare the signup state values for a given investor to the related contact. if there are any differences update the contact
     * to match the investor
     * @param investor the investor that is supposed to be synched with the contact
     * @param contact the contact in hubspot that is supposed to match the investor
     * @param modifiedProperties the properties in the contact that need to be modified along with the new values
     */
    async syncContactSignupsEvents(investor: Investor, contact: hubspot.contactsModels.SimplePublicObject = null, modifiedProperties: any) {
        //this.logger.log(`syncContactSignupsEvents ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) enter`);
        let additionalDetailResults = await this.investorService.query(`select * from fs4.user_signup_events as us where us.user_id=${investor.id}`);
        let additionalDetails = (additionalDetailResults == null) ? null : additionalDetailResults[0];

        let basic_info = additionalDetails['basic_info'];
        let basicInfoAsString = null;
        let basicInfoAsTimestamp = 0;
        let contactProfileCompletion = (contact == null) ? null : contact.properties['profile_completed_date'];
        if (basic_info == null) {
            basicInfoAsString = '1970-01-01';
            basicInfoAsTimestamp = 0;
        }
        else {
            basic_info.setUTCHours(0, 0, 0, 0);
            basicInfoAsString = basic_info.toISOString().substr(0, 10);
            basicInfoAsTimestamp = basic_info.getTime();
        }
        if (basicInfoAsString != contactProfileCompletion) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) mismatch Profile_Completed_Date ${basicInfoAsString} != ${contactProfileCompletion}`);
            modifiedProperties.push({ 'property': 'profile_completed_date', 'value': basicInfoAsTimestamp });
        }

        let kyc_done = additionalDetails['kyc_done'];
        let kycDoneAsString = null;
        let kycDoneAsTimestamp = 0;
        let contactKycDone = (contact == null) ? null : contact.properties['full_kyc_completed_date'];
        if (kyc_done == null) {
            kycDoneAsString = '1970-01-01';
            kycDoneAsTimestamp = 0;
        }
        else {
            kyc_done.setUTCHours(0, 0, 0, 0);
            kycDoneAsString = kyc_done.toISOString().substr(0, 10);
            kycDoneAsTimestamp = kyc_done.getTime();
        }
        if (kycDoneAsString != contactKycDone) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) mismatch Full_KYC_Completed_Date ${kycDoneAsString} != ${contactKycDone}`);
            modifiedProperties.push({ 'property': 'full_kyc_completed_date', 'value': kycDoneAsTimestamp });
        }

        let retrn_pref = additionalDetails['retrn_pref'];
        let retrnPrefAsString = null;
        let retrnPrefAsTimestamp = 0;
        let contactReturnPrefs = (contact == null) ? null : contact.properties['return_preferences_completed'];
        if (retrn_pref == null) {
            retrnPrefAsString = '1970-01-01';
            retrnPrefAsTimestamp = 0;
        }
        else {
            retrn_pref.setUTCHours(0, 0, 0, 0);
            retrnPrefAsString = retrn_pref.toISOString().substr(0, 10);
            retrnPrefAsTimestamp = retrn_pref.getTime();
        }
        if (retrnPrefAsString != contactReturnPrefs) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) mismatch Return_preferences_completed ${retrnPrefAsString} != ${contactReturnPrefs}`);
            modifiedProperties.push({ 'property': 'return_preferences_completed', 'value': retrnPrefAsTimestamp });
        }

        let time_hrzn = additionalDetails['time_hrzn'];
        let timeHrznAsString = null;
        let timeHrznAsTimestamp = 0;
        let contactTimeHorizon = (contact == null) ? null : contact.properties['time_horizon_completed'];
        if (time_hrzn == null) {
            timeHrznAsString = '1970-01-01';
            timeHrznAsTimestamp = 0;
        }
        else {
            time_hrzn.setUTCHours(0, 0, 0, 0);
            timeHrznAsString = time_hrzn.toISOString().substr(0, 10);
            timeHrznAsTimestamp = time_hrzn.getTime();
        }
        if (timeHrznAsString != contactTimeHorizon) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) mismatch Time_horizon_completed ${timeHrznAsString} != ${contactTimeHorizon}`);
            modifiedProperties.push({ 'property': 'time_horizon_completed', 'value': timeHrznAsTimestamp });
        }

        let risk_toler = additionalDetails['risk_toler'];
        let riskTolerAsString = null;
        let riskTolerAsTimestamp = 0;
        let contactRiskTolerance = (contact == null) ? null : contact.properties['risk_tolerances_completed'];
        if (risk_toler == null) {
            riskTolerAsString = '1970-01-01';
            riskTolerAsTimestamp = 0;
        }
        else {
            risk_toler.setUTCHours(0, 0, 0, 0);
            riskTolerAsString = risk_toler.toISOString().substr(0, 10);
            riskTolerAsTimestamp = risk_toler.getTime();
        }
        if (riskTolerAsString != contactRiskTolerance) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) mismatch Risk_tolerances_completed ${riskTolerAsString} != ${contactRiskTolerance}`);
            modifiedProperties.push({ 'property': 'risk_tolerances_completed', 'value': riskTolerAsTimestamp });
        }
        //this.logger.log(`syncContactSignupsEvents ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) exit`);
    }

    /**
     * compare the kyc values for a given investor to the related contact. if there are any differences update the contact
     * to match the investor
     * @param investor the investor that is supposed to be synched with the contact
     * @param contact the contact in hubspot that is supposed to match the investor
     * @param modifiedProperties the properties in the contact that need to be modified along with the new values
     */
    async syncContactKycProperties(investor: Investor, contact: hubspot.contactsModels.SimplePublicObject = null, modifiedProperties: any) {

        //this.logger.log(`syncContactKycProperties ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) enter`);
        if (investor.financial_kyc == null || investor.financial_kyc.length == 0)
            return;
        let kyc = investor.financial_kyc[0];

        let employment_status = (contact == null) ? null : contact.properties['employment_status'];
        if (!this.stringsEqual(kyc.employment_status, employment_status)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last employment_status mismatch ${kyc.employment_status}-${employment_status}`);
            modifiedProperties.push({ 'property': 'employment_status', 'value': '' + kyc.employment_status });
        }

        let employer = (contact == null) ? null : contact.properties['employer'];

        if (!this.stringsEqual(kyc.employer, employer)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last employer mismatch ${kyc.employer}-${employer}`);
            modifiedProperties.push({ 'property': 'employer', 'value': '' + kyc.employer });
        }

        let industry = (contact == null) ? null : contact.properties['kyc_industry'];
        if (!this.stringsEqual(kyc.industry, industry)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last industry mismatch ${kyc.industry}-${industry}`);
            modifiedProperties.push({ 'property': 'kyc_industry', 'value': '' + kyc.industry });
        }

        let position = (contact == null) ? null : contact.properties['position'];
        if (!this.stringsEqual(kyc.position, position)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last position mismatch ${kyc.position}-${position}`);
            modifiedProperties.push({ 'property': 'position', 'value': '' + kyc.position });
        }

        let years = (contact == null) ? null : contact.properties['years_at_employer'];
        if (!this.stringsEqual(kyc.years, years)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last years mismatch ${kyc.years}-${years}`);
            modifiedProperties.push({ 'property': 'years_at_employer', 'value': kyc.years });
        }

        let income_includes_partner = (contact == null) ? null : contact.properties['income_includes_partner'] == 'true';
        let investor_includes = kyc.income_includes_partner == 'Combined with spouse';
        if (investor_includes != null &&
            investor_includes != income_includes_partner) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last income_includes_partner mismatch ${investor_includes}-${income_includes_partner}`);
            modifiedProperties.push({ 'property': 'income_includes_partner', 'value': investor_includes });
        }

        let year_entered = (contact == null) ? null : parseFloat(contact.properties['year_income_entered']);
        if (!this.numbersEqual(kyc.year_entered, year_entered)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last year_entered mismatch ${kyc.year_entered}-${year_entered}`);
            modifiedProperties.push({ 'property': 'year_income_entered', 'value': '' + kyc.year_entered });
        }

        let income_curr_new = (contact == null) ? null : parseFloat(contact.properties['income_year_0']);
        if (!this.numbersEqual(kyc.income_curr_new, income_curr_new)) {
            let actual1;
            let actual2;
            if (kyc.income_curr_new == null || Number.isNaN(kyc.income_curr_new))
                actual1 = 0;
            else if (typeof kyc.income_curr_new === 'string')
                actual1 = parseFloat(kyc.income_curr_new);
            else
                actual1 = kyc.income_curr_new;

            if (income_curr_new == null || Number.isNaN(income_curr_new))
                actual2 = 0;
            else if (typeof income_curr_new === 'string')
                actual2 = parseFloat(income_curr_new);
            else
                actual2 = income_curr_new;
            //this.error(`income_curr_new actual1 = ${actual1}, actual2 = ${actual2}`);
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last income_curr_new mismatch ${kyc.income_curr_new}-${income_curr_new}`);
            modifiedProperties.push({ 'property': 'income_year_0', 'value': '' + kyc.income_curr_new });
        }

        let income_curr1_new = (contact == null) ? null : parseFloat(contact.properties['income_year_1']);
        if (!this.numbersEqual(kyc.income_curr1_new, income_curr1_new)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last income_curr1_new mismatch ${kyc.income_curr1_new}-${income_curr1_new}`);
            modifiedProperties.push({ 'property': 'income_year_1', 'value': '' + kyc.income_curr1_new });
        }

        let income_curr2_new = (contact == null) ? null : parseFloat(contact.properties['income_year_2']);
        if (!this.numbersEqual(kyc.income_curr2_new, income_curr2_new)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last income_curr2_new mismatch ${kyc.income_curr2_new}-${income_curr2_new}`);
            modifiedProperties.push({ 'property': 'income_year_2', 'value': '' + kyc.income_curr2_new });
        }

        let income_net_new = (contact == null) ? null : parseFloat(contact.properties['net_financial_assets']);
        if (!this.numbersEqual(kyc.income_net_new, income_net_new)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last income_net_new mismatch ${kyc.income_net_new}-${income_net_new}`);
            modifiedProperties.push({ 'property': 'net_financial_assets', 'value': '' + kyc.income_net_new });
        }

        let assets_net_new = (contact == null) ? null : parseFloat(contact.properties['net_assets']);
        if (!this.numbersEqual(kyc.assets_net_new, assets_net_new)) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) last assets_net_new mismatch ${kyc.assets_net_new}-${assets_net_new}`);
            modifiedProperties.push({ 'property': 'net_assets', 'value': '' + kyc.assets_net_new });
        }
        //this.logger.log(`syncContactKycProperties ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) exit`);
    }

    /**
     * compare the values for a given investor to the related contact. if there are any differences update the contact
     * to match the investor
     * @param investor the investor that is supposed to be synched with the contact
     * @param contact the contact in hubspot that is supposed to match the investor
     */
    async syncContact(investor: Investor, contact: hubspot.contactsModels.SimplePublicObject = null) {
        let modifiedProperties = Array();

        try {
            // NOTE: make sure the properties you want to compare are listed in the getbyid statement (where we get the contact
            // from hubspot). otherwise the value wont be retrieved, they have to be specifically listed
            await this.syncContactCoreProperties(investor, contact, modifiedProperties);
            await this.syncContactSignupsEvents(investor, contact, modifiedProperties);
            await this.syncContactKycProperties(investor, contact, modifiedProperties);

            // any properties change?
            if (Object.keys(modifiedProperties).length > 0) {
                await this.saveContact(investor, modifiedProperties);
                // if the investor does not reference a contact we should be getting that vid here and updating the investor
            }
            else {
                this.logger.log(`syncContact ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) nothing modified exit`);
            }
        }
        catch (problem) {
            this.logger.error(`Problems operating on ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) due to ${problem}`);
            this.exception(`Problems operating on ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) due to ${problem}`, false);
        }
    }

    /**
     * for the given investor, find a matching contact or create a new one
     * @param investor - the investor to ensure a contact is present for
     */
    async matchOrCreateContact(investor: Investor) {
        try {
            // see if there is a contact with the same email address but without an associated user
            let searchResults = await this.findByEmail(investor.email);

            if (searchResults == null || searchResults.body.total == 0) {
                // if no match, create new and sync. the investor has no vid in it, we must create the contact and save the vid
                this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) no matching email ${investor.email} in hubspot`);
                await this.syncContact(investor);
            }
            else {
                this.logger.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) found match for ${investor.email} in ${searchResults.body.results[0].id}`);
                this.investorService.updatePartial({ 'hubspot_vid': searchResults.body.results[0].id }, investor.id);
            }
        }
        catch (problem) {
            this.logger.error(`matchOrCreateContact failed with Problems operating on ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) due to ${problem}`);
            this.exception(`matchOrCreateContact failed with Problems operating on ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) due to ${problem}`);
        }
    }

    /**
     * get a contact based on an id provided
     * @param contactId the id of the contact to retrieve
     * @returns the contact with the specified id
     */
    async getContactById(contactId: string): Promise<hubspot.contactsModels.SimplePublicObject> {
        let contact = await this.getApiClient().crm.contacts.basicApi.getById(contactId, [
            'user_id', 'email', 'firstname', 'lastname', 'phone', 'address', 'city', 'province', 'state', 'zip', 'investor_type', 'user_status'
            , 'co_branded', 'cobranded_client_of', 'cobranded_organizations', 'kyc_confirmed', 'cms_link', 'signup_date'
            , 'profile_completed_date', 'full_kyc_completed_date', 'return_preferences_completed'
            , 'time_horizon_completed', 'risk_tolerances_completed'
            , 'employment_status'
            , 'employer'
            , 'kyc_industry'
            , 'position'
            , 'years_at_employer'
            , 'income_includes_partner'
            , 'year_income_entered'
            , 'income_year_0'
            , 'income_year_1'
            , 'income_year_2'
            , 'net_financial_assets'
            , 'net_assets'
            , 'app_user'
        ]);
        return contact.body;
    }

    /**
     * check the validity of 1 database investor
     * @param investor the investor to check
     */
    async checkInvestorBasicProperties(investor: Investor) {
        this.logger.log(`checkInvestorBasicProperties enter(${investor.first_name} ${investor.last_name} ${investor.client_number}-${investor.hubspot_vid})`);
        if (investor.hubspot_vid == null) {
            this.error(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) does not have a hubspot id`);
            let contact = new hubspot.contactsModels.SimplePublicObject();
            await this.matchOrCreateContact(investor);
        }
        else {
            try {
                let contact = await this.getContactById(investor.hubspot_vid);
                //this.logger.log(`Retrieved contact ${contact.body.properties['email']} id ${contactId}`);
                await this.syncContact(investor, contact);
            }
            catch (problem) {
                this.exception(`Could not retrieve Contact ${investor.id} from hubspot vid ${investor.hubspot_vid} due to ${problem}`);
                this.logger.error(`Could not retrieve Contact ${investor.id} from hubspot vid ${investor.hubspot_vid} due to ${problem}`);
            }
        }
        this.logger.log(`checkInvestorBasicProperties exit(${investor.first_name} ${investor.last_name} ${investor.client_number})`);
    }

    /**
     * find all contacts that have the given email
     * @param email - the email to search for
     * @return
     */
    async findByEmail(email: string): Promise<{ response: any; body: hubspot.contactsModels.CollectionResponseWithTotalSimplePublicObject; }> {
        //this.logger.log(`findByEmail enter(${email})`);

        try {
            let params = new hubspot.contactsModels.PublicObjectSearchRequest();
            let filter = new hubspot.contactsModels.Filter();
            filter.propertyName = 'email';
            filter.operator = hubspot.contactsModels.Filter.OperatorEnum.EQ;
            filter.value = email;
            params.limit = 10;
            let filterGroup = new hubspot.contactsModels.FilterGroup();
            filterGroup.filters = [filter];
            params.filterGroups = [filterGroup];

            return await this.getApiClient().crm.contacts.searchApi.doSearch(params);
        }
        catch (problem) {
            this.exception(`Could not search Contacts for ${email} due to ${problem}`, false);
            this.logger.error(`Could not search Contacts for ${email} due to ${problem}`);
            return null;
        }
        finally {
            //this.logger.log(`findByEmail exit(${email})`);
        }
    }

    /**
     * check the validity of 1 database investor
     * @param investor the investor to check
     */
    async checkInvestorEmail(investor: Investor) {
        //this.logger.log(`checkInvestorEmail enter(${investor.email})`);
        if (investor.hubspot_vid != null) {
            let results = await this.findByEmail(investor.email);

            if (results == null || results.body.total == 0) {
                let modifiedProperties = Array();
                modifiedProperties.push({ 'property': 'email', 'value': investor.email });
                await this.saveContact(investor, modifiedProperties);
            }
            else if (results.body.total != 1)
                this.error(`Email ${investor.email} is used in ${results.body.total} contacts`);
            else if (investor.hubspot_vid != results.body.results[0].id)
                this.exception(`Investor ${investor.id}-${investor.client_number}-(${investor.first_name} ${investor.last_name}) points to hubspot ${investor.hubspot_vid} but its email ${investor.email} is used in ${results.body.results[0].id}`);
        }
        //this.logger.log(`checkInvestorEmail exit(${investor.email})`);
    }

    /**
     * go through the investors one by one and make sure the data in the cms matches hubspot
     * @returns an array of errors that were encountered
     */
    async checkAllInvestors(): Promise<Array<string>> {
        this.emailCount = 0;
        this.errorsEncountered = new Array<string>();
        this.logger.debug(`checkAllInvestors enter()`);
        await this.ensureProvinces();
        try {
            let allInvestors = await this.investorService.findAll(['financial_kyc', 'province'], ['investors.id desc'], 0, -1);

            let batchSize = 1;
            while (allInvestors.length > 0) {
                let batch = allInvestors.splice(0, batchSize);
                await Promise.all(batch.map(async (investor) => {
                    await this.checkInvestorBasicProperties(investor);
                    await this.checkInvestorEmail(investor);
                    this.logger.log(`checkAllInvestors now has ${this.errorsEncountered.length}`);
                }));
            }
        }
        catch (problem) {
            this.exception(`Could not search investors due to ${problem}`);
        }

        this.logger.debug(`checkAllInvestors exit results: ${JSON.stringify(this.errorsEncountered)}`);
        return this.errorsEncountered;
    }
}
