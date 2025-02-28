import db from '@/db';
import { ipsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import 'server-only';
import { getIP } from './actions/getIP';

export const trackIPforNonSignedInUser = async () => {
  const ip = await getIP();
  const existingIpAddress = await db
    .select()
    .from(ipsTable)
    .where(eq(ipsTable.ipAddress, ip));

  if (existingIpAddress.length === 0) {
    await db.insert(ipsTable).values({
      ipAddress: ip,
      count: 1,
    });
  } else {
    if (existingIpAddress[0].count === 2) {
      return {
        success: false,
        error:
          'Sorry, you have reached the limit. Sign in to gain full access.',
      };
    }
    await db
      .update(ipsTable)
      .set({ count: (existingIpAddress[0].count ?? 0) + 1 })
      .where(eq(ipsTable.ipAddress, ip));
  }
};
