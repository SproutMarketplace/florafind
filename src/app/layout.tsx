
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { AuthProvider } from '@/hooks/use-auth.tsx';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// This is a separate component because the root layout cannot be a client component
// if we want to export metadata.
function AppContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run this check on the client
    if (typeof window !== 'undefined') {
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
      
      // If the user hasn't seen the welcome screen and isn't already on it, redirect them.
      if (!hasSeenWelcome && pathname !== '/welcome') {
        router.replace('/welcome');
      }
    }
  }, [router, pathname]);

  return (
    <>
      <Header />
      {children}
      <Footer />
      <Toaster />
    </>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>FloraFind</title>
        <meta name="description" content="AI-powered guide to the botanical world" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased h-full flex flex-col bg-background">
        <AuthProvider>
          <AppContent>{children}</AppContent>
        </AuthProvider>
      </body>
    </html>
  );
}
