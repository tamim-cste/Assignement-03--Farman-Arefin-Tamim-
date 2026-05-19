export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="skeleton h-7 w-32 rounded mb-8" />
      <div className="flex items-center gap-2 mb-8">
        {[1,2].map(i => <div key={i} className="flex items-center gap-2"><div className="skeleton w-8 h-8 rounded-full" /><div className="skeleton h-4 w-20 rounded hidden sm:block" />{i===1&&<div className="skeleton h-px w-14 mx-1" />}</div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border p-6 space-y-4" style={{ borderColor: 'var(--surface-border)', background: 'var(--surface)' }}>
            {[1,2,3,4].map(i => <div key={i} className="skeleton h-12 rounded-xl" />)}
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-2xl border p-5 space-y-3" style={{ borderColor: 'var(--surface-border)', background: 'var(--surface)' }}>
            {[1,2,3,4,5].map(i => <div key={i} className="skeleton h-4 rounded" />)}
          </div>
        </div>
      </div>
    </div>
  );
}
