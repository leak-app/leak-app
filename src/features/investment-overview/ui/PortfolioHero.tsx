import { useState } from 'react';

import type { PortfolioHeroModel } from '@/entities/valuation';
import { useBalanceVisibility } from '@/shared/hooks';
import { ICON, InfoIcon } from '@/shared/icons';
import { Card } from '@/shared/ui';

/** The answer to "this month, profit or loss?", with total value and profit since the start. */
export function PortfolioHero({ hero }: { hero: PortfolioHeroModel }) {
  const { mask } = useBalanceVisibility();
  const [infoOpen, setInfoOpen] = useState(false);
  const { month } = hero;

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2.5">
        <div className="-ml-0.5 flex items-center gap-1">
          <span className="text-label text-muted">{hero.question}</span>
          <button
            type="button"
            aria-label="Lãi/lỗ và vốn là gì?"
            aria-expanded={infoOpen}
            onClick={() => setInfoOpen((open) => !open)}
            className="flex h-8 w-11 items-center justify-center text-muted focus-visible:shadow-focus focus-visible:outline-none"
          >
            <InfoIcon
              size={16}
              strokeWidth={ICON.stroke.active}
              aria-hidden="true"
            />
          </button>
        </div>

        {infoOpen && (
          <Card
            variant="reminder"
            className="flex flex-col gap-1.5 !rounded-tile px-4 py-3.5 text-label !font-normal text-soft"
          >
            <span>
              <strong className="font-semibold text-text">Vốn</strong> là tiền
              bạn đã nạp vào trừ đi tiền đã rút ra.
            </span>
            <span>
              <strong className="font-semibold text-text">Lãi/lỗ</strong> là
              tổng giá trị trừ đi vốn — nạp thêm tiền không bao giờ bị tính là
              lãi.
            </span>
            <span className="text-muted">
              % là ước tính đơn giản, không tính theo thời gian nắm giữ.
            </span>
          </Card>
        )}

        {month ? (
          <>
            <div className={`text-amount-xl ${month.toneClass}`}>
              {mask(month.valueParts.value)}
              <span className="ml-1 text-[1.75rem] opacity-70">
                {month.valueParts.symbol}
              </span>
            </div>
            <span className="text-description text-soft">
              <span className={`font-semibold ${month.toneClass}`}>
                {month.word}
              </span>{' '}
              tháng này
              {hero.monthReturnText && ` · ${hero.monthReturnText}`}{' '}
              <span className="text-muted">(ước tính)</span>
            </span>
          </>
        ) : (
          <>
            <div
              className="text-amount-xl text-subtle"
              aria-label="Chưa có kết quả"
            >
              —
            </div>
            <span className="text-description text-muted">
              {hero.pendingNote}
              {hero.previousMonth && (
                <>
                  {' '}
                  {hero.previousMonth.label}:{' '}
                  <span className={hero.previousMonth.toneClass}>
                    {hero.previousMonth.word.toLowerCase()}{' '}
                    {mask(hero.previousMonth.amountText)}
                  </span>
                  .
                </>
              )}
            </span>
          </>
        )}
      </section>

      <div className="flex flex-col gap-2.5">
        <div
          className={
            hero.hasUpdates ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-1'
          }
        >
          <Card className="flex flex-col gap-1.5 !rounded-choice !p-4">
            <span className="text-caption text-muted">Tổng giá trị</span>
            <span className="text-xl tracking-tight text-text tabular-nums">
              {mask(hero.totalText)}
            </span>
          </Card>
          {hero.hasUpdates && (
            <Card className="flex flex-col gap-1.5 !rounded-choice !p-4">
              <span className="text-caption text-muted">
                {hero.sinceStartLabel}
              </span>
              <span
                className={`text-xl tracking-tight tabular-nums ${hero.sinceStartToneClass}`}
              >
                {mask(hero.sinceStartText)}
              </span>
            </Card>
          )}
        </div>
        {hero.hasUpdates && (
          <span className="pl-1 text-label font-normal text-muted">
            Vốn đã góp {mask(hero.capitalText)}
          </span>
        )}
      </div>
    </div>
  );
}
