import type { ReactNode } from 'react';

import { usePortfolio } from '@/entities/valuation';

import { useBudgetCard, useReportOverview } from '../api';
import { BudgetOverviewCard } from './BudgetOverviewCard';
import { CashFlowCard } from './CashFlowCard';
import { InvestmentEntryCard } from './InvestmentEntryCard';
import { RecentExpensesList } from './RecentExpensesList';
import { SavingsGoalsEntryCard } from './SavingsGoalsEntryCard';
import { TotalBalanceCard } from './TotalBalanceCard';
import { WeeklyExpenseChart } from './WeeklyExpenseChart';

export function ReportOverview({ insightsSlot }: { insightsSlot?: ReactNode }) {
  const { data, isLoading, isError } = useReportOverview();
  const { data: portfolio } = usePortfolio();
  const { card: budgetCard, isLoading: isBudgetLoading } = useBudgetCard();

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
        totalText={data.totalBalanceText ?? ''}
        growthPercentage={data.growthPercentage}
        accountsCount={data.accountsCount}
        splitText={data.balanceSplitText}
      />

      <CashFlowCard />

      <WeeklyExpenseChart weeklyExpense={data.weeklyExpense} />

      {insightsSlot}

      <RecentExpensesList expenses={data.recentExpenses} />

      {isBudgetLoading ? (
        <div className="skeleton h-72 rounded-card" />
      ) : (
        budgetCard && <BudgetOverviewCard card={budgetCard} />
      )}

      {portfolio?.hasWallets && <InvestmentEntryCard entry={portfolio.entry} />}

      <SavingsGoalsEntryCard />
    </div>
  );
}
