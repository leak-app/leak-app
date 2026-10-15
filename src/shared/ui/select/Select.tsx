import { clsx } from 'clsx';
import { useId, useState } from 'react';

import { CheckIcon, ChevronDownIcon, ICON } from '@/shared/icons';

import { BottomSheet } from '../bottom-sheet/BottomSheet';

export interface SelectOption<T extends string | number> {
  value: T;
  /** Already formatted text, for example "Tháng 10" or "Ví tiền mặt · 1.2tr₫". */
  label: string;
  /** Secondary text on the right, for example a wallet balance. */
  meta?: string;
}

interface SelectProps<T extends string | number> {
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  /** Visible label above the field (`field` variant). */
  label?: string;
  /** Spoken name when there is no visible label (`pill` variant). */
  ariaLabel?: string;
  /** Title of the sheet. Defaults to the label. */
  title?: string;
  /** Shown while `value` matches no option. */
  placeholder?: string;
  /**
   * `field` is a 56px form field with a label; `pill` is a compact 44px filter;
   * `tile` is a two-line card (label above the choice, its `meta` on the right).
   */
  variant?: 'field' | 'pill' | 'tile';
  disabled?: boolean;
  /** Applied to the wrapper. */
  className?: string;
}

/**
 * A select that looks like a field and opens its options in a bottom sheet,
 * instead of the browser's native picker (small targets, different on every phone).
 */
export function Select<T extends string | number>({
  value,
  options,
  onChange,
  label,
  ariaLabel,
  title,
  placeholder = 'Chọn',
  variant = 'field',
  disabled = false,
  className,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const triggerId = useId();
  const selected = options.find((option) => option.value === value);
  const name = label ?? ariaLabel;
  const sheetTitle = title ?? name;

  const choose = (next: T) => {
    setOpen(false);
    if (next !== value) onChange(next);
  };

  return (
    <div
      className={clsx(
        variant === 'field' ? 'flex flex-col gap-2.5' : 'min-w-0',
        className
      )}
    >
      {variant === 'field' && label && (
        <label
          htmlFor={triggerId}
          className="text-label text-muted"
        >
          {label}
        </label>
      )}
      <button
        id={triggerId}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={
          name ? `${name}: ${selected?.label ?? placeholder}` : undefined
        }
        onClick={() => setOpen(true)}
        className={clsx(
          'flex w-full items-center justify-between gap-2 border text-left transition-colors duration-200 ease-out focus-visible:border-primary focus-visible:shadow-focus focus-visible:outline-none disabled:opacity-50',
          variant === 'field' &&
            'h-button-lg rounded-full border-border bg-surface-elevated pr-4 pl-4.5 text-base',
          variant === 'pill' &&
            'h-11 rounded-full border-border bg-surface px-4 text-label hover:text-text',
          variant === 'tile' &&
            'min-h-17 gap-3.5 rounded-choice border-border bg-surface px-4.5',
          selected ? 'text-text' : 'text-subtle'
        )}
      >
        {variant === 'tile' ? (
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-caption text-muted">{label}</span>
            <span className="truncate text-heading">
              {selected?.label ?? placeholder}
            </span>
          </span>
        ) : (
          <span className="min-w-0 truncate">
            {selected?.label ?? placeholder}
          </span>
        )}
        {variant === 'tile' && selected?.meta && (
          <span className="shrink-0 text-label tabular-nums text-muted">
            {selected.meta}
          </span>
        )}
        <ChevronDownIcon
          size={ICON.size.row}
          strokeWidth={ICON.stroke.idle}
          className="shrink-0 text-muted"
          aria-hidden="true"
        />
      </button>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title={sheetTitle}
      >
        <ul
          role="listbox"
          aria-label={sheetTitle}
          className="flex max-h-[60vh] flex-col gap-1 overflow-y-auto"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
              >
                <button
                  type="button"
                  // Focus starts on the current choice when the sheet opens.
                  autoFocus={isSelected}
                  onClick={() => choose(option.value)}
                  className={clsx(
                    'flex min-h-touch w-full items-center justify-between gap-3 rounded-tile px-4 py-2.5 text-left text-body transition-colors duration-200 ease-out focus-visible:shadow-focus focus-visible:outline-none',
                    isSelected
                      ? 'bg-primary-tint text-text'
                      : 'text-soft hover:bg-surface'
                  )}
                >
                  <span className="min-w-0 flex-1">{option.label}</span>
                  {option.meta && (
                    <span className="shrink-0 text-label tabular-nums text-muted">
                      {option.meta}
                    </span>
                  )}
                  {isSelected && (
                    <CheckIcon
                      size={ICON.size.ui}
                      strokeWidth={ICON.stroke.active}
                      className="shrink-0 text-primary"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </BottomSheet>
    </div>
  );
}
