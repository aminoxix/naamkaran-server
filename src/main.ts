import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Use raw body parser for the webhook endpoint
  app.use('/api/webhooks', bodyParser.raw({ type: 'application/json' }));

  await app.listen(8000);
}

bootstrap();
