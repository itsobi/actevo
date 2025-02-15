'use client';

import { PanelRight, Search } from 'lucide-react';
import { Button } from './ui/button';
import { useSidebar } from './ui/sidebar';
import { Input } from './ui/input';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
export default function Header() {
  const { toggleSidebar, isMobile } = useSidebar();
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="flex items-center py-2">
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="ml-2"
          onClick={() => toggleSidebar()}
        >
          <PanelRight />
        </Button>
      )}

      <div className="flex-1 flex justify-center">
        <div
          className={cn(
            'flex items-center border rounded-full w-full mx-2 max-w-xl',
            isFocused && 'border-gray-400'
          )}
        >
          <Input
            placeholder="Search"
            className="border-none flex-1 focus:outline-none p-2"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Button variant="ghost" size="icon">
            <Search />
          </Button>
        </div>
      </div>

      <Link
        href="/profile"
        className="hidden md:block border rounded-full py-2 px-4 hover:bg-muted-foreground/10 mr-2"
      >
        🎥 Create
      </Link>

      <Avatar className="mr-2">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
