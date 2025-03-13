import { trackIPforNonSignedInUser } from '@/lib/query';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const { success, error } = await trackIPforNonSignedInUser();

  if (!success) {
    return new Response(error.message, { status: error.code });
  }

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system:
      'You are a helpful workout assistant. Only respond to questions that pertain to working out',
    messages,
  });

  result.consumeStream();

  return result.toDataStreamResponse();
}
