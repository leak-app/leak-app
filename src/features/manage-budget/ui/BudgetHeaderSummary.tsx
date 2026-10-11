import { formatNumber } from '@/shared/lib';

interface Props {
  totalBudget: number;
  month: number;
  year: number;
}

export const BudgetHeaderSummary = ({ totalBudget, month, year }: Props) => {
  const formattedTotal = formatNumber(totalBudget);

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest block mb-1">
            Quản lý chi tiêu • Tháng {month}/{year}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-on-surface font-headline-lg">
            Ngân sách của bạn
          </h1>
        </div>
        <div className="text-right">
          <p className="text-xs text-on-surface-variant mb-1 font-medium">
            Tổng ngân sách tháng này
          </p>
          <p className="text-xl md:text-2xl font-bold text-primary-fixed-dim">
            {formattedTotal}đ
          </p>
        </div>
      </div>
    </div>
  );
};
