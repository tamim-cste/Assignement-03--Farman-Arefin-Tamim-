'use client';

import { useCartStore } from '@/lib/store';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CreditCard, CheckCircle2, Lock, Package, MapPin, User, Loader2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { cleanImage } from '@/lib/utils';
import Image from 'next/image';

type Step = 'address' | 'payment' | 'success';
type AddrForm = { name: string; email: string; address: string; city: string; zip: string };
type CardForm = { holder: string; number: string; expiry: string; cvc: string };

function Field({
  label, name, type = 'text', placeholder, autoComplete, inputMode, value, onChange, error, colSpan = 2,
}: {
  label: string; name: string; type?: string; placeholder: string;
  autoComplete?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  value: string; onChange: (v: string) => void; error?: string; colSpan?: 1 | 2;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ gridColumn: `span ${colSpan}` }}>
      <label
        className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
        style={{
          background:   'var(--surface-secondary)',
          borderColor:  error ? '#F87171' : focused ? 'var(--accent)' : 'var(--surface-border)',
          color:        'var(--text-primary)',
        }}
      />
      {error && <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>{error}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [mounted, setMounted]       = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [step, setStep]             = useState<Step>('address');
  const [errors, setErrors]         = useState<Record<string, string>>({});

  const [addr, setAddr] = useState<AddrForm>({ name: '', email: '', address: '', city: '', zip: '' });
  const [card, setCard] = useState<CardForm>({ holder: '', number: '', expiry: '', cvc: '' });

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const subtotal = totalPrice();
  const shipping = subtotal >= 99 ? 0 : 9.99;
  const total    = subtotal + shipping;

  
  const validateAddr = () => {
    const e: Record<string, string> = {};
    if (!addr.name.trim())    e.name    = 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr.email)) e.email = 'Valid email is required';
    if (!addr.address.trim()) e.address = 'Street address is required';
    if (!addr.city.trim())    e.city    = 'City is required';
    if (!addr.zip.trim())     e.zip     = 'ZIP / Postal code is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateCard = () => {
    const e: Record<string, string> = {};
    if (!card.holder.trim())                         e.holder = 'Name on card is required';
    if (card.number.replace(/\s/g, '').length < 16) e.number = 'Enter a valid 16-digit card number';
    if (!/^\d{2}\/\d{2}$/.test(card.expiry))        e.expiry = 'Format: MM/YY';
    if (card.cvc.length < 3)                         e.cvc    = '3-digit CVC required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAddrSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateAddr()) { setErrors({}); setStep('payment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };

  const handlePaySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateCard()) return;
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    clearCart();
    setProcessing(false);
    setStep('success');
    toast.success('Order placed! 🎉');
  };

  
  if (items.length === 0 && step !== 'success') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'var(--surface-secondary)' }}>
          <ShoppingBag className="w-7 h-7" style={{ color: 'var(--text-secondary)' }} />
        </div>
        <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Your cart is empty</h1>
        <Link href="/products" className="px-6 py-2.5 rounded-2xl text-sm font-semibold"
          style={{ background: 'var(--accent)', color: '#fff' }}>
          Go shopping
        </Link>
      </div>
    );
  }

  
  if (step === 'success') {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
          style={{ background: '#ECFDF5', boxShadow: '0 8px 32px rgba(16,185,129,0.2)' }}>
          <CheckCircle2 className="w-10 h-10" style={{ color: '#10B981' }} />
        </div>
        <h1 className="text-3xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          Order Confirmed!
        </h1>
        <p className="text-sm leading-relaxed mb-1.5 max-w-sm" style={{ color: 'var(--text-secondary)' }}>
          Thank you for your purchase! Confirmation sent to
        </p>
        <p className="text-sm font-semibold mb-8" style={{ color: 'var(--accent)' }}>{addr.email}</p>
        <Link href="/products"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
          style={{ background: 'var(--accent)', color: '#fff' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  
  const STEPS = [
    { id: 'address', label: 'Shipping', icon: MapPin     },
    { id: 'payment', label: 'Payment',  icon: CreditCard },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 w-full">
      <h1 className="text-2xl font-bold mb-8"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
        Checkout
      </h1>

      
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, idx) => {
          const Icon   = s.icon;
          const active = step === s.id;
          const done   = step === 'payment' && s.id === 'address';
          return (
            <div key={s.id} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: done ? '#10B981' : active ? 'var(--accent)' : 'var(--surface-border)',
                    color: (active || done) ? '#fff' : 'var(--text-secondary)',
                  }}>
                  {done ? '✓' : <Icon className="w-3.5 h-3.5" />}
                </div>
                <span className="text-sm font-medium hidden sm:inline"
                  style={{ color: active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {s.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="h-px w-8 sm:w-14 mx-1"
                  style={{ background: done ? '#10B981' : 'var(--surface-border)' }} />
              )}
            </div>
          );
        })}
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        
        <div className="lg:col-span-7 order-2 lg:order-1">

          
          {step === 'address' && (
            <form onSubmit={handleAddrSubmit}
              className="rounded-2xl border p-5 sm:p-6"
              style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}>
              <div className="flex items-center gap-2 mb-5">
                <User className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                <h2 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  Shipping Information
                </h2>
              </div>

              
              <div className="grid grid-cols-2 gap-4">
                <Field label="Full name"      name="name"    placeholder="John Doe"           autoComplete="name"           value={addr.name}    onChange={v => setAddr(a => ({...a, name: v}))}    error={errors.name}    colSpan={2} />
                <Field label="Email"          name="email"   placeholder="john@example.com"   autoComplete="email"  type="email"  value={addr.email}   onChange={v => setAddr(a => ({...a, email: v}))}   error={errors.email}   colSpan={2} />
                <Field label="Street address" name="address" placeholder="123 Main St, Apt 4B" autoComplete="street-address" value={addr.address} onChange={v => setAddr(a => ({...a, address: v}))} error={errors.address} colSpan={2} />
                
                <Field label="City"         name="city" placeholder="Dhaka"  autoComplete="address-level2"  value={addr.city} onChange={v => setAddr(a => ({...a, city: v}))} error={errors.city} colSpan={1} />
                <Field label="ZIP / Postal" name="zip"  placeholder="1207"   autoComplete="postal-code" inputMode="numeric" value={addr.zip}  onChange={v => setAddr(a => ({...a, zip: v}))}  error={errors.zip}  colSpan={1} />
              </div>

              <button type="submit"
                className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
                style={{ background: 'var(--accent)', color: '#fff' }}>
                Continue to Payment →
              </button>
            </form>
          )}

          
          {step === 'payment' && (
            <form onSubmit={handlePaySubmit}
              className="rounded-2xl border p-5 sm:p-6"
              style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  <h2 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Payment Details</h2>
                </div>
                <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <Lock className="w-3 h-3" /> SSL Secured
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Name on card" name="holder" placeholder="John Doe" autoComplete="cc-name" value={card.holder} onChange={v => setCard(c => ({...c, holder: v}))} error={errors.holder} colSpan={2} />

                
                <div style={{ gridColumn: 'span 2' }}>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                    style={{ color: 'var(--text-secondary)' }}>Card number</label>
                  <input
                    type="text" inputMode="numeric" autoComplete="cc-number"
                    placeholder="0000 0000 0000 0000" maxLength={19}
                    value={card.number}
                    onChange={e => {
                      const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                      setCard(c => ({ ...c, number: v.replace(/(.{4})/g, '$1 ').trim() }));
                    }}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all font-mono tracking-wider"
                    style={{
                      background: 'var(--surface-secondary)',
                      borderColor: errors.number ? '#F87171' : 'var(--surface-border)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={e  => (e.target.style.borderColor = errors.number ? '#F87171' : 'var(--accent)')}
                    onBlur={e   => (e.target.style.borderColor = errors.number ? '#F87171' : 'var(--surface-border)')}
                  />
                  {errors.number && <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>{errors.number}</p>}
                </div>

                
                <Field label="Expiry (MM/YY)" name="expiry" placeholder="MM/YY" autoComplete="cc-exp" inputMode="numeric" value={card.expiry}
                  onChange={v => {
                    let d = v.replace(/\D/g, '').slice(0, 4);
                    if (d.length >= 3) d = d.slice(0, 2) + '/' + d.slice(2);
                    setCard(c => ({ ...c, expiry: d }));
                  }}
                  error={errors.expiry} colSpan={1} />
                <Field label="CVC" name="cvc" placeholder="•••" autoComplete="cc-csc" type="password" inputMode="numeric" value={card.cvc}
                  onChange={v => setCard(c => ({ ...c, cvc: v.replace(/\D/g,'').slice(0, 4) }))}
                  error={errors.cvc} colSpan={1} />
              </div>

              
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                {['VISA', 'MC', 'AMEX', 'DISCOVER'].map(brand => (
                  <span key={brand} className="text-[10px] font-bold px-2 py-1 rounded border"
                    style={{ borderColor: 'var(--surface-border)', color: 'var(--text-secondary)', background: 'var(--surface-secondary)' }}>
                    {brand}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => { setErrors({}); setStep('address'); }}
                  className="px-5 py-3.5 rounded-2xl text-sm font-semibold border hover:opacity-80 transition-all"
                  style={{ borderColor: 'var(--surface-border)', color: 'var(--text-primary)', background: 'var(--surface)' }}>
                  ← Back
                </button>
                <button type="submit" disabled={isProcessing}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold hover:opacity-90 active:scale-95 disabled:opacity-60 transition-all"
                  style={{ background: 'var(--accent)', color: '#fff' }}>
                  {isProcessing
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                    : <><Lock className="w-3.5 h-3.5" /> Pay ${total.toFixed(2)}</>}
                </button>
              </div>
            </form>
          )}

          
          <div className="mt-4 grid grid-cols-1 min-[400px]:grid-cols-3 gap-3">
            {[
              { emoji: '🔒', label: 'SSL Secured',   sub: '256-bit encryption'   },
              { emoji: '↩️', label: 'Easy Returns',   sub: '30-day return policy'  },
              { emoji: '🚚', label: 'Fast Delivery',  sub: '2–5 business days'     },
            ].map(b => (
              <div key={b.label}
                className="flex items-center gap-3 p-3 rounded-2xl border"
                style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}>
                <span className="text-xl shrink-0">{b.emoji}</span>
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{b.label}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="lg:col-span-5 order-1 lg:order-2">
          <div className="rounded-2xl border p-5 lg:sticky lg:top-24"
            style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                Order summary ({items.length} {items.length === 1 ? 'item' : 'items'})
              </h3>
            </div>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1 mb-4">
              {items.map(item => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden"
                    style={{ background: 'var(--surface-secondary)' }}>
                    <Image
                      src={cleanImage(item.product.images[0])}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                      style={{ background: 'var(--accent)', color: '#fff' }}>
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                      {item.product.title}
                    </p>
                    <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                      ${item.product.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-semibold shrink-0" style={{ color: 'var(--text-primary)' }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2.5" style={{ borderColor: 'var(--surface-border)' }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span style={{ color: 'var(--text-primary)' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                <span style={{ color: shipping === 0 ? '#10B981' : 'var(--text-primary)' }}>
                  {shipping === 0 ? '🎉 Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-[11px] px-3 py-2 rounded-xl"
                  style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                  Add ${(99 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
              <div className="flex justify-between font-bold pt-2 border-t"
                style={{ borderColor: 'var(--surface-border)' }}>
                <span style={{ color: 'var(--text-primary)' }}>Total</span>
                <span className="text-lg" style={{ color: 'var(--accent)' }}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
