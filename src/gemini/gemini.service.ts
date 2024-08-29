import { Injectable } from '@nestjs/common';

import { ChatCompletionMessageDto } from './utils';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GeminiService {
  constructor(
    private readonly genAI: GoogleGenerativeAI,
    private readonly prisma: PrismaService,
  ) {}

  async createChatCompletion(prompt: ChatCompletionMessageDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: prompt.userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const result = await model.generateContent(prompt.content);
    const response = result.response;
    return response;
  }
}
