import { Body, Controller, Get, Post } from '@nestjs/common';

import { SharedDTO } from '../dto';
import { ComboPromptService } from './combo.prompt.service';

@Controller('prompt/combos')
export class ComboPromptController {
  constructor(private readonly comboPromptService: ComboPromptService) {}

  @Post('create')
  create(@Body() dto: SharedDTO): Promise<{
    message: string;
    response: string;
  }> {
    return this.comboPromptService.create(dto);
  }

  @Get('all')
  async getComboPrompts({ userId }: { userId: string }) {
    return this.comboPromptService.getAll({ userId });
  }
}
