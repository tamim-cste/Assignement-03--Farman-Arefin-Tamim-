import { api } from '@/lib/api';
import { ProductCard } from '@/components/product/product-card';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const category = await api.categories.getById(id);
    return { title: `${category.name} — KenaKata` };
  } catch {
    return { title: 'Category — KenaKata' };
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const [category, products] = await Promise.all([
      api.categories.getById(id),
      api.products.getAll({ categoryId: id }),
    ]);

    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 w-full">
        
        <div className="relative h-52 rounded-3xl overflow-hidden mb-10">
          <Image src={category.image} alt={category.name} fill className="object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)' }} />
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <Link href="/categories" className="flex items-center gap-1.5 text-xs font-medium text-white/70 mb-3 w-fit hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> All Categories
            </Link>
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {category.name}
            </h1>
            <p className="text-white/70 text-sm mt-1">{products.length} products</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📦</p>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No products here yet</h3>
            <Link href="/products" className="px-5 py-2.5 rounded-xl text-sm font-semibold mt-4 inline-block"
              style={{ background: 'var(--accent)', color: '#fff' }}>
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    );
  } catch {
    return notFound();
  }
}
