import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { ShellLayout } from '@/components/layout/shell-layout';

export const metadata: Metadata = {
  title: 'KenaKata — Modern Storefront',
  description: 'Your one-stop shop for premium products at great prices.',
  icons: [
    { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
    { rel: 'shortcut icon', url: '/favicon.svg', type: 'image/svg+xml' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <Providers>
          <ShellLayout>{children}</ShellLayout>
        </Providers>
      </body>
    </html>
  );
}
