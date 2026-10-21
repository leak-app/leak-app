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
  /** The stored note, empty when there is none. `description` falls back to the category name for display. */
  note: string;
  categoryId: string;
  category?: CategoryModel;
  accountId: string;
  account?: { id: string; name: string; type: 'LIQUID' | 'INVESTMENT' };
  userId: string;
  createdAt: string;
  updatedAt: string;
  /** The local day of `createdAt`, "YYYY-MM-DD"; what the edit form starts from. */
  occurredOn: string;
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
  /** The Buddy's comment, null until one is written (see lib/buddy.ts). */
  aiComment: string | null;
  aiSentiment: BuddySentiment | null;
  buddy: BuddyBubbleModel | null;
}

export type BuddyJobStatus = 'NONE' | 'PENDING' | 'DONE' | 'SKIPPED' | 'FAILED';

export interface RawBuddyReactionModel {
  status: BuddyJobStatus;
  comment: string | null;
  sentiment: string | null;
}

export interface BuddyReactionModel {
  /** True while a comment may still arrive; the watch keeps checking. */
  isPending: boolean;
  buddy: BuddyBubbleModel | null;
}

export type BuddySentiment = 'ROAST' | 'PRAISE' | 'NUDGE';

/** A Buddy comment ready to render: no formatting or class choices left for the component. */
export interface BuddyBubbleModel {
  text: string;
  sentiment: BuddySentiment;
  emoji: string;
  /** Spoken to screen readers before the comment, for example "Bạn thân cà khịa". */
  label: string;
  containerClass: string;
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

export interface UpdateTransactionParamsModel {
  id: string;
  amount?: number;
  type?: TransactionType;
  categoryId?: string;
  accountId?: string;
  /** A blank note clears it. */
  description?: string;
  /** "YYYY-MM-DD"; send only when the day changed. */
  occurredOn?: string;
}

/** What the parser could read out of a typed phrase; nothing is saved. */
export interface QuickLogDraftModel {
  amount: number | null;
  type: TransactionType;
  categoryId: string | null;
  accountId: string | null;
  description: string;
  /** Fields the parser would not guess; the form leaves them for the user. */
  unresolved: Array<'amount' | 'category'>;
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
