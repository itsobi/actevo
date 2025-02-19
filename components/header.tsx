'use client';

import { PanelRight, Search } from 'lucide-react';
import { Button } from './ui/button';
import { useSidebar } from './ui/sidebar';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import TypeCarousel from './carousel';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { toggleSidebar, isMobile } = useSidebar();
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  return (
    <div className="mb-2 sticky top-0 z-10 bg-background">
      <div className="flex justify-between items-center py-2 mb-2">
        <Button
          variant="ghost"
          size="icon"
          className="ml-2"
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

        <Avatar className="mr-2">
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback>J</AvatarFallback>
        </Avatar>
      </div>
      {isHomePage && (
        <div className="flex justify-center items-center">
          <TypeCarousel />
        </div>
      )}
    </div>
  );
}
