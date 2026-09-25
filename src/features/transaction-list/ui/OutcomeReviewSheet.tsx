import {
  OutcomePicker,
  useReviewTransaction,
  type TransactionModel,
} from '@/entities/transaction';
import { BottomSheet } from '@/shared/ui';

interface OutcomeReviewSheetProps {
  transaction: TransactionModel | null;
  onClose: () => void;
}

export function OutcomeReviewSheet({
  transaction,
  onClose,
}: OutcomeReviewSheetProps) {
  return (
    <BottomSheet
      open={transaction !== null}
      onClose={onClose}
      title="Đánh giá khoản chi"
    >
      {transaction && (
        <OutcomeReviewContent
          key={transaction.id}
          transaction={transaction}
          onDone={onClose}
        />
      )}
    </BottomSheet>
  );
}

function OutcomeReviewContent({
  transaction,
  onDone,
}: {
  transaction: TransactionModel;
  onDone: () => void;
}) {
  const review = useReviewTransaction();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-sm font-semibold text-on-surface">
          {transaction.description}
        </span>
        <span className="font-bold text-on-surface tabular-nums">
          {transaction.amountText}
        </span>
      </div>

      {review.isError && (
        <div
          role="alert"
          className="alert alert-error alert-soft text-xs"
        >
          Không thể lưu đánh giá. Vui lòng thử lại.
        </div>
      )}

      <OutcomePicker
        value={transaction.outcome}
        isSaving={review.isPending}
        onSelect={(outcome, leakReason) =>
          review.mutate(
            { transactionId: transaction.id, outcome, leakReason },
            { onSuccess: onDone }
          )
        }
      />
    </div>
  );
}
