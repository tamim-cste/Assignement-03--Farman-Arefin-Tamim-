'use client';

import { Search } from 'lucide-react';
import { useRef } from 'react';

interface SearchBarProps {
  defaultValue?: string;
  categoryId?: string;
  sort?: string;
}

export function SearchBar({ defaultValue, categoryId, sort }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form action="/products" method="GET" className="relative">
      {categoryId && <input type="hidden" name="categoryId" value={categoryId} />}
      {sort && sort !== 'default' && <input type="hidden" name="sort" value={sort} />}
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        style={{ color: 'var(--text-secondary)' }}
      />
      <input
        ref={inputRef}
        type="text"
        name="title"
        defaultValue={defaultValue}
        placeholder="Search products…"
        className="pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none w-44 sm:w-52 transition-all"
        style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)', color: 'var(--text-primary)' }}
        onFocus={e  => { (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'; }}
        onBlur={e   => { (e.target as HTMLInputElement).style.borderColor = 'var(--surface-border)'; }}
      />
    </form>
  );
}
