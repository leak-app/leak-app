export type ReclaimStatus = 'OPEN' | 'TRANSFERRED' | 'DISMISSED' | 'INELIGIBLE';
export type ReclaimReason =
  'NOT_ENOUGH_HISTORY' | 'NO_SPENDING' | 'LOW_COVERAGE' | 'TOO_SMALL';

export interface RawReclaimOfferModel {
  year: number;
  month: number;
  status: ReclaimStatus;
  reason: ReclaimReason | null;
  reclaimableAmount: number;
  coverage: number | null;
  topCategory: {
    id: string;
    name: string;
    emoji: string | null;
    delta: number;
  } | null;
  breakdown: {
    categoryId: string;
    name: string;
    emoji: string | null;
    baseline: number;
    actual: number;
    delta: number;
  }[];
  defaultGoalId: string | null;
}

export interface ReclaimBreakdownRowModel {
  key: string;
  label: string; // "☕ Cà phê"
  detailText: string; // "TB 1tr ₫ → 400k ₫"
  deltaText: string; // "bớt 600k ₫" | "tăng 200k ₫" | "không đổi"
  direction: 'down' | 'up' | 'flat';
}

export interface ReclaimOfferModel {
  status: ReclaimStatus;
  /** What the card shows: an offer, a "review more" prompt, or nothing. */
  view: 'offer' | 'low-coverage' | 'hidden';
  amount: number;
  amountText: string;
  headline: string; // "Tháng 9 bạn rò rỉ ít hơn bình thường 600.000 ₫"
  topCategoryText: string | null; // "chủ yếu ở ☕ Cà phê"
  coverageText: string | null; // "Đã đánh giá 64% chi tiêu tháng 9."
  reviewLink: string; // "/transactions?outcome=UNREVIEWED&month=2026-09"
  breakdown: ReclaimBreakdownRowModel[];
  defaultGoalId: string | null;
  monthLabel: string; // "tháng 9/2026"
}
