import { formatCompactVnd, formatVnd } from '@/shared/lib';

import type {
  RawReclaimOfferModel,
  ReclaimBreakdownRowModel,
  ReclaimOfferModel,
} from '../model/types';

const withEmoji = (name: string, emoji: string | null) =>
  emoji ? `${emoji} ${name}` : name;

function breakdownRow(
  b: RawReclaimOfferModel['breakdown'][number]
): ReclaimBreakdownRowModel {
  const direction = b.delta > 0 ? 'down' : b.delta < 0 ? 'up' : 'flat';
  const deltaText =
    direction === 'down'
      ? `bớt ${formatCompactVnd(b.delta)}`
      : direction === 'up'
        ? `tăng ${formatCompactVnd(-b.delta)}`
        : 'không đổi';
  return {
    key: b.categoryId,
    label: withEmoji(b.name, b.emoji),
    detailText: `TB ${formatCompactVnd(b.baseline)} → ${formatCompactVnd(b.actual)}`,
    deltaText,
    direction,
  };
}

export function deserializeReclaimOffer(
  raw: RawReclaimOfferModel
): ReclaimOfferModel {
  const view =
    raw.status === 'OPEN'
      ? 'offer'
      : raw.status === 'INELIGIBLE' && raw.reason === 'LOW_COVERAGE'
        ? 'low-coverage'
        : 'hidden';
  const monthParam = `${raw.year}-${String(raw.month).padStart(2, '0')}`;
  return {
    status: raw.status,
    view,
    amount: raw.reclaimableAmount,
    amountText: formatVnd(raw.reclaimableAmount),
    headline: `Tháng ${raw.month} bạn rò rỉ ít hơn bình thường ${formatVnd(raw.reclaimableAmount)}`,
    topCategoryText: raw.topCategory
      ? `chủ yếu ở ${withEmoji(raw.topCategory.name, raw.topCategory.emoji)}`
      : null,
    coverageText:
      raw.coverage === null
        ? null
        : // Floor (never round 69.6% up to the 70% threshold); the epsilon absorbs float noise like 0.29 * 100 = 28.999….
          `Đã đánh giá ${Math.floor(raw.coverage * 100 + 1e-9)}% chi tiêu tháng ${raw.month}.`,
    reviewLink: `/transactions?outcome=UNREVIEWED&month=${monthParam}`,
    breakdown: raw.breakdown.map(breakdownRow),
    defaultGoalId: raw.defaultGoalId,
    monthLabel: `tháng ${raw.month}/${raw.year}`,
  };
}

export const transferredText = (amount: number, goalName: string) =>
  `Đã chuyển ${formatVnd(amount)} vào ${goalName}`;
