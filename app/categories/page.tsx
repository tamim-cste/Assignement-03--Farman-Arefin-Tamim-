import { api } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default async function CategoriesPage() {
  const categories = await api.categories.getAll();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 w-full">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>Browse</p>
        <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          All Categories
        </h1>
        <p className="mt-2 text-base" style={{ color: 'var(--text-secondary)' }}>
          {categories.length} categories to explore
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((cat, i) => (
          <Link key={cat.id} href={`/categories/${cat.id}`}
            className={`group relative block h-60 rounded-2xl overflow-hidden fade-up delay-${Math.min(i+1,8)}`}>
            <Image src={cat.image} alt={cat.name} fill
              className="object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 transition-all duration-300"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)' }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(to top, rgba(79,70,229,0.85) 0%, transparent 65%)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
              <h3 className="text-lg font-bold text-white">{cat.name}</h3>
              <span className="w-8 h-8 rounded-full flex items-center justify-center translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.2)' }}>
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
