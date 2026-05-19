import { render, screen } from '@testing-library/react';
import { Avatar } from '@/components/ui/avatar';

describe('Avatar', () => {
  it('renders initials when no image URL is provided', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders an image when a valid src is provided', () => {
    render(<Avatar src="https://example.com/avatar.png" name="John Doe" />);
    const img = screen.getByAltText('John Doe');
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.png');
  });
});
