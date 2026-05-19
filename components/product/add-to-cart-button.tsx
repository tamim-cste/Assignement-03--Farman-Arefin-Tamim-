'use client';

import { Product } from '@/lib/api';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    toast.success(`${product.title} added to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-3">
      
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Qty:</span>
        <div className="flex items-center border rounded-xl overflow-hidden" style={{ borderColor: 'var(--surface-border)' }}>
          <button onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-9 h-9 flex items-center justify-center text-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            style={{ color: 'var(--text-secondary)' }}>−</button>
          <span className="w-10 text-center text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{qty}</span>
          <button onClick={() => setQty(q => q + 1)}
            className="w-9 h-9 flex items-center justify-center text-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            style={{ color: 'var(--text-secondary)' }}>+</button>
        </div>
      </div>

      <button onClick={handleAdd}
        className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-95"
        style={{ background: added ? '#10B981' : 'var(--accent)', color: '#fff' }}>
        {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
        {added ? 'Added to cart!' : `Add ${qty > 1 ? `${qty} items` : ''} to cart`}
      </button>
    </div>
  );
}
