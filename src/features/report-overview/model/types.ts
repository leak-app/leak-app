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

/** One budgeted category on the overview card, ready to draw. */
export interface BudgetCardRowModel {
  categoryId: string;
  name: string;
  emoji: string;
  /** Opens this category on the Budgets page. */
  href: string;
  statusText: string;
  /** Near, full or over: apricot text with an icon. */
  isAlert: boolean;
  tone: 'primary' | 'danger';
  fillPercent: number;
  overflowStartPercent: number | null;
  amountsText: string;
  percentText: string;
  ariaLabel: string;
}

/** The "Ngân sách" card on the overview page. */
export interface BudgetCardModel {
  isEmpty: boolean;
  monthText: string;
  heroLabel: string;
  heroAmount: { value: string; symbol: string };
  /** Spent more than the whole month's limit: the hero shows the excess in apricot. */
  isHeroOver: boolean;
  perDayText: string | null;
  /** 0 to 100, for the meter. */
  usedPercent: number;
  todayPercent: number;
  tone: 'primary' | 'danger';
  spentOfLimitText: string;
  paceText: string;
  isPaceFast: boolean;
  rows: BudgetCardRowModel[];
  othersText: string | null;
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
