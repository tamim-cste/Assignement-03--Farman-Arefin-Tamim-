'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useTransition, useCallback, Suspense } from 'react';
import { SlidersHorizontal, X, ChevronDown, ArrowUpDown, Check } from 'lucide-react';
import { Category } from '@/lib/api';

export const SORT_OPTIONS = [
  { value: 'default',    label: 'Default order'    },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name-asc',   label: 'Name: A → Z'       },
  { value: 'name-desc',  label: 'Name: Z → A'       },
];

function SortDropdownInner({ currentSort }: { currentSort: string }) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  const label    = SORT_OPTIONS.find(o => o.value === currentSort)?.label ?? 'Sort';
  const isActive = currentSort !== 'default';

  const apply = useCallback((value: string) => {
    setOpen(false);
    const p = new URLSearchParams(searchParams.toString());
    if (value === 'default') p.delete('sort'); else p.set('sort', value);
    p.delete('page');
    startTransition(() => router.push(`${pathname}?${p.toString()}`));
  }, [router, pathname, searchParams]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all"
        style={{
          background:   isActive ? 'var(--accent-light)' : 'var(--surface)',
          borderColor:  isActive ? 'var(--accent)'       : 'var(--surface-border)',
          color:        isActive ? 'var(--accent)'       : 'var(--text-primary)',
        }}
      >
        <ArrowUpDown className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden sm:inline">{label}</span>
        <span className="sm:hidden">Sort</span>
        <ChevronDown
          className="w-3.5 h-3.5 shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-full mt-2 z-20 w-52 rounded-2xl border shadow-2xl overflow-hidden py-1"
            style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}
          >
            {SORT_OPTIONS.map(opt => {
              const active = currentSort === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => apply(opt.value)}
                  className="w-full text-left px-4 py-2.5 text-sm flex items-center justify-between gap-2 transition-colors"
                  style={{
                    background: active ? 'var(--accent-light)' : 'transparent',
                    color:      active ? 'var(--accent)'       : 'var(--text-primary)',
                    fontWeight: active ? 600 : 400,
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--surface-secondary)'; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  {opt.label}
                  {active && <Check className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent)' }} />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export function SortDropdown({ currentSort }: { currentSort: string }) {
  return (
    <Suspense fallback={
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm"
        style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)', color: 'var(--text-secondary)' }}
      >
        <ArrowUpDown className="w-3.5 h-3.5" /> Sort
      </div>
    }>
      <SortDropdownInner currentSort={currentSort} />
    </Suspense>
  );
}

interface FilterSidebarProps {
  categories: Category[];
  currentCategoryId?: string;
  currentSort: string;
  currentMinPrice?: string;
  currentMaxPrice?: string;
  totalCount: number;
}

function FilterSidebarInner({
  categories,
  currentCategoryId,
  currentSort,
  currentMinPrice,
  currentMaxPrice,
}: FilterSidebarProps) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [localMin, setLocalMin]     = useState(currentMinPrice ?? '');
  const [localMax, setLocalMax]     = useState(currentMaxPrice ?? '');

  const updateParams = useCallback((updates: Record<string, string | undefined>) => {
    const p = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => { if (!v) p.delete(k); else p.set(k, v); });
    p.delete('page');
    startTransition(() => router.push(`${pathname}?${p.toString()}`));
  }, [router, pathname, searchParams]);

  const setCategory = (id?: string) => {
    updateParams({ categoryId: id });
    setDrawerOpen(false);
  };

  const applyPrice = () => {
    updateParams({
      minPrice: localMin || undefined,
      maxPrice: localMax || undefined,
    });
    setDrawerOpen(false);
  };

  const clearAll = () => {
    setLocalMin('');
    setLocalMax('');
    startTransition(() => router.push(pathname));
    setDrawerOpen(false);
  };

  const hasFilters = !!(currentCategoryId || currentMinPrice || currentMaxPrice || currentSort !== 'default');
  const filterCount = [
    currentCategoryId,
    currentMinPrice || currentMaxPrice,
    currentSort !== 'default' ? '1' : '',
  ].filter(Boolean).length;

  
  const filterContent = (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" style={{ color: 'var(--accent)' }} />
          <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Filters</span>
          {hasFilters && (
            <span
              className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {filterCount}
            </span>
          )}
        </div>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: '#EF4444' }}
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: 'var(--text-secondary)' }}>Category</p>
        <div className="space-y-0.5">
          {[{ id: undefined, name: 'All Products' }, ...categories].map(cat => {
            const isAll    = cat.id === undefined;
            const active   = isAll ? !currentCategoryId : currentCategoryId === String(cat.id);
            return (
              <button
                key={cat.id ?? 'all'}
                onClick={() => setCategory(cat.id !== undefined ? String(cat.id) : undefined)}
                className="w-full text-left px-3 py-2 rounded-xl text-sm transition-colors"
                style={{
                  background: active ? 'var(--accent)' : 'transparent',
                  color:      active ? '#fff' : 'var(--text-secondary)',
                  fontWeight: active ? 600 : 400,
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--surface-secondary)'; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: 'var(--text-secondary)' }}>Price range ($)</p>
        <div className="flex items-center gap-2">
          <input
            type="number" min="0" placeholder="Min" value={localMin}
            onChange={e => setLocalMin(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
            style={{ background: 'var(--surface-secondary)', borderColor: 'var(--surface-border)', color: 'var(--text-primary)' }}
            onFocus={e  => { (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'; }}
            onBlur={e   => { (e.target as HTMLInputElement).style.borderColor = 'var(--surface-border)'; }}
          />
          <span className="text-xs shrink-0" style={{ color: 'var(--text-secondary)' }}>–</span>
          <input
            type="number" min="0" placeholder="Max" value={localMax}
            onChange={e => setLocalMax(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
            style={{ background: 'var(--surface-secondary)', borderColor: 'var(--surface-border)', color: 'var(--text-primary)' }}
            onFocus={e  => { (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'; }}
            onBlur={e   => { (e.target as HTMLInputElement).style.borderColor = 'var(--surface-border)'; }}
          />
        </div>
        <button
          onClick={applyPrice}
          className="mt-2.5 w-full py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
          style={{ background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--accent)' }}
        >
          Apply price filter
        </button>
      </div>
    </div>
  );

  return (
    <>
      
      <aside className="hidden md:block w-56 shrink-0">
        <div
          className="sticky top-24 rounded-2xl p-5 border"
          style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}
        >
          {filterContent}
        </div>
      </aside>

      
      <div className="md:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium"
          style={{
            background:  hasFilters ? 'var(--accent-light)' : 'var(--surface)',
            borderColor: hasFilters ? 'var(--accent)'       : 'var(--surface-border)',
            color:       hasFilters ? 'var(--accent)'       : 'var(--text-primary)',
          }}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters{hasFilters ? ` (${filterCount})` : ''}
        </button>
      </div>

      
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div
            className="relative rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden"
            style={{ background: 'var(--surface)' }}
          >
            
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full" style={{ background: 'var(--surface-border)' }} />
            </div>
            <div className="px-5 pt-2 pb-3 flex items-center justify-between shrink-0">
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Filters</span>
              <button onClick={() => setDrawerOpen(false)} style={{ color: 'var(--text-secondary)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-2">{filterContent}</div>
            <div className="px-5 py-4 shrink-0 border-t" style={{ borderColor: 'var(--surface-border)' }}>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full py-3.5 rounded-2xl text-sm font-semibold"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function FilterSidebar(props: FilterSidebarProps) {
  return (
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
      <FilterSidebarInner {...props} />
    </Suspense>
  );
}
