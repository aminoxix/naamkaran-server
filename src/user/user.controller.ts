import { Controller, Get, UseGuards } from '@nestjs/common';

import { ClerkAuthGuard } from './user.guard';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(ClerkAuthGuard)
  async getUsers() {
    return this.userService.getUsers();
  }
}
