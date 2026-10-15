import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';

import type { MonthBarModel } from '@/entities/valuation';
import { useBalanceVisibility } from '@/shared/hooks';
import { Card } from '@/shared/ui';

/** Profit or loss of each month around a zero line. Deposits never move a bar. */
export function ProfitChart({ months }: { months: MonthBarModel[] }) {
  const { mask } = useBalanceVisibility();
  const [pickedKey, setPickedKey] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selected =
    months.find((month) => month.key === pickedKey) ??
    months[months.length - 1];

  // The newest month is on the right; start there when the row scrolls.
  useEffect(() => {
    const row = scrollRef.current;
    if (row) row.scrollLeft = row.scrollWidth;
  }, [months.length]);

  return (
    <Card className="flex flex-col gap-3.5 !px-4.5 !pt-5.5 !pb-4.5">
      <div className="flex items-baseline justify-between px-1">
        <h2 className="text-heading text-text">Lãi/lỗ theo tháng</h2>
        <span className="text-caption text-muted">{months.length} tháng</span>
      </div>

      <div
        aria-live="polite"
        className="px-1 text-description text-soft"
      >
        {selected.readout.monthText} ·{' '}
        <span className={clsx('font-semibold', selected.readout.toneClass)}>
          {selected.readout.word} {mask(selected.readout.amountText)}
        </span>{' '}
        · số dư {mask(selected.readout.balanceText)}
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar flex items-stretch overflow-x-auto"
      >
        {months.map((month) => {
          const isSelected = month.key === selected.key;
          return (
            <button
              key={month.key}
              type="button"
              aria-label={month.ariaLabel}
              aria-pressed={isSelected}
              onClick={() => setPickedKey(month.key)}
              className="flex min-w-7 flex-1 flex-col items-center focus-visible:rounded-tile focus-visible:shadow-focus focus-visible:outline-none"
            >
              <div className="flex h-19 w-full items-end justify-center">
                {month.direction !== 'down' && (
                  <div
                    className={clsx(
                      'w-[58%] rounded-t-[0.375rem] rounded-b-[0.125rem] transition-opacity duration-200 ease-out',
                      month.barClass,
                      isSelected ? 'opacity-100' : 'opacity-40'
                    )}
                    style={{ height: `${month.sizePercent}%` }}
                  />
                )}
              </div>
              <div className="h-px w-full bg-white/15" />
              <div className="flex h-19 w-full items-start justify-center">
                {month.direction === 'down' && (
                  <div
                    className={clsx(
                      'w-[58%] rounded-t-[0.125rem] rounded-b-[0.375rem] transition-opacity duration-200 ease-out',
                      month.barClass,
                      isSelected ? 'opacity-100' : 'opacity-40'
                    )}
                    style={{ height: `${month.sizePercent}%` }}
                  />
                )}
              </div>
              <span
                className={clsx(
                  'mt-2 text-tab',
                  isSelected ? 'font-semibold text-text' : 'text-muted'
                )}
              >
                {month.label}
              </span>
            </button>
          );
        })}
      </div>

      <p className="px-1 text-caption text-muted">
        Chỉ phần lãi lỗ thật — tiền nạp thêm không làm cột cao lên.
      </p>
    </Card>
  );
}
