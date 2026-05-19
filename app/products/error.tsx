'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: '#FEF2F2' }}>
        <AlertTriangle className="w-8 h-8" style={{ color: '#EF4444' }} />
      </div>
      <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Failed to load products</h2>
      <p className="text-sm mb-6 max-w-sm" style={{ color: 'var(--text-secondary)' }}>
        There was a problem connecting to the server. Please try again.
      </p>
      <div className="flex gap-3">
        <button onClick={reset} className="px-5 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: 'var(--accent)', color: '#fff' }}>
          Try again
        </button>
        <Link href="/" className="px-5 py-2.5 rounded-xl text-sm font-semibold border"
          style={{ borderColor: 'var(--surface-border)', color: 'var(--text-primary)' }}>
          Go home
        </Link>
      </div>
    </div>
  );
}
