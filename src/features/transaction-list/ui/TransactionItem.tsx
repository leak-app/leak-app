import { OutcomeIcon, type TransactionModel } from '@/entities/transaction';

interface TransactionItemProps {
  transaction: TransactionModel;
  onOutcomeClick?: (transaction: TransactionModel) => void;
}

export function TransactionItem({
  transaction,
  onOutcomeClick,
}: TransactionItemProps) {
  return (
    <div className="bg-surface/60 hover:bg-surface border border-outline/10 rounded-2xl p-3.5 flex items-center justify-between gap-3 transition-all duration-200 group">
      <div className="flex min-w-0 items-center gap-3.5">
        <div className="w-10 h-10 rounded-2xl shrink-0 bg-surface-bright border border-outline/10 flex items-center justify-center group-hover:scale-105 transition-transform">
          <span className="leading-none">{transaction.category?.emoji}</span>
        </div>

        <div className="flex min-w-0 flex-col">
          <span className="text-sm font-semibold text-on-surface line-clamp-1">
            {transaction.description}
          </span>
          <span className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">
            {transaction.metaText}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end">
        <span className="text-sm font-bold text-on-surface tabular-nums">
          {transaction.signedAmountText}
        </span>
        {transaction.isExpense && (
          <button
            type="button"
            onClick={() => onOutcomeClick?.(transaction)}
            aria-label={`${transaction.outcomeLabel}. Nhấn để đánh giá`}
            className="-my-1 flex min-h-11 items-center"
          >
            <span className={`${transaction.outcomeBadgeClass} gap-1`}>
              <OutcomeIcon
                name={transaction.outcomeIcon}
                size={12}
              />
              {transaction.outcomeLabel}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
