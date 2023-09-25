import * as fs from 'fs';
import * as path from 'path';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { LoggingErrorInterceptor } from 'http-logging-nestjs/dist/logging-error.interceptor';
import { LoggingInterceptor } from 'http-logging-nestjs/dist/logging.interceptor';
import { App } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from './shared/config/swagger.config';
import { AllExceptionsFilter } from './shared/filters/default.filter';

async function main() {
  const app = await NestFactory.create(App);

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new LoggingErrorInterceptor()
  );

  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('/swagger', app, document);

  // Write the swagger doc
  fs.mkdirSync(path.join(process.cwd(), '/tmp'), { recursive: true });
  fs.writeFileSync(
    path.join(process.cwd(), '/tmp', 'swagger-doc.json'), JSON.stringify(document));

  await app.listen(process.env.API_PORT);
}

main();
