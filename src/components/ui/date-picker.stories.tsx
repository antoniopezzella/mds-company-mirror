import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { DateRange } from 'react-day-picker';
import { arSA } from 'react-day-picker/locale';
import { subYears } from 'date-fns';
import { DatePicker, DateRangePicker, DatePickerInput, DateTimePicker, SmartDatePicker } from './date-picker';
import { getRoleColor } from '@/theme/roles';

/**
 * # Date Picker (shadcn/ui)
 *
 * No MDS/Figma spec exists for this component — built matching every variant
 * on shadcn/ui's own official docs page
 * (https://ui.shadcn.com/docs/components/base/date-picker: Popover + Calendar
 * + Button/Input compositions, no standalone DatePicker primitive exists in
 * shadcn's own registry either), styled with this repo's `getRoleColor()`
 * role tokens throughout — `Calendar` itself (see calendar.tsx) already
 * routes every day/nav/caption state through role tokens, so every variant
 * below inherits correct light/dark theming for free.
 */
const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return <DatePicker date={date} onDateChange={setDate} />;
  },
};

export const WithSelectedDate: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 1));
    return <DatePicker date={date} onDateChange={setDate} />;
  },
};

export const RangePicker: Story = {
  name: 'Range Picker',
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 8, 5),
      to: new Date(2026, 8, 12),
    });
    return <DateRangePicker range={range} onRangeChange={setRange} />;
  },
};

export const DateOfBirth: Story = {
  name: 'Date of Birth',
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    const today = new Date();
    return (
      <DatePicker
        date={date}
        onDateChange={setDate}
        placeholder="Date of birth"
        captionLayout="dropdown"
        startMonth={subYears(today, 100)}
        endMonth={today}
      />
    );
  },
};

export const InputFieldVariant: Story = {
  name: 'Input Field Variant',
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 1));
    return <DatePickerInput date={date} onDateChange={setDate} className="w-[220px]" />;
  },
};

export const TimePicker: Story = {
  name: 'Time Picker',
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 1, 13, 30));
    return <DateTimePicker date={date} onDateChange={setDate} />;
  },
};

export const NaturalLanguagePicker: Story = {
  name: 'Natural Language Picker',
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return <SmartDatePicker date={date} onDateChange={setDate} className="w-[280px]" />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Parses free text ("next Friday", "in 3 weeks", "Dec 25") via [chrono-node](https://github.com/wanasit/chrono) into a real `Date`, with a calendar fallback for manual picking.',
      },
    },
  },
};

export const RTLSupport: Story = {
  name: 'RTL Support',
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 1));
    return (
      <div dir="rtl">
        <DatePicker date={date} onDateChange={setDate} locale={arSA} dir="rtl" placeholder="اختر تاريخًا" />
      </div>
    );
  },
};

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const [single, setSingle] = React.useState<Date | undefined>(new Date(2026, 8, 1));
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 8, 5),
      to: new Date(2026, 8, 12),
    });
    const [dob, setDob] = React.useState<Date | undefined>();
    const [inputDate, setInputDate] = React.useState<Date | undefined>(new Date(2026, 8, 1));
    const [dateTime, setDateTime] = React.useState<Date | undefined>(new Date(2026, 8, 1, 13, 30));
    const [smart, setSmart] = React.useState<Date | undefined>();
    const today = new Date();

    const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium" style={{ color: getRoleColor('text.secondary') }}>
          {label}
        </span>
        {children}
      </div>
    );

    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Row label="Basic">
          <DatePicker date={single} onDateChange={setSingle} />
        </Row>
        <Row label="Range Picker">
          <DateRangePicker range={range} onRangeChange={setRange} />
        </Row>
        <Row label="Date of Birth">
          <DatePicker
            date={dob}
            onDateChange={setDob}
            placeholder="Date of birth"
            captionLayout="dropdown"
            startMonth={subYears(today, 100)}
            endMonth={today}
          />
        </Row>
        <Row label="Input Field Variant">
          <DatePickerInput date={inputDate} onDateChange={setInputDate} className="w-[220px]" />
        </Row>
        <Row label="Time Picker">
          <DateTimePicker date={dateTime} onDateChange={setDateTime} />
        </Row>
        <Row label="Natural Language Picker">
          <SmartDatePicker date={smart} onDateChange={setSmart} className="w-[260px]" />
        </Row>
        <Row label="RTL Support">
          <div dir="rtl">
            <DatePicker date={single} onDateChange={setSingle} locale={arSA} dir="rtl" placeholder="اختر تاريخًا" />
          </div>
        </Row>
      </div>
    );
  },
};
