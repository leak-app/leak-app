import { clsx } from 'clsx';
import type { ComponentPropsWithRef } from 'react';

interface SwitchProps extends Omit<
  ComponentPropsWithRef<'button'>,
  'role' | 'aria-checked' | 'onChange'
> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * A 48×28 sage track inside a 56×44 tap area. Name it with `aria-labelledby`
 * (the row's label) or `aria-label`.
 */
export function Switch({
  checked,
  onCheckedChange,
  className,
  type = 'button',
  onClick,
  ...rest
}: SwitchProps) {
  return (
    <button
      type={type}
      role="switch"
      aria-checked={checked}
      onClick={(event) => {
        onClick?.(event);
        onCheckedChange?.(!checked);
      }}
      className={clsx(
        'flex h-touch w-14 shrink-0 items-center justify-end rounded-full focus-visible:shadow-focus focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={clsx(
          'relative block h-7 w-12 rounded-full transition-colors duration-200 ease-out',
          checked ? 'bg-primary' : 'bg-white/12'
        )}
      >
        <span
          className={clsx(
            'absolute top-0.75 left-0.75 block size-5.5 rounded-full transition-transform duration-200 ease-out',
            checked ? 'translate-x-5 bg-on-primary' : 'bg-muted'
          )}
        />
      </span>
    </button>
  );
}
