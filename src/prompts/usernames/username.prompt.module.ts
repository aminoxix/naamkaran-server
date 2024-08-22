import { Module } from '@nestjs/common';

import { GeminiModule } from 'src/gemini/gemini.module';
import { FavPromptController } from './username.prompt.controller';
import { FavPromptService } from './username.prompt.service';

@Module({
  imports: [GeminiModule],
  controllers: [FavPromptController],
  providers: [FavPromptService],
})
export class FavPromptModule {}
