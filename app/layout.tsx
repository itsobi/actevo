import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/components/header';
import { Toaster } from 'sonner';

import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'ActEvo',
  description:
    'Activity and evolution all in one. Get healthy and moving. Brought to you by @justobii',
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${lato.className}`}>
        <SidebarProvider>
          <div className="flex h-full w-full">
            <AppSidebar session={session} />
            <div className="flex flex-col flex-1">
              <Header session={session} />
              <main className="flex-1 px-4 pb-8 max-w-7xl mx-auto w-full overflow-auto">
                {children}
              </main>
              <Toaster richColors />
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
