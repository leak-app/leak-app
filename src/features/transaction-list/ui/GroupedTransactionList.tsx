import dayjs from 'dayjs';
import { useMemo, type RefObject } from 'react';

import type { TransactionModel } from '@/entities/transaction';
import { TransactionItem } from './TransactionItem';

interface GroupedTransactionListProps {
  transactions: TransactionModel[];
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  onFetchNextPage: () => void;
  loadMoreRef?: RefObject<HTMLDivElement | null>;
  onOutcomeClick?: (transaction: TransactionModel) => void;
}

function formatGroupDate(dateStr: string): string {
  const d = dayjs(dateStr);
  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');

  const formattedDay = `${d.date()} THÁNG ${d.month() + 1}`;

  if (d.isSame(today, 'day')) {
    return `HÔM NAY, ${formattedDay}`;
  }
  if (d.isSame(yesterday, 'day')) {
    return `HÔM QUA, ${formattedDay}`;
  }
  return `${d.date()} THÁNG ${d.month() + 1}, ${d.year()}`;
}

export function GroupedTransactionList({
  transactions,
  hasNextPage,
  isFetchingNextPage,
  onFetchNextPage,
  loadMoreRef,
  onOutcomeClick,
}: GroupedTransactionListProps) {
  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: TransactionModel[] } = {};
    for (const tx of transactions) {
      const dateKey = dayjs(tx.createdAt).format('YYYY-MM-DD');
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(tx);
    }
    return Object.entries(groups).map(([dateKey, items]) => ({
      dateKey,
      dateTitle: formatGroupDate(dateKey),
      items,
    }));
  }, [transactions]);

  if (groupedTransactions.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center justify-center text-center text-on-surface-variant">
        <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-3 text-2xl">
          💸
        </div>
        <p className="text-sm font-semibold text-on-surface">
          Chưa có giao dịch nào
        </p>
        <p className="text-xs mt-1 text-on-surface-variant">
          Không tìm thấy giao dịch nào phù hợp với bộ lọc hiện tại.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mt-2">
      {groupedTransactions.map((group) => (
        <div
          key={group.dateKey}
          className="flex flex-col gap-2.5"
        >
          <div className="text-xs font-bold tracking-wider text-on-surface-variant/80 uppercase px-1">
            {group.dateTitle}
          </div>

          <div className="flex flex-col gap-2.5">
            {group.items.map((tx) => (
              <TransactionItem
                key={tx.id}
                transaction={tx}
                onOutcomeClick={onOutcomeClick}
              />
            ))}
          </div>
        </div>
      ))}

      <div
        ref={loadMoreRef}
        className="mt-4 flex flex-col items-center justify-center"
      >
        {isFetchingNextPage ? (
          <div className="flex items-center gap-2 py-4 text-xs text-on-surface-variant">
            <span className="loading loading-spinner loading-xs text-primary"></span>
            <span>Đang tải thêm...</span>
          </div>
        ) : hasNextPage ? (
          <button
            type="button"
            onClick={onFetchNextPage}
            className="btn btn-sm rounded-full btn-outline border-outline/10 text-xs font-semibold text-on-surface hover:bg-surface-bright"
          >
            Xem thêm lịch sử
          </button>
        ) : (
          <span className="text-xs text-on-surface-variant/50 py-4">
            Đã hiển thị tất cả giao dịch
          </span>
        )}
      </div>
    </div>
  );
}
