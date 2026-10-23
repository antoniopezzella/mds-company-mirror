import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from './button-group';
import { Button } from './button';

describe('ButtonGroup', () => {
  it('exposes itself as a group so assistive tech knows the buttons belong together', () => {
    render(
      <ButtonGroup aria-label="Text alignment">
        <Button>Left</Button>
        <Button>Center</Button>
      </ButtonGroup>
    );
    expect(screen.getByRole('group', { name: 'Text alignment' })).toBeInTheDocument();
  });

  it('renders its buttons as children', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>
    );
    expect(screen.getByRole('button', { name: 'One' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Two' })).toBeInTheDocument();
  });

  it('defaults to horizontal and records the orientation', () => {
    const { rerender } = render(
      <ButtonGroup data-testid="g">
        <Button>A</Button>
      </ButtonGroup>
    );
    expect(screen.getByTestId('g')).toHaveAttribute('data-orientation', 'horizontal');
    rerender(
      <ButtonGroup data-testid="g" orientation="vertical">
        <Button>A</Button>
      </ButtonGroup>
    );
    expect(screen.getByTestId('g')).toHaveAttribute('data-orientation', 'vertical');
  });

  // The whole visual point of the component: adjacent buttons share one border
  // and flatten the corners between them. If these utilities are dropped the
  // group renders as separate buttons pushed together, with doubled borders.
  it('collapses the border between adjacent buttons', () => {
    render(
      <ButtonGroup data-testid="g">
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>
    );
    const cls = screen.getByTestId('g').className;
    expect(cls).toContain('[&>*:not(:first-child)]:border-l-0');
    expect(cls).toContain('[&>*:not(:last-child)]:rounded-r-none');
  });

  it('switches to column layout and top borders when vertical', () => {
    render(
      <ButtonGroup data-testid="g" orientation="vertical">
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>
    );
    const cls = screen.getByTestId('g').className;
    expect(cls).toContain('flex-col');
    expect(cls).toContain('[&>*:not(:first-child)]:border-t-0');
  });

  it('merges a caller className without dropping the group styling', () => {
    render(
      <ButtonGroup data-testid="g" className="custom-class">
        <Button>A</Button>
      </ButtonGroup>
    );
    const cls = screen.getByTestId('g').className;
    expect(cls).toContain('custom-class');
    expect(cls).toContain('items-stretch');
  });
});

describe('ButtonGroupText', () => {
  it('renders non-interactive content styled from role tokens', () => {
    render(
      <ButtonGroup>
        <ButtonGroupText data-testid="t">https://</ButtonGroupText>
        <Button>Go</Button>
      </ButtonGroup>
    );
    const text = screen.getByTestId('t');
    expect(text).toHaveTextContent('https://');
    // Asserted against getRoleColor rather than a literal so this keeps
    // passing if the role is retargeted, and fails if the component starts
    // hardcoding colour instead of consuming the role layer.
    // `.style.*`, not toHaveStyle: jsdom cannot match a `var()` inline value.
    const ts = (text as HTMLElement).style;
    expect(ts.backgroundColor).toBe('var(--role-bg-neutral-subtle)');
    expect(ts.borderColor).toBe('var(--role-border-default)');
    expect(ts.color).toBe('var(--role-fg-primary)');
    // It is a label, not a control — it must not be announced as one.
    expect(screen.queryByRole('button', { name: 'https://' })).not.toBeInTheDocument();
  });

  it('renders as the child element when asChild is set', () => {
    render(
      <ButtonGroup>
        <ButtonGroupText asChild>
          <label htmlFor="amount">Amount</label>
        </ButtonGroupText>
        <Button>Go</Button>
      </ButtonGroup>
    );
    const label = screen.getByText('Amount');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'amount');
  });
});

describe('ButtonGroupSeparator', () => {
  it('defaults to vertical, matching the group default', () => {
    render(
      <ButtonGroup>
        <Button>A</Button>
        <ButtonGroupSeparator data-testid="sep" />
        <Button>B</Button>
      </ButtonGroup>
    );
    expect(screen.getByTestId('sep')).toHaveAttribute('data-orientation', 'vertical');
  });

  it('is decorative, so it adds no noise to the accessibility tree', () => {
    render(
      <ButtonGroup>
        <Button>A</Button>
        <ButtonGroupSeparator data-testid="sep" />
        <Button>B</Button>
      </ButtonGroup>
    );
    // Radix marks a decorative separator with role="none"; it must not appear
    // as a separator between the two buttons.
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  });
});
