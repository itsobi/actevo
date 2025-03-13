import { Loader } from 'lucide-react';

export function LoadingScreen({ message }: { message?: string }) {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-2">
      <Loader className="animate-spin" />
      <p className="text-sm text-muted-foreground">{message || 'Loading...'}</p>
    </div>
  );
}
