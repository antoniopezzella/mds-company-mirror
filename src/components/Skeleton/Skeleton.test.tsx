import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import DSSkeleton from './Skeleton';

describe('DSSkeleton', () => {
  it('renders text variant by default', () => {
    const { container } = render(<DSSkeleton />);
    expect(container.querySelector('.MuiSkeleton-text')).toBeInTheDocument();
  });

  it('renders rectangular variant', () => {
    const { container } = render(<DSSkeleton variant="rectangular" width={200} height={100} />);
    expect(container.querySelector('.MuiSkeleton-rectangular')).toBeInTheDocument();
  });

  it('renders circular variant', () => {
    const { container } = render(<DSSkeleton variant="circular" width={40} height={40} />);
    expect(container.querySelector('.MuiSkeleton-circular')).toBeInTheDocument();
  });

  it('renders rounded variant', () => {
    const { container } = render(<DSSkeleton variant="rounded" width={200} height={60} />);
    expect(container.querySelector('.MuiSkeleton-rounded')).toBeInTheDocument();
  });

  it('supports pulse animation', () => {
    const { container } = render(<DSSkeleton animation="pulse" />);
    expect(container.querySelector('.MuiSkeleton-pulse')).toBeInTheDocument();
  });

  it('supports wave animation', () => {
    const { container } = render(<DSSkeleton animation="wave" />);
    expect(container.querySelector('.MuiSkeleton-wave')).toBeInTheDocument();
  });

  it('supports disabling animation', () => {
    const { container } = render(<DSSkeleton animation={false} />);
    expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument();
    expect(container.querySelector('.MuiSkeleton-pulse')).not.toBeInTheDocument();
    expect(container.querySelector('.MuiSkeleton-wave')).not.toBeInTheDocument();
  });
});
