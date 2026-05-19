'use client';

import { cleanImage } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/api';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useState } from 'react';

function getRating(id: number) {
  const ratings = [4.2, 4.5, 4.7, 4.8, 4.9, 4.3, 4.6, 4.4];
  const counts = [48, 124, 87, 203, 56, 312, 91, 178];
  const idx = id % ratings.length;
  return { rating: ratings[idx], count: counts[idx] };
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const imageUrl = cleanImage(product.images[0]);
  const addItem = useCartStore((s) => s.addItem);
  const [wished, setWished] = useState(false);
  const { rating, count } = getRating(product.id);
  const delay = `delay-${Math.min(index + 1, 8)}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.title} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWished(w => !w);
    toast.success(wished ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <Link href={`/products/${product.id}`}
      className={`group block w-full mx-auto rounded-2xl overflow-hidden border transition-all duration-300 fade-up ${delay}`}
      style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(79,70,229,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--surface-border)'; e.currentTarget.style.boxShadow = 'none'; }}>

      
      <div className="aspect-square relative overflow-hidden" style={{ background: 'var(--surface-secondary)' }}>
        <Image src={imageUrl} alt={product.title} fill className="object-cover transition-transform duration-500 group-hover:scale-108"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw" />

        
        <div className="absolute inset-0 flex items-end justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)' }}>
          <button onClick={handleWishlist}
            className="w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-sm transition-colors"
            style={{ background: wished ? 'rgba(239,68,68,0.9)' : 'rgba(255,255,255,0.9)', color: wished ? '#fff' : '#374151' }}>
            <Heart className={`w-4 h-4 ${wished ? 'fill-current' : ''}`} />
          </button>
          <button onClick={handleAddToCart}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-sm transition-all"
            style={{ background: 'var(--accent)', color: '#fff' }}>
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to cart
          </button>
        </div>

        
        <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold px-2 py-1 rounded-full"
          style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
          {product.category.name}
        </span>
      </div>

      
      <div className="p-4">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2 mb-2 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
          style={{ color: 'var(--text-primary)' }}>
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          {[1,2,3,4,5].map(s => (
            <Star key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? 'text-amber-400 fill-current' : 'text-gray-200 fill-current dark:text-gray-700'}`} />
          ))}
          <span className="text-[11px] ml-1" style={{ color: 'var(--text-secondary)' }}>({count})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            ${product.price.toFixed(2)}
          </span>
          <button onClick={handleAddToCart}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all sm:hidden"
            style={{ background: 'var(--accent)', color: '#fff' }}>
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
