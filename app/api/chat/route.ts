import { streamText, UIMessage } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  console.log('--- MESSAGES ---', JSON.stringify(messages, null, 2));

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system:
      'You are a helpful workout assistant. Only respond to questions that pertain to working out',
    messages,
  });

  return result.toDataStreamResponse();
}
