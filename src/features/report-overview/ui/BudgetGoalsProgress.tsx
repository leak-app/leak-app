import type { BudgetGoalProgressModel } from '../model';

interface BudgetGoalsProgressProps {
  goals: BudgetGoalProgressModel[];
}

function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN');
}

export function BudgetGoalsProgress({ goals }: BudgetGoalsProgressProps) {
  return (
    <div className="card bg-surface/90 border border-outline/10 rounded-3xl p-5 shadow-lg select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-on-surface">Ngân sách</h3>
        <button
          type="button"
          className="btn btn-ghost btn-circle btn-xs text-on-surface-variant hover:text-on-surface"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
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
              <div className="flex items-center justify-between text-[11px] text-on-surface-variant/80 font-mono">
                <span>
                  {formatVND(g.savedAmount)} / {formatVND(g.targetAmount)} VND
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
