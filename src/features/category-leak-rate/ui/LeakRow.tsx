import type { LeakRateRowModel } from '../model/types';
import { LeakBar } from './LeakBar';

export function LeakRow({ row }: { row: LeakRateRowModel }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2 text-sm font-semibold text-on-surface">
          <span aria-hidden="true">{row.emojiText}</span>
          <span className="truncate">{row.displayName}</span>
        </span>
        <span className="whitespace-nowrap text-xs text-on-surface-variant tabular-nums">
          {row.leakPercentText} · {row.leakAmountText}
        </span>
      </div>
      <LeakBar row={row} />
      {row.topReasonText && (
        <span className="text-xs text-on-surface-variant">
          {row.topReasonText}
        </span>
      )}
    </div>
  );
}
