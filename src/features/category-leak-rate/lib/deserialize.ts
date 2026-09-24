import { LEAK_REASON_LABELS } from '@/entities/transaction';
import { formatCompactVnd } from '@/shared/lib';

import type {
  LeakRateReportApiModel,
  LeakRateReportModel,
  LeakRateRowApiModel,
  LeakRateRowModel,
} from '../model/types';

const percentOf = (part: number, total: number) =>
  total > 0 ? Math.round((part / total) * 1000) / 10 : 0;

function displayNameOf(raw: LeakRateRowApiModel): string {
  if (raw.categoryId === null) return 'Tổng cộng';
  return raw.name ?? 'Danh mục không xác định';
}

export function deserializeLeakRow(
  raw: LeakRateRowApiModel,
  month: number,
  year: number
): LeakRateRowModel {
  const totalSpent = Number(raw.totalSpent);
  const leakPct = percentOf(Number(raw.leakAmount), totalSpent);
  const unreviewedPct = percentOf(Number(raw.unreviewedAmount), totalSpent);
  const reviewedOkPct =
    totalSpent > 0 ? Math.max(0, 100 - leakPct - unreviewedPct) : 0;
  const monthParam = `${year}-${String(month).padStart(2, '0')}`;

  return {
    ...raw,
    displayName: displayNameOf(raw),
    emojiText: raw.emoji ?? '💸',
    leakPercentText:
      raw.leakRate === null
        ? 'Chưa đủ dữ liệu'
        : `${Math.round(raw.leakRate * 100)}% rò rỉ`,
    leakAmountText: formatCompactVnd(Number(raw.leakAmount)),
    topReasonText: raw.topLeakReason
      ? `Chủ yếu do: ${LEAK_REASON_LABELS[raw.topLeakReason]}`
      : null,
    leakPct,
    reviewedOkPct,
    unreviewedPct,
    barLabel: `Rò rỉ ${leakPct}%, đã đánh giá khác ${reviewedOkPct}%, chưa đánh giá ${unreviewedPct}%`,
    transactionsLink: raw.categoryId
      ? Number(raw.leakAmount) > 0
        ? `/transactions?categoryId=${raw.categoryId}&outcome=LEAK&month=${monthParam}`
        : `/transactions?categoryId=${raw.categoryId}&month=${monthParam}`
      : null,
  };
}

export function deserializeLeakReport(
  raw: LeakRateReportApiModel
): LeakRateReportModel {
  const categories = raw.categories.map((row) =>
    deserializeLeakRow(row, raw.month, raw.year)
  );
  return {
    month: raw.month,
    year: raw.year,
    categories,
    summary: deserializeLeakRow(raw.summary, raw.month, raw.year),
    topLeakRows: categories.filter((row) => row.leakAmount > 0).slice(0, 3),
    hasLeaks: raw.summary.leakAmount > 0,
    isEmpty: categories.length === 0,
  };
}
