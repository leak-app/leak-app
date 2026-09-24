import type { LeakReason } from '@/entities/transaction';

export interface LeakRateRowApiModel {
  categoryId: string | null;
  name: string | null;
  emoji: string | null;
  totalSpent: number;
  leakAmount: number;
  worthItAmount: number;
  neutralAmount: number;
  unreviewedAmount: number;
  reviewedCount: number;
  leakRate: number | null;
  topLeakReason: LeakReason | null;
}

export interface LeakRateReportApiModel {
  month: number;
  year: number;
  categories: LeakRateRowApiModel[];
  summary: LeakRateRowApiModel;
}

export interface LeakRateRowModel extends LeakRateRowApiModel {
  displayName: string;
  emojiText: string;
  leakPercentText: string;
  leakAmountText: string;
  topReasonText: string | null;
  leakPct: number;
  reviewedOkPct: number;
  unreviewedPct: number;
  barLabel: string;
  transactionsLink: string | null;
}

export interface LeakRateReportModel {
  month: number;
  year: number;
  categories: LeakRateRowModel[];
  summary: LeakRateRowModel;
  topLeakRows: LeakRateRowModel[];
  hasLeaks: boolean;
  isEmpty: boolean;
}

export interface LeakRatePeriodModel {
  month: number;
  year: number;
}
