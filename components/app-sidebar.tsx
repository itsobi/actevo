'use client';

import { ChevronDown, ChevronRight, Command } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { routes, SidebarRoute } from '@/lib/routes';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAIDialogStore } from '@/store';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';

function RouteItem({ route }: { route: SidebarRoute }) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible
      key={route.title}
      className="group/collapsible"
      open={open}
      onOpenChange={setOpen}
    >
      <SidebarMenuItem key={route.title}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span>{route.emoji}</span>
              <span>{route.title}</span>
            </div>
            {open ? <ChevronDown /> : <ChevronRight />}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {route.subroutes.map((subroute) => (
              <SidebarMenuSubItem key={subroute.title}>
                <SidebarMenuSubButton asChild>
                  <a href={subroute.href}>{subroute.title}</a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function AppSidebar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const { open, setOpen } = useAIDialogStore();
  const { toggleSidebar, isMobile } = useSidebar();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold italic">
            ActEvo
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <span>🏠</span>
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Exercises</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <RouteItem key={route.title} route={route} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>AI/Video Contributions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    toggleSidebar();
                    setOpen(!open);
                  }}
                  className={cn(
                    pathname === '/ask-ai' && 'opacity-50 pointer-events-none'
                  )}
                >
                  <span>💡</span>
                  <span>Ask AI</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(!session && 'opacity-50 pointer-events-none')}
                >
                  <Link href="/create">
                    <span>🎥</span>
                    <span>Create</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            {!isMobile && (
              <div className="pt-16 flex flex-col justify-center items-center">
                <p className="text-sm text-muted-foreground">Shortcuts</p>
                <span className="flex items-center gap-0.5 text-muted-foreground">
                  <Command className="w-4 h-4" />
                  <span>+ B: open/close sidebar</span>
                </span>
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
