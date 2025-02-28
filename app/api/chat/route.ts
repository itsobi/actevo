import { smoothStream, streamText, UIMessage } from 'ai';
import { openai } from '@ai-sdk/openai';
import { auth } from '@/auth';
import { trackIPforNonSignedInUser } from '@/lib/query';

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      const shouldContinue = await trackIPforNonSignedInUser();

      if (!shouldContinue?.success) {
        return new Response(shouldContinue?.error, { status: 403 });
      }
    }

    const { messages }: { messages: UIMessage[] } = await req.json();

    console.log('--- MESSAGES ---', JSON.stringify(messages, null, 2));

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system:
        'You are a helpful workout assistant. Only respond to questions that pertain to working out',
      experimental_transform: smoothStream(),
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.log('--- ERROR ---', error);
    return new Response('An error occurred', { status: 500 });
  }
}
