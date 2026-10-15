import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

import type { PortfolioEntryModel } from '@/entities/valuation';
import { useBalanceVisibility } from '@/shared/hooks';
import { ChevronRightIcon, ICON, TrendingUpIcon } from '@/shared/icons';

/** Look of each state; the reminder is lavender, a result is sage, nothing yet is neutral. */
const KIND_CLASS = {
  reminder: {
    card: 'border-secondary/25 bg-secondary/7',
    icon: 'bg-secondary-tint text-secondary',
    hint: 'font-medium text-secondary',
  },
  result: {
    card: 'border-border bg-surface',
    icon: 'bg-primary-tint text-primary',
    hint: 'text-muted',
  },
  empty: {
    card: 'border-border bg-surface',
    icon: 'bg-white/6 text-pebble',
    hint: 'text-muted',
  },
} as const;

/** Link to the Investment page that says what to do there: update, or this month's result. */
export function InvestmentEntryCard({ entry }: { entry: PortfolioEntryModel }) {
  const { mask } = useBalanceVisibility();
  const look = KIND_CLASS[entry.kind];

  return (
    <Link
      to="/investment"
      className={clsx(
        'flex min-h-touch items-center gap-3.5 rounded-card border py-4.5 pr-4 pl-4.5 shadow-lg focus-visible:shadow-focus focus-visible:outline-none',
        look.card
      )}
    >
      <span
        className={clsx(
          'flex size-touch shrink-0 items-center justify-center rounded-full',
          look.icon
        )}
      >
        <TrendingUpIcon
          size={ICON.size.ui}
          strokeWidth={ICON.stroke.active}
          aria-hidden="true"
        />
      </span>
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="text-heading text-text">Đầu tư</span>
        <span className={clsx('text-label', look.hint)}>
          {entry.hint}
          {entry.result && (
            <span className={clsx('font-semibold', entry.result.toneClass)}>
              {entry.result.word} {mask(entry.result.amountText)}
            </span>
          )}
        </span>
      </span>
      {entry.staleCount > 0 && (
        <span
          className="flex h-6 items-center rounded-full bg-secondary px-2.25 text-caption font-bold text-bg"
          aria-label={`${entry.staleCount} ví cần cập nhật`}
        >
          {entry.staleCount}
        </span>
      )}
      <ChevronRightIcon
        size={ICON.size.row}
        strokeWidth={ICON.stroke.active}
        className="shrink-0 text-muted"
        aria-hidden="true"
      />
    </Link>
  );
}
