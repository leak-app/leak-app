import type { WeeklyExpenseSummaryModel } from '../model';

interface WeeklyExpenseChartProps {
  weeklyExpense: WeeklyExpenseSummaryModel;
}

export function WeeklyExpenseChart({ weeklyExpense }: WeeklyExpenseChartProps) {
  return (
    <div className="card bg-surface/90 border border-outline/10 rounded-3xl p-4 shadow-lg select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-on-surface">Chi tiêu tuần này</h3>
        <div>
          <select className="select select-ghost select-xs text-xs font-medium text-on-surface-variant focus:bg-transparent cursor-pointer">
            <option value="7days">7 ngày qua</option>
            <option value="thisMonth">Tháng này</option>
          </select>
        </div>
      </div>

      {/* Bar Chart Container / Empty State */}
      {!weeklyExpense?.days || weeklyExpense.days.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-medium text-on-surface-variant">
            Chưa có dữ liệu chi tiêu tuần này
          </span>
        </div>
      ) : (
        <div className="mt-8 pt-4 pb-2 flex items-end justify-between h-44">
          {weeklyExpense.days.map((day) => {
            return (
              <div
                key={day.dayLabel}
                className="flex flex-col items-center flex-1 h-full justify-end gap-2 group cursor-pointer"
              >
                {/* Value Badge above bar */}
                {day.isPeak ? (
                  <div className="badge badge-sm bg-primary/20 text-primary border border-primary/30 font-bold text-[10px] px-2 py-0.5 shadow-sm mb-1">
                    {day.formattedAmount}
                  </div>
                ) : (
                  <div className="text-[10px] text-on-surface-variant/0 group-hover:text-on-surface-variant transition-opacity mb-1 font-mono">
                    {day.amount > 0 ? day.formattedAmount : ''}
                  </div>
                )}

                {/* Bar Fill */}
                <div className="w-full max-w-[28px] bg-surface-bright/50 border border-outline/5 rounded-xl overflow-hidden flex items-end h-32 p-0.5">
                  <div
                    style={{
                      height: `${
                        day.amount > 0 ? Math.max(day.percentage ?? 0, 12) : 8
                      }%`,
                    }}
                    className={`w-full rounded-lg transition-all duration-300 ${
                      day.isPeak
                        ? 'bg-primary shadow-sm shadow-primary/30'
                        : 'bg-primary/20 group-hover:bg-primary/50'
                    }`}
                  />
                </div>

                {/* Day Label */}
                {day.isPeak ? (
                  <span className="badge badge-primary badge-sm font-extrabold text-[11px] px-1.5 py-0.5">
                    {day.dayLabel}
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-on-surface-variant">
                    {day.dayLabel}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
