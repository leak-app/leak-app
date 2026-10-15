import { clsx } from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon, ICON } from '@/shared/icons';
import {
  WEEKDAY_LABELS,
  buildMonthGrid,
  formatDayName,
  formatMonthTitle,
  shiftMonth,
} from '@/shared/lib';

import { BottomSheet } from '../bottom-sheet/BottomSheet';

const MONTH_FORMAT = 'YYYY-MM';
const DAY_FORMAT = 'YYYY-MM-DD';

interface DatePickerProps {
  open: boolean;
  /** The picked day, "YYYY-MM-DD". */
  value: string;
  /** Latest day that can be picked, "YYYY-MM-DD". Later days are dimmed. */
  max?: string;
  /** Earliest day that can be picked, "YYYY-MM-DD". */
  min?: string;
  title?: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

/** A month calendar in a bottom sheet. Tapping a day picks it and closes the sheet. */
export function DatePicker({
  open,
  value,
  max,
  min,
  title = 'Chọn ngày',
  onChange,
  onClose,
}: DatePickerProps) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={title}
    >
      <Calendar
        value={value}
        max={max}
        min={min}
        onPick={(day) => {
          onChange(day);
          onClose();
        }}
      />
    </BottomSheet>
  );
}

interface CalendarProps {
  value: string;
  max?: string;
  min?: string;
  onPick: (value: string) => void;
}

function Calendar({ value, max, min, onPick }: CalendarProps) {
  // Mounted only while the sheet is open, so it starts on the month of the picked day.
  const [month, setMonth] = useState(() => dayjs(value).format(MONTH_FORMAT));
  const today = dayjs().format(DAY_FORMAT);
  const weeks = buildMonthGrid(month);

  const canGoNext = !max || month < dayjs(max).format(MONTH_FORMAT);
  const canGoPrev = !min || month > dayjs(min).format(MONTH_FORMAT);
  const isBlocked = (day: string) =>
    (max !== undefined && day > max) || (min !== undefined && day < min);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonth(shiftMonth(month, -1))}
          disabled={!canGoPrev}
          aria-label="Tháng trước"
          className="btn btn-ghost btn-circle size-11 text-muted focus-visible:shadow-focus focus-visible:outline-none disabled:opacity-30"
        >
          <ChevronLeftIcon
            size={ICON.size.ui}
            strokeWidth={ICON.stroke.active}
            aria-hidden="true"
          />
        </button>
        <span
          aria-live="polite"
          className="text-heading text-text"
        >
          {formatMonthTitle(month)}
        </span>
        <button
          type="button"
          onClick={() => setMonth(shiftMonth(month, 1))}
          disabled={!canGoNext}
          aria-label="Tháng sau"
          className="btn btn-ghost btn-circle size-11 text-muted focus-visible:shadow-focus focus-visible:outline-none disabled:opacity-30"
        >
          <ChevronRightIcon
            size={ICON.size.ui}
            strokeWidth={ICON.stroke.active}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="grid grid-cols-7 justify-items-center">
        {WEEKDAY_LABELS.map((label) => (
          <span
            key={label}
            className="flex h-8 items-center text-caption font-medium text-muted"
          >
            {label}
          </span>
        ))}
      </div>

      <div
        role="grid"
        aria-label={formatMonthTitle(month)}
        className="flex flex-col gap-1"
      >
        {weeks.map((week) => (
          <div
            key={week[0].date}
            role="row"
            className="grid grid-cols-7 justify-items-center"
          >
            {week.map((day) => {
              if (!day.inMonth) {
                return (
                  <span
                    key={day.date}
                    role="gridcell"
                    className="size-11"
                  />
                );
              }
              const isSelected = day.date === value;
              const isToday = day.date === today;
              return (
                <span
                  key={day.date}
                  role="gridcell"
                >
                  <button
                    type="button"
                    disabled={isBlocked(day.date)}
                    aria-label={formatDayName(day.date)}
                    aria-pressed={isSelected}
                    aria-current={isToday ? 'date' : undefined}
                    // The sheet opens with focus on the picked day.
                    data-autofocus={isSelected || undefined}
                    onClick={() => onPick(day.date)}
                    className={clsx(
                      'btn btn-circle size-11 text-body tabular-nums focus-visible:shadow-focus focus-visible:outline-none',
                      isSelected
                        ? 'btn-primary font-semibold'
                        : isToday
                          ? 'btn-ghost border-primary/50 font-semibold text-primary'
                          : 'btn-ghost font-normal text-text',
                      isBlocked(day.date) && 'opacity-30'
                    )}
                  >
                    {day.day}
                  </button>
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {(max === undefined || today <= max) && (
        <button
          type="button"
          onClick={() => onPick(today)}
          className="btn btn-ghost mt-1 h-touch self-center text-primary focus-visible:shadow-focus focus-visible:outline-none"
        >
          Hôm nay
        </button>
      )}
    </div>
  );
}
