import { PageHeader } from '@/components/page-header';
import { Chat } from './_components/chat';
import { getChatId, loadChat } from '@/tools/chatStore';
import { auth } from '@/auth';
import { NonUserChat } from './_components/non-user-chat';

export default async function ChatPage() {
  const session = await auth();
  const chatId = await getChatId();
  const initialMessages = await loadChat(chatId);
  return (
    <div>
      <PageHeader
        title="ActEvo Workout Assistant"
        description="I'm here to help you with anything regarding ActEvo. It's important to keep in mind that I have been trained to stick to topics related to working out and ActEvo. Ask away! 💪"
      />

      {session ? (
        <Chat chatId={chatId} initialMessages={initialMessages} />
      ) : (
        <NonUserChat />
      )}
    </div>
  );
}
