import { Injectable, Inject, Logger, Scope } from '@nestjs/common';
import * as hubspot from '@hubspot/api-client';
import { EmailService } from '../util/Email';
import { UserIdentification } from '../security/UserIdentification';

/**
 * NOTE: makes use of the hubspot api client at https://www.npmjs.com/package/@hubspot/api-client
 */
@Injectable({ scope: Scope.TRANSIENT })
export class AbstractHubspotService {
    private readonly localLogger = new Logger(AbstractHubspotService.name);

    THROTTLING_DELAY_TIME = 1000;
    CONCURRENCY_LIMIT = 2;
    BOTTLENECK_ID = 'our_hubspot';
    PIPELINE_OBJECT_TYPE = 'pipelines';
    DEAL_OBJECT_TYPE = 'deals';
    CONTACT_OBJECT_TYPE = 'contacts';
    CUSTOM_LIMITER_OPTIONS =
        {
            maxConcurrent: this.CONCURRENCY_LIMIT,
            minTime: this.THROTTLING_DELAY_TIME,
            id: this.BOTTLENECK_ID,
        };

    protected hapikey = (process.env.HAPIKEY == null) ? '913b0f03-f0fe-4046-8a34-e40e27380e61' : process.env.HAPIKEY;
    protected emailCount = 0;
    protected maxEmailsPerRun = 10;

    /**
     * the hubspot project custom object id
     */
    projectCustomObjectId = '2-1417909';
    hubspotPortalId = '3419736';
    projetCustomerObjectFullyQualifiedName = `p${this.hubspotPortalId}_Project`;


    /**
     * the errors that have been encountered
     */
    errorsEncountered = new Array<string>();

    private emailServce: EmailService;

    protected user: UserIdentification;

    /**
     * set the user that is going to be making use of this service
     */
    setUserForRequest(user: UserIdentification) {
        this.user = user;
    }

    constructor(inEmailServce: EmailService) {
        this.emailServce = inEmailServce;
    }

    /**
     * get an instance of the hubspot api client
     * @returns a hubspot api client
     */
    getApiClient(): hubspot.Client {
        return new hubspot.Client(
            {
                apiKey: this.hapikey
                , useLimiter: true
                , limiterOptions: this.CUSTOM_LIMITER_OPTIONS
                , numberOfApiCallRetries: hubspot.NumberOfRetries.Three
            });
    }

    /**
     * record an error
     * @param errorText the text to log as an error
     */
    error(errorText: string) {
        //if (this.loggingOn)   
        //    console.log(errorText);
        this.errorsEncountered.push(errorText);
    }

    exception(problemText: string, sendEmail = true) {
        this.error(problemText);
        if (sendEmail && this.emailCount < this.maxEmailsPerRun) {
            //            this.emailServce.send('todd@fundscraper.com; tc@fundscraper.com; lh@fundscraper.com', 'tech@fundscraper.com', 'hubspot problem', problemText, '');
            this.emailServce.send('todd@fundscraper.com; help@fundscraper.com', 'tech@fundscraper.com', 'hubspot problem', problemText, '');
            this.emailCount++;
        }
        else {
            this.localLogger.error(`exceed email threshold (${this.emailCount}), not sending email for: ${problemText}`);
        }
    }

    /**
     * are the 2 numbers effectively the same? null = empty string
     * @param num1 the first number
     * @param num2 the second number
     * @return true if they are effectively the same
     */
    numbersEqual(num1: any, num2: any): boolean {
        let actual1;
        let actual2;
        if (num1 == null || num1 == '' || Number.isNaN(num1))
            actual1 = 0;
        else if (typeof num1 === 'string')
            actual1 = parseFloat(num1);
        else
            actual1 = num1;

        if (num2 == null || num2 == '' || Number.isNaN(num2))
            actual2 = 0;
        else if (typeof num2 === 'string')
            actual2 = parseFloat(num2);
        else
            actual2 = num2;

        return actual1 == actual2;
    }

