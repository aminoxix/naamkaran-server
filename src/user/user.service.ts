import { Injectable } from '@nestjs/common';

import { User } from '@clerk/backend';
import { PaginatedResourceResponse } from '@clerk/backend/dist/api/resources/Deserializer';
import { clerkClient } from '@clerk/clerk-sdk-node';

@Injectable()
export class UserService {
  async getUsers(): Promise<PaginatedResourceResponse<User[]>> {
    return clerkClient.users.getUserList();
  }
}
