import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DSCircularProgress, DSLinearProgress } from './Progress';

describe('DSCircularProgress', () => {
  it('renders with default props', () => {
    const { container } = render(<DSCircularProgress />);
    expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    const { container } = render(<DSCircularProgress size={60} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders determinate mode with value', () => {
    const { container } = render(<DSCircularProgress variant="determinate" value={75} />);
    expect(container.querySelector('.MuiCircularProgress-determinate')).toBeInTheDocument();
  });

  it('supports success tone', () => {
    const { container } = render(<DSCircularProgress tone="success" />);
    expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
  });

  it('supports danger tone', () => {
    const { container } = render(<DSCircularProgress tone="danger" />);
    expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
  });
});

describe('DSLinearProgress', () => {
  it('renders with default props', () => {
    const { container } = render(<DSLinearProgress />);
    expect(container.querySelector('.MuiLinearProgress-root')).toBeInTheDocument();
  });

  it('renders determinate mode with value', () => {
    const { container } = render(<DSLinearProgress variant="determinate" value={50} />);
    expect(container.querySelector('.MuiLinearProgress-determinate')).toBeInTheDocument();
  });

  it('renders buffer mode', () => {
    const { container } = render(<DSLinearProgress variant="buffer" value={30} valueBuffer={60} />);
    expect(container.querySelector('.MuiLinearProgress-buffer')).toBeInTheDocument();
  });

  it('supports success tone', () => {
    const { container } = render(<DSLinearProgress tone="success" />);
    expect(container.querySelector('.MuiLinearProgress-root')).toBeInTheDocument();
  });

  it('supports danger tone', () => {
    const { container } = render(<DSLinearProgress tone="danger" />);
    expect(container.querySelector('.MuiLinearProgress-root')).toBeInTheDocument();
  });
});
