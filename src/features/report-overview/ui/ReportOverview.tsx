import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { ChevronRightIcon, DollarIcon } from '@/shared/icons';

import { useReportOverview } from '../api';
import { BudgetGoalsProgress } from './BudgetGoalsProgress';
import { RecentExpensesList } from './RecentExpensesList';
import { TotalBalanceCard } from './TotalBalanceCard';
import { WeeklyExpenseChart } from './WeeklyExpenseChart';

export function ReportOverview({ insightsSlot }: { insightsSlot?: ReactNode }) {
  const { data, isLoading, isError } = useReportOverview();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 py-16 items-center justify-center text-on-surface-variant">
        <span className="loading loading-spinner loading-md text-primary" />
        <span className="text-xs font-medium">
          Đang tải báo cáo tổng quan...
        </span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="alert alert-error alert-soft text-xs font-medium my-8">
        <span>
          Không thể tải dữ liệu báo cáo tổng quan. Vui lòng thử lại sau.
        </span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-6 py-2 select-none">
      <TotalBalanceCard
        totalBalance={data.totalBalance}
        growthPercentage={data.growthPercentage}
        accountsCount={data.accountsCount}
      />

      <WeeklyExpenseChart weeklyExpense={data.weeklyExpense} />

      {insightsSlot}

      <RecentExpensesList expenses={data.recentExpenses} />

      <BudgetGoalsProgress goals={data.budgetGoals} />

      <Link
        to="/goals"
        className="card bg-surface/90 border border-outline/10 rounded-3xl px-5 py-4 min-h-11 flex flex-row items-center justify-between shadow-lg"
      >
        <span className="flex items-center gap-3 text-sm font-semibold text-on-surface">
          <DollarIcon
            size={20}
            className="text-secondary"
          />
          Mục tiêu tiết kiệm
        </span>
        <ChevronRightIcon
          size={18}
          className="text-on-surface-variant"
        />
      </Link>
    </div>
  );
}
