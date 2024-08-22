import { Body, Controller, Get, Post } from '@nestjs/common';

import { SharedDTO } from '../dto';
import { FavPromptService } from './username.prompt.service';

@Controller('prompt/favorites')
export class FavPromptController {
  constructor(private readonly favPromptService: FavPromptService) {}

  @Post('create')
  create(@Body() dto: SharedDTO): Promise<{
    message: string;
    response: string;
  }> {
    return this.favPromptService.create(dto);
  }

  @Get('all')
  async getFavPrompts({ userId }: { userId: string }) {
    return this.favPromptService.getAll({ userId });
  }
}
