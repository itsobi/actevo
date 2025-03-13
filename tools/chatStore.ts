import { auth } from '@/auth';
import db from '@/db';
import { chats, messagesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { generateId, Message } from 'ai';

export const getChatId = async () => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return;
    }

    const chat = await db
      .select()
      .from(chats)
      .where(eq(chats.userId, session.user.id));

    if (chat.length) {
      return chat[0].id;
    }

    const chatId = generateId();
    await db.insert(chats).values({
      id: chatId,
      userId: session.user.id,
    });

    return chatId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadChat = async (id: string | undefined) => {
  if (!id) return [];

  const initialMessages = await db
    .select()
    .from(messagesTable)
    .where(eq(messagesTable.chatId, id));

  return initialMessages.map((message) => ({
    id: message.id,
    content: message.content,
    role: message.role,
  }));
};

export const saveChat = async ({
  id,
  message,
  responseMessage,
}: {
  id: string;
  message: Message;
  responseMessage: any;
}) => {
  let userMessageId: string | undefined;

  try {
    const userMessage = await db
      .insert(messagesTable)
      .values({
        id: message.id,
        chatId: id,
        role: message.role as 'user' | 'assistant',
        content: message.content,
        parts: message.parts,
      })
      .returning();

    if (!userMessage[0]?.id) {
      throw new Error('Failed to save user message');
    }
    userMessageId = userMessage[0].id;

    const assistantMessage = await db
      .insert(messagesTable)
      .values({
        id: responseMessage.id,
        chatId: id,
        role: responseMessage.role as 'user' | 'assistant',
        content: responseMessage.content[0].text,
        parts: responseMessage.parts,
      })
      .returning();

    if (!assistantMessage[0]?.id) {
      throw new Error('Failed to save assistant message');
    }
  } catch (error) {
    // Clean up the user message if it was created
    if (userMessageId) {
      try {
        await db
          .delete(messagesTable)
          .where(eq(messagesTable.id, userMessageId));
      } catch (cleanupError) {
        console.error('Failed to cleanup user message:', cleanupError);
      }
    }
    console.error(error);
    throw new Error('Failed to save chat');
  }
};
