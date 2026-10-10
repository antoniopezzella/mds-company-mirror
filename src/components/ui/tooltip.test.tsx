import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Tooltip } from './tooltip';

// Unlike Dialog/DropdownMenu/Popover, this Tooltip wrapper doesn't forward
// Radix's open/defaultOpen control — it's Provider-driven, hover+delay only.
// The open-state test below waits out the real enterDelay via an async
// query rather than simulating a full pointer sequence.
describe('Tooltip', () => {
  it('renders the trigger element', () => {
    render(
      <Tooltip title="Helpful info">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('does not show the tooltip content before interaction', () => {
    render(
      <Tooltip title="Helpful info">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.queryByText('Helpful info')).not.toBeInTheDocument();
  });

  it('shows the tooltip content after the trigger is focused', async () => {
    render(
      <Tooltip title="Helpful info" enterDelay={10}>
        <button>Hover me</button>
      </Tooltip>
    );
    fireEvent.focus(screen.getByRole('button', { name: 'Hover me' }));
    expect(await screen.findByText('Helpful info', {}, { timeout: 2000 })).toBeInTheDocument();
  });

  it('accepts a short enterDelay without throwing', () => {
    expect(() =>
      render(
        <Tooltip title="Fast tooltip" enterDelay={0}>
          <button>Trigger</button>
        </Tooltip>
      )
    ).not.toThrow();
  });
});
