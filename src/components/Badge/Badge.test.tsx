import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(
      <Badge>
        <span>Notifications</span>
      </Badge>
    );
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('renders dot variant by default', () => {
    const { container } = render(
      <Badge>
        <span>Icon</span>
      </Badge>
    );
    expect(container.querySelector('.MuiBadge-root')).toBeInTheDocument();
  });

  it('renders number content', () => {
    render(
      <Badge variant="number" content={5}>
        <span>Mail</span>
      </Badge>
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders text content', () => {
    render(
      <Badge variant="text" content="NEW">
        <span>Feature</span>
      </Badge>
    );
    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  it('hides badge when invisible', () => {
    const { container } = render(
      <Badge invisible>
        <span>Hidden</span>
      </Badge>
    );
    expect(container.querySelector('.MuiBadge-invisible')).toBeInTheDocument();
  });

  it('renders different tones', () => {
    const { container } = render(
      <Badge variant="number" content={3} tone="danger">
        <span>Alerts</span>
      </Badge>
    );
    expect(container.querySelector('.MuiBadge-root')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
