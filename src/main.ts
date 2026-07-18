import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as bodyParser from 'body-parser';
import cookieParser = require('cookie-parser');

import { AppModule } from './app.module';

async function bootstrap() {
  // bodyParser: false avoids Nest's built-in parser registration, which
  // crashes on Express 4.x ("'app.router' is deprecated") — see
  // https://github.com/nestjs/nest/issues/14601. Parsers are registered
  // manually below instead.
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Use raw body parser for the webhook endpoint
  app.use('/api/webhooks', bodyParser.raw({ type: 'application/json' }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  await app.listen(8000);
}

bootstrap();
