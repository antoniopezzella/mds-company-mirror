import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContentCard from './ContentCard';

describe('ContentCard', () => {
  const defaultProps = {
    title: 'Understanding Cyber Risk',
    description: 'A guide to managing digital threats.',
    categoryLabel: 'Technology',
    readingTime: '5 min read',
    date: '01/15/2026',
    ctaLabel: 'Read More',
  };

  it('renders the title', () => {
    render(<ContentCard {...defaultProps} />);
    expect(screen.getByText('Understanding Cyber Risk')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<ContentCard {...defaultProps} />);
    expect(screen.getByText('A guide to managing digital threats.')).toBeInTheDocument();
  });

  it('renders category label', () => {
    render(<ContentCard {...defaultProps} />);
    expect(screen.getByText('Technology')).toBeInTheDocument();
  });

  it('renders reading time', () => {
    render(<ContentCard {...defaultProps} />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('renders date', () => {
    render(<ContentCard {...defaultProps} />);
    expect(screen.getByText('01/15/2026')).toBeInTheDocument();
  });

  it('renders CTA button and handles click', () => {
    const onCtaClick = vi.fn();
    render(<ContentCard {...defaultProps} onCtaClick={onCtaClick} />);
    const cta = screen.getByText('Read More');
    expect(cta).toBeInTheDocument();
    fireEvent.click(cta);
    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });

  it('renders badges', () => {
    render(<ContentCard {...defaultProps} badges={['New', 'Featured']} />);
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('renders placeholder image when no imageUrl', () => {
    const { container } = render(<ContentCard title="No Image" />);
    // Placeholder SVG should be present
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('renders with horizontal orientation', () => {
    const { container } = render(<ContentCard {...defaultProps} orientation="horizontal" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
