'use server';

import db from '@/db';
import { muxClient } from '../mux';
import { videos } from '@/db/schema';
import { auth } from '@/auth';
import { count, eq } from 'drizzle-orm';

const VIDEO_LIMIT_COUNT = 5;

type UploadResponse = {
  success: boolean;
  message?: string;
  url?: string;
};

export const uploadVideo = async (userId: string): Promise<UploadResponse> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized' };
    }

    const userVideoCount = await db
      .select({ count: count() })
      .from(videos)
      .where(eq(videos.userId, userId));

    if (userVideoCount[0].count >= VIDEO_LIMIT_COUNT) {
      return {
        success: false,
        message: `Video limit of ${VIDEO_LIMIT_COUNT} reached`,
      };
    }

    const directUpload = await muxClient.video.uploads.create({
      cors_origin: '*', // TODO: Change to the prod domain
      new_asset_settings: {
        passthrough: userId,
        playback_policy: ['public'],
      },
    });

    await db.insert(videos).values({
      userId: session.user.id,
      title: 'Untitled',
      description: 'Untitled',
      muxStatus: 'waiting',
      muxUploadId: directUpload.id,
    });

    return {
      success: true,
      url: directUpload.url,
    };
  } catch (error) {
    console.error('Upload video error:', error);
    return {
      success: false,
      message: 'Failed to create upload',
    };
  }
};
