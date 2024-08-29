import { Injectable } from '@nestjs/common';

import { usernamePrompt } from '../../utils';
import { SharedDTO } from '../dto';

import { GeminiService } from 'src/gemini/gemini.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsernamePromptService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gemini: GeminiService,
  ) {}

  async create({
    name,
    worded,

    userId,
    isFav = false,
    isCombo = false,
    isUsername = true,
  }: SharedDTO) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const prompt = usernamePrompt({
        name,
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
          prompt: [name, worded].join(' | '),
          answer,

          name,
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
        isUsername: true,
        User: {
          id: userId,
        },
      },
    });
  }
}
