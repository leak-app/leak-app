import { clsx } from 'clsx';
import type { ReactNode } from 'react';

import {
  OUTCOME_TEXT_CLASS,
  type OutcomeTone,
} from '../outcome-badge/OutcomeBadge';

interface TransactionRowProps {
  /** Category icon, usually the category emoji, shown inside a soft disc. */
  icon: ReactNode;
  title: string;
  category: string;
  /** Already formatted, for example "08:15" or "Hôm qua". */
  time: string;
  outcome?: { tone: OutcomeTone; label: string };
  /** Already formatted, for example "55,000₫". */
  amount: string;
  /** Hairline above the row; leave it off for the first row of a list. */
  divider?: boolean;
  onClick?: () => void;
}

/** A 60px list row. Render it inside a `<ul>`. */
export function TransactionRow({
  icon,
  title,
  category,
  time,
  outcome,
  amount,
  divider = false,
  onClick,
}: TransactionRowProps) {
  const content = (
    <>
      <span
        className="flex size-disc shrink-0 items-center justify-center rounded-full bg-surface text-pebble"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-[3px] text-left">
        <span className="truncate text-body text-text">{title}</span>
        <span className="truncate text-caption text-muted">
          {category} · {time}
          {outcome && (
            <>
              {' · '}
              <span className={OUTCOME_TEXT_CLASS[outcome.tone]}>
                {outcome.label}
              </span>
            </>
          )}
        </span>
      </span>
      <span className="shrink-0 text-amount-row text-text">{amount}</span>
    </>
  );

  const rowClass = clsx(
    'flex h-[60px] w-full items-center gap-3.5',
    divider && 'border-t border-border-subtle'
  );

  return (
    <li>
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className={clsx(
            rowClass,
            'focus-visible:shadow-focus focus-visible:outline-none'
          )}
        >
          {content}
        </button>
      ) : (
        <div className={rowClass}>{content}</div>
      )}
    </li>
  );
}
