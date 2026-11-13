import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

import { AlertCircleIcon, ChevronRightIcon, ICON } from '@/shared/icons';
import { Amount, Card, buttonStyles } from '@/shared/ui';

import type { BudgetCardModel, BudgetCardRowModel } from '../model';
import { BudgetBar } from './BudgetBar';
import { BudgetEmptyIllustration } from './BudgetEmptyIllustration';

const LINK_FOCUS =
  'focus-visible:shadow-focus focus-visible:outline-none rounded-2xl';

function BudgetRow({ row }: { row: BudgetCardRowModel }) {
  return (
    <li className="border-b border-border-subtle">
      <Link
        to={row.href}
        aria-label={row.ariaLabel}
        className={clsx(
          'flex items-start gap-3.5 py-3.5 text-text',
          LINK_FOCUS
        )}
      >
        <span
          aria-hidden="true"
          className="flex size-disc shrink-0 items-center justify-center rounded-full bg-white/5 text-lg"
        >
          {row.emoji}
        </span>
        <span className="flex min-w-0 grow flex-col gap-2">
          <span className="flex items-baseline justify-between gap-2.5">
            <span className="truncate text-body font-medium">{row.name}</span>
            <span
              className={clsx(
                'flex shrink-0 items-center gap-1.25 text-label tabular-nums',
                row.isAlert ? 'font-semibold text-danger' : 'text-soft'
              )}
            >
              {row.isAlert && (
                <AlertCircleIcon
                  size={14}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
              {row.statusText}
            </span>
          </span>
          <BudgetBar
            fillPercent={row.fillPercent}
            overflowStartPercent={row.overflowStartPercent}
            tone={row.tone}
          />
          <span className="flex justify-between text-caption text-muted tabular-nums">
            <span>{row.amountsText}</span>
            <span>{row.percentText}</span>
          </span>
        </span>
      </Link>
    </li>
  );
}

/** This month's budgets at a glance: what is left, the pace, and the tightest categories. */
export function BudgetOverviewCard({ card }: { card: BudgetCardModel }) {
  return (
    <Card
      as="section"
      aria-labelledby="budget-card-title"
      className="flex flex-col gap-4.5 p-5.5 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <h2
          id="budget-card-title"
          className="text-section-title text-text"
        >
          Ngân sách{' '}
          <span className="text-description font-normal text-muted">
            · {card.monthText}
          </span>
        </h2>
        {!card.isEmpty && (
          <Link
            to="/budgets"
            className={clsx(
              'flex h-touch items-center gap-1 pl-3 text-label font-medium text-primary',
              LINK_FOCUS
            )}
          >
            Xem tất cả
            <ChevronRightIcon
              size={16}
              aria-hidden="true"
            />
          </Link>
        )}
      </div>

      {card.isEmpty ? (
        <div className="flex flex-col items-center gap-2 pt-2 pb-1 text-center">
          <div className="mb-2.5">
            <BudgetEmptyIllustration />
          </div>
          <p className="text-heading text-text">Chưa có ngân sách nào</p>
          <p className="max-w-70 text-description text-muted">
            Đặt hạn mức cho vài danh mục hay chi nhiều — Leak sẽ nhắc bạn trước
            khi chạm mốc.
          </p>
          <Link
            to="/budgets/setup"
            className={clsx(buttonStyles({ size: 'md' }), 'mt-2.5')}
          >
            Tạo ngân sách đầu tiên
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2.5">
            <span
              className={clsx(
                'text-label',
                card.isHeroOver ? 'text-danger' : 'text-muted'
              )}
            >
              {card.heroLabel}
            </span>
            <Amount
              value={card.heroAmount.value}
              symbol={card.heroAmount.symbol}
              size="lg"
            />
            {card.perDayText && (
              <span className="text-label font-normal text-soft">
                {card.perDayText}
              </span>
            )}
            <div className="mt-1.5">
              <BudgetBar
                large
                label="Ngân sách tháng đã dùng"
                fillPercent={card.usedPercent}
                tone={card.tone}
                markerPercent={card.todayPercent}
              />
            </div>
            <div className="flex justify-between gap-3 text-caption text-muted">
              <span>{card.spentOfLimitText}</span>
              <span
                className={clsx(
                  'font-semibold',
                  card.isPaceFast ? 'text-danger' : 'text-primary'
                )}
              >
                {card.paceText}
              </span>
            </div>
          </div>

          <ul className="flex flex-col border-t border-border-subtle">
            {card.rows.map((row) => (
              <BudgetRow
                key={row.categoryId}
                row={row}
              />
            ))}
          </ul>

          {card.othersText && (
            <Link
              to="/budgets"
              className={clsx(
                '-mt-1.5 -mb-2 flex h-touch items-center justify-between text-label text-muted',
                LINK_FOCUS
              )}
            >
              <span>{card.othersText}</span>
              <span className="flex items-center gap-1 font-medium text-primary">
                Xem tất cả
                <ChevronRightIcon
                  size={ICON.size.row - 2}
                  aria-hidden="true"
                />
              </span>
            </Link>
          )}
        </>
      )}
    </Card>
  );
}
