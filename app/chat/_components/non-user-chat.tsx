'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useChat } from '@ai-sdk/react';
import { toast } from 'sonner';
import { useEffect, useRef } from 'react';

export function NonUserChat() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: '/api/non-user-chat',
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col">
      <div className="overflow-y-auto h-[70vh] py-4 flex flex-col gap-4">
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
        {status === 'submitted' && (
          <div className="flex justify-start">
            <div className="border rounded p-4 max-w-[80%] bg-gray-300 animate-pulse">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          name="prompt"
          value={input}
          placeholder="Ask something..."
          onChange={handleInputChange}
          disabled={status === 'submitted'}
        />
      </form>
    </div>
  );
}
