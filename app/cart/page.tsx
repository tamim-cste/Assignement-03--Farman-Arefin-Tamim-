'use client';

import { useCartStore } from '@/lib/store';
import { cleanImage } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] px-4 text-center">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
          style={{ background: 'var(--surface-secondary)', border: '1px solid var(--surface-border)' }}>
          <ShoppingBag className="w-10 h-10" style={{ color: 'var(--text-secondary)' }} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          Your cart is empty
        </h1>
        <p className="text-sm mb-8 max-w-xs" style={{ color: 'var(--text-secondary)' }}>
          Looks like you haven't added anything yet. Let's change that!
        </p>
        <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold"
          style={{ background: 'var(--accent)', color: '#fff' }}>
          Start Shopping
        </Link>
      </div>
    );
  }

  const subtotal = totalPrice();
  const shipping = subtotal >= 99 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/products" className="p-2 rounded-xl border transition-all hover:bg-gray-50 dark:hover:bg-gray-900"
          style={{ borderColor: 'var(--surface-border)' }}>
          <ArrowLeft className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
        </Link>
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          Shopping Cart
        </h1>
        <span className="text-sm px-2.5 py-1 rounded-full font-semibold"
          style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-10 lg:items-start">
        
        <div className="lg:col-span-8 space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 p-4 rounded-2xl border"
              style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}>
              <Link href={`/products/${item.product.id}`}
                className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden"
                style={{ background: 'var(--surface-secondary)' }}>
                <Image src={cleanImage(item.product.images[0])} alt={item.product.title} fill className="object-cover" />
              </Link>

              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--accent)' }}>
                  {item.product.category.name}
                </p>
                <Link href={`/products/${item.product.id}`}
                  className="text-sm font-semibold leading-snug line-clamp-2 hover:underline"
                  style={{ color: 'var(--text-primary)' }}>
                  {item.product.title}
                </Link>
                <p className="text-base font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex flex-col items-end justify-between shrink-0">
                <button onClick={() => removeItem(item.product.id)}
                  className="p-1.5 rounded-lg transition-colors hover:bg-red-50 dark:hover:bg-red-900/20">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
                <div className="flex items-center border rounded-xl overflow-hidden"
                  style={{ borderColor: 'var(--surface-border)' }}>
                  <button onClick={() => item.quantity > 1 ? updateQuantity(item.product.id, item.quantity - 1) : removeItem(item.product.id)}
                    className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    style={{ color: 'var(--text-secondary)' }}>
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {item.quantity}
                  </span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    style={{ color: 'var(--text-secondary)' }}>
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="mt-8 lg:col-span-4 lg:mt-0">
          <div className="rounded-2xl border p-6 sticky top-24"
            style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}>
            <h2 className="text-base font-bold mb-5" style={{ color: 'var(--text-primary)' }}>Order Summary</h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal ({items.reduce((t, i) => t + i.quantity, 0)} items)</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                <span className={`font-semibold ${shipping === 0 ? 'text-green-500' : ''}`} style={{ color: shipping === 0 ? '#10B981' : 'var(--text-primary)' }}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Add ${(99 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
            </div>

            
            <div className="flex gap-2 mb-5">
              <div className="flex items-center gap-2 flex-1 px-3 py-2.5 rounded-xl border text-sm"
                style={{ background: 'var(--surface-secondary)', borderColor: 'var(--surface-border)', color: 'var(--text-secondary)' }}>
                <Tag className="w-4 h-4" />
                <input placeholder="Coupon code" className="bg-transparent outline-none flex-1 text-sm"
                  style={{ color: 'var(--text-primary)' }} />
              </div>
              <button className="px-3 py-2.5 rounded-xl text-sm font-semibold border transition-all"
                style={{ borderColor: 'var(--surface-border)', color: 'var(--text-primary)' }}>Apply</button>
            </div>

            <div className="flex justify-between pt-4 border-t mb-5" style={{ borderColor: 'var(--surface-border)' }}>
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Total</span>
              <span className="text-xl font-bold" style={{ color: 'var(--accent)' }}>${total.toFixed(2)}</span>
            </div>

            <Link href="/checkout"
              className="block w-full text-center py-3.5 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'var(--accent)', color: '#fff' }}>
              Proceed to Checkout
            </Link>

            <Link href="/products" className="block w-full text-center mt-3 py-2.5 rounded-2xl text-sm font-medium transition-colors border"
              style={{ borderColor: 'var(--surface-border)', color: 'var(--text-secondary)' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
