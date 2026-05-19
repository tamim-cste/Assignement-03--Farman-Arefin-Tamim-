'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API = 'https://api.escuelajs.co/api/v1';
const SESSION_COOKIE = 'session_user_id';

export async function login(
  _prev: { error: string },
  formData: FormData,
): Promise<{ error: string }> {
  const email    = (formData.get('email')    as string)?.trim() ?? '';
  const password = (formData.get('password') as string)?.trim() ?? '';
  const from     = (formData.get('from')     as string)?.trim() ?? '';

  if (!email || !password) return { error: 'Email and password are required.' };

  let userId: string;

  try {
    const res  = await fetch(`${API}/users`, {
      cache: 'no-store',
    });

    let body: Array<Record<string, unknown>> = [];
    try { body = await res.json(); } catch {
      body = [];
    }

    if (!res.ok || !Array.isArray(body)) {
      return { error: 'Login failed.' };
    }

    const user = body.find(u =>
      typeof u.email === 'string' &&
      typeof u.password === 'string' &&
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password,
    );

    if (!user || typeof user.id !== 'number') {
      return { error: 'Invalid email or password.' };
    }

    userId = String(user.id);
  } catch {
    return { error: 'Network error. Please check your connection.' };
  }

  const jar = await cookies();
  jar.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    secure  : process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge  : 60 * 60 * 24 * 7,
    path    : '/',
  });

  redirect(from && from.startsWith('/') && !from.startsWith('//') ? from : '/profile');
}

export async function register(
  _prev: { error: string },
  formData: FormData,
): Promise<{ error: string }> {
  const name     = (formData.get('name')     as string)?.trim() ?? '';
  const email    = (formData.get('email')    as string)?.trim() ?? '';
  const password = (formData.get('password') as string)?.trim() ?? '';
  const from     = (formData.get('from')     as string)?.trim() ?? '';

  if (!name || !email || !password) return { error: 'All fields are required.' };
  if (password.length < 4) return { error: 'Password must be at least 4 characters.' };

  try {
    const res  = await fetch(`${API}/users`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ name, email, password, avatar: `https://picsum.photos/seed/${Date.now()}/200` }),
      cache  : 'no-store',
    });

    let body: Record<string, unknown> = {};
    try { body = await res.json(); } catch {
      body = {};
    }

    if (!res.ok) {
      if (Array.isArray(body.message)) return { error: (body.message as string[]).join(', ') };
      return { error: (body.message as string) || 'Registration failed.' };
    }
  } catch {
    return { error: 'Network error. Please check your connection.' };
  }

  const lf = new FormData();
  lf.set('email',    email);
  lf.set('password', password);
  if (from) lf.set('from', from);
  return login({ error: '' }, lf);
}

export async function logout(): Promise<never> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect('/login');
}

import { cache } from 'react';

export const getSession = cache(async (): Promise<{
  id: number; name: string; email: string; role: string; avatar: string;
} | null> => {
  try {
    const jar    = await cookies();
    const userId = jar.get(SESSION_COOKIE)?.value;
    if (!userId) return null;

    const res = await fetch(`${API}/users/${userId}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      jar.delete(SESSION_COOKIE);
      return null;
    }

    return res.json();
  } catch {
    return null;
  }
});
