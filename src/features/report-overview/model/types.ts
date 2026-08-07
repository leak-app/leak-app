export interface WeeklyExpenseDayModel {
  dayLabel: string;
  amount: number;
  isPeak: boolean;
  percentage?: number;
  // Added for UI only
  formattedAmount?: string;
}

export interface WeeklyExpenseSummaryModel {
  totalAmount: number;
  days: WeeklyExpenseDayModel[];
}

export interface RecentExpenseItemModel {
  id: string;
  description: string;
  amount: number;
  createdAt: string;
  category?: {
    name: string;
    emoji?: string;
  };
  // Added for UI only
  formattedAmount?: string;
  formattedTimestamp?: string;
}

export interface BudgetGoalProgressModel {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  percentage: number;
  isWarning: boolean;
}

export interface ReportOverviewModel {
  totalBalance: number;
  growthPercentage: number;
  accountsCount: number;
  weeklyExpense: WeeklyExpenseSummaryModel;
  recentExpenses: RecentExpenseItemModel[];
  budgetGoals: BudgetGoalProgressModel[];
}
