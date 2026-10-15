export interface WeeklyExpenseDayModel {
  dayLabel: string;
  amount: number;
  isPeak: boolean;
  percentage?: number;
  // Added for UI only
  totalBalanceText?: string;
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
  totalBalanceText?: string;
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
  walletsBalance: number;
  goalsBalance: number;
  // Added for UI only
  totalBalanceText?: string;
  balanceSplitText?: string | null;
  growthPercentage: number;
  accountsCount: number;
  weeklyExpense: WeeklyExpenseSummaryModel;
  recentExpenses: RecentExpenseItemModel[];
  budgetGoals: BudgetGoalProgressModel[];
}

/** GET /overview/monthly */
export interface RawMonthlyCashFlowModel {
  currentMonth: { income: number; expense: number };
  previousMonth: { income: number; expense: number };
}

export interface CashFlowModel {
  incomeText: string;
  expenseText: string;
  netText: string;
  isNetNegative: boolean;
  deltaText: string;
  deltaDirection: 'up' | 'down' | 'flat' | null;
  isEmpty: boolean;
}
