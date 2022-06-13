import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as fs from 'fs';
import { RollingLogger } from './util/RollingLogger';
import { writeFileSync } from 'fs';
import { ExceptionsLoggerFilter } from './util/ExceptionsLoggerFilter';
import { LoggingInterceptor } from './util/LoggingInterceptor';
import { ModuleAccess } from './model/ModuleAccess.entity.generated';

async function bootstrap() {
    /**
     * create local self signed with iis. export it with a key and password
     * install openssl, launch open ssl and run
     * pkcs12 -in "C:\src\fundscraper\my\node\api\secrets\localapi.pfx" -out "C:\src\fundscraper\my\node\api\secrets\localapi.pem"
     * rsa -in "C:\src\fundscraper\my\node\api\secrets\localapi.pem" -out "C:\src\fundscraper\my\node\api\secrets\localapi.key"
     */
    const keyPath = process.env.SSL_KEY_PATH || './secrets/localapi.key'; // './secrets/private-key.pem'
    const certPath = process.env.SSL_CERT_PATH || './secrets/localapi.pem'; // './secrets/public-certificate.pem'
    const httpsOptions = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
        ciphers: "AES128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH",
        //pfx: fs.readFileSync(pfxPath),
        //passphrase: 'localapi'
    };
    const app = await NestFactory.create(AppModule,
        {
            logger: new RollingLogger(),
            //logger: process.env.NODE_ENV === 'development' ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn', 'log', 'debug'],
            httpsOptions,
        });

    // logging exceptions
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter));
    app.useGlobalInterceptors(new LoggingInterceptor());

    app.use(helmet());
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Fundscraper API')
        .setDescription('The REST api methods available for access to the fundscraper system')
        .setVersion('1.0')
        .build();

    const options: SwaggerDocumentOptions = {
        extraModels: [ModuleAccess]
    }
    const document = SwaggerModule.createDocument(app, config, options);
    const docAsJson = JSON.stringify(document, null, 2);
    writeFileSync(`${__dirname}/../api-spec.json`, docAsJson);
    SwaggerModule.setup('docs', app, document);

    let server = await app.listen(3001);

    server.setTimeout(20 * 60 * 1000);
}
bootstrap();
