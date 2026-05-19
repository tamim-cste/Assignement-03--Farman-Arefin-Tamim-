'use client';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';

const AUTH_PATHS = ['/login', '/register'];

export function ShellLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = AUTH_PATHS.some(p => pathname.startsWith(p));

  if (isAuth) {
    return <main className="flex-1 flex flex-col">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
