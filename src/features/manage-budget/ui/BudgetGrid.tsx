import type { BudgetCategoryReportModel } from '@/entities/budget';
import { useNavigate } from 'react-router-dom';
import { BudgetCategoryCard } from './BudgetCategoryCard';
import { SavingsInsightCard } from './SavingsInsightCard';

interface Props {
  categories: BudgetCategoryReportModel[];
  savingsInsight: string;
  month: number;
  year: number;
  onSelect: (item: BudgetCategoryReportModel) => void;
}

export const BudgetGrid = ({
  categories,
  savingsInsight,
  month,
  year,
  onSelect,
}: Props) => {
  const navigate = useNavigate();
  const budgeted = categories.filter((c) => c.budgetAmount > 0);
  const unbudgeted = categories.filter((c) => c.budgetAmount <= 0);

  return (
    <div className="grid grid-cols-1 gap-4">
      {budgeted.map((item) => (
        <BudgetCategoryCard
          key={item.categoryId}
          item={item}
          onSelect={onSelect}
        />
      ))}

      {unbudgeted.length > 0 && (
        <h3 className="text-xs font-bold text-on-surface-variant uppercase mt-2">
          Chưa đặt ngân sách
        </h3>
      )}
      {unbudgeted.map((item) => (
        <BudgetCategoryCard
          key={item.categoryId}
          item={item}
          onSelect={onSelect}
        />
      ))}

      {/* Shortcut button to Setup Budget page */}
      <button
        onClick={() => navigate(`/budgets/setup?month=${month}&year=${year}`)}
        className="border-2 border-dashed border-outline/20 hover:border-primary/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-surface-container-high/40 transition-all group cursor-pointer min-h-[160px]"
      >
        <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <span className="text-xl text-outline group-hover:text-primary transition-colors">
            ✏️
          </span>
        </div>
        <p className="text-sm font-medium text-on-surface-variant group-hover:text-primary transition-colors">
          Thiết lập ngân sách tháng {month}
        </p>
      </button>

      {/* Savings Insight Card */}
      <SavingsInsightCard insightText={savingsInsight} />
    </div>
  );
};
