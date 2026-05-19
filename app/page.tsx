import { api } from '@/lib/api';
import { ProductCard } from '@/components/product/product-card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { cleanImage } from '@/lib/utils';

export default async function Home() {
  const [products, categories] = await Promise.all([
    api.products.getAll({ limit: 8, offset: 0 }),
    api.categories.getAll(),
  ]);

  const featuredCategories = categories.slice(0, 4);

  return (
    <div className="flex flex-col">

      
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-6 pb-3">
        <div className="relative rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[420px] flex items-center"
          style={{ background: 'linear-gradient(135deg, #0F0A1E 0%, #1a1245 60%, #2d1f6e 100%)' }}>
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-1/3 w-48 sm:w-64 h-48 sm:h-64 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #C4B5FD 0%, transparent 70%)' }} />

          <div className="relative z-10 flex-1 p-6 sm:p-10 md:p-14 max-w-xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(129,140,248,0.2)', color: '#A5B4FC', border: '1px solid rgba(129,140,248,0.3)' }}>
              <Zap className="w-3 h-3" /> Summer Sale — Up to 40% off
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-4"
              style={{ fontFamily: 'var(--font-display)' }}>
              Upgrade Your<br />
              <span style={{ color: '#A5B4FC' }}>Lifestyle Gear</span>
            </h1>
            <p className="text-sm sm:text-base leading-relaxed mb-6 hidden sm:block"
              style={{ color: 'rgba(255,255,255,0.65)' }}>
              Discover premium products curated for modern living.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
                style={{ background: '#fff', color: '#1E1B4B' }}>
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/categories"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-sm font-semibold transition-all"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                Browse Categories
              </Link>
            </div>
          </div>

          
          <div className="hidden md:flex absolute right-0 top-0 h-full w-2/5 items-center justify-center pr-8">
            <div className="grid grid-cols-2 gap-3 rotate-3">
              {products.slice(0, 4).map((p) => (
                <div key={p.id} className="w-28 h-28 rounded-2xl overflow-hidden border-2 shadow-xl"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                  <div className="relative w-full h-full">
                    <Image src={cleanImage(p.images[0])} alt={p.title} fill className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: Truck,  label: 'Free Shipping',  sub: 'On orders over $99'   },
            { icon: Shield, label: 'Secure Payment',  sub: '100% protected'       },
            { icon: Zap,    label: 'Fast Delivery',   sub: '2-5 business days'    },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 p-4 rounded-2xl border"
              style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'var(--accent-light)' }}>
                <Icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--accent)' }}>
              Handpicked for you
            </p>
            <h2 className="text-xl sm:text-2xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Featured Products
            </h2>
          </div>
          <Link href="/products" className="flex items-center gap-1 text-sm font-medium"
            style={{ color: 'var(--accent)' }}>
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--accent)' }}>Explore</p>
            <h2 className="text-xl sm:text-2xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Shop by Category
            </h2>
          </div>
          <Link href="/categories" className="flex items-center gap-1 text-sm font-medium"
            style={{ color: 'var(--accent)' }}>
            All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCategories.map((cat, i) => (
            <Link key={cat.id} href={`/categories/${cat.id}`}
              className={`group relative block h-48 sm:h-56 rounded-2xl overflow-hidden fade-up delay-${i + 1}`}>
              <Image src={cat.image} alt={cat.name} fill
                className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 transition-all duration-300"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)' }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(79,70,229,0.8) 0%, transparent 70%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                <h3 className="text-base font-bold text-white">{cat.name}</h3>
                <span className="w-7 h-7 rounded-full flex items-center justify-center translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-5 pb-12">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            New Arrivals
          </h2>
          <Link href="/products" className="flex items-center gap-1 text-sm font-medium"
            style={{ color: 'var(--accent)' }}>
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(4, 8).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
