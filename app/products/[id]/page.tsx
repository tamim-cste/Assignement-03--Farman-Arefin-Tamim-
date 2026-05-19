import { api } from '@/lib/api';
import { cleanImage } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToCartButton } from '@/components/product/add-to-cart-button';
import { ProductCard } from '@/components/product/product-card';
import { Star, Shield, Truck, RefreshCw, ChevronRight } from 'lucide-react';
import { ProductGallery } from '@/components/product/product-gallery';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await api.products.getById(id);
    return { title: `${product.title} — KenaKata` };
  } catch {
    return { title: 'Product — KenaKata' };
  }
}

function getRating(id: number) {
  const ratings = [4.2, 4.5, 4.7, 4.8, 4.9, 4.3, 4.6, 4.4];
  const counts = [48, 124, 87, 203, 56, 312, 91, 178];
  const idx = id % ratings.length;
  return { rating: ratings[idx], count: counts[idx] };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const product = await api.products.getById(id);
    const related = await api.products.getAll({ categoryId: product.category.id.toString(), limit: 5 });
    const filteredRelated = related.filter(p => p.id !== product.id).slice(0, 4);
    const images = product.images.map(cleanImage);
    const { rating, count } = getRating(product.id);

    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        
        <nav className="flex items-center gap-1.5 text-xs mb-8" style={{ color: 'var(--text-secondary)' }}>
          <Link href="/" className="hover:underline" style={{ color: 'var(--accent)' }}>Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:underline">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/categories/${product.category.id}`} className="hover:underline">{product.category.name}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="truncate max-w-[200px]" style={{ color: 'var(--text-primary)' }}>{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-20">

          
          <ProductGallery images={images} title={product.title} />

          
          <div className="flex flex-col">
            <Link href={`/categories/${product.category.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-4 transition-colors"
              style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
              {product.category.name}
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              {product.title}
            </h1>

            
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? 'text-amber-400 fill-current' : 'text-gray-200 fill-current dark:text-gray-700'}`} />
                ))}
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{rating}</span>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>({count} reviews)</span>
            </div>

            <div className="text-4xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
              ${product.price.toFixed(2)}
            </div>

            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              {product.description}
            </p>

            <div className="border-t pt-8 mb-8" style={{ borderColor: 'var(--surface-border)' }}>
              <AddToCartButton product={product} />
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: Truck, label: 'Free shipping', sub: 'Orders $99+' },
                { icon: Shield, label: '1-year warranty', sub: 'Full coverage' },
                { icon: RefreshCw, label: 'Easy returns', sub: '30-day policy' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center p-3 rounded-2xl border"
                  style={{ background: 'var(--surface-secondary)', borderColor: 'var(--surface-border)' }}>
                  <Icon className="w-5 h-5 mb-1.5" style={{ color: 'var(--accent)' }} />
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        {filteredRelated.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredRelated.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    );
  } catch {
    return notFound();
  }
}
