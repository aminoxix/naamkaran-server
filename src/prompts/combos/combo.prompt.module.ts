import { Module } from '@nestjs/common';

import { GeminiModule } from 'src/gemini/gemini.module';
import { ComboPromptController } from './combo.prompt.controller';
import { ComboPromptService } from './combo.prompt.service';

@Module({
  imports: [GeminiModule],
  controllers: [ComboPromptController],
  providers: [ComboPromptService],
})
export class ComboPromptModule {}
