import { clsx } from 'clsx';

/** The four outcomes, named by colour role: Đáng giá, Bình thường, Rò rỉ, Chờ nhìn lại. */
export type OutcomeTone = 'worth' | 'neutral' | 'leak' | 'pending';

const BADGE_CLASS: Record<OutcomeTone, string> = {
  worth: 'bg-primary-tint text-primary',
  neutral: 'bg-pebble-tint text-pebble',
  leak: 'bg-danger-tint text-danger',
  pending: 'bg-secondary-tint text-secondary',
};

/** Colour for the outcome word on its own, for example inside a row's meta line. */
export const OUTCOME_TEXT_CLASS: Record<OutcomeTone, string> = {
  worth: 'text-primary',
  neutral: 'text-pebble',
  leak: 'text-danger',
  pending: 'text-secondary',
};

interface OutcomeBadgeProps {
  tone: OutcomeTone;
  /** The outcome as a word. Colour alone never carries the meaning. */
  label: string;
  className?: string;
}

export function OutcomeBadge({ tone, label, className }: OutcomeBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex h-6 items-center rounded-full px-2.5 text-xs font-semibold',
        BADGE_CLASS[tone],
        className
      )}
    >
      {label}
    </span>
  );
}
