export type GoalContributionType = 'OPENING' | 'DEPOSIT' | 'WITHDRAWAL';

/** Shape returned by the API (Prisma Decimals arrive as strings). */
export interface RawGoalModel {
  id: string;
  name: string;
  emoji: string | null;
  targetAmount: string | number;
  savedAmount: string | number;
  targetDate: string | null; // "2027-03-01T00:00:00.000Z"
}

export interface RawGoalContributionModel {
  id: string;
  type: GoalContributionType;
  amount: string | number;
  note: string | null;
  createdAt: string;
  account: { id: string; name: string } | null;
  source?: 'MANUAL' | 'LEAK_RECLAIM';
}

export interface GoalModel {
  id: string;
  name: string;
  emoji: string;
  targetAmount: number;
  savedAmount: number;
  targetDate: string | null;
  // Added for UI (see lib/deserialize.ts)
  savedText: string;
  targetText: string;
  remainingText: string;
  percent: number;
  percentText: string;
  isCompleted: boolean;
  targetDateText: string | null;
  paceText: string | null;
  /** "YYYY-MM" for <input type="month">, or "" */
  targetMonthValue: string;
}

export interface GoalContributionModel {
  id: string;
  type: GoalContributionType;
  amount: number;
  note: string | null;
  createdAt: string;
  // Added for UI
  amountText: string;
  dateText: string;
  typeLabel: string;
  walletName: string;
  isReclaim: boolean;
}

export interface GoalsSummaryModel {
  savedText: string;
  targetText: string;
  percent: number;
  percentText: string;
  completedText: string | null;
}

export interface GoalParamsModel {
  name: string;
  emoji?: string;
  targetAmount: number;
  targetDate?: string | null;
}

export interface GoalMovementParamsModel {
  goalId: string;
  kind: 'deposit' | 'withdraw';
  amount: number;
  accountId?: string;
  note?: string;
}
