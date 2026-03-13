import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card', () => {
  const defaultProps = {
    title: 'Total Claims',
    stats: [
      { label: 'Open', value: '42', change: '+5%' },
      { label: 'Closed', value: '128' },
    ],
    insight: 'Claims are trending upward this quarter',
  };

  it('renders the title', () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByText('Total Claims')).toBeInTheDocument();
  });

  it('renders all stat values', () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('128')).toBeInTheDocument();
  });

  it('renders stat labels', () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('Closed')).toBeInTheDocument();
  });

  it('renders change indicator when provided', () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByText(/\+5%/)).toBeInTheDocument();
  });

  it('renders the insight text', () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByText('Claims are trending upward this quarter')).toBeInTheDocument();
  });

  it('renders without change on stats that lack it', () => {
    const props = {
      title: 'Test',
      stats: [{ label: 'Count', value: '10' }],
      insight: 'Insight',
    };
    render(<Card {...props} />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
