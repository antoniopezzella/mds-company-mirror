import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Message, MessageContent } from './message';

describe('Message', () => {
  it('renders the message slot with its content', () => {
    const { container } = render(
      <Message>
        <MessageContent>Hello there</MessageContent>
      </Message>
    );
    expect(screen.getByText('Hello there')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="message"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="message-content"]')).toBeInTheDocument();
  });

  it('forwards a ref to the message root', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Message ref={ref} />);
    expect(ref.current?.getAttribute('data-slot')).toBe('message');
  });

  it('forwards className and arbitrary props onto the root', () => {
    const { container } = render(<Message className="mine" data-testid="m" />);
    const root = container.querySelector('[data-slot="message"]');
    expect(root).toHaveClass('mine');
    expect(root).toHaveAttribute('data-testid', 'm');
  });
});
