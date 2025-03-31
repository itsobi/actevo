import db from '@/db';
import { videos } from '@/db/schema';
import { muxClient } from '@/lib/mux';
import Mux from '@mux/mux-node';
import {
  VideoAssetCreatedWebhookEvent,
  VideoAssetErroredWebhookEvent,
  VideoAssetReadyWebhookEvent,
} from '@mux/mux-node/resources/webhooks';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

const SIGNING_SECRET = process.env.MUX_SIGNING_SECRET;

type WebhookEvent =
  | VideoAssetCreatedWebhookEvent
  | VideoAssetErroredWebhookEvent
  | VideoAssetReadyWebhookEvent;

export async function POST(request: Request) {
  if (!SIGNING_SECRET) {
    throw new Error('MUX_SIGNING_SECRET is not set');
  }

  const headersPayload = await headers();
  const muxSignature = headersPayload.get('mux-signature');

  if (!muxSignature) {
    return new Response('No signature found', { status: 401 });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  muxClient.webhooks.verifySignature(
    body,
    {
      'mux-signature': muxSignature,
    },
    SIGNING_SECRET
  );
  console.log('WEBHOOK: PAYLOAD', payload);

  switch (payload.type as WebhookEvent['type']) {
    case 'video.asset.created':
      const data = payload.data as VideoAssetCreatedWebhookEvent['data'];
      if (!data.upload_id) {
        return new Response('No upload id found', { status: 400 });
      }
      await db
        .update(videos)
        .set({
          muxStatus: data.status,
          muxAssetId: data.id,
        })
        .where(eq(videos.muxUploadId, data.upload_id));
      break;
    case 'video.asset.errored':
      const errored = payload as VideoAssetErroredWebhookEvent;
      await db
        .update(videos)
        .set({
          muxStatus: errored.data.status,
        })
        .where(eq(videos.muxAssetId, errored.data.id));
      break;
    case 'video.asset.ready':
      const ready = payload as VideoAssetReadyWebhookEvent;
      await db
        .update(videos)
        .set({
          muxStatus: ready.data.status,
        })
        .where(eq(videos.muxAssetId, ready.data.id));
      console.log('Video asset ready', ready.data.id);
      break;
    default:
      console.log('Unknown webhook event', payload);
      break;
  }

  return new Response('Webhook received', { status: 200 });
}
