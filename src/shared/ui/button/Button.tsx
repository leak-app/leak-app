import { clsx } from 'clsx';
import type { ComponentPropsWithRef, ReactNode } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'tint'
  | 'reminder'
  | 'danger'
  | 'dangerGhost';
export type ButtonSize = 'lg' | 'md';

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const BASE =
  'inline-flex select-none items-center justify-center gap-2 rounded-full border font-semibold transition-colors duration-200 ease-out focus-visible:border-primary focus-visible:shadow-focus focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'border-transparent bg-primary text-on-primary hover:brightness-110',
  secondary: 'border-border bg-surface text-text hover:bg-surface-elevated',
  ghost: 'border-transparent bg-transparent text-muted hover:text-text',
  tint: 'border-primary bg-primary-tint text-primary',
  /** A gentle lavender nudge, for example "update this month's balance". */
  reminder:
    'border-secondary/35 bg-secondary-tint text-secondary hover:brightness-110',
  danger: 'border-danger bg-danger-tint text-danger hover:brightness-110',
  dangerGhost:
    'border-transparent bg-transparent text-danger hover:brightness-110',
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  lg: 'h-button-lg px-6 text-base',
  md: 'h-touch px-5 text-base',
};

/** Class names of a button, so a router `Link` or an anchor can look like one. */
export function buttonStyles({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
}: ButtonStyleOptions = {}): string {
  return clsx(
    BASE,
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    fullWidth && 'w-full'
  );
}

interface ButtonProps
  extends ComponentPropsWithRef<'button'>, ButtonStyleOptions {
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

/** One sage primary button per screen, besides the nav's add button. */
export function Button({
  variant,
  size,
  fullWidth,
  loading = false,
  leadingIcon,
  trailingIcon,
  className,
  children,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={clsx(buttonStyles({ variant, size, fullWidth }), className)}
      {...rest}
    >
      {loading ? (
        <span
          className="loading loading-spinner loading-sm"
          aria-hidden="true"
        />
      ) : (
        leadingIcon
      )}
      {children}
      {!loading && trailingIcon}
    </button>
  );
}
