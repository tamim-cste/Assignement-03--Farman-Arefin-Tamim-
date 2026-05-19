export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="skeleton w-9 h-9 rounded-xl" />
        <div className="skeleton h-7 w-40 rounded-xl" />
      </div>
      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8 space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl border" style={{ borderColor: 'var(--surface-border)', background: 'var(--surface)' }}>
              <div className="w-24 h-24 rounded-xl skeleton shrink-0" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="skeleton h-3 w-1/4 rounded" />
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-5 w-20 rounded mt-3" />
              </div>
              <div className="flex flex-col items-end justify-between shrink-0">
                <div className="skeleton w-8 h-8 rounded-lg" />
                <div className="skeleton w-24 h-8 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="rounded-2xl border p-6 space-y-4" style={{ borderColor: 'var(--surface-border)', background: 'var(--surface)' }}>
            <div className="skeleton h-5 w-32 rounded" />
            {[1, 2, 3].map(i => <div key={i} className="skeleton h-4 rounded" />)}
            <div className="skeleton h-12 rounded-2xl mt-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
