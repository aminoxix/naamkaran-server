import { Injectable } from '@nestjs/common';

import { favPrompt } from '../../utils';
import { SharedDTO } from '../dto';

import { GeminiService } from 'src/gemini/gemini.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavPromptService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gemini: GeminiService,
  ) {}

  async create({
    aim,
    name,
    hobby,
    animal,
    background,
    worded,

    userId,
    isFav = true,
    isCombo = false,
    isUsername = false,
  }: SharedDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    try {
      const prompt = favPrompt({
        aim,
        name,
        hobby,
        animal,
        background,
        worded,
      });

      const response = await this.gemini.createChatCompletion({
        userId,
        role: 'user',
        content: prompt,
      });

      const answer = response.text();

      await this.prisma.prompts.create({
        data: {
          prompt: [aim, name, hobby, animal, background, worded].join(' | '),
          answer,

          aim,
          name,
          hobby,
          animal,
          background,
          worded,

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
        isFav: true,
        User: {
          id: userId,
        },
      },
    });
  }
}
