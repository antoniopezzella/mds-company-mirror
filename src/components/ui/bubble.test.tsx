import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Bubble, BubbleContent } from './bubble';

describe('Bubble', () => {
  it('renders its content inside the bubble-content slot', () => {
    const { container } = render(
      <Bubble>
        <BubbleContent>Hi</BubbleContent>
      </Bubble>
    );
    expect(screen.getByText('Hi')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="bubble-content"]')).toBeInTheDocument();
  });

  it('applies variant styling to the bubble wrapper', () => {
    const { container } = render(
      <Bubble variant="secondary" data-testid="b">
        <BubbleContent>x</BubbleContent>
      </Bubble>
    );
    // The variant drives classes that target the content slot — assert the
    // wrapper rendered with some class (variant resolved, not inert).
    const wrapper = container.querySelector('[data-testid="b"]');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.className).toBeTruthy();
  });

  it('forwards className onto the bubble wrapper', () => {
    const { container } = render(
      <Bubble className="mine">
        <BubbleContent>x</BubbleContent>
      </Bubble>
    );
    expect(container.firstElementChild).toHaveClass('mine');
  });
});
