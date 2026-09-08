import * as React from 'react';
import { Calendar as CalendarIcon, Check, Clock, X } from 'lucide-react';
import { format, isValid, parse } from 'date-fns';
import * as chrono from 'chrono-node';
import type { DateRange, DayPickerProps } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Button } from './button';
import { Calendar } from './calendar';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

/**
 * Design System Date Picker — no MDS/Figma spec exists for this yet; built
 * matching shadcn/ui's own official documented patterns directly
 * (https://ui.shadcn.com/docs/components/base/date-picker), styled with
 * getRoleColor() per this repo's convention. `Calendar` (see calendar.tsx)
 * already routes every visual state through role tokens, so every variant
 * below inherits correct token theming for free — none of them touch color
 * directly except for small bits of picker-chrome (helper text, status
 * icons) that live outside Calendar's own token surface.
 */

// ---------------------------------------------------------------------------
// 1. Basic — single date. Also covers the "Date of Birth" (dropdown caption
//    + bounded years) and "RTL" (dir + locale) variants via optional props,
//    since both are just different Calendar props on the same composition —
//    building three near-identical components would just be copy/paste.
// ---------------------------------------------------------------------------

export interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  /** 'dropdown' enables month/year select menus — used by the Date of Birth variant. */
  captionLayout?: DayPickerProps['captionLayout'];
  /** Earliest navigable month — Date of Birth bounds this to ~100 years back. */
  startMonth?: Date;
  /** Latest navigable month. */
  endMonth?: Date;
  /** date-fns/react-day-picker locale — pass e.g. `arSA` from 'react-day-picker/locale' for the RTL variant. */
  locale?: DayPickerProps['locale'];
  /** Sets reading direction on the calendar grid — 'rtl' for the RTL variant. */
  dir?: 'ltr' | 'rtl';
}

