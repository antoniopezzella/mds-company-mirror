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
    render(<Stepper steps={steps} activeStep={1} />);
    expect(screen.getByText('completed')).toBeInTheDocument(); // step 0
    expect(screen.getByText('active')).toBeInTheDocument(); // step 1
    expect(screen.getByText('pending')).toBeInTheDocument(); // step 2
  });

  it('lets an explicit per-step status override the activeStep-derived one', () => {
    const overridden: StepConfig[] = [
      { id: 'a', label: 'A', status: 'error' },
      { id: 'b', label: 'B' },
    ];
    render(<Stepper steps={overridden} activeStep={0} />);
    // Step 0 would derive to "active" from activeStep, but its own status wins.
    expect(screen.getByText('error')).toBeInTheDocument();
  });

  it('renders horizontal orientation', () => {
    const { container } = render(<Stepper steps={steps} orientation="horizontal" />);
    expect(container.firstElementChild?.className).toMatch(/items-start/);
  });
});
