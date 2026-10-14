import { formatNumber } from '@/shared/lib';
import { Link } from 'react-router-dom';

import type { BudgetGoalProgressModel } from '../model';

interface BudgetGoalsProgressProps {
  goals: BudgetGoalProgressModel[];
}

export function BudgetGoalsProgress({ goals }: BudgetGoalsProgressProps) {
  return (
    <div className="card bg-surface/90 border border-outline/10 rounded-3xl p-5 shadow-lg select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-on-surface">Ngân sách</h3>
        <Link
          to="/budgets"
          className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors min-h-11 flex items-center"
        >
          Xem ngân sách
        </Link>
      </div>

      {/* Goal Items / Empty State */}
      <div className="mt-4 flex flex-col gap-4">
        {goals.length === 0 ? (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-medium text-on-surface-variant">
              Chưa có mục tiêu ngân sách nào
            </span>
          </div>
        ) : (
          goals.map((g) => (
            <div
              key={g.id}
              className="flex flex-col gap-2"
            >
              {/* Title & Percentage */}
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-on-surface">{g.name}</span>
                <span
                  className={
                    g.isWarning
                      ? 'text-error font-bold'
                      : 'text-on-surface-variant'
                  }
                >
                  {g.percentage}%
                </span>
              </div>

              {/* DaisyUI Progress Bar */}
              <progress
                className={`progress h-2 w-full ${
                  g.isWarning ? 'progress-error' : 'progress-primary'
                }`}
                value={g.percentage}
                max="100"
              />

              {/* Subtext (Amounts & Warning Status) */}
              <div className="flex items-center justify-between text-xs text-on-surface-variant/80 font-mono">
                <span>
                  {formatNumber(g.savedAmount)} / {formatNumber(g.targetAmount)}{' '}
                  VND
                </span>
                {g.isWarning && (
                  <span className="badge badge-error badge-xs badge-soft font-semibold animate-pulse">
                    Sắp chạm hạn mức!
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
