'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: '#FEF2F2' }}
      >
        <AlertTriangle className="w-8 h-8" style={{ color: '#EF4444' }} />
      </div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
        Something went wrong
      </h2>
      <p className="text-sm mb-2 max-w-sm" style={{ color: 'var(--text-secondary)' }}>
        An unexpected error occurred. This might be a temporary issue — please try again.
      </p>
      {error?.digest && (
        <p className="text-xs mb-6 font-mono" style={{ color: 'var(--text-secondary)' }}>
          Error ID: {error.digest}
        </p>
      )}
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:opacity-80"
          style={{ borderColor: 'var(--surface-border)', color: 'var(--text-primary)' }}
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
