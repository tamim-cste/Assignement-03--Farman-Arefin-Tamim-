'use client';

import { useActionState } from 'react';
import { login } from '@/app/actions/auth';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ShoppingBag, Loader2 } from 'lucide-react';
import { useState, Suspense } from 'react';

function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '';
  const [state, formAction, isPending] = useActionState(login, { error: '' });
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--surface-secondary)' }}>
      
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #0F0A1E 0%, #1a1245 50%, #312e81 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #818CF8, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #C4B5FD, transparent 70%)' }} />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link href="/" className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(129,140,248,0.2)', border: '1px solid rgba(129,140,248,0.3)' }}>
              <ShoppingBag className="w-5 h-5" style={{ color: '#A5B4FC' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#fff' }}>
              Kena<span style={{ color: '#A5B4FC' }}>Kata</span>
            </span>
          </Link>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}>
            Shop smarter,<br />live better.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Thousands of products. <br />
            Delivered to your door.
          </p>

          <div className="mt-14 space-y-4">
            {['Free shipping on orders $99+', '30-day easy returns', 'Secure checkout always'].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(129,140,248,0.25)' }}>
                  <span style={{ color: '#A5B4FC', fontSize: '10px' }}>✓</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        
        <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--accent)' }}>
            Kena<span style={{ color: 'var(--text-primary)' }}>Kata</span>
          </span>
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Welcome back
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Sign in to continue shopping
            </p>
          </div>

          {from === '/checkout' && (
            <div className="mb-5 flex items-center gap-3 p-4 rounded-2xl border"
              style={{ background: 'var(--accent-light)', borderColor: 'var(--accent)', borderWidth: 1 }}>
              <ShoppingBag className="w-4 h-4 shrink-0" style={{ color: 'var(--accent)' }} />
              <p className="text-sm" style={{ color: 'var(--accent)' }}>
                Sign in to complete your purchase
              </p>
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="from" value={from} />

            {state?.error && (
              <div className="p-4 rounded-2xl border border-red-200 dark:border-red-800 text-sm"
                style={{ background: '#FEF2F2', color: '#B91C1C' }}>
                {state.error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wide"
                style={{ color: 'var(--text-secondary)' }}>Email</label>
              <input name="email" type="email" required autoComplete="email"
                placeholder="john@mail.com"
                className="w-full px-4 py-3.5 rounded-2xl border text-sm outline-none transition-all"
                style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)', color: 'var(--text-primary)' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--surface-border)'} />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wide"
                style={{ color: 'var(--text-secondary)' }}>Password</label>
              <div className="relative">
                <input name="password" type={showPass ? 'text' : 'password'} required
                  autoComplete="current-password" placeholder="••••••••"
                  className="w-full px-4 py-3.5 rounded-2xl border text-sm outline-none transition-all pr-12"
                  style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)', color: 'var(--text-primary)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--surface-border)'} />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-secondary)' }}>
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs mt-1.5" style={{ color: 'var(--text-secondary)' }}>
                Demo: <span className="font-mono" style={{ color: 'var(--accent)' }}>john@mail.com</span> / <span className="font-mono" style={{ color: 'var(--accent)' }}>changeme</span>
              </p>
            </div>

            <button type="submit" disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 mt-2"
              style={{ background: 'var(--accent)', color: '#fff' }}>
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {isPending ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <Link href={`/register${from ? `?from=${from}` : ''}`}
              className="font-semibold transition-colors"
              style={{ color: 'var(--accent)' }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: 'var(--surface-secondary)' }} />}>
      <LoginForm />
    </Suspense>
  );
}
