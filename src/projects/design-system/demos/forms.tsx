import * as React from 'react';
import { DSTextField } from '@/components/ui/text-field';
import { DSSelect } from '@/components/ui/select';
import { DSCheckbox } from '@/components/ui/checkbox';
import { DSRadioGroup } from '@/components/ui/radio-group';
import { DSSwitch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Stepper, type StepConfig } from '@/components/ui/stepper';

export function TextFieldDemo() {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <DSTextField label="Name" placeholder="Jane Doe" />
      <DSTextField label="Email" placeholder="jane@example.com" helperText="We'll never share this." />
      <DSTextField label="Policy number" tone="danger" helperText="This policy number wasn't found." defaultValue="MB-00X" />
    </div>
  );
}

export function TextareaDemo() {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <DSTextField type="textarea" label="Description" rows={4} placeholder="Describe the incident..." fullWidth className="max-w-sm" />
    </div>
  );
}

export function SelectDemo() {
  const options = [
    { value: 'auto', label: 'Auto' },
    { value: 'property', label: 'Property' },
    { value: 'liability', label: 'Liability' },
    { value: 'cyber', label: 'Cyber', disabled: true },
  ];
  const [value, setValue] = React.useState<string | number>('auto');
  return (
    <div className="flex flex-wrap items-start gap-4">
      <DSSelect label="Coverage type" options={options} value={value} onChange={setValue} />
    </div>
  );
}

export function CheckboxDemo() {
  const [checked, setChecked] = React.useState<boolean | 'indeterminate'>('indeterminate');
  return (
    <div className="flex flex-col gap-3">
      <DSCheckbox label="Email me policy updates" defaultChecked />
      <DSCheckbox label="Select all claims" checked={checked} onCheckedChange={setChecked} helperText="Tri-state: some claims are already selected." />
      <DSCheckbox label="Auto-renew (disabled)" disabled />
    </div>
  );
}

export function RadioGroupDemo() {
  const [value, setValue] = React.useState('monthly');
  const options = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'annual', label: 'Annual' },
    { value: 'biannual', label: 'Biannual', disabled: true },
  ];
  return <DSRadioGroup label="Billing cycle" options={options} value={value} onChange={setValue} row />;
}

export function SwitchDemo() {
  const [checked, setChecked] = React.useState(true);
  return (
    <div className="flex flex-col gap-3">
      <DSSwitch label="Enable notifications" checked={checked} onCheckedChange={setChecked} />
      <DSSwitch label="Danger zone access" tone="danger" defaultChecked={false} />
      <DSSwitch label="Disabled" disabled />
    </div>
  );
}

export function SliderDemo() {
  const [value, setValue] = React.useState([40]);
  return (
    <div className="w-full max-w-sm">
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
    </div>
  );
}

const STEPPER_STEPS: StepConfig[] = [
  { id: 'details', label: 'Policy details' },
  { id: 'coverage', label: 'Coverage' },
  { id: 'review', label: 'Review & submit' },
];

export function StepperDemo() {
  return <Stepper steps={STEPPER_STEPS} activeStep={1} orientation="horizontal" />;
}
