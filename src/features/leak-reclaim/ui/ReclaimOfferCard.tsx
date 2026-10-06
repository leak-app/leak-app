import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useGoals } from '@/entities/goal';
import { getApiErrorMessage } from '@/shared/api';
import { ShieldCheckIcon } from '@/shared/icons';

import { useDismissReclaim, useReclaimOffer } from '../api/reclaim.api';
import { isSnoozed, snoozeUntilTomorrow } from '../lib/snooze';
import { ReclaimBreakdown } from './ReclaimBreakdown';
import { ReclaimTransferSheet } from './ReclaimTransferSheet';

export function ReclaimOfferCard() {
  const { data: offer } = useReclaimOffer();
  const { data: goals = [] } = useGoals();
  const dismiss = useDismissReclaim();
  const [snoozed, setSnoozed] = useState(() => isSnoozed(new Date()));
  const [sheetOpen, setSheetOpen] = useState(false);
  const [successText, setSuccessText] = useState<string | null>(null);
  const dismissErrorText = dismiss.isError
    ? getApiErrorMessage(dismiss.error, 'Không bỏ qua được. Vui lòng thử lại.')
    : null;

  if (successText) {
    return (
      <div
        role="status"
        className="alert alert-success alert-soft text-sm"
      >
        <ShieldCheckIcon
          size={18}
          aria-hidden="true"
        />
        <span>{successText}</span>
      </div>
    );
  }
  if (!offer || offer.view === 'hidden') return null;

  if (offer.view === 'low-coverage') {
    return (
      <section className="card bg-surface/90 border border-outline/10 rounded-3xl p-4 gap-2">
        <p className="text-sm text-on-surface">
          {offer.coverageText} Hãy đánh giá thêm để tính tiền rò rỉ đã bịt.
        </p>
        <Link
          to={offer.reviewLink}
          className="btn btn-primary btn-sm min-h-11 self-start"
        >
          Đánh giá ngay
        </Link>
      </section>
    );
  }

  if (snoozed) return null;

  return (
    <section
      aria-label="Tiền rò rỉ đã bịt"
      className="card bg-surface/90 border border-success/30 rounded-3xl p-4 gap-3"
    >
      <div className="flex items-start gap-3">
        <ShieldCheckIcon
          size={22}
          className="text-success shrink-0"
          aria-hidden="true"
        />
        <div className="flex flex-col">
          <p className="text-sm font-bold text-on-surface">{offer.headline}</p>
          {offer.topCategoryText && (
            <p className="text-xs text-on-surface-variant">
              {offer.topCategoryText}
            </p>
          )}
        </div>
      </div>
      <ReclaimBreakdown rows={offer.breakdown} />
      {goals.length === 0 ? (
        <Link
          to="/goals"
          className="btn btn-primary btn-sm min-h-11"
        >
          Tạo mục tiêu để giữ khoản này
        </Link>
      ) : (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-primary btn-sm min-h-11 flex-1"
            onClick={() => setSheetOpen(true)}
          >
            Chuyển vào mục tiêu
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm min-h-11"
            onClick={() => {
              snoozeUntilTomorrow(new Date());
              setSnoozed(true);
            }}
          >
            Để sau
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm min-h-11"
            disabled={dismiss.isPending}
            onClick={() => dismiss.mutate()}
          >
            Bỏ qua
          </button>
        </div>
      )}
      {dismissErrorText && (
        <p
          role="alert"
          className="text-xs text-error"
        >
          {dismissErrorText}
        </p>
      )}
      <ReclaimTransferSheet
        open={sheetOpen}
        goals={goals}
        defaultGoalId={offer.defaultGoalId}
        defaultAmount={offer.amount}
        onClose={() => setSheetOpen(false)}
        onDone={(text) => {
          setSheetOpen(false);
          setSuccessText(text);
        }}
      />
    </section>
  );
}
