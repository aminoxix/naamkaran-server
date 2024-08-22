import { Injectable } from '@nestjs/common';

import { ChatCompletionMessageDto } from './utils';

import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  constructor(private readonly genAI: GoogleGenerativeAI) {}

  async createChatCompletion(prompt: ChatCompletionMessageDto) {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const result = await model.generateContent(prompt.content);
    const response = result.response;
    return response;
  }
}
