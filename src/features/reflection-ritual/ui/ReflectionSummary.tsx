import { CheckIcon } from '@/shared/icons';
import { Button, Card, OutcomeBadge } from '@/shared/ui';

import { deserializeSessionSummary } from '../lib/deserialize';
import { REFLECTION_COPY } from '../model/choices';
import type { ReflectionTally } from '../model/useReflectionSession';

interface ReflectionSummaryProps {
  tally: ReflectionTally;
  onClose: () => void;
}

/** The calm end of the ritual: what was decided, and the leak total. */
export function ReflectionSummary({ tally, onClose }: ReflectionSummaryProps) {
  const summary = deserializeSessionSummary(tally);

  return (
    <div className="flex flex-1 flex-col gap-5">
      <Card
        variant="elevated"
        className="flex flex-col items-center gap-2 px-6 text-center"
      >
        <span
          aria-hidden="true"
          className="flex size-touch items-center justify-center rounded-full bg-secondary-tint text-secondary"
        >
          <CheckIcon
            size={22}
            strokeWidth={1.8}
          />
        </span>
        <h2 className="text-xl font-medium text-text">{summary.title}</h2>
        <p className="text-description text-muted">{summary.description}</p>
      </Card>

      {!summary.isEmpty && (
        <ul className="flex flex-col rounded-card border border-border bg-surface px-5 py-1">
          {summary.rows.map((row, position) => (
            <li
              key={row.label}
              className={`flex min-h-14 items-center justify-between gap-3 ${
                position > 0 ? 'border-t border-border-subtle' : ''
              }`}
            >
              <OutcomeBadge
                tone={row.tone}
                label={row.label}
              />
              <span className="text-body text-text tabular-nums">
                {row.countText}
              </span>
            </li>
          ))}
          {summary.leakAmountText && (
            <li className="flex min-h-14 items-center justify-between gap-3 border-t border-border-subtle">
              <span className="text-body text-soft">Tổng khoản rò rỉ</span>
              <span className="text-amount-row">{summary.leakAmountText}</span>
            </li>
          )}
        </ul>
      )}

      <div className="mt-auto pt-2 pb-8">
        <Button
          size="lg"
          fullWidth
          onClick={onClose}
        >
          {REFLECTION_COPY.close}
        </Button>
      </div>
    </div>
  );
}
