import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Stepper, type StepConfig } from './stepper';

const steps: StepConfig[] = [
  { id: 'intake', label: 'Claim Intake', description: 'Submit initial claim' },
  { id: 'review', label: 'Under Review', description: 'Claim is being reviewed' },
  { id: 'decision', label: 'Decision', description: 'Final decision' },
];

describe('Stepper', () => {
  it('renders all step labels', () => {
    render(<Stepper steps={steps} />);
    expect(screen.getByText('Claim Intake')).toBeInTheDocument();
    expect(screen.getByText('Under Review')).toBeInTheDocument();
    expect(screen.getByText('Decision')).toBeInTheDocument();
  });

  it('renders step descriptions', () => {
    render(<Stepper steps={steps} />);
    expect(screen.getByText('Submit initial claim')).toBeInTheDocument();
  });

  it('calls onStepClick when a step is clicked', () => {
    const onStepClick = vi.fn();
    render(<Stepper steps={steps} onStepClick={onStepClick} />);
    fireEvent.click(screen.getByText('Claim Intake'));
    expect(onStepClick).toHaveBeenCalledWith(0);
  });

  it('derives active/completed/pending status from activeStep (MUI-parity API)', () => {
    // Status is visual by default (no badge text to assert), so read it off
    // the opt-in status pills instead.
    render(<Stepper steps={steps} activeStep={1} showStatusBadge />);
    expect(screen.getByText('Completed')).toBeInTheDocument(); // step 0
    expect(screen.getByText('In Progress')).toBeInTheDocument(); // step 1
    expect(screen.getByText('Pending')).toBeInTheDocument(); // step 2
  });

  it('shows no status badges by default (reui-accurate)', () => {
    render(<Stepper steps={steps} activeStep={1} />);
    expect(screen.queryByText('Completed')).not.toBeInTheDocument();
    expect(screen.queryByText('In Progress')).not.toBeInTheDocument();
  });

  it('lets an explicit per-step status override the activeStep-derived one', () => {
    const overridden: StepConfig[] = [
      { id: 'a', label: 'A', status: 'error' },
      { id: 'b', label: 'B' },
    ];
    render(<Stepper steps={overridden} activeStep={0} showStatusBadge />);
    // Step 0 would derive to "active" from activeStep, but its own status wins.
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders numbered indicators by default', () => {
    render(<Stepper steps={steps} activeStep={1} />);
    expect(screen.getByText('2')).toBeInTheDocument(); // active step shows its number
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders a full-width bar indicator instead of a circle when indicator="bar"', () => {
    const { container } = render(<Stepper steps={steps} activeStep={1} indicator="bar" orientation="horizontal" />);
    expect(container.querySelectorAll('.h-1.w-full')).toHaveLength(steps.length);
    // Numbers are visually replaced by the bar, but stay available to SRs.
    expect(container.querySelector('.sr-only')).toBeInTheDocument();
  });

  it('renders the step\'s own icon when indicator="icon"', () => {
    const withIcons: StepConfig[] = [{ id: 'a', label: 'A', status: 'active', icon: <span data-testid="step-icon">★</span> }];
    render(<Stepper steps={withIcons} indicator="icon" />);
    expect(screen.getByTestId('step-icon')).toBeInTheDocument();
  });

  it('renders a "STEP N" eyebrow when showStepEyebrow is set', () => {
    render(<Stepper steps={steps} activeStep={0} showStepEyebrow />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('renders horizontal orientation', () => {
    const { container } = render(<Stepper steps={steps} orientation="horizontal" />);
    expect(container.querySelector('.items-start')).toBeInTheDocument();
  });

  it('applies the WAI-ARIA tablist pattern only when interactive', () => {
    const { container: staticContainer } = render(<Stepper steps={steps} />);
    expect(staticContainer.querySelector('[role="tablist"]')).not.toBeInTheDocument();

    const { container: interactiveContainer } = render(<Stepper steps={steps} onStepClick={vi.fn()} />);
    expect(interactiveContainer.querySelector('[role="tablist"]')).toBeInTheDocument();
    expect(interactiveContainer.querySelectorAll('[role="tab"]')).toHaveLength(steps.length);
  });

  it('gives only the active tab a 0 tabIndex (roving tabindex)', () => {
    render(<Stepper steps={steps} activeStep={1} onStepClick={vi.fn()} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('tabIndex', '-1');
    expect(tabs[1]).toHaveAttribute('tabIndex', '0');
    expect(tabs[2]).toHaveAttribute('tabIndex', '-1');
  });

  it('moves focus with arrow keys and activates with Enter', () => {
    const onStepClick = vi.fn();
    render(<Stepper steps={steps} activeStep={0} onStepClick={onStepClick} />);
    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    expect(tabs[1]).toHaveFocus();
    fireEvent.keyDown(tabs[1], { key: 'Enter' });
    expect(onStepClick).toHaveBeenCalledWith(1);
  });

  it('skips disabled steps in keyboard navigation and clicks', () => {
    const onStepClick = vi.fn();
    const withDisabled: StepConfig[] = [
      { id: 'a', label: 'A' },
      { id: 'b', label: 'B', disabled: true },
      { id: 'c', label: 'C' },
    ];
    render(<Stepper steps={withDisabled} activeStep={0} onStepClick={onStepClick} />);
    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    expect(tabs[2]).toHaveFocus();

    fireEvent.click(tabs[1]);
    expect(onStepClick).not.toHaveBeenCalled();
  });

  it('shows a spinner for a loading step', () => {
    const withLoading: StepConfig[] = [{ id: 'a', label: 'A', loading: true }];
    const { container } = render(<Stepper steps={withLoading} />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders only the active step\'s content in "active-only" mode, in a linked tabpanel', () => {
    const withContent: StepConfig[] = [
      { id: 'a', label: 'A', status: 'completed', content: 'Content A' },
      { id: 'b', label: 'B', status: 'active', content: 'Content B' },
    ];
    render(<Stepper steps={withContent} contentMode="active-only" onStepClick={vi.fn()} />);
    expect(screen.queryByText('Content A')).not.toBeInTheDocument();
    expect(screen.getByText('Content B')).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'stepper-tab-b');
  });
});
