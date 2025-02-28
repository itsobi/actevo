import { integer, pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';

export const ipsTable = pgTable('ips', {
  id: uuid('id').primaryKey().defaultRandom(),
  ipAddress: text('ip_address').notNull(),
  count: integer('count').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
