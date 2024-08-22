import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

import { UserController } from './app.controller';
import { UserService } from './app.service';

import { GeminiModule } from './gemini/gemini.module';
import { FavPromptModule } from './prompts/favs/fav.prompt.module';
import { FavPromptService } from './prompts/favs/fav.prompt.service';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    FavPromptModule,
    GeminiModule,
    ConfigModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService, FavPromptService],
})
export class AppModule {}
