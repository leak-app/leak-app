import { useState } from 'react';

import { CalendarIcon, ICON } from '@/shared/icons';
import type { DateChoiceModel } from '@/shared/lib';

import { Chip } from '../chip/Chip';
import { DatePicker } from '../date-picker/DatePicker';

interface DateChipsProps {
  /** "YYYY-MM-DD" */
  value: string;
  choice: DateChoiceModel;
  onChange: (value: string) => void;
  /** Spoken name of the group and title of the calendar. */
  label?: string;
}

/** Hôm nay, Hôm qua, or any earlier day, for a transaction that was not logged on the day. */
export function DateChips({
  value,
  choice,
  onChange,
  label = 'Ngày giao dịch',
}: DateChipsProps) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center justify-center gap-2"
    >
      <Chip
        compact
        selected={choice.isToday}
        onClick={() => onChange(choice.today)}
      >
        Hôm nay
      </Chip>
      <Chip
        compact
        selected={choice.isYesterday}
        onClick={() => onChange(choice.yesterday)}
      >
        Hôm qua
      </Chip>
      <Chip
        compact
        selected={choice.customLabel !== null}
        onClick={() => setPickerOpen(true)}
        className="gap-1.5"
      >
        <CalendarIcon
          size={14}
          strokeWidth={ICON.stroke.active}
          aria-hidden="true"
        />
        {choice.customLabel ?? 'Ngày khác'}
      </Chip>
      <DatePicker
        open={pickerOpen}
        value={value}
        max={choice.today}
        title={label}
        onChange={onChange}
        onClose={() => setPickerOpen(false)}
      />
    </div>
  );
}
