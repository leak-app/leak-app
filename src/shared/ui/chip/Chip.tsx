import { clsx } from 'clsx';
import type { ComponentPropsWithRef } from 'react';

interface ChipProps extends Omit<
  ComponentPropsWithRef<'button'>,
  'aria-pressed'
> {
  selected: boolean;
  /** `danger` is for leak reasons; everything else is `primary`. */
  tone?: 'primary' | 'danger';
  /** Smaller look (36px) that keeps a 44px tap area. */
  compact?: boolean;
}

const SELECTED_CLASS = {
  primary: 'border-primary bg-primary-tint font-semibold text-primary',
  danger: 'border-danger bg-danger-tint font-semibold text-danger',
};

export function Chip({
  selected,
  tone = 'primary',
  compact = false,
  className,
  children,
  type = 'button',
  ...rest
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={clsx(
        'relative inline-flex items-center justify-center rounded-full border transition-colors duration-200 ease-out focus-visible:shadow-focus focus-visible:outline-none',
        compact
          ? 'h-9 px-3.5 text-sm before:absolute before:inset-x-0 before:-inset-y-1 before:content-[""]'
          : 'h-touch px-4.5 text-sm',
        selected
          ? SELECTED_CLASS[tone]
          : 'border-border bg-surface font-medium text-soft',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
