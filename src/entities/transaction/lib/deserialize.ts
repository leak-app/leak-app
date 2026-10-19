import dayjs from 'dayjs';

import { formatRelativeDateTime, formatVnd } from '@/shared/lib';

import type { TransactionModel } from '../model/types';
import { LEAK_REASON_LABELS, OUTCOME_META } from './outcome';

export function deserialize(raw: TransactionModel): TransactionModel {
  const isExpense = raw.type === 'EXPENSE';
  if (raw.category && !raw.category.emoji) {
    raw.category.emoji = isExpense ? '💸' : '💵';
  }

  raw.note = raw.note ?? raw.description ?? '';
  if (!raw.description) {
    raw.description = raw.category?.name;
  }

  // Prisma Decimal arrives as a string.
  raw.amount = Number(raw.amount);
  raw.outcome = raw.outcome ?? 'UNREVIEWED';
  raw.leakReason = raw.leakReason ?? null;
  raw.reviewedAt = raw.reviewedAt ?? null;

  const meta = OUTCOME_META[raw.outcome];

  raw.isExpense = isExpense;
  raw.amountText = formatVnd(raw.amount);
  raw.signedAmountText = `${isExpense ? '−' : '+'} ${raw.amountText}`;
  raw.occurredOn = dayjs(raw.createdAt).format('YYYY-MM-DD');
  raw.timeText = dayjs(raw.createdAt).format('HH:mm');
  raw.walletName = raw.account?.name ?? '';
  raw.metaText = raw.walletName
    ? `${raw.timeText} · ${raw.walletName}`
    : raw.timeText;
  raw.dateText = formatRelativeDateTime(raw.createdAt);
  raw.outcomeLabel = meta.label;
  raw.outcomeBadgeClass = meta.badgeClass;
  raw.outcomeIcon = meta.icon;
  raw.leakReasonLabel = raw.leakReason
    ? LEAK_REASON_LABELS[raw.leakReason]
    : null;

  return raw;
}
