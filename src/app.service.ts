import { Injectable } from '@nestjs/common';

import { User } from '@clerk/backend';
import { PaginatedResourceResponse } from '@clerk/backend/dist/api/resources/Deserializer';
import { clerkClient } from '@clerk/clerk-sdk-node';

import { PrismaService } from './prisma/prisma.service';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    id,
    email,
    username,
  }: UserDto): Promise<{ message: string; response: User }> {
    await this.prisma.user.create({
      data: {
        id,
        email,
        username,
      },
    });

    return {
      message: 'User created',
      response: await clerkClient.users.getUser(id),
    };
  }

  async getUsers(): Promise<PaginatedResourceResponse<User[]>> {
    return clerkClient.users.getUserList();
  }
}
