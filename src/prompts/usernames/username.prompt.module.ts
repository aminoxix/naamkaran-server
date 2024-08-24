import { Module } from '@nestjs/common';

import { GeminiModule } from 'src/gemini/gemini.module';
import { UsernamePromptController } from './username.prompt.controller';
import { UsernamePromptService } from './username.prompt.service';

@Module({
  imports: [GeminiModule],
  controllers: [UsernamePromptController],
  providers: [UsernamePromptService],
})
export class UsernamePromptModule {}
