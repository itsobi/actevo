import db from '@/db';
import { ips } from '@/db/schema';
import { eq } from 'drizzle-orm';
import 'server-only';
import { getIP } from './actions/getIP';

export const trackIPforNonSignedInUser = async () => {
  try {
    const ip = await getIP();
    const existingIpAddress = await db
      .select()
      .from(ips)
      .where(eq(ips.ipAddress, ip));

    if (existingIpAddress.length === 0) {
      await db.insert(ips).values({
        ipAddress: ip,
        count: 1,
      });
      return {
        success: true,
        error: {
          message: null,
          code: 200,
        },
      };
    } else {
      if (existingIpAddress[0].count === 2) {
        return {
          success: false,
          error: {
            message:
              'Sorry, you have reached the limit. Sign in to gain full access.',
            code: 429,
          },
        };
      }
      await db
        .update(ips)
        .set({ count: (existingIpAddress[0].count ?? 0) + 1 })
        .where(eq(ips.ipAddress, ip));
      return {
        success: true,
        error: {
          message: null,
          code: 200,
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: {
        message: 'Sorry, something went wrong. Please try again later.',
        code: 500,
      },
    };
  }
};
