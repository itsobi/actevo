'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';

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
} from '@/components/ui/sidebar';
import { routes, SidebarRoute } from '@/lib/routes';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { useState } from 'react';

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

export function AppSidebar() {
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
          <SidebarGroupLabel>Create</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/create">
                    <span>🎥</span>
                    <span>Create</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
