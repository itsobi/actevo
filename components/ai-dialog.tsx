'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAIDialogStore } from '@/store';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import DialogAIChat from './dialog-ai-chat';

export function AIDialog({ session }: { session: Session | null }) {
  const { open, setOpen } = useAIDialogStore();
  const router = useRouter();

  const handleFullScreen = () => {
    setOpen(false);
    router.push('/ask-ai');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="hidden">Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">
            💡 ActEvo Workout Assistant
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col justify-center items-center w-full pt-4">
              <p className="text-center text-muted-foreground w-[400px]">
                I&apos;m here to help you with anything regarding ActEvo.
                It&apos;s important to keep in mind that I have been trained to
                stick to topics related to working out and{' '}
                <span className="italic">ActEvo</span>. Ask away! 💪
              </p>
              <Button
                onClick={handleFullScreen}
                variant="link"
                className="text-blue-300 text-xs"
              >
                Full Screen
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogAIChat />
      </DialogContent>
    </Dialog>
  );
}
