import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cleanImage(imageStr: string | undefined): string {
  if (!imageStr) return 'https://picsum.photos/seed/placeholder/640/640';
  
  try {
    if (imageStr.startsWith('[') && imageStr.endsWith(']')) {
      const parsed = JSON.parse(imageStr);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return cleanImage(parsed[0]);
      }
    }
    return imageStr.replace(/^["'](.+(?=["']$))["']$/, '$1');
  } catch (error) {
    return imageStr;
  }
}
