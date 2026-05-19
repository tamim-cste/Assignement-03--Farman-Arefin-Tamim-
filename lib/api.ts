export const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface User {
  id: number;
  email: string;
  password?: string;
  name: string;
  role: string;
  avatar: string;
}

export const api = {
  products: {
    getAll: async (params?: { offset?: number; limit?: number; categoryId?: string; title?: string }) => {
      const searchParams = new URLSearchParams();
      if (params?.offset) searchParams.append('offset', params.offset.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.categoryId) searchParams.append('categoryId', params.categoryId);
      if (params?.title) searchParams.append('title', params.title);

      const qs = searchParams.toString();
      return fetchApi<Product[]>(`/products${qs ? `?${qs}` : ''}`, { cache: 'no-store' });
    },
    getById: async (id: string | number) => {
      return fetchApi<Product>(`/products/${id}`, { cache: 'no-store' });
    },
  },
  categories: {
    getAll: async () => {
      return fetchApi<Category[]>('/categories', { next: { revalidate: 3600 } });
    },
    getById: async (id: string | number) => {
      return fetchApi<Category>(`/categories/${id}`, { next: { revalidate: 3600 } });
    },
  },
};
