'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { PanelRight, Search, UserRoundX } from 'lucide-react';
import { Button } from './ui/button';
import { useSidebar } from './ui/sidebar';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import TypeCarousel from './carousel';
import { usePathname } from 'next/navigation';
import { signIn, useSession } from '@/lib/auth-client';
import { AvatarDropdown } from './avatar-dropdown';
import { toast } from 'sonner';

export default function Header() {
  const { data: session } = useSession();
  const { toggleSidebar } = useSidebar();
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  const handleSignIn = async () => {
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch (error) {
      toast.error('There was an issue signing you in.');
    }
  };

  return (
    <div className="mb-2 sticky top-0 z-10 bg-background lg:px-4">
      <div className="flex justify-between items-center py-2 mb-2">
        <Button
          variant="ghost"
          size="icon"
          className="mx-2"
          onClick={() => toggleSidebar()}
        >
          <PanelRight />
        </Button>

        <Link
          href="/"
          className="hidden md:block mx-2 text-muted-foreground font-semibold italic"
        >
          ActEvo
        </Link>

        <div className="flex flex-1 justify-center w-full">
          <div
            className={cn(
              'flex items-center border rounded-full mr-2 w-full max-w-2xl lg:ml-[60px]',
              isFocused && 'border-gray-400'
            )}
          >
            <input
              placeholder="Search"
              className="flex-1 bg-transparent focus:outline-none px-4 "
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => {
                setIsFocused(false);
              }}
            />
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search />
            </Button>
          </div>
        </div>

        <div className="flex items-center">
          <Link
            href="/ask-ai"
            className="hidden md:block border rounded-full py-2 px-4 hover:bg-muted-foreground/10 mr-2"
          >
            💡 Ask AI
          </Link>

          <Link
            href="/create"
            className="hidden md:block border rounded-full py-2 px-4 hover:bg-muted-foreground/10 mr-2"
          >
            🎥 Create
          </Link>
        </div>

        {session ? (
          <div className="mr-2 mt-1.5">
            <AvatarDropdown user={session.user} />
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSignIn}
                  variant={'ghost'}
                  size={'icon'}
                  className="mr-2"
                >
                  <UserRoundX />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs text-muted-foreground">Sign in</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {isHomePage && (
        <div className="flex justify-center items-center">
          <TypeCarousel />
        </div>
      )}
    </div>
  );
}
