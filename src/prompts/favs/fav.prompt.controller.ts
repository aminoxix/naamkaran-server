import { Body, Controller, Get, Post } from '@nestjs/common';

import { FavDTO } from '../dto';
import { FavPromptService } from './fav.prompt.service';

@Controller('prompt/favorites')
export class FavPromptController {
  constructor(private readonly favPromptService: FavPromptService) {}

  @Post('create')
  create(@Body() dto: FavDTO): Promise<{
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
