import {
  OutcomePicker,
  useReviewTransaction,
  type LeakReason,
  type ReviewableOutcome,
  type TransactionModel,
} from '@/entities/transaction';

import { formatProgress, formatSessionSummary } from '../lib/deserialize';
import { useReflectionSession } from '../model/useReflectionSession';

interface ReflectionSessionProps {
  items: TransactionModel[];
  onClose: () => void;
}

export function ReflectionSession({ items, onClose }: ReflectionSessionProps) {
  const session = useReflectionSession(items);
  const review = useReviewTransaction();

  if (session.isDone || !session.current) {
    return (
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        <p className="text-base font-bold text-on-surface">
          {formatSessionSummary(session.tally)}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="btn btn-primary w-full min-h-11"
        >
          Đóng
        </button>
      </div>
    );
  }

  const item = session.current;

  const handleSelect = (
    outcome: ReviewableOutcome,
    leakReason?: LeakReason
  ) => {
    review.mutate(
      { transactionId: item.id, outcome, leakReason },
      {
        onSuccess: () => {
          review.reset();
          session.record(item, outcome);
        },
      }
    );
  };

  const handleSkip = () => {
    review.reset();
    session.skip();
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between text-xs text-on-surface-variant">
        <span>Nhìn lại khi cảm xúc đã lắng xuống</span>
        <span className="tabular-nums">
          {formatProgress(session.index, session.total)}
        </span>
      </div>

      <div className="card bg-surface-bright/50 border border-outline/10 p-4 flex flex-row items-center gap-3">
        <span
          className="text-2xl"
          aria-hidden="true"
        >
          {item.category?.emoji}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-on-surface truncate">
            {item.description}
          </p>
          <p className="text-xs text-on-surface-variant">{item.dateText}</p>
        </div>
        <span className="font-bold text-on-surface tabular-nums">
          {item.amountText}
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
        key={item.id}
        isSaving={review.isPending}
        onSelect={handleSelect}
      />

      <button
        type="button"
        disabled={review.isPending}
        onClick={handleSkip}
        className="btn btn-ghost btn-sm min-h-11 self-center"
      >
        Bỏ qua
      </button>
    </div>
  );
}
