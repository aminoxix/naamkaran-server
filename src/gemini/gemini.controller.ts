import { Body, Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { ChatCompletionRequest } from './utils';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('chat')
  async createChatCompletion(@Body() body: ChatCompletionRequest) {
    return this.geminiService.createChatCompletion(body.messages);
  }
}
