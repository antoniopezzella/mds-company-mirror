import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BadgeAnchor } from './badge-anchor';

describe('BadgeAnchor', () => {
  it('renders its child', () => {
    render(
      <BadgeAnchor>
        <span>icon</span>
      </BadgeAnchor>
    );
    expect(screen.getByText('icon')).toBeInTheDocument();
  });

  it('renders numeric content for the number variant', () => {
    render(
      <BadgeAnchor variant="number" content={12} tone="danger">
        <span>bell</span>
      </BadgeAnchor>
    );
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('renders no visible content for the dot variant', () => {
    render(
      <BadgeAnchor variant="dot" content={12}>
        <span>bell</span>
      </BadgeAnchor>
    );
    expect(screen.queryByText('12')).not.toBeInTheDocument();
  });

  it('does not render the indicator when invisible', () => {
    const { container } = render(
      <BadgeAnchor variant="number" content={5} invisible>
        <span>bell</span>
      </BadgeAnchor>
    );
    expect(screen.queryByText('5')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.absolute').length).toBe(0);
  });
});
