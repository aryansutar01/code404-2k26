import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Code404',
  description: 'Experience the fusion of Nature and Technology. A premium tech event.',
  other: {
    'darkreader-lock': 'true',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(
        inter.variable,
        spaceGrotesk.variable,
        "antialiased min-h-screen bg-midnight-blue text-soft-white overflow-x-hidden"
      )}
        suppressHydrationWarning
      >
        {children}
        <Toaster
          position="top-right"
          richColors
          theme="dark"
        />
      </body>
    </html>
  );
}
