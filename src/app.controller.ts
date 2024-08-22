import { Controller, Get, UseGuards } from '@nestjs/common';

import { ClerkAuthGuard } from './app.guard';
import { UserService } from './app.service';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(ClerkAuthGuard)
  async getUsers() {
    return this.userService.getUsers();
  }
}
