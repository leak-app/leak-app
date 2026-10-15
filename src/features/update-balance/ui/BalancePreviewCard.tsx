import { clsx } from 'clsx';

import { Card } from '@/shared/ui';

import type { BalancePreviewViewModel } from '../model/types';

/** What saving would do: the profit or loss, and the money moved since the last update. */
export function BalancePreviewCard({
  preview,
}: {
  preview: BalancePreviewViewModel;
}) {
  return (
    <Card
      aria-live="polite"
      className={clsx(
        'flex flex-col gap-3 !rounded-card !px-4.5 !py-4',
        preview.cardClass
      )}
    >
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className={clsx('text-label font-semibold', preview.toneClass)}>
            {preview.label}
          </span>
          <span
            className={clsx(
              'text-[2.125rem] leading-none font-light tracking-[-0.02em] tabular-nums',
              preview.toneClass
            )}
          >
            {preview.amountText}
          </span>
        </div>
        {preview.returnNote && (
          <span className="pb-1.5 text-label font-normal text-soft">
            {preview.returnNote}
          </span>
        )}
      </div>

      {preview.previous && (
        <div className="flex flex-col gap-1 border-t border-border pt-2.5 text-caption text-muted tabular-nums">
          <div className="flex justify-between gap-3">
            <span>{preview.previous.label}</span>
            <span>{preview.previous.amountText}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span>Tiền nạp/rút kể từ lần trước</span>
            <span className="text-soft">{preview.flowText}</span>
          </div>
        </div>
      )}

      {preview.note && (
        <p className="text-label leading-normal font-normal text-soft">
          {preview.note}
        </p>
      )}
    </Card>
  );
}
