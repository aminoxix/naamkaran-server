import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { GeminiController } from './gemini.controller';
import { GeminiService } from './gemini.service';

import { GoogleGenerativeAI } from '@google/generative-ai';

@Module({
  imports: [ConfigModule],
  controllers: [GeminiController],
  exports: [GeminiService],
  providers: [
    GeminiService,
    {
      provide: GoogleGenerativeAI,
      useFactory: (configService: ConfigService) =>
        new GoogleGenerativeAI(configService.getOrThrow('GEMINI_API_KEY')),
      inject: [ConfigService],
    },
  ],
})
export class GeminiModule {}
