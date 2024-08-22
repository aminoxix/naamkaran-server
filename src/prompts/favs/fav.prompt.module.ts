import { Module } from '@nestjs/common';

import { GeminiModule } from 'src/gemini/gemini.module';
import { FavPromptController } from './fav.prompt.controller';
import { FavPromptService } from './fav.prompt.service';

@Module({
  imports: [GeminiModule],
  controllers: [FavPromptController],
  providers: [FavPromptService],
})
export class FavPromptModule {}
