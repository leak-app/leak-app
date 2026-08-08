import type { BudgetCategoryReportModel } from '@/entities/budget';

interface Props {
  item: BudgetCategoryReportModel;
}

export const BudgetCategoryCard = ({ item }: Props) => {
  return (
    <div className="card glass-card p-5 rounded-2xl space-y-4 hover:scale-[1.01] transition-transform duration-300 border border-outline/10 shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xl shrink-0 shadow-inner">
            {item.emoji}
          </div>
          <div>
            <h3 className="text-base font-bold text-on-surface">
              {item.categoryName}
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              {item.budgetAmount > 0
                ? `Còn lại: ${item.formattedRemaining ?? '0'}đ`
                : 'Chưa đặt ngân sách'}
            </p>
          </div>
        </div>
        <p className="text-sm font-bold text-on-surface">
          {item.budgetAmount > 0 ? `${item.formattedBudget ?? '0'}đ` : '0đ'}
        </p>
      </div>

      <div className="space-y-2">
        <progress
          aria-label={`Tiến độ ngân sách ${item.categoryName}`}
          className={`progress w-full h-3 ${item.progressColorClass ?? 'progress-primary'} bg-surface-container-high rounded-full`}
          value={item.progressPercent ?? 0}
          max="100"
        />

        <div className="flex justify-between items-center text-xs font-medium">
          {item.isWarning ? (
            <span className="badge badge-error badge-sm text-white font-semibold animate-pulse">
              {item.warningBadgeText}
            </span>
          ) : (
            <span className="text-on-surface-variant">
              Đã chi: {item.formattedSpent ?? '0'}đ
            </span>
          )}

          <span
            className={
              item.isWarning ? 'text-error font-bold' : 'text-primary font-bold'
            }
          >
            {item.percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};
