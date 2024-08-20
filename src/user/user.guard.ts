import clerkClient from '@clerk/clerk-sdk-node';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private readonly logger = new Logger();

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const cookieStore = request.cookies;
    const sessionToken = cookieStore.get('__session')?.value;
    const bearerToken = request.headers
      .get('Authorization')
      ?.replace('Bearer ', '');
    const token = sessionToken || bearerToken;

    try {
      await clerkClient.verifyToken(token, {
        jwtKey: process.env.CLERK_JWT_KEY,
        authorizedParties: [
          'http://localhost:8000',
          'https://naamkaran.netlify.app',
        ],
      });
    } catch (err) {
      this.logger.error(err);
      return false;
    }

    return true;
  }
}
