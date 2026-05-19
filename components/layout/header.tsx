'use client';

import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { ShoppingCart, Moon, Sun, Search, Menu, X, UserCircle, LogIn } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function Header() {
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((t, i) => t + i.quantity, 0);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'All Products' },
    { href: '/categories', label: 'Categories' },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-600 text-white shadow-sm">
        <Marquee pauseOnHover speed={40} className="h-12 overflow-hidden text-sm font-semibold uppercase tracking-[0.08em] px-4 leading-none" gradient={false}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 mx-2 text-xs sm:text-sm">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-rose-300 shadow-sm" />
            Flash Sale — 20% off selected items
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 mx-2 text-xs sm:text-sm">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-sm" />
            Free shipping on orders over $99
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 mx-2 text-xs sm:text-sm">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-200 shadow-sm" />
            Flash sale live now
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 mx-2 text-xs sm:text-sm">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-violet-200 shadow-sm" />
            24/7 customer support available
          </span>
        </Marquee>
      </div>

      <div className="h-16 w-full border-b border-slate-200 bg-white shrink-0 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="text-indigo-600">Kena</span>
                <span className="text-slate-900 dark:text-white">Kata</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 border-l border-slate-200 dark:border-slate-700 pl-6 h-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors"
                  style={{ color: isActive(link.href) ? 'var(--accent)' : 'var(--text-secondary)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="p-2 text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
              title="Search"
            >
              <Search className="h-5 w-5" />
            </Link>

            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
                aria-label="Toggle theme"
              >
                {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}

            <Link
              href="/cart"
              className="relative flex items-center gap-2 p-2 text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">Cart</span>
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 left-5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              href="/profile"
              className="hidden sm:flex items-center p-2 text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
              title="My account"
            >
              <UserCircle className="h-6 w-6" />
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 md:hidden text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="relative ml-auto w-72 h-full shadow-2xl flex flex-col bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  <span className="text-indigo-600">Kena</span>
                  <span className="text-slate-900 dark:text-white">Kata</span>
                </span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col p-4 gap-2 flex-1 overflow-y-auto">
              {[
                ...navLinks,
                { href: '/profile', label: 'My Account' },
                { href: '/cart', label: 'Cart' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-2xl text-sm font-medium transition-colors"
                  style={{
                    background: isActive(link.href) ? 'var(--accent-light)' : 'transparent',
                    color: isActive(link.href) ? 'var(--accent)' : 'var(--text-primary)',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-semibold border border-slate-200 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <LogIn className="w-4 h-4" />
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
