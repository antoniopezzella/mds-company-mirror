import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Marker, MarkerIcon, MarkerContent } from './marker';

describe('Marker', () => {
  it('renders its content and defaults to the "default" variant', () => {
    const { container } = render(
      <Marker>
        <MarkerContent>Step 1</MarkerContent>
      </Marker>
    );
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="marker"]')).toHaveAttribute('data-variant', 'default');
  });

  it('applies the border variant styling', () => {
    const { container } = render(<Marker variant="border">x</Marker>);
    const root = container.querySelector('[data-slot="marker"]');
    expect(root).toHaveAttribute('data-variant', 'border');
    expect(root).toHaveClass('border-b');
  });

  it('hides the decorative marker icon from assistive tech', () => {
    const { container } = render(<MarkerIcon>★</MarkerIcon>);
    expect(container.querySelector('[data-slot="marker-icon"]')).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards className onto the root', () => {
    const { container } = render(<Marker className="mk">y</Marker>);
    expect(container.querySelector('[data-slot="marker"]')).toHaveClass('mk');
  });
});
