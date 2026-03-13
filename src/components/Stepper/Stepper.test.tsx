import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Stepper } from './Stepper';
import type { StepConfig } from './Stepper';

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

  it('highlights active step', () => {
    render(<Stepper steps={steps} activeStep={1} />);
    expect(screen.getByText('Under Review')).toBeInTheDocument();
  });

  it('calls onStepClick when step is clicked', () => {
    const onStepClick = vi.fn();
    render(<Stepper steps={steps} onStepClick={onStepClick} />);
    fireEvent.click(screen.getByText('Claim Intake'));
    expect(onStepClick).toHaveBeenCalledWith(0);
  });

  it('renders horizontal orientation', () => {
    const { container } = render(<Stepper steps={steps} orientation="horizontal" />);
    expect(container.querySelector('.MuiStepper-horizontal')).toBeInTheDocument();
  });

  it('renders vertical orientation', () => {
    const { container } = render(<Stepper steps={steps} orientation="vertical" />);
    expect(container.querySelector('.MuiStepper-vertical')).toBeInTheDocument();
  });
});
