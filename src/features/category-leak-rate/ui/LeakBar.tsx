import type { LeakRateRowModel } from '../model/types';

export function LeakBar({ row }: { row: LeakRateRowModel }) {
  return (
    <div
      role="img"
      aria-label={row.barLabel}
      className="flex h-2 w-full overflow-hidden rounded-full bg-surface-bright/40"
    >
      <div
        className="bg-error"
        style={{ width: `${row.leakPct}%` }}
      />
      <div
        className="bg-surface-bright"
        style={{ width: `${row.reviewedOkPct}%` }}
      />
      <div
        className="bg-outline/30"
        style={{ width: `${row.unreviewedPct}%` }}
      />
    </div>
  );
}
