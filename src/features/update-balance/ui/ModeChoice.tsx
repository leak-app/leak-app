import { clsx } from 'clsx';

interface ModeChoiceProps {
  label: string;
  hint: string;
  checked: boolean;
  onSelect: () => void;
}

/** One answer of the radio group; sage when picked. */
export function ModeChoice({
  label,
  hint,
  checked,
  onSelect,
}: ModeChoiceProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className={clsx(
        'flex min-h-16 w-full items-center justify-between gap-3 rounded-choice border px-4.5 py-3 text-left transition-colors duration-200 ease-out focus-visible:shadow-focus focus-visible:outline-none',
        checked ? 'border-primary bg-primary/10' : 'border-border bg-white/4'
      )}
    >
      <span className="flex flex-col gap-0.5">
        <span
          className={clsx(
            'text-body',
            checked ? 'font-semibold text-primary' : 'font-medium text-text'
          )}
        >
          {label}
        </span>
        <span className="text-label leading-snug font-normal text-muted">
          {hint}
        </span>
      </span>
      <span
        className={clsx(
          'size-5.5 shrink-0 rounded-full',
          checked
            ? 'border-[6px] border-primary'
            : 'border-[1.5px] border-white/25'
        )}
        aria-hidden="true"
      />
    </button>
  );
}
