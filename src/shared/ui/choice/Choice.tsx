import { clsx } from 'clsx';

import { CheckIcon } from '@/shared/icons';
import type { OutcomeTone } from '../outcome-badge/OutcomeBadge';

export type ChoiceTone = Exclude<OutcomeTone, 'pending'>;

interface ChoiceProps {
  tone: ChoiceTone;
  /** For example "Đáng giá". */
  label: string;
  /** One line that explains the choice, for example "Mang lại niềm vui hoặc giá trị thật". */
  hint: string;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

const SELECTED_CLASS: Record<ChoiceTone, string> = {
  worth: 'border-primary bg-primary-tint text-primary',
  neutral: 'border-pebble bg-pebble-tint text-pebble',
  leak: 'border-danger bg-danger-tint text-danger',
};

/** One answer in the reflection ritual. Fill, border and text change together. */
export function Choice({
  tone,
  label,
  hint,
  selected,
  onSelect,
  disabled = false,
}: ChoiceProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onSelect}
      className={clsx(
        'flex min-h-14.5 w-full items-center justify-between gap-3 rounded-choice border px-5 text-left transition-colors duration-200 ease-out focus-visible:shadow-focus focus-visible:outline-none disabled:opacity-60',
        selected ? SELECTED_CLASS[tone] : 'border-border bg-surface text-text'
      )}
    >
      <span className="flex flex-col gap-0.5">
        <span
          className={clsx(
            'text-base',
            selected ? 'font-semibold' : 'font-medium'
          )}
        >
          {label}
        </span>
        <span
          className={clsx('text-sm', selected ? 'text-soft' : 'text-muted')}
        >
          {hint}
        </span>
      </span>
      {selected ? (
        <span className="flex size-5.5 shrink-0 items-center justify-center rounded-full bg-current">
          <CheckIcon
            size={14}
            strokeWidth={3}
            className="text-bg"
            aria-hidden="true"
          />
        </span>
      ) : (
        <span
          className="size-5.5 shrink-0 rounded-full border-[1.5px] border-white/20"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
