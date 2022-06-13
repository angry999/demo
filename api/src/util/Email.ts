import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

/**
 * a service for sending emails
 */
@Injectable()
export class EmailService {
    /**
     * logging
     */
    private readonly logger = new Logger(EmailService.name);

    constructor(private readonly mailerService: MailerService) { }

    /**
     * send an email
     * @param toAddress a semi colon separated list of email addresses to send the email to
     * @param fromAddress the email address of the sender
     * @param subject the subject of the email
     * @param bodyAsText the body of the email as plain ascii text
     * @param bodyAsHtml the body of the email as html
     * @returns a promise that resolves to true if the email was successfully sent
     */
    public send(toAddress: string, fromAddress: string, subject: string, bodyAsText: string, bodyAsHtml: string) : Promise<any> {
        this.logger.log(`send(${toAddress}, ${fromAddress}, ${subject})`);
        return this.mailerService.sendMail({
            to: toAddress,
            from: fromAddress,
            subject: subject,
            text: bodyAsText,
            html: bodyAsHtml,
        });
    }
}