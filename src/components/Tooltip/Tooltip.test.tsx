import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders children', () => {
    render(
      <Tooltip title="Help text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('renders tooltip content on hover', async () => {
    const { user } = await import('@testing-library/user-event').then(m => ({
      user: m.default.setup(),
    }));
    render(
      <Tooltip title="Helpful hint" enterDelay={0}>
        <button>Hover me</button>
      </Tooltip>
    );
    await user.hover(screen.getByText('Hover me'));
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Helpful hint');
  });

  it('renders with different placements', () => {
    const { container } = render(
      <Tooltip title="Bottom tip" placement="bottom">
        <span>Bottom</span>
      </Tooltip>
    );
    expect(container).toBeInTheDocument();
  });

  it('renders with arrow', () => {
    render(
      <Tooltip title="Arrow tip" arrow enterDelay={0}>
        <button>Arrow</button>
      </Tooltip>
    );
    expect(screen.getByText('Arrow')).toBeInTheDocument();
  });
});
