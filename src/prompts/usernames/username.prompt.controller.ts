import { Body, Controller, Get, Post } from '@nestjs/common';

import { SharedDTO } from '../dto';
import { UsernamePromptService } from './username.prompt.service';

@Controller('prompt/usernames')
export class UsernamePromptController {
  constructor(private readonly favPromptService: UsernamePromptService) {}

  @Post('create')
  create(@Body() dto: SharedDTO): Promise<{
    message: string;
    response: string;
  }> {
    return this.favPromptService.create(dto);
  }

  @Get('all')
  async getUsernamePrompts({ userId }: { userId: string }) {
    return this.favPromptService.getAll({ userId });
  }
}
