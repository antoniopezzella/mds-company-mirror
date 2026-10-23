import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { AspectRatio } from './aspect-ratio';

describe('AspectRatio', () => {
  it('renders its children inside the ratio box', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <span>media</span>
      </AspectRatio>
    );
    expect(screen.getByText('media')).toBeInTheDocument();
  });

  it('turns the numeric ratio into the Radix padding-based box', () => {
    const { container } = render(
      <AspectRatio ratio={1}>
        <div>x</div>
      </AspectRatio>
    );
    // Radix wraps the content in a div whose padding-bottom encodes the ratio
    // (100 / ratio)% — 100% for a square.
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.paddingBottom).toBe('100%');
  });
});
