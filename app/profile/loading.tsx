export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 w-full space-y-4">
      <div className="rounded-3xl border overflow-hidden" style={{ borderColor: 'var(--surface-border)', background: 'var(--surface)' }}>
        <div className="h-36 skeleton" />
        <div className="px-8 pb-8 pt-4 space-y-4">
          <div className="flex items-end justify-between -mt-10">
            <div className="w-24 h-24 rounded-2xl skeleton" />
            <div className="skeleton h-9 w-24 rounded-xl mb-2" />
          </div>
          <div className="skeleton h-7 w-48 rounded" />
          <div className="skeleton h-4 w-36 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {[1,2,3,4].map(i => <div key={i} className="skeleton h-16 rounded-2xl" />)}
          </div>
        </div>
      </div>
      <div className="skeleton h-48 rounded-2xl" />
    </div>
  );
}
