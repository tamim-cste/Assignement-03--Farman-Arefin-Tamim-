import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import RegisterPage from './page';

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

describe('RegisterPage', () => {
  it('renders registration fields and create button', () => {
    render(<RegisterPage />);

    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('john@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Min 8 characters')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('renders the account creation prompt', () => {
    render(<RegisterPage />);

    expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });
});
