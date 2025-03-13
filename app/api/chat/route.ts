import { appendClientMessage, createIdGenerator, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { loadChat, saveChat } from '@/tools/chatStore';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { message, id } = await req.json();

    const previousMessages = await loadChat(id);

    const messages = appendClientMessage({
      messages: previousMessages,
      message,
    });

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system:
        'You are a helpful workout assistant. Only respond to questions that pertain to working out',
      experimental_generateMessageId: createIdGenerator({
        prefix: 'msgs',
        size: 16,
      }),
      messages,
      async onFinish({ response }) {
        await saveChat({
          id,
          message: messages[messages.length - 1],
          responseMessage: response.messages[response.messages.length - 1],
        });
      },
    });

    result.consumeStream();

    return result.toDataStreamResponse();
  } catch (error) {
    console.log('--- ERROR ---', error);
    return new Response('An error occurred', { status: 500 });
  }
}
