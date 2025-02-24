'use client';

import { useChat } from '@ai-sdk/react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

export default function AIChatConversation() {
  const { messages, input, handleInputChange, handleSubmit, status, stop } =
    useChat({
      api: '/api/chat',
    });

  console.log(messages);
  return (
    <div className="flex flex-col">
      <div className="overflow-y-auto h-[40vh] py-4 flex flex-col gap-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              'flex',
              m.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              key={m.id}
              className={cn(
                'border rounded p-4 max-w-[80%]',
                m.role === 'user' ? 'bg-blue-300 text-white' : 'bg-gray-300'
              )}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          name="prompt"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
