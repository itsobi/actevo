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
import { AvatarDropdown } from './avatar-dropdown';
import { signInAction } from '@/lib/actions/auth-actions';
import { Session } from 'next-auth';

const userOnlyRoutes = [
  {
    href: '/chat',
    label: 'Chat',
    emoji: '💬',
  },
  {
    href: '/create',
    label: 'Create',
    emoji: '🎥',
  },
];

export default function Header({ session }: { session: Session | null }) {
  const { toggleSidebar } = useSidebar();
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

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
              'flex items-center border rounded-full mr-2 w-full max-w-4xl lg:ml-20',
              isFocused && 'border-blue-200'
            )}
          >
            <input
              placeholder="Search"
              className="flex-1 bg-transparent focus:outline-none px-4"
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
          {userOnlyRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="hidden md:block border rounded-full py-2 px-4 hover:bg-muted-foreground/10 mr-2"
            >
              {route.emoji} {route.label}
            </Link>
          ))}
        </div>

        {session ? (
          <div className="mr-2 mt-1.5">
            <AvatarDropdown user={session.user} />
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <form
                  action={async () => {
                    await signInAction('google');
                  }}
                >
                  <Button
                    type="submit"
                    variant={'ghost'}
                    size={'icon'}
                    className="mr-2"
                  >
                    <UserRoundX />
                  </Button>
                </form>
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
