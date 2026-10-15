import type { CategoryModel } from '@/entities/category';

export type TransactionType = 'INCOME' | 'EXPENSE';

export type SpendOutcome = 'UNREVIEWED' | 'WORTH_IT' | 'NEUTRAL' | 'LEAK';
export type ReviewableOutcome = Exclude<SpendOutcome, 'UNREVIEWED'>;
export type LeakReason =
  | 'IMPULSIVE'
  | 'UNUSED'
  | 'OVERPRICED'
  | 'SOCIAL_PRESSURE'
  | 'FORGOTTEN_SUB'
  | 'OTHER';
export type OutcomeIconName =
  'check' | 'minus' | 'trending-down' | 'circle-dashed';

export interface TransactionModel {
  id: string;
  amount: number;
  type: TransactionType;
  description?: string;
  categoryId: string;
  category?: CategoryModel;
  accountId: string;
  account?: { id: string; name: string; type: 'LIQUID' | 'INVESTMENT' };
  userId: string;
  createdAt: string;
  updatedAt: string;
  outcome: SpendOutcome;
  leakReason: LeakReason | null;
  reviewedAt: string | null;

  // Added for UI (see lib/deserialize.ts)
  isExpense: boolean;
  amountText: string;
  signedAmountText: string;
  timeText: string;
  walletName: string;
  metaText: string;
  dateText: string;
  outcomeLabel: string;
  outcomeBadgeClass: string;
  outcomeIcon: OutcomeIconName;
  leakReasonLabel: string | null;
}

export interface CreateTransactionParamsModel {
  amount: number;
  type: TransactionType;
  categoryId: string;
  accountId?: string;
  description?: string;
  /** The day it happened, "YYYY-MM-DD"; today when left out. */
  occurredOn?: string;
}

export interface GetTransactionsQueryParamsModel {
  search?: string;
  page?: number;
  limit?: number;
  type?: TransactionType;
  categoryId?: string;
  accountId?: string;
  outcome?: SpendOutcome;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface TransactionListResponseModel {
  transactions: TransactionModel[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ReflectionQueueModel {
  items: TransactionModel[];
  total: number;
}

export interface ReviewOutcomeParamsModel {
  transactionId: string;
  outcome: ReviewableOutcome;
  leakReason?: LeakReason;
}
