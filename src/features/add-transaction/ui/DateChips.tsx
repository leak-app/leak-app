import { useState } from 'react';

import { CalendarIcon, ICON } from '@/shared/icons';
import { Chip, DatePicker } from '@/shared/ui';

import type { DateChoiceModel } from '../lib/dateChoice';

interface DateChipsProps {
  /** "YYYY-MM-DD" */
  value: string;
  choice: DateChoiceModel;
  onChange: (value: string) => void;
}

/** Hôm nay, Hôm qua, or any earlier day, for a transaction that was not logged on the day. */
export function DateChips({ value, choice, onChange }: DateChipsProps) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div
      role="group"
      aria-label="Ngày giao dịch"
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
        title="Ngày giao dịch"
        onChange={onChange}
        onClose={() => setPickerOpen(false)}
      />
    </div>
  );
}
