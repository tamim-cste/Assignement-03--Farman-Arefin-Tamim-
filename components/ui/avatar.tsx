'use client';

import { useState } from 'react';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: number;
}

export function Avatar({ src, name, size = 96 }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const initial = name?.charAt(0)?.toUpperCase() ?? '?';
  const showImg = src && src.startsWith('http') && !imgError;

  return (
    <div
      className="rounded-2xl border-4 overflow-hidden shrink-0 flex items-center justify-center font-bold text-white"
      style={{
        width: size,
        height: size,
        borderColor: 'var(--surface)',
        background: showImg ? 'var(--surface-secondary)' : 'var(--accent)',
        fontSize: size * 0.3,
      }}
    >
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name ?? 'Avatar'}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
}
