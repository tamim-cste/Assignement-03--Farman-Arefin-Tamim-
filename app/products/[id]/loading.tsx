export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      
      <div className="flex items-center gap-2 mb-8">
        {[60, 40, 80, 140].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            {i > 0 && <div className="skeleton w-3 h-3 rounded-full" />}
            <div className="skeleton rounded" style={{ height: 14, width: w }} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-16">
        
        <div className="space-y-3">
          <div className="aspect-square rounded-3xl skeleton" />
          <div className="flex gap-2">
            {[1,2,3].map(i => <div key={i} className="w-16 h-16 rounded-xl skeleton" />)}
          </div>
        </div>

        
        <div className="space-y-4 pt-2">
          <div className="skeleton h-6 w-24 rounded-full" />
          <div className="skeleton h-10 w-full rounded-xl" />
          <div className="skeleton h-6 w-3/4 rounded-xl" />
          <div className="skeleton h-5 w-28 rounded" />
          <div className="skeleton h-9 w-32 rounded-xl" />
          <div className="space-y-2 mt-4">
            {[100,90,85].map((w,i) => <div key={i} className="skeleton h-3 rounded" style={{width:`${w}%`}} />)}
          </div>
          <div className="border-t pt-6 space-y-3" style={{borderColor:'var(--surface-border)'}}>
            <div className="skeleton h-10 w-32 rounded-xl" />
            <div className="skeleton h-14 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
