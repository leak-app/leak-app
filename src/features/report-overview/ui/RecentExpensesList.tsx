import { Link } from 'react-router-dom';

import type { RecentExpenseItemModel } from '../model';

interface RecentExpensesListProps {
  expenses: RecentExpenseItemModel[];
}

export function RecentExpensesList({ expenses }: RecentExpensesListProps) {
  return (
    <div className="card bg-surface/90 border border-outline/10 rounded-3xl p-4 shadow-lg select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-on-surface">Chi tiêu gần đây</h3>
        <Link
          to="/transaction"
          className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
        >
          Xem tất cả
        </Link>
      </div>

      {/* List */}
      <div className="mt-4 flex flex-col gap-3.5">
        {expenses.length === 0 ? (
          <div className="py-6 text-center text-xs text-on-surface-variant">
            Chưa có chi tiêu gần đây
          </div>
        ) : (
          expenses.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between"
            >
              {/* Icon & Details */}
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-surface-bright border border-outline/10 flex items-center justify-center text-xl shadow-inner shrink-0">
                  {item.category?.emoji || '🍴'}
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-on-surface">
                    {item.category?.name || 'Chi tiêu'}
                  </span>
                  <span className="text-xs text-on-surface-variant mt-0.5">
                    {item.formattedTimestamp} • {item.description}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-error">
                  -{item.formattedAmount}
                </span>
                <span className="text-[11px] text-on-surface-variant/70 mt-0.5">
                  Ví Tiền mặt
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