export const DatePicker: React.FC<DatePickerProps> = ({
  date,
  onDateChange,
  placeholder = 'Pick a date',
  className,
  captionLayout,
  startMonth,
  endMonth,
  locale,
  dir,
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="secondary" size="sm" className={cn('justify-start gap-2 font-normal', className)} dir={dir}>
        <CalendarIcon className="h-4 w-4" />
        {date ? format(date, 'MMM d, yyyy') : <span style={{ color: getRoleColor('text.secondary') }}>{placeholder}</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={date}
        onSelect={onDateChange}
        // eslint-disable-next-line jsx-a11y/no-autofocus -- popover just opened via user action; moving focus into it is correct popup-disclosure behavior, not page-load focus theft.
        autoFocus
        captionLayout={captionLayout}
        startMonth={startMonth}
        endMonth={endMonth}
        locale={locale}
        dir={dir}
      />
    </PopoverContent>
  </Popover>
);

// ---------------------------------------------------------------------------
// 2. Range Picker
// ---------------------------------------------------------------------------

export interface DateRangePickerProps {
  range?: DateRange;
  onRangeChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  range,
  onRangeChange,
  placeholder = 'Pick a date range',
  className,
}) => {
  const label = (() => {
    if (!range?.from) return null;
    if (!range.to) return format(range.from, 'MMM d, yyyy');
    return `${format(range.from, 'MMM d, yyyy')} – ${format(range.to, 'MMM d, yyyy')}`;
  })();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="sm" className={cn('justify-start gap-2 font-normal', className)}>
          <CalendarIcon className="h-4 w-4" />
          {label ?? <span style={{ color: getRoleColor('text.secondary') }}>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={range}
          onSelect={onRangeChange}
          // eslint-disable-next-line jsx-a11y/no-autofocus -- popover just opened via user action; moving focus into it is correct popup-disclosure behavior, not page-load focus theft.
          autoFocus
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};

// ---------------------------------------------------------------------------
// 3. Input Field Variant — typed date synced with the popover calendar.
// ---------------------------------------------------------------------------

const INPUT_DATE_FORMAT = 'MM/dd/yyyy';

export interface DatePickerInputProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  className?: string;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({ date, onDateChange, className }) => {
  const [text, setText] = React.useState(date ? format(date, INPUT_DATE_FORMAT) : '');
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setText(date ? format(date, INPUT_DATE_FORMAT) : '');
  }, [date]);

  const commitText = (value: string) => {
    const parsed = parse(value, INPUT_DATE_FORMAT, new Date());
    if (isValid(parsed)) onDateChange?.(parsed);
  };

  return (
    <div className={cn('relative flex items-center', className)}>
      <Input
        value={text}
        placeholder={INPUT_DATE_FORMAT.toUpperCase()}
        className="pr-9"
        onChange={(e) => setText(e.target.value)}
        onBlur={(e) => commitText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commitText(text);
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Open calendar"
            className="absolute right-1 inline-flex h-8 w-8 items-center justify-center rounded-md"
            style={{ color: getRoleColor('text.secondary') }}
          >
            <CalendarIcon className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(next) => {
              onDateChange?.(next);
              setOpen(false);
            }}
            // eslint-disable-next-line jsx-a11y/no-autofocus -- popover just opened via user action; moving focus into it is correct popup-disclosure behavior, not page-load focus theft.
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 4. Time Picker — date + time-of-day combined into one Date value.
// ---------------------------------------------------------------------------

export interface DateTimePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  date,
  onDateChange,
  placeholder = 'Pick a date & time',
  className,
}) => {
  const timeValue = date ? format(date, 'HH:mm') : '';

  const applyTime = (base: Date | undefined, time: string) => {
    if (!base || !time) return base;
    const [hours, minutes] = time.split(':').map(Number);
    const next = new Date(base);
    next.setHours(hours, minutes, 0, 0);
    return next;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="sm" className={cn('justify-start gap-2 font-normal', className)}>
          <CalendarIcon className="h-4 w-4" />
          {date ? format(date, 'MMM d, yyyy · h:mm a') : <span style={{ color: getRoleColor('text.secondary') }}>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(next) => onDateChange?.(applyTime(next, timeValue || '12:00'))}
          // eslint-disable-next-line jsx-a11y/no-autofocus -- popover just opened via user action; moving focus into it is correct popup-disclosure behavior, not page-load focus theft.
          autoFocus
        />
        <div
          className="flex items-center gap-2 border-t p-3"
          style={{ borderColor: getRoleColor('border.default') }}
        >
          <Clock className="h-4 w-4" style={{ color: getRoleColor('text.secondary') }} />
          <Input
            type="time"
            inputSize="small"
            value={timeValue}
            onChange={(e) => onDateChange?.(applyTime(date ?? new Date(), e.target.value))}
            className="w-auto"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

// ---------------------------------------------------------------------------
// 5. Natural Language Picker — free text ("next Friday", "in 3 weeks")
//    parsed live via chrono-node, with a fallback calendar.
// ---------------------------------------------------------------------------

export interface SmartDatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export const SmartDatePicker: React.FC<SmartDatePickerProps> = ({
  date,
  onDateChange,
  placeholder = 'Try "next Friday" or "in 3 weeks"',
  className,
}) => {
  const [text, setText] = React.useState(date ? format(date, 'MMM d, yyyy') : '');
  const [open, setOpen] = React.useState(false);
  const parsed = React.useMemo(() => (text.trim() ? chrono.parseDate(text) : null), [text]);

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="relative flex items-center">
        <Input
          value={text}
          placeholder={placeholder}
          className="pr-9"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && parsed) onDateChange?.(parsed);
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Open calendar"
              className="absolute right-1 inline-flex h-8 w-8 items-center justify-center rounded-md"
              style={{ color: getRoleColor('text.secondary') }}
            >
              <CalendarIcon className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(next) => {
                onDateChange?.(next);
                setText(next ? format(next, 'MMM d, yyyy') : '');
                setOpen(false);
              }}
              // eslint-disable-next-line jsx-a11y/no-autofocus -- popover just opened via user action; moving focus into it is correct popup-disclosure behavior, not page-load focus theft.
              autoFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {text.trim() && (
        <div className="flex items-center gap-1.5 text-xs" style={{ color: getRoleColor('text.secondary') }}>
          {parsed ? (
            <>
              <Check className="h-3.5 w-3.5" style={{ color: getRoleColor('status.success.fg') }} />
              <span>Understood as {format(parsed, 'EEEE, MMM d, yyyy')}</span>
              {date?.getTime() !== parsed.getTime() && (
                <button
                  type="button"
                  className="ml-1 underline underline-offset-2"
                  style={{ color: getRoleColor('interactive.primary') }}
                  onClick={() => onDateChange?.(parsed)}
                >
                  Use this date
                </button>
              )}
            </>
          ) : (
            <>
              <X className="h-3.5 w-3.5" style={{ color: getRoleColor('status.danger.fg') }} />
              <span>Couldn&apos;t understand that date</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
