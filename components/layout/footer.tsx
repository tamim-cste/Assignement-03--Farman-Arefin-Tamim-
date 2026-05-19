'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowRight, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { useState } from 'react';

const NAV = [
  {
    group: 'Shop',
    items: [
      { label: 'All Products',  href: '/products' },
      { label: 'New Arrivals',  href: '/products' },
      { label: 'Best Sellers',  href: '/products?sort=price-asc' },
      { label: 'Categories',   href: '/categories' },
    ],
  },
  {
    group: 'Account',
    items: [
      { label: 'Sign In',   href: '/login'    },
      { label: 'Register',  href: '/register' },
      { label: 'My Cart',   href: '/cart'     },
      { label: 'My Profile', href: '/profile' },
    ],
  },
  {
    group: 'Help',
    items: [
      { label: 'Shipping Policy', href: '#' },
      { label: 'Returns & Refunds', href: '#' },
      { label: 'Track Order',     href: '#' },
      { label: 'Contact Support', href: '#' },
    ],
  },
];

const SOCIALS = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter,   href: '#', label: 'Twitter'   },
  { icon: Facebook,  href: '#', label: 'Facebook'  },
  { icon: Youtube,   href: '#', label: 'YouTube'   },
];

const TRUST = [
  { emoji: '🚚', text: 'Free shipping $99+' },
  { emoji: '🔒', text: 'Secure checkout'    },
  { emoji: '↩️', text: '30-day returns'     },
  { emoji: '💬', text: '24/7 support'       },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--surface-border)' }}>

      
      <div style={{ background: 'var(--surface-secondary)', borderBottom: '1px solid var(--surface-border)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-4">
            {TRUST.map(t => (
              <div key={t.text} className="flex items-center gap-2.5">
                <span className="text-base">{t.emoji}</span>
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="mx-auto max-w-7xl px-4 sm:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-6">

          
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'var(--accent)', boxShadow: '0 4px 14px rgba(79,70,229,0.3)' }}
              >
                <ShoppingBag style={{ width: 18, height: 18, color: '#fff' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem' }}>
                <span style={{ color: 'var(--accent)' }}>Kena</span>
                <span style={{ color: 'var(--text-primary)' }}>Kata</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'var(--text-secondary)' }}>
              Your one-stop shop for premium products — curated for modern living, delivered fast.
            </p>

            
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-primary)' }}>
                Stay in the loop
              </p>
              {subscribed ? (
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                  style={{ background: '#ECFDF5', color: '#10B981' }}
                >
                  ✓ You're subscribed! Thanks.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all"
                    style={{
                      background:   'var(--surface-secondary)',
                      borderColor:  'var(--surface-border)',
                      color:        'var(--text-primary)',
                    }}
                    onFocus={e  => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={e   => (e.target.style.borderColor = 'var(--surface-border)')}
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center hover:opacity-90 transition-all active:scale-95"
                    style={{ background: 'var(--accent)', color: '#fff' }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
                  style={{ background: 'var(--surface-secondary)', border: '1px solid var(--surface-border)', color: 'var(--text-secondary)' }}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          
          {NAV.map(col => (
            <div key={col.group} className="lg:col-span-1">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-primary)' }}>
                {col.group}
              </p>
              <ul className="space-y-2.5">
                {col.items.map(item => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm inline-flex items-center gap-1.5 group transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)')}
                    >
                      <span
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        style={{ color: 'var(--accent)' }}
                      >→</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      
      <div style={{ borderTop: '1px solid var(--surface-border)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs order-2 sm:order-1" style={{ color: 'var(--text-secondary)' }}>
            © {year} KenaKata. All rights reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center order-1 sm:order-2">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
              <Link
                key={l}
                href="#"
                className="text-xs transition-colors hover:underline"
                style={{ color: 'var(--text-secondary)' }}
              >
                {l}
              </Link>
            ))}
            <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
              🇧🇩 Made in Bangladesh
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
