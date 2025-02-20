'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

import { signOut } from '@/lib/auth-client';

import { User } from 'better-auth';
import { LogOut } from 'lucide-react';

interface AvatarDropdownProps {
  user: User;
}

export function AvatarDropdown({ user }: AvatarDropdownProps) {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-9 h-9">
          <AvatarImage src={user.image ?? ''} referrerPolicy="no-referrer" />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-1">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          <LogOut />
          <span className="">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
