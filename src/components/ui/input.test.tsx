import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { Input } from './input';
import { roleVar } from '@/theme/roles';

describe('Input', () => {
  it('renders an input and forwards arbitrary props', () => {
    render(<Input placeholder="Email" name="email" />);
    const input = screen.getByPlaceholderText('Email');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'email');
  });

  it('forwards its ref to the underlying element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Focus me" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    // The ref is what lets consumers drive focus — the main reason this
    // component is a forwardRef at all.
    ref.current?.focus();
    expect(screen.getByPlaceholderText('Focus me')).toHaveFocus();
  });

  it('accepts typed input and fires onChange', () => {
    const onChange = vi.fn();
    render(<Input placeholder="Name" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Ada' } });
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByPlaceholderText<HTMLInputElement>('Name').value).toBe('Ada');
  });

  // Note: this asserts the disabled *attribute*, not that onChange never
  // fires. `fireEvent.change` dispatches straight at the element and bypasses
  // `disabled` in jsdom, so an onChange assertion here would pass or fail for
  // reasons unrelated to the component. The attribute is what actually stops
  // input in a real browser, and it's what the DOM contract guarantees.
  it('marks the control disabled and dims it', () => {
    render(<Input placeholder="Locked" disabled />);
    const input = screen.getByPlaceholderText('Locked');
    expect(input).toBeDisabled();
    expect(input.className).toContain('disabled:opacity-50');
  });

  // Tone drives the validation colour. Asserting against getRoleColor rather
  // than a literal hex is deliberate: the test then verifies the component
  // consumes the role layer, and keeps passing when a role is retargeted.
  it.each([
    ['error', 'fg.critical'],
    ['success', 'fg.success'],
    ['warning', 'fg.warning'],
  ] as const)('tone="%s" borders with the %s role', (tone, role) => {
    render(<Input placeholder="Tone" tone={tone} />);
    expect((screen.getByPlaceholderText('Tone') as HTMLElement).style.borderColor).toBe(roleVar(role));
  });

  it('defaults to the neutral border role', () => {
    render(<Input placeholder="Default" />);
    // `.style.*`, not toHaveStyle: jsdom's toHaveStyle cannot match a `var()`
    // inline value (it normalises it away). The raw style property returns it.
    expect((screen.getByPlaceholderText('Default') as HTMLElement).style.borderColor).toBe(
      'var(--role-border-default)'
    );
  });

  it('applies the size preset heights', () => {
    const { rerender } = render(<Input placeholder="S" inputSize="small" />);
    expect(screen.getByPlaceholderText('S').className).toContain('h-8');
    rerender(<Input placeholder="S" inputSize="medium" />);
    expect(screen.getByPlaceholderText('S').className).toContain('h-10');
  });

  it('merges a caller className without dropping base classes', () => {
    render(<Input placeholder="Merged" className="custom-class" />);
    const cls = screen.getByPlaceholderText('Merged').className;
    expect(cls).toContain('custom-class');
    expect(cls).toContain('w-full');
  });

  it('lets a caller style override win over the role default', () => {
    render(<Input placeholder="Override" style={{ borderColor: 'rgb(1, 2, 3)' }} />);
    expect(screen.getByPlaceholderText('Override')).toHaveStyle({ borderColor: 'rgb(1, 2, 3)' });
  });
});
