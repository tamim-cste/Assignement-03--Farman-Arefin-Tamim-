import { PageLoadingScreen } from '@/components/ui/skeleton';
export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-2">
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-9 w-52 rounded-xl" />
        <div className="skeleton h-4 w-36 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-60 rounded-2xl skeleton" style={{ animationDelay: `${i * 0.07}s` }} />
        ))}
      </div>
    </div>
  );
}
