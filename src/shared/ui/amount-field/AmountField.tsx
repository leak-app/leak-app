import { clsx } from 'clsx';
import { useId, type ComponentPropsWithRef } from 'react';

interface AmountFieldProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'className' | 'value' | 'onChange' | 'type'
> {
  label: string;
  /** Digits as typed, already grouped, for example "12,600,000". */
  value: string;
  onValueChange: (text: string) => void;
  /** One line under the field, for example the balance the app holds. */
  helper?: string;
  /** Currency symbol after the number. */
  symbol?: string;
  /** Applied to the wrapper. */
  className?: string;
}

/**
 * A large, right-aligned amount field. It keeps the sage focus look, so with an
 * on-screen numpad (`inputMode="none"`) it reads as the field being edited.
 */
export function AmountField({
  label,
  value,
  onValueChange,
  helper,
  symbol = '₫',
  className,
  id,
  inputMode = 'numeric',
  placeholder = '0',
  autoFocus,
  ...rest
}: AmountFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helperId = `${inputId}-helper`;

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <label
        htmlFor={inputId}
        className="text-label text-muted"
      >
        {label}
      </label>
      <div className="flex min-h-button-lg items-center gap-1 rounded-full border border-border bg-surface-elevated px-5 transition-colors duration-200 ease-out focus-within:border-primary focus-within:shadow-focus">
        <input
          id={inputId}
          type="text"
          inputMode={inputMode}
          autoComplete="off"
          aria-describedby={helper ? helperId : undefined}
          value={value}
          placeholder={placeholder}
          autoFocus={autoFocus}
          // A dialog moves focus when it opens; BottomSheet looks for this marker.
          data-autofocus={autoFocus || undefined}
          onChange={(event) => onValueChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-right text-[1.875rem] leading-[1.2] font-light tracking-[-0.02em] tabular-nums text-text outline-none placeholder:text-subtle"
          {...rest}
        />
        <span
          className="text-lg text-muted"
          aria-hidden="true"
        >
          {symbol}
        </span>
      </div>
      {helper && (
        <p
          id={helperId}
          className="pl-5 text-caption text-muted"
        >
          {helper}
        </p>
      )}
    </div>
  );
}
