import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { X as XIcon } from 'lucide-react';

import { AttachmentAction } from './attachment';

/**
 * Regression tests for AttachmentAction's icon rendering.
 *
 * `AttachmentAction` sets `iconOnly` to true by default, and `Button` with
 * `iconOnly` renders only `icon ?? startIcon ?? endIcon` — it discards
 * `children` entirely. So the natural usage, which this component's own
 * stories use, rendered a COMPLETELY EMPTY button:
 *
 *     <AttachmentAction aria-label="Remove"><XIcon /></AttachmentAction>
 *     -> button.innerHTML === ""
 *
 * Nothing caught it. Not tsc (the types are valid), not the axe gate — the
 * story passes `aria-label`, so the button has an accessible name and no
 * visible content, which is exactly what `button-name` checks for. It took
 * rendering the component to see it.
 *
 * The first assertion below is the one that matters: it fails on the old
 * implementation.
 */
describe('AttachmentAction', () => {
  it('renders an icon passed as children', () => {
    const { container } = render(
      <AttachmentAction aria-label="Remove attachment">
        <XIcon />
      </AttachmentAction>
    );
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
    expect(button!.querySelectorAll('svg')).toHaveLength(1);
  });

  it('renders an icon passed via the icon prop', () => {
    const { container } = render(<AttachmentAction aria-label="Remove" icon={<XIcon />} />);
    expect(container.querySelector('button')!.querySelectorAll('svg')).toHaveLength(1);
  });

  it('prefers an explicit icon over children, rather than rendering both', () => {
    const { container } = render(
      <AttachmentAction aria-label="Remove" icon={<XIcon data-testid="explicit" />}>
        <XIcon data-testid="child" />
      </AttachmentAction>
    );
    const button = container.querySelector('button')!;
    expect(button.querySelector('[data-testid="explicit"]')).toBeTruthy();
    expect(button.querySelector('[data-testid="child"]')).toBeNull();
  });

  it('uses children as a label when iconOnly is false', () => {
    const { container } = render(<AttachmentAction iconOnly={false}>Retry</AttachmentAction>);
    expect(container.querySelector('button')!.textContent).toContain('Retry');
  });

  it('never renders an empty button for any supported icon form', () => {
    for (const node of [
      <AttachmentAction key="a" aria-label="a"><XIcon /></AttachmentAction>,
      <AttachmentAction key="b" aria-label="b" icon={<XIcon />} />,
      <AttachmentAction key="c" aria-label="c" startIcon={<XIcon />} />,
    ]) {
      const { container, unmount } = render(node);
      expect(container.querySelector('button')!.innerHTML).not.toBe('');
      unmount();
    }
  });
});
