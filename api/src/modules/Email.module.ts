import { Module } from "@nestjs/common";
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from "../util/Email";

@Module({
	imports: [MailerModule.forRoot({
        transport: {
            host: 'email-smtp.us-east-1.amazonaws.com',
            port: 587,
            ignoreTLS: false,
            secure: false,
            auth: {
                user: (process.env.sesUserName != null && process.env.sesUserName != '') ? process.env.sesUserName : 'AKIA6NPVCLP2HMEBFLE3',
                pass: (process.env.sesPassword != null && process.env.sesPassword != '') ? process.env.sesPassword : 'BMx+baT8KZ8rPJ9uUA7/FjGatfJ8z8zMcugtDGB0qXqI',
            },
        },
        defaults: {
            from: '"Do No Reply" <donotreply@fundscraper.com>',
        },
    })],
	controllers: [],
	providers: [EmailService], 
    exports: [EmailService]
})
export class EmailModule 
{
	constructor() {}
}	

