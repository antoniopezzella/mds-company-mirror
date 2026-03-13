import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders with initials', () => {
    render(<Avatar initials="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders with image src', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="John Doe" />);
    const img = screen.getByRole('img', { name: 'John Doe' });
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('renders with different sizes', () => {
    const { container, rerender } = render(<Avatar initials="SM" size="small" />);
    expect(container.querySelector('.MuiAvatar-root')).toBeInTheDocument();

    rerender(<Avatar initials="LG" size="large" />);
    expect(screen.getByText('LG')).toBeInTheDocument();
  });

  it('renders circular variant by default', () => {
    const { container } = render(<Avatar initials="AB" />);
    expect(container.querySelector('.MuiAvatar-circular')).toBeInTheDocument();
  });

  it('renders rounded variant', () => {
    const { container } = render(<Avatar initials="AB" variant="rounded" />);
    const avatar = container.querySelector('.MuiAvatar-root');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveStyle({ borderRadius: '8px' });
  });

  it('renders square variant', () => {
    const { container } = render(<Avatar initials="AB" variant="square" />);
    const avatar = container.querySelector('.MuiAvatar-root');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveStyle({ borderRadius: '0' });
  });
});
