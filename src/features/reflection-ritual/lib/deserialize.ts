import type { TransactionModel } from '@/entities/transaction';
import { formatVnd, formatVndParts } from '@/shared/lib';
import type { OutcomeTone } from '@/shared/ui';

import type { ReflectionTally } from '../model/useReflectionSession';

export function formatQueueBanner(total: number): string {
  return `Bạn có ${total} khoản chi cần đánh giá`;
}

export interface ReflectionItemModel {
  /** The category emoji, or null for a plain receipt icon. */
  emoji: string | null;
  /** "Hôm qua, 15:40 · Ăn uống" */
  meta: string;
  title: string;
  amountValue: string;
  amountSymbol: string;
}

export function deserializeReflectionItem(
  item: TransactionModel
): ReflectionItemModel {
  const categoryName = item.category?.name ?? '';
  const { value, symbol } = formatVndParts(item.amount);
  return {
    emoji: item.category?.emoji || null,
    meta: categoryName ? `${item.dateText} · ${categoryName}` : item.dateText,
    title: item.description || categoryName || 'Khoản chi',
    amountValue: value,
    amountSymbol: symbol,
  };
}

export interface SummaryRowModel {
  tone: OutcomeTone;
  label: string;
  countText: string;
}

export interface SessionSummaryModel {
  isEmpty: boolean;
  title: string;
  description: string;
  rows: SummaryRowModel[];
  /** Total of the expenses marked as leaks, for example "120,000₫"; null when there are none. */
  leakAmountText: string | null;
}

export function deserializeSessionSummary(
  tally: ReflectionTally
): SessionSummaryModel {
  const reviewed = tally.worthIt + tally.neutral + tally.leak;
  const row = (tone: OutcomeTone, label: string, count: number) => ({
    tone,
    label,
    countText: `${count} khoản`,
  });

  if (reviewed === 0) {
    return {
      isEmpty: true,
      title: 'Đã bỏ qua tất cả khoản chi',
      description: 'Bạn có thể nhìn lại sau, khi cảm xúc đã lắng xuống.',
      rows: [],
      leakAmountText: null,
    };
  }

  return {
    isEmpty: false,
    title: 'Xong rồi',
    description: `Bạn đã nhìn lại ${reviewed} khoản chi.`,
    rows: [
      row('worth', 'Đáng giá', tally.worthIt),
      row('neutral', 'Bình thường', tally.neutral),
      row('leak', 'Rò rỉ', tally.leak),
    ],
    leakAmountText: tally.leak > 0 ? formatVnd(tally.leakAmount) : null,
  };
}
