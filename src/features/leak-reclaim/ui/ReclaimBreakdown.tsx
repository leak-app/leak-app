import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from '@/shared/icons';

import type { ReclaimBreakdownRowModel } from '../model/types';

const ICONS = { down: TrendingDownIcon, up: TrendingUpIcon, flat: MinusIcon };

export function ReclaimBreakdown({
  rows,
}: {
  rows: ReclaimBreakdownRowModel[];
}) {
  if (rows.length === 0) return null;
  return (
    <details className="text-xs">
      <summary className="cursor-pointer min-h-11 flex items-center text-primary font-semibold">
        Xem chi tiết
      </summary>
      <ul className="flex flex-col gap-2 mt-1">
        {rows.map((r) => {
          const Icon = ICONS[r.direction];
          return (
            <li
              key={r.key}
              className="flex items-center justify-between gap-3"
            >
              <span className="flex flex-col">
                <span className="text-on-surface font-semibold">{r.label}</span>
                <span className="text-on-surface-variant tabular-nums">
                  {r.detailText}
                </span>
              </span>
              <span className="flex items-center gap-1 text-on-surface-variant tabular-nums">
                <Icon
                  size={14}
                  aria-hidden="true"
                />
                {r.deltaText}
              </span>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
