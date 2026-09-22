import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from './input-group';
import { getRoleColor } from '@/theme/roles';

describe('InputGroup', () => {
  it('renders as a group with the neutral border role', () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    const group = screen.getByTestId('group');
    expect(group).toHaveAttribute('role', 'group');
    expect(group).toHaveAttribute('data-slot', 'input-group');
    expect(group).toHaveStyle({ borderColor: getRoleColor('border.default') });
  });

  it('renders its control and addon children', () => {
    render(
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="domain" />
      </InputGroup>
    );
    expect(screen.getByText('https://')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('domain')).toBeInTheDocument();
  });

  // The addon's whole reason for having a click handler: clicking the
  // decorative prefix should behave like clicking a <label> and move focus to
  // the sibling control, rather than swallowing the click.
  it('focuses the sibling control when the addon is clicked', () => {
    render(
      <InputGroup>
        <InputGroupAddon data-testid="addon">
          <InputGroupText>@</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="handle" />
      </InputGroup>
    );
    expect(screen.getByPlaceholderText('handle')).not.toHaveFocus();
    fireEvent.click(screen.getByTestId('addon'));
    expect(screen.getByPlaceholderText('handle')).toHaveFocus();
  });

  it('does not steal focus when the click lands on a button inside the addon', () => {
    const onClick = vi.fn();
    render(
      <InputGroup>
        <InputGroupAddon>
          <InputGroupButton onClick={onClick}>Go</InputGroupButton>
        </InputGroupAddon>
        <InputGroupInput placeholder="query" />
      </InputGroup>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Go' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    // The button handled it; focus must not be yanked to the input.
    expect(screen.getByPlaceholderText('query')).not.toHaveFocus();
  });

  // Regression guard: iconOnly used to default to true unconditionally, which
  // made Button drop `children` and render a nameless, empty button.
  it('renders a text label when children are given', () => {
    render(
      <InputGroup>
        <InputGroupAddon>
          <InputGroupButton>Save</InputGroupButton>
        </InputGroupAddon>
        <InputGroupInput placeholder="q" />
      </InputGroup>
    );
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('still renders icon-only when given an icon and no children', () => {
    render(
      <InputGroup>
        <InputGroupAddon>
          <InputGroupButton aria-label="Send" icon={<svg data-testid="icon" />} />
        </InputGroupAddon>
        <InputGroupInput placeholder="q" />
      </InputGroup>
    );
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies alignment variants via data-align', () => {
    render(
      <InputGroup>
        <InputGroupAddon data-testid="start" align="inline-start">
          <InputGroupText>a</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon data-testid="end" align="inline-end">
          <InputGroupText>b</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="x" />
      </InputGroup>
    );
    expect(screen.getByTestId('start')).toHaveAttribute('data-align', 'inline-start');
    expect(screen.getByTestId('end')).toHaveAttribute('data-align', 'inline-end');
  });

  it('supports a textarea control as well as an input', () => {
    render(
      <InputGroup>
        <InputGroupTextarea placeholder="message" />
      </InputGroup>
    );
    expect(screen.getByPlaceholderText('message').tagName).toBe('TEXTAREA');
  });
});
