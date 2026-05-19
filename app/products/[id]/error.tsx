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
      <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Product not found</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        This product may have been removed or the link is invalid.
      </p>
      <Link href="/products" className="px-5 py-2.5 rounded-xl text-sm font-semibold"
        style={{ background: 'var(--accent)', color: '#fff' }}>
        Back to products
      </Link>
    </div>
  );
}
