'use client';

export function ProductCardSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}
    >
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-2.5">
        <div className="skeleton h-3 w-1/3 rounded-full" />
        <div className="skeleton h-4 w-3/4 rounded-lg" />
        <div className="skeleton h-3 w-1/2 rounded-lg" />
        <div className="flex justify-between items-center pt-1">
          <div className="skeleton h-6 w-16 rounded-lg" />
          <div className="skeleton h-9 w-9 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageLoader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[58vh] gap-5 px-4">
      
      <div className="relative w-16 h-16">
        <div
          className="absolute inset-0 rounded-2xl border-2 border-dashed"
          style={{
            borderColor: 'var(--accent)',
            animation: 'spin 1.8s linear infinite',
          }}
        />
        <div
          className="absolute inset-[5px] rounded-xl flex items-center justify-center"
          style={{ background: 'var(--accent-light)' }}
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: 'var(--accent)' }}
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Please wait a moment…</p>
      </div>

      <div className="w-full max-w-xs space-y-2">
        {[100, 72, 88].map((w, i) => (
          <div
            key={i}
            className="skeleton h-2.5 rounded-full"
            style={{ width: `${w}%`, animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export function ProductsPageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="space-y-2">
          <div className="skeleton h-7 w-48 rounded-lg" />
          <div className="skeleton h-4 w-32 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="skeleton h-10 w-48 rounded-xl" />
          <div className="skeleton h-10 w-32 rounded-xl" />
        </div>
      </div>

      <div className="flex gap-6 lg:gap-8">
        <aside className="hidden md:block w-56 shrink-0">
          <div
            className="rounded-2xl p-5 border space-y-4"
            style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}
          >
            <div className="skeleton h-5 w-20 rounded" />
            {[90, 65, 80, 70, 75].map((w, i) => (
              <div key={i} className="skeleton h-8 rounded-xl" style={{ width: `${w}%` }} />
            ))}
            <div className="pt-2 space-y-2">
              <div className="skeleton h-4 w-28 rounded" />
              <div className="flex gap-2">
                <div className="skeleton h-9 flex-1 rounded-xl" />
                <div className="skeleton h-9 flex-1 rounded-xl" />
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <ProductGridSkeleton count={12} />
        </div>
      </div>
    </div>
  );
}
