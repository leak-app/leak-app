import { clsx } from 'clsx';

interface BudgetBarProps {
  /** Width of the solid part, 0 to 100. */
  fillPercent: number;
  tone: 'primary' | 'danger';
  /** Where the striped over-limit stretch starts; omit while within the limit. */
  overflowStartPercent?: number | null;
  /** A white tick, for example today's place in the month. */
  markerPercent?: number;
  /** 8px instead of the 6px default. */
  large?: boolean;
  /**
   * Makes the bar a meter for screen readers, read as `valuePercent` of 0 to 100.
   * Leave out when the surrounding text already says everything: the bar is then decorative.
   */
  label?: string;
  valuePercent?: number;
}

/** A budget bar: sage while fine, apricot when tight, striped past the limit. */
export function BudgetBar({
  fillPercent,
  tone,
  overflowStartPercent = null,
  markerPercent,
  large = false,
  label,
  valuePercent = fillPercent,
}: BudgetBarProps) {
  const meterProps = label
    ? {
        role: 'meter',
        'aria-label': label,
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': Math.round(valuePercent),
      }
    : { 'aria-hidden': true };

  return (
    <div
      className={clsx(
        'relative w-full rounded-full bg-track',
        large ? 'h-2' : 'h-1.5'
      )}
      {...meterProps}
    >
      <div
        className={clsx(
          'absolute inset-y-0 left-0 rounded-full',
          tone === 'danger' ? 'bg-danger' : 'bg-primary'
        )}
        style={{ width: `${fillPercent}%` }}
      />
      {overflowStartPercent !== null && (
        <div
          className="absolute inset-y-0 right-0 rounded-r-full bg-overflow-stripes"
          style={{ left: `calc(${overflowStartPercent}% + 2px)` }}
        />
      )}
      {markerPercent !== undefined && (
        <div
          aria-hidden="true"
          className="absolute -top-1 h-4 w-0.5 rounded-full bg-text"
          style={{ left: `${markerPercent}%` }}
        />
      )}
    </div>
  );
}
