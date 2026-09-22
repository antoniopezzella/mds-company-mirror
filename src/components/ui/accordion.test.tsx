import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Accordion, type AccordionItem } from './accordion';

describe('Accordion', () => {
  const items: AccordionItem[] = [
    { id: 'a', title: 'Section A', content: 'Content A' },
    { id: 'b', title: 'Section B', content: 'Content B' },
    { id: 'c', title: 'Section C', content: 'Content C', disabled: true },
  ];

  it('renders every item title', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('Section A')).toBeInTheDocument();
    expect(screen.getByText('Section B')).toBeInTheDocument();
    expect(screen.getByText('Section C')).toBeInTheDocument();
  });

  it('nothing is expanded by default without defaultExpanded', () => {
    render(<Accordion items={items} />);
    for (const trigger of screen.getAllByRole('button')) {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('expands the item listed in defaultExpanded', () => {
    render(<Accordion items={items} defaultExpanded={['a']} />);
    expect(screen.getByRole('button', { name: /Section A/ })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: /Section B/ })).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands an item on click (single mode)', () => {
    render(<Accordion items={items} />);
    const triggerA = screen.getByRole('button', { name: /Section A/ });
    fireEvent.click(triggerA);
    expect(triggerA).toHaveAttribute('aria-expanded', 'true');
  });

  it('single mode collapses the previously open item when a new one opens', () => {
    render(<Accordion items={items} defaultExpanded={['a']} />);
    const triggerA = screen.getByRole('button', { name: /Section A/ });
    const triggerB = screen.getByRole('button', { name: /Section B/ });
    expect(triggerA).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(triggerB);
    expect(triggerB).toHaveAttribute('aria-expanded', 'true');
    expect(triggerA).toHaveAttribute('aria-expanded', 'false');
  });

  it('allowMultiple keeps multiple items open at once', () => {
    render(<Accordion items={items} allowMultiple defaultExpanded={['a']} />);
    const triggerA = screen.getByRole('button', { name: /Section A/ });
    const triggerB = screen.getByRole('button', { name: /Section B/ });
    fireEvent.click(triggerB);
    expect(triggerA).toHaveAttribute('aria-expanded', 'true');
    expect(triggerB).toHaveAttribute('aria-expanded', 'true');
  });

  it('does not expand a disabled item on click', () => {
    render(<Accordion items={items} />);
    const triggerC = screen.getByRole('button', { name: /Section C/ });
    fireEvent.click(triggerC);
    expect(triggerC).toHaveAttribute('aria-expanded', 'false');
  });

  it('calls onChange with the newly expanded id(s)', () => {
    const onChange = vi.fn();
    render(<Accordion items={items} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /Section B/ }));
    expect(onChange).toHaveBeenCalledWith(['b']);
  });
});
