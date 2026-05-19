import { PageLoader } from '@/components/ui/skeleton';
export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageLoader label="Loading categories…" />
    </div>
  );
}
