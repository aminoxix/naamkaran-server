import { User } from '@clerk/backend';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClerkAuthGuard } from './app.guard';
import { UserService } from './app.service';
import { UserDto } from './user.dto';

import { WebhookService } from './webhook.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly webhookService: WebhookService,
  ) {}

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

  @Post('api/webhooks')
  async handleWebhook(@Req() req, @Res() res) {
    try {
      const evt = this.webhookService.verifyWebhook(req.body, req.headers);
      const response = this.webhookService.processWebhookEvent(evt);
      return res.status(HttpStatus.OK).json(response);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: err.message,
      });
    }
  }
}
