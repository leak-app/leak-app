import type { MonthlyChecklistModel } from '@/entities/valuation';
import { useBalanceVisibility } from '@/shared/hooks';
import { CheckIcon } from '@/shared/icons';
import { Button, Card } from '@/shared/ui';

interface MonthlyChecklistProps {
  checklist: MonthlyChecklistModel;
  onUpdate: (walletId: string) => void;
}

/** Once a month begins: the wallets to update one after another, next one first. */
export function MonthlyChecklist({
  checklist,
  onUpdate,
}: MonthlyChecklistProps) {
  const { mask } = useBalanceVisibility();

  return (
    <Card
      variant="reminder"
      aria-live="polite"
      className="flex flex-col gap-4 !p-5.5"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-eyebrow text-secondary">
          <span
            className="size-1.5 rounded-full bg-secondary"
            aria-hidden="true"
          />
          {checklist.title}
        </span>
        <span className="text-label font-semibold text-secondary tabular-nums">
          {checklist.progressText}
        </span>
      </div>
      <p className="text-[1.0625rem] leading-snug font-medium text-text">
        {checklist.prompt}
      </p>

      <ul className="flex flex-col">
        {checklist.rows.map((row) => (
          <li
            key={row.id}
            className="flex min-h-14 items-center gap-3 border-t border-border-subtle"
          >
            {row.isDone ? (
              <span className="flex size-6.5 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                <CheckIcon
                  size={14}
                  strokeWidth={2.6}
                  aria-hidden="true"
                />
              </span>
            ) : (
              <span
                className="size-6.5 shrink-0 rounded-full border-[1.5px] border-dashed border-secondary/60"
                aria-hidden="true"
              />
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-body text-text">{row.name}</span>
              <span className="text-caption text-muted">{row.meta}</span>
            </div>
            {row.result && (
              <span
                className={`text-label font-semibold whitespace-nowrap tabular-nums ${row.result.toneClass}`}
              >
                {row.result.word} {mask(row.result.amountText)}
              </span>
            )}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2">
        <Button
          size="lg"
          fullWidth
          onClick={() => onUpdate(checklist.nextWalletId)}
        >
          {checklist.nextLabel}
        </Button>
        <span className="text-center text-caption text-muted">
          Mở app môi giới bên cạnh — mỗi ví chỉ cần một con số.
        </span>
      </div>
    </Card>
  );
}
