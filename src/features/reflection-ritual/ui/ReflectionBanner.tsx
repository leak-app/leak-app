import { useState } from 'react';

import {
  useReflectionQueue,
  type TransactionModel,
} from '@/entities/transaction';

import { formatQueueBanner } from '../lib/deserialize';
import { ReflectionSheet } from './ReflectionSheet';

export function ReflectionBanner() {
  const { data } = useReflectionQueue();
  const [open, setOpen] = useState(false);
  // Snapshot taken when the sheet opens, so refetches can't reshuffle the session.
  const [sessionItems, setSessionItems] = useState<TransactionModel[]>([]);

  const showBanner = !!data && data.total > 0;

  const handleStart = () => {
    if (!data) return;
    setSessionItems(data.items);
    setOpen(true);
  };

  return (
    <>
      {showBanner && (
        <div className="card bg-surface border border-primary/20 rounded-3xl p-4 flex flex-row items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-on-surface">
              {formatQueueBanner(data.total)}
            </p>
            <p className="text-xs text-on-surface-variant">
              Chỉ mất chưa đến một phút.
            </p>
          </div>
          <button
            type="button"
            onClick={handleStart}
            className="btn btn-primary btn-sm min-h-11 rounded-full"
          >
            Đánh giá ngay
          </button>
        </div>
      )}

      {/* Rendered outside the banner condition so the session survives the queue emptying. */}
      <ReflectionSheet
        items={sessionItems}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
