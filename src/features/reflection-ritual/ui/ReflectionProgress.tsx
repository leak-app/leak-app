import { clsx } from 'clsx';

import { Meter } from '@/shared/ui';

import { progressView } from '../lib/session';

interface ReflectionProgressProps {
  index: number;
  total: number;
}

/** Lavender segments (one per item) and a "2 / 4" counter. */
export function ReflectionProgress({ index, total }: ReflectionProgressProps) {
  const view = progressView(index, total);

  return (
    <div className="flex items-center gap-4">
      {view.mode === 'segments' ? (
        <div
          role="img"
          aria-label={view.label}
          className="flex flex-1 gap-1.5"
        >
          {Array.from({ length: view.total }, (_, position) => (
            <span
              key={position}
              className={clsx(
                'h-1 flex-1 rounded-full',
                position < view.filled ? 'bg-secondary' : 'bg-white/12'
              )}
            />
          ))}
        </div>
      ) : (
        <Meter
          value={view.percent}
          label={view.label}
          className="flex-1"
        />
      )}
      <span className="shrink-0 text-label font-normal text-muted tabular-nums">
        {view.counter}
      </span>
    </div>
  );
}
