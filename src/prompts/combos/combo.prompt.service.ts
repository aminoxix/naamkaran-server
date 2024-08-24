import { Injectable } from '@nestjs/common';

import { comboPrompt } from '../../utils';
import { SharedDTO } from '../dto';

import { GeminiService } from 'src/gemini/gemini.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComboPromptService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gemini: GeminiService,
  ) {}

  async create({
    partner1,
    partner2,
    gender,

    userId,
    isFav = false,
    isCombo = true,
    isUsername = false,
  }: SharedDTO) {
    try {
      const prompt = comboPrompt({
        partner1,
        partner2,
        gender,
      });

      const response = await this.gemini.createChatCompletion({
        role: 'user',
        content: prompt,
      });

      const answer = response.text();

      const truncatedAnswer = answer.split(' ').slice(0, 10).join(' ');

      await this.prisma.prompts.create({
        data: {
          prompt: [partner1, partner2, gender].join(' | '),
          answer: truncatedAnswer,

          partner1,
          partner2,
          gender,

          isFav,
          isCombo,
          isUsername,

          User: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return {
        message: 'Prompt sent',
        response: answer,
      };
    } catch (error) {
      return {
        message: 'Error',
        response: `Error sending prompt: ${error}`,
      };
    }
  }

  getAll({ userId }: { userId: string }) {
    return this.prisma.prompts.findMany({
      where: {
        isCombo: true,
        User: {
          id: userId,
        },
      },
    });
  }
}
