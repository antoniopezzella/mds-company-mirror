import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from './empty';

describe('Empty', () => {
  it('renders the composed empty state with its title and description', () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No policies yet</EmptyTitle>
          <EmptyDescription>Add your first policy to get started.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
    expect(screen.getByText('No policies yet')).toBeInTheDocument();
    expect(screen.getByText('Add your first policy to get started.')).toBeInTheDocument();
  });

  it('tags each slot with its data-slot attribute', () => {
    const { container } = render(
      <Empty>
        <EmptyTitle>T</EmptyTitle>
      </Empty>
    );
    expect(container.querySelector('[data-slot="empty"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="empty-title"]')).toBeInTheDocument();
  });

  it('renders EmptyMedia as the empty-icon slot', () => {
    const { container } = render(<EmptyMedia>icon</EmptyMedia>);
    expect(container.querySelector('[data-slot="empty-icon"]')).toBeInTheDocument();
  });

  it('introduces no heading, so it is safe to drop at any depth', () => {
    render(
      <Empty>
        <EmptyTitle>Nothing here</EmptyTitle>
      </Empty>
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('forwards className and arbitrary props onto the root', () => {
    render(<Empty className="custom-x" data-testid="e" />);
    expect(screen.getByTestId('e')).toHaveClass('custom-x');
  });
});
