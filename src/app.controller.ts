import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { User } from '@clerk/backend';
import { UserDto } from './user.dto';

import { ClerkAuthGuard } from './app.guard';
import { UserService } from './app.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post('user/create')
  create(@Body() dto: UserDto): Promise<{ message: string; response: User }> {
    return this.userService.create(dto);
  }

  @Get('user/all')
  @UseGuards(ClerkAuthGuard)
  async getUsers() {
    return this.userService.getUsers();
  }
}
