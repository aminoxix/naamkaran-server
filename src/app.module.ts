import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

import { UserController } from './app.controller';
import { UserService } from './app.service';

import { GeminiModule } from './gemini/gemini.module';
import { FavPromptModule } from './prompts/favs/fav.prompt.module';
import { FavPromptService } from './prompts/favs/fav.prompt.service';

import { ConfigModule } from '@nestjs/config';
import { ComboPromptModule } from './prompts/combos/combo.prompt.module';
import { ComboPromptService } from './prompts/combos/combo.prompt.service';
import { UsernamePromptModule } from './prompts/usernames/username.prompt.module';
import { UsernamePromptService } from './prompts/usernames/username.prompt.service';

@Module({
  imports: [
    GeminiModule,
    PrismaModule,
    FavPromptModule,
    ComboPromptModule,
    UsernamePromptModule,
    ConfigModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    FavPromptService,
    ComboPromptService,
    UsernamePromptService,
  ],
})
export class AppModule {}
