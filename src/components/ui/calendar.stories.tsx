import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { DateRange } from 'react-day-picker';
import { Calendar } from './calendar';

/**
 * # Calendar (shadcn/ui)
 *
 * `react-day-picker` v10 wrapper re-skinned to pull colors from
 * `getRoleColor()` instead of the library's default `--rdp-*` CSS variables
 * — selected day uses `interactive.primary`/`text.onAccent`, today gets a
 * `border.default` ring, and disabled days are dimmed via `text.disabled`.
 * No MDS/Figma spec exists for this component yet.
 */
const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const SingleDatePicker: StoryObj = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>(new Date());
    return (
      <div className="rounded-lg border p-1">
        <Calendar mode="single" selected={selected} onSelect={setSelected} />
      </div>
    );
  },
};

/** Policy-effective-date field: only today and future dates are selectable. */
export const PolicyEffectiveDate: StoryObj = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-lg border p-1">
          <Calendar mode="single" selected={selected} onSelect={setSelected} disabled={{ before: today }} />
        </div>
        <p className="text-sm text-muted-foreground">
          {selected ? `Policy effective ${selected.toLocaleDateString()}` : 'Select an effective date'}
        </p>
      </div>
    );
  },
};

export const MultiMonthRange: StoryObj = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: undefined,
    });
    return (
      <div className="rounded-lg border p-1">
        <Calendar mode="range" required={false} numberOfMonths={2} selected={range} onSelect={setRange} />
      </div>
    );
  },
};