    /**
     * are the 2 strings effectively the same? null = empty string
     * @param string1 the first string
     * @param string2 the second string
     * @return true if they are effectively the same
     */
    stringsEqual(string1: string, string2: string): boolean {
        if (string1 == null || string1 == '') {
            if (string2 == null || string2 == '')
                return true;
            return false;
        }
        if (string2 == null || string2 == '')
            return false;
        return string1 == string2;
    }

    /**
     * are the 2 strings, which are expected to be email addresses, effectively the same
     * @param string1 the first string
     * @param string2 the second string
     * @return true if they are effectively the same
     */
    emailsEqual(string1: string, string2: string): boolean {
        if (string1 == null || string1 == '') {
            if (string2 == null || string2 == '')
                return true;
            return false;
        }
        if (string2 == null || string2 == '')
            return false;
        if (string1 == string2)
            return true;

        return string1.toUpperCase() === string2.toUpperCase();
    }

    /**
     * are two booleans equal?
     * string values are equal true only when they match a case insensitive "true"
     * numeric values are true whenever the value is not 0
     * @bool1 the first boolean to check
     * @bool2 the second boolean to check
     * @returns true if they equate to the same boolean value
     */
    boolEqual(bool1: boolean | string | number, bool2: boolean | string | number): boolean {
        let decoded1 = false;
        let decoded2 = false;

        if (typeof (bool1) == 'boolean')
            decoded1 = bool1;
        else if (typeof (bool1) == 'number')
            decoded1 = (bool1 != 0);
        else if (typeof (bool1) == 'string')
            decoded1 = (bool1.toLocaleUpperCase() == 'TRUE');

        if (typeof (bool2) == 'boolean')
            decoded2 = bool2;
        else if (typeof (bool2) == 'number')
            decoded2 = (bool2 != 0);
        else if (typeof (bool2) == 'string')
            decoded2 = (bool2.toLocaleUpperCase() == 'TRUE');

        return decoded1 == decoded2;
    }

    /**
     * are the 2 strings, which are expected to be telephone numbers, effectively the same
     * @param string1 the first string
     * @param string2 the second string
     * @return true if they are effectively the same
     */
    phonesEqual(string1: string, string2: string): boolean {
        if (string1 == null || string1 == '') {
            if (string2 == null || string2 == '')
                return true;
            return false;
        }
        if (string2 == null || string2 == '')
            return false;
        if (string1 == string2)
            return true;

        let string1a = string1.replace(/(-| |(|))/g, '');
        let string2a = string2.replace(/(-| |(|))/g, '');

        let result = string1a == string2a;
        return result;
    }

    /**
     * are the two dates equal to the day
     * values are passed in as either instances of Date or strings in ISO format
     * @param date1 the first of the two dates to check
     * @param date2 the second of the two dates to check
     * @returns true if they are the same day, false otherwise
     */
    datesEqualToDay(date1: Date | string, date2: Date | string) {
        let date1AsISO = '';
        let date2AsISO = '';

        if (date1 instanceof Date) {
            let date1Copy = new Date(date1);
            date1Copy.setUTCHours(0, 0, 0, 0);
            date1AsISO = date1Copy.toISOString().substr(0, 10);
        }
        else if (date1 == null)
            date1AsISO = '1970-01-01';
        else if (typeof (date1) == 'string')
            date1AsISO = date1.substr(0, 10);

        if (date2 instanceof Date) {
            let date2Copy = new Date(date2);
            date2Copy.setUTCHours(0, 0, 0, 0);
            date2AsISO = date2Copy.toISOString().substr(0, 10);
        }
        else if (date2 == null)
            date2AsISO = '1970-01-01';
        else if (typeof (date2) == 'string')
            date2AsISO = date2.substr(0, 10);

        //        console.log(`comparing '${date1AsISO}' to '${date2AsISO}'`);f
        return date1AsISO == date2AsISO;
    }

    /**
     * take an instances of a Date and convert it into a timestamp for hubspot, that is mdnight UTC unix timestamp
     * @param date the date to adjust
     * @returns the number of millisecond from 1970... to midnight of the given date
     */
    dateToHubspotTimestamp(date: Date): number {
        if (date == null || date == undefined)
            return 0;
        let copy = new Date(date);
        copy.setUTCHours(0, 0, 0, 0);
        let timestamp = copy.getTime();

        return timestamp;
    }
}


