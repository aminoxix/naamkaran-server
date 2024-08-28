import { Injectable } from '@nestjs/common';
import { Webhook } from 'svix';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class WebhookService {
  constructor(private readonly prisma: PrismaService) {}

  verifyWebhook(payload: Buffer, headers: Record<string, string>): any {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      throw new Error('You need a WEBHOOK_SECRET in your .env');
    }

    const {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    } = headers;

    if (!svixId || !svixTimestamp || !svixSignature) {
      throw new Error('Error occurred -- no svix headers');
    }

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;
    try {
      evt = wh.verify(payload, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      });
    } catch (err) {
      console.log('Error verifying webhook:', err.message);
      throw new Error(err.message);
    }

    return evt;
  }

  async processWebhookEvent(evt: any) {
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    console.log('Webhook body:', evt.data);

    try {
      await this.prisma.user.create({
        data: {
          id,
          email: evt.data.email_addresses[0].email_address,
          username: evt.data.username,
        },
      });

      console.log('User created');
    } catch (err) {
      console.log('Error creating user:', err.message);
      return {
        success: false,
        message: 'Error creating user',
      };
    }

    return {
      success: true,
      message: 'Webhook received',
    };
  }
}
