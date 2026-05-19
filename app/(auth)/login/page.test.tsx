import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import LoginPage from './page';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: () => null }),
}));

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react');
  return {
    ...actual,
    useActionState: () => [{ error: '' }, () => undefined, false],
  };
});

describe('LoginPage', () => {
  it('renders login fields and submit button', () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText('john@mail.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders the form with the correct demo credentials text', () => {
    render(<LoginPage />);

    expect(screen.getByText(/john@mail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/changeme/i)).toBeInTheDocument();
  });
});
