import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';
import { Textarea } from './textarea';
import { roleVar } from '@/theme/roles';

describe('Textarea', () => {
  it('renders a textarea and forwards arbitrary props', () => {
    render(<Textarea placeholder="Notes" name="notes" rows={5} />);
    const el = screen.getByPlaceholderText('Notes');
    expect(el.tagName).toBe('TEXTAREA');
    expect(el).toHaveAttribute('name', 'notes');
    expect(el).toHaveAttribute('rows', '5');
  });

  it('forwards its ref to the underlying element', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} placeholder="Focus me" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    ref.current?.focus();
    expect(screen.getByPlaceholderText('Focus me')).toHaveFocus();
  });

  it('accepts typed input and fires onChange', () => {
    const onChange = vi.fn();
    render(<Textarea placeholder="Body" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText('Body'), { target: { value: 'Hello' } });
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByPlaceholderText<HTMLTextAreaElement>('Body').value).toBe('Hello');
  });

  // See the equivalent note in input.test.tsx: fireEvent bypasses `disabled`
  // in jsdom, so the attribute is the meaningful assertion here.
  it('marks the control disabled and dims it', () => {
    render(<Textarea placeholder="Locked" disabled />);
    const el = screen.getByPlaceholderText('Locked');
    expect(el).toBeDisabled();
    expect(el.className).toContain('disabled:opacity-50');
  });

  // Textarea shares Input's InputTone union and tone→role mapping; these
  // assertions exist so the two can't silently drift apart.
  it.each([
    ['error', 'status.danger.fg'],
    ['success', 'status.success.fg'],
    ['warning', 'status.warning.fg'],
  ] as const)('tone="%s" borders with the %s role', (tone, role) => {
    render(<Textarea placeholder="Tone" tone={tone} />);
    expect((screen.getByPlaceholderText('Tone') as HTMLElement).style.borderColor).toBe(roleVar(role));
  });

  it('defaults to the neutral border role', () => {
    render(<Textarea placeholder="Default" />);
    // `.style.*`, not toHaveStyle: jsdom cannot match a `var()` inline value.
    expect((screen.getByPlaceholderText('Default') as HTMLElement).style.borderColor).toBe(
      'var(--role-border-default)'
    );
  });

  it('merges a caller className without dropping base classes', () => {
    render(<Textarea placeholder="Merged" className="custom-class" />);
    const cls = screen.getByPlaceholderText('Merged').className;
    expect(cls).toContain('custom-class');
    expect(cls).toContain('w-full');
  });
});
