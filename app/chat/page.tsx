import { PageHeader } from '@/components/page-header';
import { auth } from '@/auth';
import { ChatScreen } from './_components/ask-ai-chat-screen';

export default async function ChatPage() {
  const session = await auth();
  return (
    <div>
      <PageHeader
        title="ActEvo Workout Assistant"
        description="I'm here to help you with anything regarding ActEvo. It's important to keep in mind that I have been trained to stick to topics related to working out and ActEvo. Ask away! 💪"
      />

      <ChatScreen />
    </div>
  );
}
