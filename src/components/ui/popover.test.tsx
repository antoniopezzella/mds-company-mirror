import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Popover, PopoverTrigger, PopoverContent } from './popover';

// Same rationale as dialog.test.tsx / dropdown-menu.test.tsx: Radix
// Popover's open state is fully controllable via `open`, so these tests
// render it already open rather than simulating a trigger click.
describe('Popover', () => {
  it('renders content when open', () => {
    render(
      <Popover open>
        <PopoverTrigger>Open filters</PopoverTrigger>
        <PopoverContent>Filter options</PopoverContent>
      </Popover>
    );
    expect(screen.getByText('Filter options')).toBeInTheDocument();
  });

  it('renders nothing when closed', () => {
    render(
      <Popover open={false}>
        <PopoverTrigger>Open filters</PopoverTrigger>
        <PopoverContent>Hidden content</PopoverContent>
      </Popover>
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('always renders the trigger', () => {
    render(
      <Popover open={false}>
        <PopoverTrigger>Open filters</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );
    expect(screen.getByText('Open filters')).toBeInTheDocument();
  });

  it('applies a custom align prop to the content', () => {
    render(
      <Popover open>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent align="start" data-testid="popover-content">
          Aligned content
        </PopoverContent>
      </Popover>
    );
    expect(screen.getByTestId('popover-content')).toHaveAttribute('data-align', 'start');
  });

  it('renders arbitrary React content, not just text', () => {
    render(
      <Popover open>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>
          <button>Action inside popover</button>
        </PopoverContent>
      </Popover>
    );
    expect(screen.getByRole('button', { name: 'Action inside popover' })).toBeInTheDocument();
  });
});
