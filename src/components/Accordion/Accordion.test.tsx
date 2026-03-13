import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Accordion } from './Accordion';
import type { AccordionItem } from './Accordion';

const items: AccordionItem[] = [
  { id: 'coverage', title: 'Coverage Details', content: 'Full coverage information' },
  { id: 'claims', title: 'Claims History', content: 'Past claims records' },
  { id: 'billing', title: 'Billing', content: 'Payment information' },
];

describe('Accordion', () => {
  it('renders all item titles', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('Coverage Details')).toBeInTheDocument();
    expect(screen.getByText('Claims History')).toBeInTheDocument();
    expect(screen.getByText('Billing')).toBeInTheDocument();
  });

  it('content is hidden by default', () => {
    render(<Accordion items={items} />);
    expect(screen.queryByText('Full coverage information')).not.toBeVisible();
  });

  it('expands item on click', () => {
    render(<Accordion items={items} />);
    fireEvent.click(screen.getByText('Coverage Details'));
    expect(screen.getByText('Full coverage information')).toBeVisible();
  });

  it('collapses previously expanded item in single mode', () => {
    render(<Accordion items={items} />);
    fireEvent.click(screen.getByText('Coverage Details'));
    expect(screen.getByText('Full coverage information')).toBeVisible();
    fireEvent.click(screen.getByText('Claims History'));
    expect(screen.getByText('Past claims records')).toBeVisible();
  });

  it('supports multiple expanded items', () => {
    render(<Accordion items={items} allowMultiple />);
    fireEvent.click(screen.getByText('Coverage Details'));
    fireEvent.click(screen.getByText('Claims History'));
    expect(screen.getByText('Full coverage information')).toBeVisible();
    expect(screen.getByText('Past claims records')).toBeVisible();
  });

  it('supports default expanded items', () => {
    render(<Accordion items={items} defaultExpanded={['billing']} />);
    expect(screen.getByText('Payment information')).toBeVisible();
  });

  it('calls onChange with expanded IDs', () => {
    const onChange = vi.fn();
    render(<Accordion items={items} onChange={onChange} />);
    fireEvent.click(screen.getByText('Coverage Details'));
    expect(onChange).toHaveBeenCalledWith(['coverage']);
  });
});
