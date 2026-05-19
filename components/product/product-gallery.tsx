'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setActive(a => (a - 1 + images.length) % images.length);
  const next = () => setActive(a => (a + 1) % images.length);

  return (
    <>
      <div className="flex flex-col gap-3">
        
        <div className="relative aspect-square rounded-3xl overflow-hidden border group cursor-zoom-in"
          style={{ background: 'var(--surface-secondary)', borderColor: 'var(--surface-border)' }}
          onClick={() => setLightbox(true)}>
          <Image src={images[active]} alt={title} fill className="object-cover transition-opacity duration-300" priority />

          <button onClick={(e) => { e.stopPropagation(); setLightbox(true); }}
            className="absolute top-3 right-3 w-9 h-9 rounded-xl backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'rgba(255,255,255,0.85)' }}>
            <ZoomIn className="w-4 h-4" style={{ color: '#374151' }} />
          </button>

          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(255,255,255,0.85)' }}>
                <ChevronLeft className="w-4 h-4" style={{ color: '#374151' }} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(255,255,255,0.85)' }}>
                <ChevronRight className="w-4 h-4" style={{ color: '#374151' }} />
              </button>
            </>
          )}
        </div>

        
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all"
                style={{ borderColor: active === i ? 'var(--accent)' : 'var(--surface-border)', opacity: active === i ? 1 : 0.6 }}>
                <Image src={img} alt={`${title} ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      
      {lightbox && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90"
          onClick={() => setLightbox(false)}>
          <div className="relative w-full max-w-2xl aspect-square mx-4" onClick={e => e.stopPropagation()}>
            <Image src={images[active]} alt={title} fill className="object-contain" />
          </div>
          <button className="absolute top-4 right-4 text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full"
            style={{ background: 'rgba(255,255,255,0.1)' }}
            onClick={() => setLightbox(false)}>✕</button>
        </div>
      )}
    </>
  );
}
