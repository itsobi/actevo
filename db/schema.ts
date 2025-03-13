import {
  integer,
  pgTable,
  pgEnum,
  text,
  uuid,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core';

export const ips = pgTable('ips', {
  id: uuid('id').primaryKey().defaultRandom(),
  ipAddress: text('ip_address').notNull(),
  count: integer('count').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const chats = pgTable('chats', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const messageRoleEnum = pgEnum('message_role', ['user', 'assistant']);

export const messagesTable = pgTable('messages', {
  id: text('id').primaryKey(),
  chatId: text('chat_id').references(() => chats.id),
  role: messageRoleEnum('role').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  parts: jsonb('parts').default('[]'),
  revisionId: text('revision_id'),
  toolInvocations: jsonb('tool_invocations').default('[]'),
});
