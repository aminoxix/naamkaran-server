import { Injectable } from '@nestjs/common';
import { Webhook } from 'svix';

@Injectable()
export class WebhookService {
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

  processWebhookEvent(evt: any) {
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    console.log('Webhook body:', evt.data);

    return {
      success: true,
      message: 'Webhook received',
    };
  }
}
