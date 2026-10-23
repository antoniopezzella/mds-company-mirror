import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ScrollArea, ScrollBar } from './scroll-area';

describe('ScrollArea', () => {
  it('renders its children', () => {
    render(
      <ScrollArea className="h-24 w-48">
        <p>Scrollable content</p>
      </ScrollArea>
    );
    expect(screen.getByText('Scrollable content')).toBeInTheDocument();
  });

  it('makes the viewport keyboard-focusable (tabIndex=0) for WCAG 2.1.1', () => {
    const { container } = render(
      <ScrollArea>
        <p>content</p>
      </ScrollArea>
    );
    const viewport = container.querySelector('[data-radix-scroll-area-viewport]');
    expect(viewport).not.toBeNull();
    expect(viewport).toHaveAttribute('tabindex', '0');
  });

  it('forwards className onto the root', () => {
    const { container } = render(
      <ScrollArea className="my-scroll">
        <p>content</p>
      </ScrollArea>
    );
    expect(container.querySelector('.my-scroll')).toBeInTheDocument();
  });

  it('forwards the type prop through to the Radix root', () => {
    // `type="always"` should not throw and should still render content.
    render(
      <ScrollArea type="always">
        <p>always visible</p>
      </ScrollArea>
    );
    expect(screen.getByText('always visible')).toBeInTheDocument();
  });

  it('renders a horizontal ScrollBar with the right orientation class when forced visible', () => {
    // type="always" forces the scrollbar to mount regardless of overflow,
    // which jsdom cannot measure.
    const { container } = render(
      <ScrollArea type="always">
        <ScrollBar orientation="horizontal" className="hbar" />
        <p>content</p>
      </ScrollArea>
    );
    const bar = container.querySelector('.hbar');
    expect(bar).not.toBeNull();
    expect(bar).toHaveClass('flex-col');
  });
});
