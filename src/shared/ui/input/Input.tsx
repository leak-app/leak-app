import { clsx } from 'clsx';
import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';

interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'className'> {
  label: string;
  helper?: string;
  /** Shown below the field, in words. Colour alone never signals an error. */
  error?: string;
  /** For example an icon button inside the field. */
  trailing?: ReactNode;
  /** Applied to the wrapper. */
  className?: string;
}

/** Pill input, 56px high. Focus is a solid sage border plus a soft ring. */
export function Input({
  label,
  helper,
  error,
  trailing,
  className,
  id,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const messageId = `${inputId}-message`;
  const message = error ?? helper;

  return (
    <div className={clsx('flex flex-col gap-2.5', className)}>
      <label
        htmlFor={inputId}
        className="text-label text-muted"
      >
        {label}
      </label>
      <div
        className={clsx(
          'flex h-button-lg items-center gap-2 rounded-full border bg-surface-elevated pr-2 pl-[18px] transition-colors duration-200 ease-out focus-within:border-primary focus-within:shadow-focus',
          error ? 'border-danger' : 'border-border'
        )}
      >
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className="h-full min-w-0 flex-1 bg-transparent text-base text-text outline-none placeholder:text-subtle"
          {...rest}
        />
        {trailing}
      </div>
      {message && (
        <p
          id={messageId}
          role={error ? 'alert' : undefined}
          className={clsx('text-caption', error ? 'text-danger' : 'text-muted')}
        >
          {message}
        </p>
      )}
    </div>
  );
}
