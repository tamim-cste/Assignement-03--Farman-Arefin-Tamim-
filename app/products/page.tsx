import { api } from '@/lib/api';
import { ProductCard } from '@/components/product/product-card';
import { FilterSidebar, SortDropdown } from '@/components/product/product-filters';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Suspense } from 'react';
import { SearchBar } from '@/components/product/search-bar';

const PAGE_SIZE = 12;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const p          = await searchParams;
  const title      = typeof p.title      === 'string' ? p.title                             : undefined;
  const categoryId = typeof p.categoryId === 'string' ? p.categoryId                        : undefined;
  const sort       = typeof p.sort       === 'string' ? p.sort                              : 'default';
  const page       = typeof p.page       === 'string' ? Math.max(1, parseInt(p.page) || 1) : 1;
  const rawMin     = typeof p.minPrice   === 'string' ? p.minPrice                          : undefined;
  const rawMax     = typeof p.maxPrice   === 'string' ? p.maxPrice                          : undefined;
  const minPrice   = rawMin ? parseFloat(rawMin) : 0;
  const maxPrice   = rawMax ? parseFloat(rawMax) : Infinity;

  const [allProducts, categories] = await Promise.all([
    api.products.getAll({ title, categoryId }),
    api.categories.getAll(),
  ]);

  
  const filtered = allProducts.filter(
    pr => pr.price >= minPrice && (maxPrice === Infinity || pr.price <= maxPrice),
  );

  
  const sorted = [...filtered];
  if      (sort === 'price-asc')  sorted.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
  else if (sort === 'name-asc')   sorted.sort((a, b) => a.title.localeCompare(b.title));
  else if (sort === 'name-desc')  sorted.sort((a, b) => b.title.localeCompare(a.title));

  
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const paginated  = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  
  const buildUrl = (overrides: Record<string, string | undefined>) => {
    const base: Record<string, string> = {};
    if (title)              base.title      = title;
    if (categoryId)         base.categoryId = categoryId;
    if (sort !== 'default') base.sort       = sort;
    if (rawMin)             base.minPrice   = rawMin;
    if (rawMax)             base.maxPrice   = rawMax;
    Object.assign(base, overrides);
    Object.keys(base).forEach(k => { if (!base[k]) delete base[k]; });
    const qs = new URLSearchParams(base).toString();
    return `/products${qs ? '?' + qs : ''}`;
  };

  const activeCategory = categories.find(c => c.id.toString() === categoryId);
  const heading = title ? `Results for "${title}"` : activeCategory?.name ?? 'All Products';

  const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(n => n === 1 || n === totalPages || Math.abs(n - safePage) <= 1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 sm:px-6 lg:px-8 w-full">

      
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            {heading}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            {sorted.length} {sorted.length === 1 ? 'product' : 'products'} found
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Suspense fallback={<div className="skeleton h-10 w-44 rounded-xl" />}>
            <SearchBar defaultValue={title} categoryId={categoryId} sort={sort} />
          </Suspense>
          <div className="hidden md:block">
            <Suspense fallback={<div className="skeleton h-10 w-36 rounded-xl" />}>
              <SortDropdown currentSort={sort} />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="flex gap-5 lg:gap-8">

        
        <Suspense fallback={
          <aside className="hidden md:block w-56 shrink-0">
            <div className="rounded-2xl p-5 border space-y-3"
              style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}>
              {[80, 60, 75, 65, 70].map((w, i) => (
                <div key={i} className="skeleton h-8 rounded-xl" style={{ width: `${w}%` }} />
              ))}
            </div>
          </aside>
        }>
          <FilterSidebar
            categories={categories}
            currentCategoryId={categoryId}
            currentSort={sort}
            currentMinPrice={rawMin}
            currentMaxPrice={rawMax}
            totalCount={sorted.length}
          />
        </Suspense>

        <div className="flex-1 min-w-0">

          
          <div className="flex items-center gap-2 mb-4 md:hidden">
            <Suspense fallback={<div className="skeleton h-10 w-28 rounded-xl" />}>
              <SortDropdown currentSort={sort} />
            </Suspense>
          </div>

          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-3xl border text-center"
              style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}>
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No products found</h3>
              <p className="text-sm mb-6 max-w-xs" style={{ color: 'var(--text-secondary)' }}>
                Try adjusting your search, category, or price range.
              </p>
              <Link href="/products" className="px-5 py-2.5 rounded-2xl text-sm font-semibold hover:opacity-90"
                style={{ background: 'var(--accent)', color: '#fff' }}>
                Clear all filters
              </Link>
            </div>
          ) : (
            <>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-4 sm:gap-5">
                {paginated.map((pr, i) => (
                  <ProductCard key={pr.id} product={pr} index={i} />
                ))}
              </div>

              
              {totalPages > 1 && (
                <>
                  <nav aria-label="Product pages" className="flex items-center justify-center gap-1.5 mt-10 flex-wrap">
                    {safePage > 1 ? (
                      <Link href={buildUrl({ page: String(safePage - 1) })}
                        className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all hover:border-indigo-400"
                        style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)', color: 'var(--text-secondary)' }}>
                        <ChevronLeft className="w-4 h-4" />
                      </Link>
                    ) : (
                      <span className="w-9 h-9 rounded-xl border flex items-center justify-center opacity-30"
                        style={{ borderColor: 'var(--surface-border)', color: 'var(--text-secondary)' }}>
                        <ChevronLeft className="w-4 h-4" />
                      </span>
                    )}

                    {visiblePages.map((n, idx) => {
                      const prev     = visiblePages[idx - 1];
                      const showDots = prev !== undefined && n - prev > 1;
                      const active   = n === safePage;
                      return (
                        <span key={n} className="flex items-center gap-1.5">
                          {showDots && (
                            <span className="w-9 h-9 flex items-center justify-center text-sm"
                              style={{ color: 'var(--text-secondary)' }}>…</span>
                          )}
                          <Link href={buildUrl({ page: n === 1 ? undefined : String(n) })}
                            className="w-9 h-9 rounded-xl border flex items-center justify-center text-sm font-medium transition-all"
                            style={{
                              background:  active ? 'var(--accent)' : 'var(--surface)',
                              borderColor: active ? 'var(--accent)' : 'var(--surface-border)',
                              color:       active ? '#fff'          : 'var(--text-primary)',
                              fontWeight:  active ? 700 : 400,
                            }}>
                            {n}
                          </Link>
                        </span>
                      );
                    })}

                    {safePage < totalPages ? (
                      <Link href={buildUrl({ page: String(safePage + 1) })}
                        className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all hover:border-indigo-400"
                        style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)', color: 'var(--text-secondary)' }}>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <span className="w-9 h-9 rounded-xl border flex items-center justify-center opacity-30"
                        style={{ borderColor: 'var(--surface-border)', color: 'var(--text-secondary)' }}>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    )}
                  </nav>
                  <p className="text-center text-xs mt-3" style={{ color: 'var(--text-secondary)' }}>
                    Page {safePage} of {totalPages} · {sorted.length} products
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
