import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CircularProgress, LinearProgress } from './progress';

describe('CircularProgress', () => {
  it('renders with role="progressbar"', () => {
    render(<CircularProgress />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets aria-valuenow for determinate mode', () => {
    render(<CircularProgress variant="determinate" value={42} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '42');
  });

  it('omits aria-valuenow for indeterminate mode', () => {
    render(<CircularProgress variant="indeterminate" />);
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
  });

  it('clamps a value above 100 down to 100', () => {
    render(<CircularProgress variant="determinate" value={250} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('clamps a negative value up to 0', () => {
    render(<CircularProgress variant="determinate" value={-30} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('applies the spin animation class only when indeterminate', () => {
    const { container: indet } = render(<CircularProgress variant="indeterminate" />);
    const { container: det } = render(<CircularProgress variant="determinate" value={50} />);
    expect(indet.querySelector('svg')?.getAttribute('class')).toMatch(/animate-spin/);
    expect(det.querySelector('svg')?.getAttribute('class')).not.toMatch(/animate-spin/);
  });
});

describe('LinearProgress', () => {
  it('renders a progressbar', () => {
    render(<LinearProgress />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('reflects a clamped value via aria-valuenow', () => {
    render(<LinearProgress variant="determinate" value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('has no aria-valuenow in indeterminate mode', () => {
    render(<LinearProgress variant="indeterminate" />);
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
  });
});
