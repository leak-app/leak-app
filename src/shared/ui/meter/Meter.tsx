import { clsx } from 'clsx';

interface MeterProps {
  /** 0 to 100. Values outside are clamped. */
  value: number;
  tone?: 'primary' | 'danger';
  /** What the bar measures, for screen readers, for example "Ngân sách tháng đã dùng". */
  label: string;
  /** 5px bar for lists instead of the 6px default. */
  thin?: boolean;
  className?: string;
}

/** Budget (sage) and leak-rate (apricot) bars. */
export function Meter({
  value,
  tone = 'primary',
  label,
  thin = false,
  className,
}: MeterProps) {
  const percent = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className={clsx(
        'w-full overflow-hidden rounded-full bg-track',
        thin ? 'h-[5px]' : 'h-1.5',
        className
      )}
    >
      <div
        className={clsx(
          'h-full rounded-full transition-[width] duration-300 ease-out',
          tone === 'danger' ? 'bg-danger' : 'bg-primary'
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
